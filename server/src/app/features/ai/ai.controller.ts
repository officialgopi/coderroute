import { LANGUAGE } from "@prisma/client";
import { db } from "../../../db";
import { gemini, GEMINI_MODELS } from "../../libs/gemini.lib";
import { ApiError, ApiResponse, AsyncHandler } from "../../utils";
import { createProblemBodySchema } from "../problem/problem.schema";
import {
  generateProblemWithAISystemPrompt,
  generateSystemPromptToGetHelpFromAiAssistant,
} from "./ai.constant";
import {
  aiChatMessageBodySchema,
  getAiChatMessagesByIdParamsSchema,
  generateProblemWithAiBodySchema,
} from "./ai.schema";
import { ChatCompletionMessageParam } from "openai/resources/index";
import z from "zod";

const chatWithAiAssistant = AsyncHandler(async (req, res) => {
  if (!req.user) {
    throw new ApiError(401, "Unauthorized");
  }
  const { data, success } = aiChatMessageBodySchema.safeParse(req.body);
  if (!success) {
    throw new ApiError(400, "Invalid request data");
  }

  const { message, problemId, language } = data;

  const problem = await db.problem.findUnique({
    where: {
      id: problemId,
    },
    select: {
      id: true,
      title: true,
      description: true,
      difficulty: true,
      problemDetails: {
        where: {
          language: language,
        },
        select: {
          codeSnippet: true,
        },
      },
    },
  });

  if (!problem) {
    throw new ApiError(404, "Problem not found");
  }
  const codeSnippet =
    problem.problemDetails.length > 0
      ? problem.problemDetails[0].codeSnippet
      : null;

  if (!codeSnippet) {
    throw new ApiError(404, "Code snippet not found");
  }

  let chatHistory = await db.aiChatHistory.upsert({
    where: {
      userId_problemId: { userId: req.user.id, problemId },
    },
    update: {},
    create: { userId: req.user.id, problemId },
    include: { messages: true },
  });

  let userPrevMessages: {
    role: "user" | "assistant";
    content: string;
  }[] = [];

  chatHistory.messages.forEach((msg) => {
    if (msg.responseStatus === "SUCCESS") {
      userPrevMessages.push({
        role: "user",
        content: msg.message,
      });
      userPrevMessages.push({
        role: "assistant",
        content: msg.response || "",
      });
    }
  });

  const messages = [
    {
      role: "system",
      content: generateSystemPromptToGetHelpFromAiAssistant(
        problem.title,
        problem.description,
        problem.difficulty,
        language,
        codeSnippet
      ),
    },
    ...userPrevMessages,
    {
      role: "user",
      content: message,
    },
  ];

  const newMessage = await db.aiChatMessages.create({
    data: {
      message: message,
      chatHistoryId: chatHistory.id,
    },
  });

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  let assistantMessage = "";

  try {
    const stream = await gemini.chat.completions.create({
      model: GEMINI_MODELS.GEMINI_FLASH_2_5,
      messages: messages as ChatCompletionMessageParam[],
      stream: true,
    });

    for await (const chunk of stream) {
      const content = chunk.choices?.[0]?.delta?.content || "";
      if (!content) continue;

      assistantMessage += content;
      res.write(`${content}`);
    }

    await db.aiChatMessages.update({
      where: { id: newMessage.id },
      data: {
        response: assistantMessage,
        responseStatus: "SUCCESS",
      },
    });
  } catch (err) {
    await db.aiChatMessages.update({
      where: { id: newMessage.id },
      data: {
        response: assistantMessage,
        responseStatus: "FAILURE",
      },
    });
  } finally {
    res.end();
  }
});

const getChatsWithAiByParamsAssistant = AsyncHandler(async (req, res) => {
  if (!req.user) {
    throw new ApiError(401, "Unauthorized");
  }
  const { data, success } = getAiChatMessagesByIdParamsSchema.safeParse(
    req.params
  );
  if (!success) {
    throw new ApiError(400, "Invalid request data");
  }

  const problem = await db.problem.findUnique({
    where: {
      id: data.problemId,
    },
  });
  if (!problem) {
    throw new ApiError(404, "Problem not found");
  }

  const chatHistories = await db.aiChatHistory.upsert({
    where: {
      userId_problemId: {
        userId: req.user.id,
        problemId: data.problemId,
      },
    },
    update: {},
    create: {
      userId: req.user.id,
      problemId: data.problemId,
    },
    include: {
      messages: true,
    },
  });

  if (!chatHistories) {
    throw new ApiError(404, "Chat history not found");
  }

  new ApiResponse(200, {
    chats: chatHistories.messages,
  }).send(res);
});

const generateProblemWithAI = AsyncHandler(async (req, res) => {
  // if (!req.user) {
  //   throw new ApiError(401, "Unauthorized");
  // }

  const { data, success } = generateProblemWithAiBodySchema.safeParse(req.body);

  if (!success || !data) {
    throw new ApiError(400, "Invalid request data");
  }

  const { prompt } = data;

  const createProblemBodyOpenAISchema = {
    type: "object",
    additionalProperties: false,
    required: [
      "title",
      "description",
      "difficulty",
      "constraints",
      "testcases",
      "details",
    ],
    properties: {
      title: { type: "string" },
      description: { type: "string" },
      difficulty: {
        type: "string",
        enum: ["EASY", "MEDIUM", "HARD"],
      },
      tags: {
        type: "array",
        items: { type: "string" },
      },
      constraints: {
        type: "array",
        items: { type: "string" },
      },
      hints: {
        type: "array",
        items: { type: "string" },
      },
      editorial: { type: "string" },
      testcases: {
        type: "array",
        items: {
          type: "object",
          additionalProperties: false,
          required: ["input", "output"],
          properties: {
            input: { type: "string" },
            output: { type: "string" },
            explaination: { type: "string" },
          },
        },
      },
      details: {
        type: "array",
        items: {
          type: "object",
          additionalProperties: false,
          required: [
            "language",
            "codeSnippet",
            "backgroundCode",
            "whereToWriteCode",
            "referenceSolution",
          ],
          properties: {
            language: {
              type: "string",
              enum: Object.values(LANGUAGE),
            },
            codeSnippet: { type: "string" },
            backgroundCode: { type: "string" },
            whereToWriteCode: { type: "string" },
            referenceSolution: { type: "string" },
          },
        },
      },
    },
  };

  const response = await gemini.chat.completions.create({
    model: GEMINI_MODELS.GEMINI_FLASH_2_5,
    messages: [
      {
        role: "system",
        content: generateProblemWithAISystemPrompt,
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    response_format: {
      type: "json_schema",
      json_schema: {
        name: "CreateProblemBody",
        schema: createProblemBodyOpenAISchema,
      },
    },
  });

  const aiResponse = response?.choices?.[0]?.message?.content;
  if (!aiResponse) {
    throw new ApiError(500, "Failed to generate problem");
  }

  new ApiResponse(200, {
    generatedProblem: JSON.parse(aiResponse) as unknown as z.infer<
      typeof createProblemBodySchema
    >,
  }).send(res);
});

export {
  chatWithAiAssistant,
  getChatsWithAiByParamsAssistant,
  generateProblemWithAI,
};

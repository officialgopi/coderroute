import { LANGUAGE } from "@prisma/client";
import z from "zod";

const aiChatMessageBodySchema = z.object({
  problemId: z.string(),
  message: z.string().min(1).max(5000),
  language: z.enum(Object.values(LANGUAGE)),
});

const getAiChatMessagesByIdParamsSchema = z.object({
  problemId: z.string(),
});

const generateProblemWithAiBodySchema = z.object({
  prompt: z.string().min(1).max(10000),
});

export {
  aiChatMessageBodySchema,
  getAiChatMessagesByIdParamsSchema,
  generateProblemWithAiBodySchema,
};

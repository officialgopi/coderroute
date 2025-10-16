import { LANGUAGE } from "@prisma/client";
import { db } from "../../../db";
import { Judge0 } from "../../libs/judge0.lib";
import { ApiError, ApiResponse, AsyncHandler } from "../../utils";
import {
  codeRunExecutionBodySchema,
  codeRunExecutionParamsSchema,
} from "./code-execution.schema";
import { executeCodeService } from "./code-execution.service";

const codeRunExecute = AsyncHandler(async (req, res) => {
  if (!req.user) {
    throw new ApiError(401, "Unauthorized");
  }

  const paramsSchemaData = codeRunExecutionParamsSchema.safeParse(req.params);

  if (!paramsSchemaData.success || !paramsSchemaData.data) {
    throw new ApiError(400, "Invalid request data");
  }

  const { problemId } = paramsSchemaData.data;

  const bodySchemaData = codeRunExecutionBodySchema.safeParse(req.body);

  if (!bodySchemaData.success || !bodySchemaData.data) {
    throw new ApiError(400, "Invalid request data");
  }

  const { source_code, languageId, stdin, expectedOutput } =
    bodySchemaData.data;

  const language = Judge0.getJudge0LanguageName(languageId) as LANGUAGE;

  const problem = await db.problem.findUnique({
    where: {
      id: problemId,
    },
    include: {
      problemDetails: {
        where: {
          language: language,
        },
      },
    },
  });

  if (!problem) {
    throw new ApiError(404, "Problem not found");
  }

  if (!problem.problemDetails || problem.problemDetails.length === 0) {
    throw new ApiError(
      400,
      `Problem does not support the language: ${language}`
    );
  }

  const problemDetail = problem.problemDetails[0];

  const result = await executeCodeService(
    source_code,
    problemDetail.backgroundCode,
    problemDetail.whereToWriteCode,
    languageId,
    stdin,
    expectedOutput
  );

  if (!result.success) {
    throw new ApiError(400, result.message || "Code execution failed");
  }

  new ApiResponse(
    200,
    {
      status: result.data?.allPassed ? "ACCEPTED" : "WRONG_ANSWER",
      testcases: result.data?.detailedResults || [],
    },
    "Code Executed Successfully"
  ).send(res);
});

const codeSubmitExecute = AsyncHandler(async (req, res) => {
  if (!req.user) {
    throw new ApiError(401, "Unauthorized");
  }

  const paramsSchemaData = codeRunExecutionParamsSchema.safeParse(req.params);

  if (!paramsSchemaData.success || !paramsSchemaData.data) {
    throw new ApiError(400, "Invalid request data");
  }

  const { problemId } = paramsSchemaData.data;

  const bodySchemaData = codeRunExecutionBodySchema.safeParse(req.body);

  if (!bodySchemaData.success || !bodySchemaData.data) {
    throw new ApiError(400, "Invalid request data");
  }

  const { source_code, languageId } = bodySchemaData.data;

  const language = Judge0.getJudge0LanguageName(languageId) as LANGUAGE;

  const problem = await db.problem.findUnique({
    where: {
      id: problemId,
    },
    include: {
      testcases: true,
      problemDetails: {
        where: {
          language: language,
        },
      },
    },
  });

  if (!problem) {
    throw new ApiError(404, "Problem not found");
  }

  if (!problem.problemDetails || problem.problemDetails.length === 0) {
    throw new ApiError(
      400,
      `Problem does not support the language: ${language}`
    );
  }

  const problemDetail = problem.problemDetails[0];

  const result = await executeCodeService(
    source_code,
    problemDetail.backgroundCode,
    problemDetail.whereToWriteCode,
    languageId,
    problem.testcases.map((tc) => tc.input),
    problem.testcases.map((tc) => tc.output)
  );

  if (!result.success) {
    throw new ApiError(400, result.message || "Code execution failed");
  }

  const submission = await db.submission.create({
    data: {
      userId: req.user.id,
      problemId: problem.id,
      language: language,
      sourceCode: source_code,
      status: result.data?.allPassed ? "ACCEPTED" : "WRONG_ANSWER",
      compileOutput: result.data?.detailedResults?.some(
        (tr) => tr.compile_output
      )
        ? JSON.stringify(
            result.data?.detailedResults.map((res) => res.compile_output)
          )
        : null,
      time: result.data?.detailedResults?.some((res) => res.time)
        ? JSON.stringify(result.data.detailedResults.map((res) => res.time))
        : null,
      memory: result.data?.detailedResults?.some((res) => res.memory)
        ? JSON.stringify(result.data.detailedResults.map((res) => res.memory))
        : null,
    },
  });

  const testcaseResults = result.data?.detailedResults?.map((tr, index) => ({
    submissionId: submission.id,
    testCaseId: problem.testcases[index].id,
    passed: tr.passed,
    expected: tr.expected,
    actual: tr.actual,
    time: tr.time,
    memory: tr.memory,
    status: tr.status,
    stderr: tr.stderr,
    compile_output: tr.compile_output,
  }));

  if (!testcaseResults) {
    throw new ApiError(500, "Failed to save testcase results");
  }
  await db.testCaseResult.createMany({
    data: testcaseResults,
  });

  const submissionWithTestCaseResults = await db.submission.findUnique({
    where: {
      id: submission.id,
    },
    include: {
      testCasesResults: true,
    },
  });

  new ApiResponse(
    200,
    {
      submission: submissionWithTestCaseResults,
    },
    "Code Submitted Successfully"
  ).send(res);
});

export { codeRunExecute, codeSubmitExecute };

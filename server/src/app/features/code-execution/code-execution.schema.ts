import z from "zod";

const codeRunExecutionParamsSchema = z.object({
  problemId: z.string(),
});
const codeSubmitExecutionParamsSchema = z.object({
  problemId: z.string(),
});

const codeRunExecutionBodySchema = z.object({
  source_code: z.string(),
  language: z.string(),
  stdin: z.array(z.string()),
  expectedOutput: z.array(z.string()),
});
const codeSubmitExecutionBodySchema = z.object({
  source_code: z.string(),
  language: z.string(),
});

export {
  codeRunExecutionBodySchema,
  codeRunExecutionParamsSchema,
  codeSubmitExecutionBodySchema,
  codeSubmitExecutionParamsSchema,
};

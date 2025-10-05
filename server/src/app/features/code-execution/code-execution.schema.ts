import z from "zod";

const codeRunExecutionParamsSchema = z.object({
  problemId: z.string(),
});

const codeRunExecutionBodySchema = z.object({
  source_code: z.string(),
  languageId: z.number(),
  stdin: z.array(z.string()),
  expectedOutput: z.array(z.string()),
});

export { codeRunExecutionBodySchema, codeRunExecutionParamsSchema };

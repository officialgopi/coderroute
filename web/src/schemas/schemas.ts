import z from "zod";

const LANGUAGE = {
  PYTHON: "PYTHON",
  JAVASCRIPT: "JAVASCRIPT",
} as const;

export const createProblemBodySchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().min(1),
  difficulty: z.enum(["EASY", "MEDIUM", "HARD"]),
  tags: z.array(z.string()).optional(),
  constraints: z.array(z.string().optional()),
  hints: z.array(z.string()).optional(),
  editorial: z.string().optional(),
  args: z.array(z.string()),
  output_format: z.enum(["PLAIN", "JSON", "FLOAT"]),
  testcases: z.array(
    z.object({
      std: z.object({
        stdin: z.array(z.string()),
        stdout: z.string(),
      }),
      explaination: z.string().optional(),
    })
  ),
  details: z.array(
    z.object({
      language: z.enum(Object.values(LANGUAGE)),
      codeSnippet: z.string(),
      backgroundCode: z.string(),
      referenceSolution: z.string(),
    })
  ),
});

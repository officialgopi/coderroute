import { LANGUAGE } from "@prisma/client";
import z from "zod";

const createProblemBodySchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().min(1),
  difficulty: z.enum(["EASY", "MEDIUM", "HARD"]),
  tags: z.array(z.string()).optional(),
  constraints: z.array(z.string().optional()),
  hints: z.array(z.string()).optional(),
  editorial: z.string().optional(),
  testcases: z.array(
    z.object({
      input: z.string(),
      output: z.string(),
      explaination: z.string().optional(),
    })
  ),
  details: z.array(
    z.object({
      language: z.enum(Object.values(LANGUAGE)),
      codeSnippet: z.string(),
      backgroundCode: z.string(),
      whereToWriteCode: z.string(),
      referenceSolution: z.string(),
    })
  ),
});

const updateProblemBodySchema = createProblemBodySchema.partial();
const updateProblemParamsSchema = z.object({
  problemId: z.string(),
});

const getProblemsQuerySchema = z.object({
  limit: z.number().default(10),
  page: z.number().default(1),
  difficulty: z.enum(["EASY", "MEDIUM", "HARD"]).optional(),
  tags: z.string().optional(),
  search: z.string().optional(),
  sortBy: z
    .enum(["CREATED_AT", "TITLE", "DIFFICULTY"])
    .default("CREATED_AT")
    .optional(),
  sortOrder: z.enum(["asc", "desc"]).default("desc").optional(),
});

export {
  createProblemBodySchema,
  updateProblemBodySchema,
  getProblemsQuerySchema,
  updateProblemParamsSchema,
};

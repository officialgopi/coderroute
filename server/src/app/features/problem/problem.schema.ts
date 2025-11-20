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
      whereToWriteCode: z.string().default("<WHERE_TO_WRITE_CODE/>"),
      referenceSolution: z.string(),
    })
  ),
});

const updateProblemParamsSchema = z.object({
  problemId: z.string(),
});

const updateProblemBodySchema = z.object({
  title: z.string().min(1).max(255).optional(),
  description: z.string().min(1).optional(),
  difficulty: z.enum(["EASY", "MEDIUM", "HARD"]).optional(),
  tags: z.array(z.string()).optional(),
  constraints: z.array(z.string().optional()).optional(),
  hints: z.array(z.string()).optional(),
  editorial: z.string().optional(),
});

const getProblemBySlugParamsSchema = z.object({
  slug: z.string(),
});
const deleteProblemBySlugParamsSchema = z.object({
  problemId: z.string(),
});

const getProblemsQuerySchema = z.object({
  limit: z.coerce.number().default(10),
  page: z.coerce.number().default(1),
  difficulty: z.enum(["EASY", "MEDIUM", "HARD"]).optional(),
  tags: z.string().optional(),
  search: z.string().optional(),
  sortBy: z
    .enum(["CREATED_AT", "TITLE", "DIFFICULTY"])
    .default("CREATED_AT")
    .optional(),
  sortOrder: z.enum(["asc", "desc"]).default("desc").optional(),
});

const deleteTestcaseFromProblemByIdAndTestcaseIdParamsSchema = z.object({
  problemId: z.string(),
});
const deleteTestcaseFromProblemByIdAndTestcaseIdBodySchema = z.object({
  testcaseId: z.number(),
});

const addTestcaseToProblemParamsSchema = z.object({
  problemId: z.string(),
});

const addTestcaseToProblemBodySchema = z.object({
  testcases: z.array(
    z.object({
      input: z.string(),
      output: z.string(),
      explaination: z.string().optional(),
    })
  ),
});

export {
  createProblemBodySchema,
  getProblemsQuerySchema,
  updateProblemParamsSchema,
  updateProblemBodySchema,
  getProblemBySlugParamsSchema,
  deleteProblemBySlugParamsSchema,
  addTestcaseToProblemParamsSchema,
  addTestcaseToProblemBodySchema,
  deleteTestcaseFromProblemByIdAndTestcaseIdParamsSchema,
  deleteTestcaseFromProblemByIdAndTestcaseIdBodySchema,
};

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

export { createProblemBodySchema };

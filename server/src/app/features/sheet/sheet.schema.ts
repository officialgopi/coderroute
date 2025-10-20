import z from "zod";

const createSheetBodySchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
});
const copySheetBodySchema = z.object({
  sheetId: z.string(),
});

const addProblemToSheetBodySchema = z.object({
  problemId: z.string(),
});
const addProblemToSheetParamsSchema = z.object({
  sheetId: z.string(),
});

const getSheetsQuerySchema = z.object({
  userId: z.string().optional(),
});
const getSheetsParamsSchema = z.object({
  sheetId: z.string(),
});

const updateSheetParamsSchema = z.object({
  sheetId: z.string(),
});
const deleteSheetParamsSchema = z.object({
  sheetId: z.string(),
});
const deleteProblemFromSheetParamsSchema = z.object({
  sheetId: z.string(),
});
const deleteProblemFromSheetBodySchema = z.object({
  problemId: z.string(),
});
const upadateSheetBodySchema = z.object({
  name: z.string().min(1).max(100).optional(),
  description: z.string().max(500).optional(),
  isPublic: z.boolean().optional(),
});

export {
  createSheetBodySchema,
  copySheetBodySchema,
  addProblemToSheetBodySchema,
  addProblemToSheetParamsSchema,
  updateSheetParamsSchema,
  getSheetsQuerySchema,
  upadateSheetBodySchema,
  getSheetsParamsSchema,
  deleteSheetParamsSchema,
  deleteProblemFromSheetBodySchema,
  deleteProblemFromSheetParamsSchema,
};

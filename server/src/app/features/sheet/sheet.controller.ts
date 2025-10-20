import { db } from "../../../db";
import { ApiError, ApiResponse, AsyncHandler } from "../../utils";
import {
  addProblemToSheetBodySchema,
  addProblemToSheetParamsSchema,
  copySheetBodySchema,
  createSheetBodySchema,
  deleteProblemFromSheetBodySchema,
  deleteProblemFromSheetParamsSchema,
  deleteSheetParamsSchema,
  getSheetsParamsSchema,
  getSheetsQuerySchema,
  upadateSheetBodySchema,
  updateSheetParamsSchema,
} from "./sheet.schema";

const createSheet = AsyncHandler(async (req, res) => {
  if (!req.user) {
    throw new ApiError(401, "Unauthorized");
  }

  const { data, success } = createSheetBodySchema.safeParse(req.body);

  if (!success) {
    throw new ApiError(400, "Invalid request data");
  }

  const newSheet = await db.sheet.create({
    data: {
      name: data.name,
      description: data.description,
      userId: req.user.id,
    },
  });

  new ApiResponse(
    201,
    {
      sheet: newSheet,
    },
    "Sheet created successfully"
  ).send(res);
});

const getSheets = AsyncHandler(async (req, res) => {
  if (!req.user) {
    throw new ApiError(401, "Unauthorized");
  }

  const { data, success } = getSheetsQuerySchema.safeParse(req.query);

  if (!success) {
    throw new ApiError(400, "Invalid request data");
  }

  const sheets = await db.sheet.findMany({
    where: {
      ...(data.userId
        ? {
            userId: data.userId,
            isPublic: true,
          }
        : {
            userId: req.user.id,
          }),
    },
  });

  new ApiResponse(
    200,
    {
      sheets,
    },
    "Sheets fetched successfully"
  ).send(res);
});

const getSheetById = AsyncHandler(async (req, res) => {
  if (!req.user) {
    throw new ApiError(401, "Unauthorized");
  }

  const { data, success } = getSheetsParamsSchema.safeParse(req.params);

  if (!success) {
    throw new ApiError(400, "Invalid request data");
  }

  const { sheetId } = data;

  const sheet = await db.sheet.findUnique({
    where: {
      id: sheetId,
    },
  });

  if (!sheet) {
    throw new ApiError(404, "Sheet not found");
  }

  if (sheet.userId !== req.user.id && !sheet.isPublic) {
    throw new ApiError(403, "You are not authorized to access this sheet");
  }

  new ApiResponse(
    200,
    {
      sheet,
    },
    "Sheet fetched successfully"
  ).send(res);
});

const copySheet = AsyncHandler(async (req, res) => {
  if (!req.user) {
    throw new ApiError(401, "Unauthorized");
  }

  const { data, success } = copySheetBodySchema.safeParse(req.body);

  if (!success) {
    throw new ApiError(400, "Invalid request data");
  }

  const { sheetId } = data;

  const originalSheet = await db.sheet.findUnique({
    where: {
      id: sheetId,
    },
    include: {
      problems: true,
    },
  });

  if (!originalSheet) {
    throw new ApiError(404, "Original sheet not found");
  }

  const copiedSheet = await db.sheet.create({
    data: {
      name: originalSheet.name + " (Copy)",
      description: originalSheet.description,
      userId: req.user.id,
      copyFromSheetId: originalSheet.id,
      problems: {
        create: originalSheet.problems.map((problem) => ({
          problemId: problem.problemId,
        })),
      },
    },
  });

  new ApiResponse(
    201,
    {
      sheet: copiedSheet,
    },
    "Sheet copied successfully"
  ).send(res);
});

const addProblemToSheet = AsyncHandler(async (req, res) => {
  if (!req.user) {
    throw new ApiError(401, "Unauthorized");
  }
  const { success: paramsSuccess, data: paramsData } =
    addProblemToSheetParamsSchema.safeParse(req.params);
  if (!paramsSuccess) {
    throw new ApiError(400, "Invalid request parameters");
  }
  const { sheetId } = paramsData;

  const { success: bodySuccess, data: bodyData } =
    addProblemToSheetBodySchema.safeParse(req.body);
  if (!bodySuccess) {
    throw new ApiError(400, "Invalid request body");
  }

  const { problemId } = bodyData;

  const sheet = await db.sheet.findUnique({
    where: {
      id: sheetId,
      userId: req.user.id,
    },
    include: {
      problems: true,
    },
  });

  if (!sheet) {
    throw new ApiError(404, "Sheet not found");
  }

  const problem = await db.problem.findUnique({
    where: {
      id: problemId,
    },
  });

  if (!problem) {
    throw new ApiError(404, "Problem not found");
  }

  if (sheet.problems.some((p) => p.problemId === problemId)) {
    throw new ApiError(400, "Problem already added to sheet");
  }

  const problemInSheet = await db.problemInSheet.create({
    data: {
      sheetId: sheet.id,
      problemId,
    },
  });

  new ApiResponse(
    201,
    {
      problemInSheet,
    },
    "Problem added to sheet successfully"
  ).send(res);
});

const updateSheet = AsyncHandler(async (req, res) => {
  if (!req.user) {
    throw new ApiError(401, "Unauthorized");
  }

  const { data: paramsData, success: paramsSuccess } =
    updateSheetParamsSchema.safeParse(req.params);

  if (!paramsSuccess) {
    throw new ApiError(400, "Invalid request parameters");
  }
  const { sheetId } = paramsData;

  const { data: bodyData, success: bodySuccess } =
    upadateSheetBodySchema.safeParse(req.body);
  if (!bodySuccess) {
    throw new ApiError(400, "Invalid request body");
  }

  const { name, description, isPublic } = bodyData;

  const sheet = await db.sheet.findUnique({
    where: {
      id: sheetId,
      userId: req.user.id,
    },
  });

  if (!sheet) {
    throw new ApiError(404, "Sheet not found");
  }

  const updatedSheet = await db.sheet.update({
    where: {
      id: sheetId,
    },
    data: {
      name: name ?? sheet.name,
      description: description ?? sheet.description,
      isPublic: isPublic ?? sheet.isPublic,
    },
  });

  new ApiResponse(
    200,
    {
      sheet: updatedSheet,
    },
    "Sheet updated successfully"
  ).send(res);
});

const deleteSheet = AsyncHandler(async (req, res) => {
  if (!req.user) {
    throw new ApiError(401, "Unauthorized");
  }

  const { data, success } = deleteSheetParamsSchema.safeParse(req.params);

  if (!success) {
    throw new ApiError(400, "Invalid request data");
  }

  const { sheetId } = data;

  const sheet = await db.sheet.findUnique({
    where: {
      id: sheetId,
      userId: req.user.id,
    },
  });

  if (!sheet) {
    throw new ApiError(404, "Sheet not found");
  }

  await db.sheet.delete({
    where: {
      id: sheetId,
    },
  });

  new ApiResponse(200, {}, "Sheet deleted successfully").send(res);
});

const deleteProblemFromSheet = AsyncHandler(async (req, res) => {
  if (!req.user) {
    throw new ApiError(401, "Unauthorized");
  }

  const { data: paramsData, success: paramsSuccess } =
    deleteProblemFromSheetParamsSchema.safeParse(req.params);

  if (!paramsSuccess) {
    throw new ApiError(400, "Invalid request data");
  }

  const { sheetId } = paramsData;

  const { data: bodyData, success: bodySuccess } =
    deleteProblemFromSheetBodySchema.safeParse(req.body);

  if (!bodySuccess) {
    throw new ApiError(400, "Invalid request data");
  }

  const { problemId } = bodyData;
  const sheet = await db.sheet.findUnique({
    where: {
      id: sheetId,
      userId: req.user.id,
    },
    include: {
      problems: true,
    },
  });

  if (!sheet) {
    throw new ApiError(404, "Sheet not found");
  }

  const problemInSheet = sheet.problems.find((p) => p.problemId === problemId);

  if (!problemInSheet) {
    throw new ApiError(404, "Problem not found in sheet");
  }

  await db.problemInSheet.delete({
    where: {
      id: problemInSheet.id,
    },
  });

  new ApiResponse(200, {}, "Problem removed from sheet successfully").send(res);
});

export {
  createSheet,
  getSheets,
  copySheet,
  addProblemToSheet,
  updateSheet,
  getSheetById,
  deleteSheet,
  deleteProblemFromSheet,
};

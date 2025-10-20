import { Router } from "express";
import {
  addProblemToSheet,
  copySheet,
  createSheet,
  deleteProblemFromSheet,
  deleteSheet,
  getSheetById,
  getSheets,
  updateSheet,
} from "./sheet.controller";
import { isAuthenticated } from "../../middlewares/auth.middleware";

const sheetRouter = Router();

sheetRouter.use(isAuthenticated);

sheetRouter.post("/", createSheet);
sheetRouter.post("/copy", copySheet);
sheetRouter.put("/:sheetId", updateSheet);
sheetRouter.post("/:sheetId/add-problem", addProblemToSheet);
sheetRouter.delete("/:sheetId", deleteSheet);
sheetRouter.delete("/:sheetId/delete-problem", deleteProblemFromSheet);
sheetRouter.get("/", getSheets);
sheetRouter.get("/:sheetId", getSheetById);

export { sheetRouter };

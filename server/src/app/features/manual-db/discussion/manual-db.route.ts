import { Router } from "express";
import { getProblemFormat } from "./manual-db.controller";

const manualDb = Router();

manualDb.get("/problem", getProblemFormat);

export { manualDb };

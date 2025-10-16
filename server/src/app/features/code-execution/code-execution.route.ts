import { Router } from "express";
import { codeRunExecute, codeSubmitExecute } from "./code-execution.controller";

const codeExecutionRouter = Router();

codeExecutionRouter.post("/:problemId/run", codeRunExecute);
codeExecutionRouter.post("/:problemId/submit", codeSubmitExecute);

export { codeExecutionRouter };

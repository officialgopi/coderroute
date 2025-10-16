import { Router } from "express";
import { authRouter } from "./auth/auth.route";
import { problemRouter } from "./problem/problem.route";
import { submissionRouter } from "./submission/submission.route";
import { codeExecutionRouter } from "./code-execution/code-execution.route";
import { rateLimitting } from "../middlewares/rate-limitting.middleware";

const allRoutes = Router();

allRoutes.use("/auth", authRouter);
allRoutes.use("/problem", problemRouter);
allRoutes.use("/submission", submissionRouter);
allRoutes.use("/code-execution", rateLimitting(), codeExecutionRouter);

export { allRoutes };

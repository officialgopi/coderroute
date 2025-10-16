import { Router } from "express";
import { authRouter } from "./auth/auth.route";
import { problemRouter } from "./problem/problem.route";
import { submissionRouter } from "./submission/submission.route";

const allRoutes = Router();

allRoutes.use("/auth", authRouter);
allRoutes.use("/problem", problemRouter);
allRoutes.use("/submission", submissionRouter);

export { allRoutes };

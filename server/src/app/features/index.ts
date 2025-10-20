import { Router } from "express";
import { authRouter } from "./auth/auth.route";
import { problemRouter } from "./problem/problem.route";
import { submissionRouter } from "./submission/submission.route";
import { codeExecutionRouter } from "./code-execution/code-execution.route";
import { rateLimitting } from "../middlewares/rate-limitting.middleware";
import { liveblocksRoutes } from "./collaborative-code-editor/collaborative-code-editor.route";
import { discussionRouter } from "./discussion/discussion.route";
import { sheetRouter } from "./sheet/sheet.route";

const allRoutes = Router();

allRoutes.use("/auth", authRouter);
allRoutes.use("/problem", problemRouter);
allRoutes.use("/submission", submissionRouter);
allRoutes.use("/code-execution", rateLimitting(), codeExecutionRouter);
allRoutes.use("/liveblocks", liveblocksRoutes);
allRoutes.use("/discussion", discussionRouter);
allRoutes.use("/sheet", sheetRouter);

export { allRoutes };

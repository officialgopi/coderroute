import { Router } from "express";
import { authRouter } from "./auth/auth.route";
import { problemRouter } from "./problem/problem.route";

const allRoutes = Router();

allRoutes.use("/auth", authRouter);
allRoutes.use("/problem", problemRouter);

export { allRoutes };

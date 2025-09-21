import { Router } from "express";
import { checkAdmin, isAuthenticated } from "../../middlewares/auth.middleware";
import { createProblem, getProblems } from "./problem.controller";

const router = Router();

router.use(isAuthenticated);

router.post("/", checkAdmin, createProblem);
router.get("/", getProblems);
router.get("/get-problem/:slug");
router.get("/get-solved-problems");
router.put("/:slug", checkAdmin);
router.delete("/:slug", checkAdmin);

export { router as problemRouter };

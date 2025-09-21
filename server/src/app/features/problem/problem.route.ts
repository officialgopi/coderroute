import { Router } from "express";
import { checkAdmin, isAuthenticated } from "../../middlewares/auth.middleware";
import {
  createProblem,
  deleteProblem,
  getProblemBySlug,
  getProblems,
  getSolvedProblems,
} from "./problem.controller";

const router = Router();

router.use(isAuthenticated);

router.post("/", checkAdmin, createProblem);
router.get("/", getProblems);
router.get("/get-problem/:slug", getProblemBySlug);
router.get("/get-solved-problems", getSolvedProblems);
router.delete("/:slug", checkAdmin, deleteProblem);

router.put("/:slug", checkAdmin);

export { router as problemRouter };

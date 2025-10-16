import { Router } from "express";
import { checkAdmin, isAuthenticated } from "../../middlewares/auth.middleware";
import {
  addTestcaseToProblemById,
  createProblem,
  deleteProblem,
  deleteTestcaseFromProblemById,
  getProblemBySlug,
  getProblems,
  getSolvedProblems,
  updateProblemMetadata,
} from "./problem.controller";

const router = Router();

router.use(isAuthenticated);

router.post("/", checkAdmin, createProblem);
router.get("/", getProblems);
router.get("/get-problem/:slug", getProblemBySlug);
router.get("/get-solved-problems", getSolvedProblems);
router.delete("/:problemId", checkAdmin, deleteProblem);
router.put("/:problemId/metadata", checkAdmin, updateProblemMetadata);
//testcase
router.post("/:problemId/testcase", checkAdmin, addTestcaseToProblemById);
router.post("/:problemId/testcase", checkAdmin, deleteTestcaseFromProblemById);

export { router as problemRouter };

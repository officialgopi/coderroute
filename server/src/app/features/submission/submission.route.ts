import { Router } from "express";
import {
  getAllSubmissions,
  getSubmissionByProblemId,
  getSubmissionsCountByProblemId,
} from "./submission.controller";
import { isAuthenticated } from "../../middlewares/auth.middleware";

const submissionRouter = Router();

submissionRouter.get(
  "/get-all-submissions",
  isAuthenticated,
  getAllSubmissions
);

submissionRouter.get(
  "/get-submissions/:problemId",
  isAuthenticated,
  getSubmissionByProblemId
);

submissionRouter.get(
  "/get-submissions-count/:problemId",
  isAuthenticated,
  getSubmissionsCountByProblemId
);

export { submissionRouter };

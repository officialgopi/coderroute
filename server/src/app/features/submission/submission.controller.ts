import { db } from "../../../db";
import { ApiError, ApiResponse, AsyncHandler } from "../../utils";
import { getSubmissionByProblemIdParamsSchema } from "./submission.schema";

const getAllSubmissions = AsyncHandler(async (req, res) => {
  if (!req.user) {
    throw new ApiError(401, "Unauthorized");
  }

  const userId = req.user?.id;

  const submissions = await db.submission.findMany({
    where: {
      userId: userId,
    },
  });

  new ApiResponse(200, {
    submissions,
  }).send(res);
});

const getSubmissionByProblemId = AsyncHandler(async (req, res) => {
  if (!req.user) {
    throw new ApiError(401, "Unauthorized");
  }
  const userId = req.user?.id;

  const { data, success } = getSubmissionByProblemIdParamsSchema.safeParse(
    req.params
  );

  if (!success) {
    throw new ApiError(400, "Invalid request data");
  }

  const { problemId } = data;

  const submissions = await db.submission.findMany({
    where: {
      userId: userId,
      problemId: problemId,
    },
  });

  new ApiResponse(200, {
    submissions,
  }).send(res);
});

const getSubmissionsCountByProblemId = AsyncHandler(async (req, res) => {
  const { data, success } = getSubmissionByProblemIdParamsSchema.safeParse(
    req.params
  );

  if (!success) {
    throw new ApiError(400, "Invalid request data");
  }

  const { problemId } = data;

  const submissionCount = await db.submission.count({
    where: {
      problemId: problemId,
    },
  });

  new ApiResponse(200, {
    submissionCount,
  }).send(res);
});

export {
  getAllSubmissions,
  getSubmissionByProblemId,
  getSubmissionsCountByProblemId,
};

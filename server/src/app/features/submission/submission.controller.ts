import { db } from "../../../db";
import { ApiError, ApiResponse, AsyncHandler } from "../../utils";
import {
  getSubmissionByProblemIdParamsSchema,
  getSubmissionBySubmissionIdParamsSchema,
} from "./submission.schema";

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
const getSubmissionBySubmissionId = AsyncHandler(async (req, res) => {
  if (!req.user) {
    throw new ApiError(401, "Unauthorized");
  }

  const userId = req.user.id;

  const { data, success } = getSubmissionBySubmissionIdParamsSchema.safeParse(
    req.params
  );

  if (!success || !data) {
    throw new ApiError(400, "Invalid request data");
  }

  const submission = await db.submission.findUnique({
    where: {
      id: data.submissionId,
      userId: userId,
    },
    include: {
      testcasesResults: {
        include: {
          testcase: true,
        },
      },
    },
  });

  if (!submission) {
    throw new ApiError(400, "No submission found");
  }

  new ApiResponse(
    200,
    {
      submission,
    },
    "Submission successfully fetched"
  ).send(res);
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
    orderBy: {
      createdAt: "desc",
    },
    include: {
      testcasesResults: {
        include: {
          testcase: true,
        },
      },
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
  getSubmissionBySubmissionId,
};

import { db } from "../../../db";
import { ApiError, ApiResponse, AsyncHandler } from "../../utils";
import {
  createDiscussionBodySchema,
  deleteDiscussionBodySchema,
  getDiscussionByIdParamsSchema,
  getDiscussionRepliesParamsSchema,
  getDiscussionsQuerySchema,
  updateDiscussionBodySchema,
} from "./discussion.schema";

const createDiscussion = AsyncHandler(async (req, res) => {
  if (!req.user) {
    throw new ApiError(401, "Unauthorized");
  }

  const { data, success } = createDiscussionBodySchema.safeParse(req.body);

  if (!success) {
    throw new ApiError(400, "Invalid request data");
  }

  if (data.parentId) {
    const parentDiscussion = await db.discussion.findUnique({
      where: { id: data.parentId },
    });
    if (!parentDiscussion) {
      throw new ApiError(404, "Parent discussion not found");
    }
  }

  const newDiscussion = await db.discussion.create({
    data: {
      content: data.content,
      parentId: data.parentId ?? undefined,
      problemId: data.problemId ?? undefined,
      userId: req.user.id,
    },
  });

  new ApiResponse(
    201,
    {
      discussion: newDiscussion,
    },
    "Discussion created successfully"
  ).send(res);
});

const getDiscussions = AsyncHandler(async (req, res) => {
  if (!req.user) {
    throw new ApiError(401, "Unauthorized");
  }

  const { data } = getDiscussionsQuerySchema.safeParse(req.query);

  const discussions = await db.discussion.findMany({
    where: {
      parentId: null,
      ...(data?.problemId
        ? { problemId: data.problemId }
        : {
            problemId: null,
          }),
    },
    skip: 10 * ((data?.page ?? 1) - 1),
    take: 10,
    include: {
      user: true,
      _count: {
        select: { replies: true },
      },
    },
  });

  new ApiResponse(
    200,
    {
      discussions,
    },
    "Discussions fetched successfully"
  ).send(res);
});

const getDiscussionReplies = AsyncHandler(async (req, res) => {
  if (!req.user) {
    throw new ApiError(401, "Unauthorized");
  }

  const { data, success } = getDiscussionRepliesParamsSchema.safeParse(
    req.params
  );

  if (!success) {
    throw new ApiError(400, "Invalid request parameters");
  }

  const replies = await db.discussion.findMany({
    where: {
      parentId: data.discussionId,
    },
    include: {
      user: true,
    },
  });

  new ApiResponse(
    200,
    {
      replies,
    },
    "Discussion replies fetched successfully"
  ).send(res);
});

const getDiscussionById = AsyncHandler(async (req, res) => {
  if (!req.user) {
    throw new ApiError(401, "Unauthorized");
  }

  const { data, success } = getDiscussionByIdParamsSchema.safeParse(req.params);
  if (!success) {
    throw new ApiError(400, "Invalid request parameters");
  }

  const discussion = await db.discussion.findUnique({
    where: {
      id: data.discussionId,
    },
    include: {
      user: true,
      _count: {
        select: { replies: true },
      },
    },
  });

  if (!discussion) {
    throw new ApiError(404, "Discussion not found");
  }

  new ApiResponse(
    200,
    {
      discussion,
    },
    "Discussion fetched successfully"
  ).send(res);
});

const updateDiscussion = AsyncHandler(async (req, res) => {
  if (!req.user) {
    throw new ApiError(401, "Unauthorized");
  }

  // Implementation for updating a discussion goes here
  const paramsSchema = getDiscussionByIdParamsSchema.safeParse(req.params);
  if (!paramsSchema.success) {
    throw new ApiError(400, "Invalid request parameters");
  }
  const { discussionId } = paramsSchema.data;

  const { data, success } = updateDiscussionBodySchema.safeParse(req.body);

  if (!success) {
    throw new ApiError(400, "Invalid request data");
  }

  const updatedDiscussion = await db.discussion.update({
    where: { id: discussionId },
    data: {
      content: data.content,
    },
  });

  new ApiResponse(
    200,
    {
      discussion: updatedDiscussion,
    },
    "Discussion updated successfully"
  ).send(res);
});

const deleteDiscussion = AsyncHandler(async (req, res) => {
  if (!req.user) {
    throw new ApiError(401, "Unauthorized");
  }

  const paramsSchema = deleteDiscussionBodySchema.safeParse(req.params);
  if (!paramsSchema.success) {
    throw new ApiError(400, "Invalid request parameters");
  }
  const { discussionId } = paramsSchema.data;

  await db.discussion.delete({
    where: {
      id: discussionId,
    },
  });

  new ApiResponse(200, {}, "Discussion deleted successfully").send(res);
});

export {
  createDiscussion,
  getDiscussions,
  getDiscussionReplies,
  getDiscussionById,
  updateDiscussion,
  deleteDiscussion,
};

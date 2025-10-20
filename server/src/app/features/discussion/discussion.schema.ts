import z from "zod";

const createDiscussionBodySchema = z.object({
  content: z.string().min(1).max(5000),
  parentId: z.string().optional(),
  problemId: z.string().optional(),
});

const getDiscussionsQuerySchema = z.object({
  problemId: z.string().optional(),
});

const getDiscussionRepliesParamsSchema = z.object({
  discussionId: z.string(),
});
const getDiscussionByIdParamsSchema = z.object({
  discussionId: z.string(),
});
const updateDiscussionParamsSchema = z.object({
  discussionId: z.string(),
});
const updateDiscussionBodySchema = z.object({
  content: z.string().min(1).max(5000),
});
const deleteDiscussionBodySchema = z.object({
  discussionId: z.string(),
});

export {
  createDiscussionBodySchema,
  getDiscussionsQuerySchema,
  getDiscussionRepliesParamsSchema,
  getDiscussionByIdParamsSchema,
  updateDiscussionParamsSchema,
  updateDiscussionBodySchema,
  deleteDiscussionBodySchema,
};

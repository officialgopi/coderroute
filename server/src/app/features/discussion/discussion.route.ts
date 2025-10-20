import { Router } from "express";
import {
  createDiscussion,
  deleteDiscussion,
  getDiscussionById,
  getDiscussionReplies,
  getDiscussions,
  updateDiscussion,
} from "./discussion.controller";
import { isAuthenticated } from "../../middlewares/auth.middleware";

const discussionRouter = Router();

discussionRouter.use(isAuthenticated);

discussionRouter.post("/", createDiscussion);
discussionRouter.get("/", getDiscussions);
discussionRouter.get("/:discussionId", getDiscussionById);
discussionRouter.get("/:discussionId/replies", getDiscussionReplies);
discussionRouter.put("/:discussionId", updateDiscussion);
discussionRouter.delete("/:discussionId", deleteDiscussion);

export { discussionRouter };

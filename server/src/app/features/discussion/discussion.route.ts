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

/**
 * @swagger
 * /api/discussion/:
 *   post:
 *     summary: Create a new discussion
 *     description: Creates a new discussion or reply to an existing discussion
 *     tags: [Discussions]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *             properties:
 *               content:
 *                 type: string
 *                 description: Discussion content
 *               problemId:
 *                 type: string
 *                 format: uuid
 *                 description: Associated problem ID (optional for general discussions)
 *               parentId:
 *                 type: string
 *                 format: uuid
 *                 description: Parent discussion ID (for replies)
 *     responses:
 *       201:
 *         description: Discussion created successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/Discussion'
 *       400:
 *         description: Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiError'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiError'
 */
discussionRouter.post("/", createDiscussion);

/**
 * @swagger
 * /api/discussion/:
 *   get:
 *     summary: Get all discussions
 *     description: Retrieves discussions with optional filtering
 *     tags: [Discussions]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         description: Number of items per page
 *       - in: query
 *         name: problemId
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Filter by problem ID
 *       - in: query
 *         name: parentId
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Filter by parent discussion ID (for replies)
 *     responses:
 *       200:
 *         description: Discussions retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaginatedResponse'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiError'
 */
discussionRouter.get("/", getDiscussions);

/**
 * @swagger
 * /api/discussion/{discussionId}:
 *   get:
 *     summary: Get discussion details
 *     description: Retrieves detailed information about a specific discussion
 *     tags: [Discussions]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: discussionId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Discussion ID
 *     responses:
 *       200:
 *         description: Discussion details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       allOf:
 *                         - $ref: '#/components/schemas/Discussion'
 *                         - type: object
 *                           properties:
 *                             user:
 *                               type: object
 *                               properties:
 *                                 id:
 *                                   type: string
 *                                   format: uuid
 *                                 name:
 *                                   type: string
 *                                 username:
 *                                   type: string
 *                                 avatar:
 *                                   type: string
 *                             problem:
 *                               type: object
 *                               properties:
 *                                 id:
 *                                   type: string
 *                                   format: uuid
 *                                 title:
 *                                   type: string
 *                                 slug:
 *                                   type: string
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiError'
 *       404:
 *         description: Discussion not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiError'
 */
discussionRouter.get("/:discussionId", getDiscussionById);

/**
 * @swagger
 * /api/discussion/{discussionId}/replies:
 *   get:
 *     summary: Get discussion replies
 *     description: Retrieves all replies for a specific discussion
 *     tags: [Discussions]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: discussionId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Discussion ID
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: Replies retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: array
 *                       items:
 *                         allOf:
 *                           - $ref: '#/components/schemas/Discussion'
 *                           - type: object
 *                             properties:
 *                               user:
 *                                 type: object
 *                                 properties:
 *                                   id:
 *                                     type: string
 *                                     format: uuid
 *                                   name:
 *                                     type: string
 *                                   username:
 *                                     type: string
 *                                   avatar:
 *                                     type: string
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiError'
 *       404:
 *         description: Discussion not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiError'
 */
discussionRouter.get("/:discussionId/replies", getDiscussionReplies);

/**
 * @swagger
 * /api/discussion/{discussionId}:
 *   put:
 *     summary: Update discussion
 *     description: Updates a discussion (only by the author)
 *     tags: [Discussions]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: discussionId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Discussion ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *             properties:
 *               content:
 *                 type: string
 *                 description: Updated discussion content
 *     responses:
 *       200:
 *         description: Discussion updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/Discussion'
 *       400:
 *         description: Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiError'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiError'
 *       403:
 *         description: Forbidden (not the author)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiError'
 *       404:
 *         description: Discussion not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiError'
 */
discussionRouter.put("/:discussionId", updateDiscussion);

/**
 * @swagger
 * /api/discussion/{discussionId}:
 *   delete:
 *     summary: Delete discussion
 *     description: Deletes a discussion (only by the author)
 *     tags: [Discussions]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: discussionId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Discussion ID
 *     responses:
 *       200:
 *         description: Discussion deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiError'
 *       403:
 *         description: Forbidden (not the author)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiError'
 *       404:
 *         description: Discussion not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiError'
 */
discussionRouter.delete("/:discussionId", deleteDiscussion);

export { discussionRouter };

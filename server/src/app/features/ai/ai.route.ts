import { Router } from "express";
import { isAuthenticated } from "../../middlewares/auth.middleware";
import {
  chatWithAiAssistant,
  getChatsWithAiByParamsAssistant,
} from "./ai.controller";

const router = Router();

router.use(isAuthenticated);

/**
 * @swagger
 * /api/ai/chat:
 *   post:
 *     summary: Chat with AI assistant
 *     description: Sends a message to the AI assistant for coding help
 *     tags: [AI Assistant]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - message
 *               - problemId
 *             properties:
 *               message:
 *                 type: string
 *                 description: User's message to AI
 *               problemId:
 *                 type: string
 *                 format: uuid
 *                 description: Problem ID for context
 *     responses:
 *       200:
 *         description: AI response received successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: object
 *                       properties:
 *                         response:
 *                           type: string
 *                           description: AI's response
 *                         chatHistoryId:
 *                           type: string
 *                           format: uuid
 *                           description: Chat history ID
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
 *       404:
 *         description: Problem not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiError'
 *       500:
 *         description: AI service error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiError'
 */
router.post("/chat", chatWithAiAssistant);

/**
 * @swagger
 * /api/ai/chat/{problemId}:
 *   get:
 *     summary: Get AI chat history
 *     description: Retrieves chat history with AI for a specific problem
 *     tags: [AI Assistant]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: problemId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Problem ID
 *     responses:
 *       200:
 *         description: Chat history retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: object
 *                       properties:
 *                         chatHistory:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: string
 *                               format: uuid
 *                             userId:
 *                               type: string
 *                               format: uuid
 *                             problemId:
 *                               type: string
 *                               format: uuid
 *                             createdAt:
 *                               type: string
 *                               format: date-time
 *                             updatedAt:
 *                               type: string
 *                               format: date-time
 *                         messages:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               id:
 *                                 type: string
 *                                 format: uuid
 *                               message:
 *                                 type: string
 *                               response:
 *                                 type: string
 *                               responseStatus:
 *                                 type: string
 *                                 enum: [SUCCESS, FAILURE, PARTIAL_SUCCESS]
 *                               createdAt:
 *                                 type: string
 *                                 format: date-time
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiError'
 *       404:
 *         description: Chat history not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiError'
 */
router.get("/chat/:problemId", getChatsWithAiByParamsAssistant);

export { router as aiRouter };

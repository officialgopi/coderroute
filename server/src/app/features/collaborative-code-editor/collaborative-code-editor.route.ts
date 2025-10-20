import { Router } from "express";
import { isAuthenticated } from "../../middlewares/auth.middleware";
import { createSessionForUserUsingLiveblocks } from "./collaborative-code-editor.controller";

const liveblocksRoutes = Router();

/**
 * @swagger
 * /api/liveblocks/create-session:
 *   post:
 *     summary: Create collaborative coding session
 *     description: Creates a new collaborative coding session using Liveblocks
 *     tags: [Collaborative Coding]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Session created successfully
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
 *                         token:
 *                           type: string
 *                           description: Liveblocks session token
 *                         roomId:
 *                           type: string
 *                           description: Room ID for the session
 *                         userId:
 *                           type: string
 *                           format: uuid
 *                           description: User ID
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiError'
 *       500:
 *         description: Session creation failed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiError'
 */
liveblocksRoutes.post(
  "/create-session",
  isAuthenticated,
  createSessionForUserUsingLiveblocks
);

export { liveblocksRoutes };

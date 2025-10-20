import { Router } from "express";
import {
  getAllSubmissions,
  getSubmissionByProblemId,
  getSubmissionsCountByProblemId,
} from "./submission.controller";
import { isAuthenticated } from "../../middlewares/auth.middleware";

const submissionRouter = Router();

/**
 * @swagger
 * /api/submission/get-all-submissions:
 *   get:
 *     summary: Get all submissions
 *     description: Retrieves all submissions by the current user with pagination
 *     tags: [Submissions]
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
 *         name: status
 *         schema:
 *           type: string
 *         description: Filter by submission status
 *       - in: query
 *         name: language
 *         schema:
 *           type: string
 *           enum: [PYTHON, JAVASCRIPT]
 *         description: Filter by programming language
 *     responses:
 *       200:
 *         description: Submissions retrieved successfully
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
submissionRouter.get(
  "/get-all-submissions",
  isAuthenticated,
  getAllSubmissions
);

/**
 * @swagger
 * /api/submission/get-submissions/{problemId}:
 *   get:
 *     summary: Get submissions for a problem
 *     description: Retrieves all submissions for a specific problem by the current user
 *     tags: [Submissions]
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
 *         description: Submissions retrieved successfully
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
 *                         $ref: '#/components/schemas/Submission'
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
 */
submissionRouter.get(
  "/get-submissions/:problemId",
  isAuthenticated,
  getSubmissionByProblemId
);

/**
 * @swagger
 * /api/submission/get-submissions-count/{problemId}:
 *   get:
 *     summary: Get submission count for a problem
 *     description: Retrieves submission statistics for a specific problem
 *     tags: [Submissions]
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
 *         description: Submission count retrieved successfully
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
 *                         totalSubmissions:
 *                           type: integer
 *                           description: Total number of submissions
 *                         acceptedSubmissions:
 *                           type: integer
 *                           description: Number of accepted submissions
 *                         wrongAnswerSubmissions:
 *                           type: integer
 *                           description: Number of wrong answer submissions
 *                         timeLimitExceededSubmissions:
 *                           type: integer
 *                           description: Number of time limit exceeded submissions
 *                         runtimeErrorSubmissions:
 *                           type: integer
 *                           description: Number of runtime error submissions
 *                         compilationErrorSubmissions:
 *                           type: integer
 *                           description: Number of compilation error submissions
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
 */
submissionRouter.get(
  "/get-submissions-count/:problemId",
  isAuthenticated,
  getSubmissionsCountByProblemId
);

export { submissionRouter };

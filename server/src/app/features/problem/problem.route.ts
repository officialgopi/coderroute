import { Router } from "express";
import { checkAdmin, isAuthenticated } from "../../middlewares/auth.middleware";
import {
  addTestcaseToProblemById,
  createProblem,
  deleteProblem,
  deleteTestcaseFromProblemById,
  getProblemBySlug,
  getProblems,
  getSolvedProblems,
  updateProblemMetadata,
} from "./problem.controller";

const router = Router();

router.use(isAuthenticated);

/**
 * @swagger
 * /api/problem/:
 *   post:
 *     summary: Create a new problem
 *     description: Creates a new coding problem (Admin only)
 *     tags: [Problems]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - difficulty
 *             properties:
 *               title:
 *                 type: string
 *                 description: Problem title
 *               description:
 *                 type: string
 *                 description: Problem description
 *               difficulty:
 *                 type: string
 *                 enum: [EASY, MEDIUM, HARD]
 *                 description: Problem difficulty
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Problem tags
 *               constraints:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Problem constraints
 *               hints:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Problem hints
 *               editorial:
 *                 type: string
 *                 description: Problem editorial
 *     responses:
 *       201:
 *         description: Problem created successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/Problem'
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
 *         description: Forbidden (Admin only)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiError'
 */
router.post("/", checkAdmin, createProblem);

/**
 * @swagger
 * /api/problem/:
 *   get:
 *     summary: Get all problems
 *     description: Retrieves a paginated list of problems with optional filtering
 *     tags: [Problems]
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
 *         name: difficulty
 *         schema:
 *           type: string
 *           enum: [EASY, MEDIUM, HARD]
 *         description: Filter by difficulty
 *       - in: query
 *         name: tags
 *         schema:
 *           type: string
 *         description: Comma-separated tags to filter by
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search term for title or description
 *     responses:
 *       200:
 *         description: Problems retrieved successfully
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
router.get("/", getProblems);

/**
 * @swagger
 * /api/problem/get-problem/{slug}:
 *   get:
 *     summary: Get problem by slug
 *     description: Retrieves detailed information about a specific problem
 *     tags: [Problems]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *         description: Problem slug
 *     responses:
 *       200:
 *         description: Problem details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       allOf:
 *                         - $ref: '#/components/schemas/Problem'
 *                         - type: object
 *                           properties:
 *                             testcases:
 *                               type: array
 *                               items:
 *                                 $ref: '#/components/schemas/TestCase'
 *                             problemDetails:
 *                               type: array
 *                               items:
 *                                 type: object
 *                                 properties:
 *                                   language:
 *                                     type: string
 *                                     enum: [PYTHON, JAVASCRIPT]
 *                                   codeSnippet:
 *                                     type: string
 *                                   backgroundCode:
 *                                     type: string
 *                                   referenceSolution:
 *                                     type: string
 *                                   whereToWriteCode:
 *                                     type: string
 *       404:
 *         description: Problem not found
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
router.get("/get-problem/:slug", getProblemBySlug);

/**
 * @swagger
 * /api/problem/get-solved-problems:
 *   get:
 *     summary: Get solved problems
 *     description: Retrieves problems solved by the current user
 *     tags: [Problems]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Solved problems retrieved successfully
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
 *                         $ref: '#/components/schemas/Problem'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiError'
 */
router.get("/get-solved-problems", getSolvedProblems);

/**
 * @swagger
 * /api/problem/{problemId}:
 *   delete:
 *     summary: Delete problem
 *     description: Deletes a problem (Admin only)
 *     tags: [Problems]
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
 *         description: Problem deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       404:
 *         description: Problem not found
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
 *         description: Forbidden (Admin only)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiError'
 */
router.delete("/:problemId", checkAdmin, deleteProblem);

/**
 * @swagger
 * /api/problem/{problemId}/metadata:
 *   put:
 *     summary: Update problem metadata
 *     description: Updates problem metadata (Admin only)
 *     tags: [Problems]
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Problem title
 *               description:
 *                 type: string
 *                 description: Problem description
 *               difficulty:
 *                 type: string
 *                 enum: [EASY, MEDIUM, HARD]
 *                 description: Problem difficulty
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Problem tags
 *               constraints:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Problem constraints
 *               hints:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Problem hints
 *               editorial:
 *                 type: string
 *                 description: Problem editorial
 *     responses:
 *       200:
 *         description: Problem updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/Problem'
 *       404:
 *         description: Problem not found
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
 *         description: Forbidden (Admin only)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiError'
 */
router.put("/:problemId/metadata", checkAdmin, updateProblemMetadata);

/**
 * @swagger
 * /api/problem/{problemId}/testcase:
 *   post:
 *     summary: Add test case to problem
 *     description: Adds a new test case to a problem (Admin only)
 *     tags: [Problems]
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - input
 *               - output
 *             properties:
 *               input:
 *                 type: string
 *                 description: Test input
 *               output:
 *                 type: string
 *                 description: Expected output
 *               explanation:
 *                 type: string
 *                 description: Test case explanation
 *     responses:
 *       201:
 *         description: Test case added successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/TestCase'
 *       404:
 *         description: Problem not found
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
 *         description: Forbidden (Admin only)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiError'
 */
router.post("/:problemId/testcase", checkAdmin, addTestcaseToProblemById);

/**
 * @swagger
 * /api/problem/{problemId}/testcase:
 *   delete:
 *     summary: Delete test case from problem
 *     description: Deletes a test case from a problem (Admin only)
 *     tags: [Problems]
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
 *         name: testCaseId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Test case ID
 *     responses:
 *       200:
 *         description: Test case deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       404:
 *         description: Test case not found
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
 *         description: Forbidden (Admin only)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiError'
 */
router.post("/:problemId/testcase", checkAdmin, deleteTestcaseFromProblemById);

export { router as problemRouter };

import { Router } from "express";
import { codeRunExecute, codeSubmitExecute } from "./code-execution.controller";

const router = Router();

/**
 * @swagger
 * /api/code-execution/{problemId}/run:
 *   post:
 *     summary: Execute code (run only)
 *     description: Executes code against test cases without submitting for evaluation
 *     tags: [Code Execution]
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
 *               - sourceCode
 *               - language
 *             properties:
 *               sourceCode:
 *                 type: string
 *                 description: Source code to execute
 *               language:
 *                 type: string
 *                 enum: [PYTHON, JAVASCRIPT]
 *                 description: Programming language
 *               stdin:
 *                 type: string
 *                 description: Standard input (optional)
 *     responses:
 *       200:
 *         description: Code executed successfully
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
 *                         stdout:
 *                           type: string
 *                           description: Standard output
 *                         stderr:
 *                           type: string
 *                           description: Standard error
 *                         compileOutput:
 *                           type: string
 *                           description: Compilation output
 *                         status:
 *                           type: string
 *                           description: Execution status
 *                         memory:
 *                           type: string
 *                           description: Memory usage
 *                         time:
 *                           type: string
 *                           description: Execution time
 *       400:
 *         description: Invalid input data
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
 *         description: Code execution failed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiError'
 */
router.post("/:problemId/run", codeRunExecute);

/**
 * @swagger
 * /api/code-execution/{problemId}/submit:
 *   post:
 *     summary: Submit code for evaluation
 *     description: Submits code for evaluation against all test cases
 *     tags: [Code Execution]
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
 *               - sourceCode
 *               - language
 *             properties:
 *               sourceCode:
 *                 type: string
 *                 description: Source code to submit
 *               language:
 *                 type: string
 *                 enum: [PYTHON, JAVASCRIPT]
 *                 description: Programming language
 *     responses:
 *       200:
 *         description: Code submitted successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       allOf:
 *                         - $ref: '#/components/schemas/Submission'
 *                         - type: object
 *                           properties:
 *                             testCasesResults:
 *                               type: array
 *                               items:
 *                                 type: object
 *                                 properties:
 *                                   testCaseId:
 *                                     type: integer
 *                                   passed:
 *                                     type: boolean
 *                                   stdout:
 *                                     type: string
 *                                   expected:
 *                                     type: string
 *                                   stderr:
 *                                     type: string
 *                                   status:
 *                                     type: string
 *                                   memory:
 *                                     type: string
 *                                   time:
 *                                     type: string
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
 *         description: Code execution failed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiError'
 */
router.post("/:problemId/submit", codeSubmitExecute);

export { router as codeExecutionRouter };

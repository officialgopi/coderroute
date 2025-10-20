import { Router } from "express";
import {
  addProblemToSheet,
  copySheet,
  createSheet,
  deleteProblemFromSheet,
  deleteSheet,
  getSheetById,
  getSheets,
  updateSheet,
} from "./sheet.controller";
import { isAuthenticated } from "../../middlewares/auth.middleware";

const sheetRouter = Router();

sheetRouter.use(isAuthenticated);

/**
 * @swagger
 * /api/sheet/:
 *   post:
 *     summary: Create a new problem sheet
 *     description: Creates a new problem sheet for organizing problems
 *     tags: [Problem Sheets]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 description: Sheet name
 *               description:
 *                 type: string
 *                 description: Sheet description
 *               isPublic:
 *                 type: boolean
 *                 default: false
 *                 description: Whether the sheet is public
 *     responses:
 *       201:
 *         description: Sheet created successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/Sheet'
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
sheetRouter.post("/", createSheet);

/**
 * @swagger
 * /api/sheet/copy:
 *   post:
 *     summary: Copy an existing sheet
 *     description: Creates a copy of an existing sheet
 *     tags: [Problem Sheets]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - sheetId
 *               - name
 *             properties:
 *               sheetId:
 *                 type: string
 *                 format: uuid
 *                 description: ID of the sheet to copy
 *               name:
 *                 type: string
 *                 description: Name for the copied sheet
 *               description:
 *                 type: string
 *                 description: Description for the copied sheet
 *     responses:
 *       201:
 *         description: Sheet copied successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/Sheet'
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
 *         description: Sheet not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiError'
 */
sheetRouter.post("/copy", copySheet);

/**
 * @swagger
 * /api/sheet/{sheetId}:
 *   put:
 *     summary: Update sheet
 *     description: Updates an existing sheet
 *     tags: [Problem Sheets]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: sheetId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Sheet ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Sheet name
 *               description:
 *                 type: string
 *                 description: Sheet description
 *               isPublic:
 *                 type: boolean
 *                 description: Whether the sheet is public
 *     responses:
 *       200:
 *         description: Sheet updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/Sheet'
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
 *         description: Sheet not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiError'
 */
sheetRouter.put("/:sheetId", updateSheet);

/**
 * @swagger
 * /api/sheet/{sheetId}/add-problem:
 *   post:
 *     summary: Add problem to sheet
 *     description: Adds a problem to an existing sheet
 *     tags: [Problem Sheets]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: sheetId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Sheet ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - problemId
 *             properties:
 *               problemId:
 *                 type: string
 *                 format: uuid
 *                 description: Problem ID to add
 *     responses:
 *       200:
 *         description: Problem added to sheet successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
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
 *         description: Sheet or problem not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiError'
 */
sheetRouter.post("/:sheetId/add-problem", addProblemToSheet);

/**
 * @swagger
 * /api/sheet/{sheetId}:
 *   delete:
 *     summary: Delete sheet
 *     description: Deletes a sheet
 *     tags: [Problem Sheets]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: sheetId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Sheet ID
 *     responses:
 *       200:
 *         description: Sheet deleted successfully
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
 *       404:
 *         description: Sheet not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiError'
 */
sheetRouter.delete("/:sheetId", deleteSheet);

/**
 * @swagger
 * /api/sheet/{sheetId}/delete-problem:
 *   delete:
 *     summary: Remove problem from sheet
 *     description: Removes a problem from a sheet
 *     tags: [Problem Sheets]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: sheetId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Sheet ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - problemId
 *             properties:
 *               problemId:
 *                 type: string
 *                 format: uuid
 *                 description: Problem ID to remove
 *     responses:
 *       200:
 *         description: Problem removed from sheet successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
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
 *         description: Sheet or problem not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiError'
 */
sheetRouter.delete("/:sheetId/delete-problem", deleteProblemFromSheet);

/**
 * @swagger
 * /api/sheet/:
 *   get:
 *     summary: Get all sheets
 *     description: Retrieves all sheets for the current user
 *     tags: [Problem Sheets]
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
 *         name: isPublic
 *         schema:
 *           type: boolean
 *         description: Filter by public/private sheets
 *     responses:
 *       200:
 *         description: Sheets retrieved successfully
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
sheetRouter.get("/", getSheets);

/**
 * @swagger
 * /api/sheet/{sheetId}:
 *   get:
 *     summary: Get sheet details
 *     description: Retrieves detailed information about a specific sheet including problems
 *     tags: [Problem Sheets]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: sheetId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Sheet ID
 *     responses:
 *       200:
 *         description: Sheet details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       allOf:
 *                         - $ref: '#/components/schemas/Sheet'
 *                         - type: object
 *                           properties:
 *                             problems:
 *                               type: array
 *                               items:
 *                                 $ref: '#/components/schemas/Problem'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiError'
 *       404:
 *         description: Sheet not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiError'
 */
sheetRouter.get("/:sheetId", getSheetById);

export { sheetRouter };

import { Router } from "express";
import passport from "passport";
import { env } from "../../../env";
import {
  getProfile,
  logout,
  oauthLogin,
  refreshAccessToken,
} from "./auth.controller";
import { isAuthenticated } from "../../middlewares/auth.middleware";

const router = Router();

/**
 * @swagger
 * /api/auth/google:
 *   get:
 *     summary: Initiate Google OAuth login
 *     description: Redirects user to Google OAuth consent screen
 *     tags: [Authentication]
 *     responses:
 *       302:
 *         description: Redirect to Google OAuth
 */
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
  })
);

/**
 * @swagger
 * /api/auth/google/callback:
 *   get:
 *     summary: Google OAuth callback
 *     description: Handles Google OAuth callback and creates user session
 *     tags: [Authentication]
 *     responses:
 *       302:
 *         description: Redirect to client with authentication cookies
 *       401:
 *         description: Authentication failed
 */
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${env.CLIENT_URL}/login`,
    session: false,
  }),
  oauthLogin
);

/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     summary: Get current user profile
 *     description: Returns the profile information of the authenticated user
 *     tags: [Authentication]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiError'
 */
router.get("/me", isAuthenticated, getProfile);

/**
 * @swagger
 * /api/auth/logout:
 *   delete:
 *     summary: Logout user
 *     description: Logs out the current user and clears session cookies
 *     tags: [Authentication]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: User logged out successfully
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
 */
router.delete("/logout", isAuthenticated, logout);

/**
 * @swagger
 * /api/auth/:
 *   put:
 *     summary: Refresh access token
 *     description: Refreshes the access token using refresh token
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refreshToken
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 description: Refresh token
 *     responses:
 *       200:
 *         description: Token refreshed successfully
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
 *                         accessToken:
 *                           type: string
 *                           description: New access token
 *       401:
 *         description: Invalid refresh token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiError'
 */
router.put("/", refreshAccessToken);

export { router as authRouter };

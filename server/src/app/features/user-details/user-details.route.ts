import { Router } from "express";

import { isAuthenticated } from "../../middlewares/auth.middleware";

import {
  getProfile,
  updateProfile,
  updateAvatar,
  getMetrics,
  getSolvedProblems,
  getUserSubmissions,
  getActivityHeatmap,
  getPublicProfile,
} from "./user-details.controller";

const router = Router();

/* -------------------------------------------------------------------------- */
/*                              AUTHENTICATED                                 */
/* -------------------------------------------------------------------------- */

router.use(isAuthenticated);

/* -------------------------------------------------------------------------- */
/*                                  PROFILE                                   */
/* -------------------------------------------------------------------------- */

/**
 * GET /api/user/profile
 * Get logged in user's profile
 */
router.get("/profile", getProfile);

/**
 * PATCH /api/user/profile
 * Update profile information
 */
router.patch("/profile", updateProfile);

/**
 * PATCH /api/user/profile/avatar
 * Update avatar
 */
router.patch("/profile/avatar", updateAvatar);

/* -------------------------------------------------------------------------- */
/*                                  METRICS                                   */
/* -------------------------------------------------------------------------- */

/**
 * GET /api/user/metrics
 */
router.get("/metrics", getMetrics);

/* -------------------------------------------------------------------------- */
/*                             SOLVED PROBLEMS                                */
/* -------------------------------------------------------------------------- */

/**
 * GET /api/user/solved-problems
 */
router.get("/solved-problems", getSolvedProblems);

/* -------------------------------------------------------------------------- */
/*                               SUBMISSIONS                                  */
/* -------------------------------------------------------------------------- */

/**
 * GET /api/user/submissions
 *
 * Query Params:
 * page
 * limit
 * status
 * language
 */
router.get("/submissions", getUserSubmissions);

/* -------------------------------------------------------------------------- */
/*                                ACTIVITY                                    */
/* -------------------------------------------------------------------------- */

/**
 * GET /api/user/activity
 */
router.get("/activity", getActivityHeatmap);

/* -------------------------------------------------------------------------- */
/*                               PUBLIC PROFILE                               */
/* -------------------------------------------------------------------------- */

/**
 * GET /api/user/:username
 *
 * Public profile route
 */
router.get("/:username", getPublicProfile);

export { router as userDetailsRouter };

import { ApiError, ApiResponse, AsyncHandler } from "../../utils";

import * as UserService from "./user.service";

import {
  updateProfileBodySchema,
  updateAvatarBodySchema,
  getUserSubmissionsQuerySchema,
  getPublicProfileParamsSchema,
} from "./user.schema";

/* -------------------------------------------------------------------------- */
/*                                  PROFILE                                   */
/* -------------------------------------------------------------------------- */

export const getProfile = AsyncHandler(async (req, res) => {
  const profile = await UserService.getProfile(req.user.id);

  return new ApiResponse(
    200,
    {
      profile,
    },
    "Profile fetched successfully",
  ).send(res);
});

export const updateProfile = AsyncHandler(async (req, res) => {
  const validation = updateProfileBodySchema.safeParse(req.body);

  if (!validation.success) {
    throw new ApiError(400, validation.error.message);
  }

  const profile = await UserService.updateProfile(req.user.id, validation.data);

  return new ApiResponse(
    200,
    {
      profile,
    },
    "Profile updated successfully",
  ).send(res);
});

export const updateAvatar = AsyncHandler(async (req, res) => {
  const validation = updateAvatarBodySchema.safeParse(req.body);

  if (!validation.success) {
    throw new ApiError(400, validation.error.message);
  }

  const profile = await UserService.updateAvatar(
    req.user.id,
    validation.data.avatarUrl,
  );

  return new ApiResponse(
    200,
    {
      profile,
    },
    "Avatar updated successfully",
  ).send(res);
});

/* -------------------------------------------------------------------------- */
/*                                  METRICS                                   */
/* -------------------------------------------------------------------------- */

export const getMetrics = AsyncHandler(async (req, res) => {
  const metrics = await UserService.getMetrics(req.user.id);

  return new ApiResponse(
    200,
    {
      metrics,
    },
    "Metrics fetched successfully",
  ).send(res);
});

/* -------------------------------------------------------------------------- */
/*                             SOLVED PROBLEMS                                */
/* -------------------------------------------------------------------------- */

export const getSolvedProblems = AsyncHandler(async (req, res) => {
  const solvedProblems = await UserService.getSolvedProblems(req.user.id);

  return new ApiResponse(
    200,
    {
      solvedProblems,
    },
    "Solved problems fetched successfully",
  ).send(res);
});

/* -------------------------------------------------------------------------- */
/*                               SUBMISSIONS                                  */
/* -------------------------------------------------------------------------- */

export const getUserSubmissions = AsyncHandler(async (req, res) => {
  const validation = getUserSubmissionsQuerySchema.safeParse(req.query);

  if (!validation.success) {
    throw new ApiError(400, validation.error.message);
  }

  const submissions = await UserService.getUserSubmissions(
    req.user.id,
    validation.data,
  );

  return new ApiResponse(
    200,
    {
      submissions,
    },
    "Submissions fetched successfully",
  ).send(res);
});

/* -------------------------------------------------------------------------- */
/*                                 ACTIVITY                                   */
/* -------------------------------------------------------------------------- */

export const getActivityHeatmap = AsyncHandler(async (req, res) => {
  const activity = await UserService.getActivityHeatmap(req.user.id);

  return new ApiResponse(
    200,
    {
      activity,
    },
    "Activity fetched successfully",
  ).send(res);
});

/* -------------------------------------------------------------------------- */
/*                              PUBLIC PROFILE                                */
/* -------------------------------------------------------------------------- */

export const getPublicProfile = AsyncHandler(async (req, res) => {
  const validation = getPublicProfileParamsSchema.safeParse(req.params);

  if (!validation.success) {
    throw new ApiError(400, validation.error.message);
  }

  const profile = await UserService.getPublicProfile(validation.data.username);

  return new ApiResponse(
    200,
    {
      profile,
    },
    "Profile fetched successfully",
  ).send(res);
});

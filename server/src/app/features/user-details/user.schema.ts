import z from "zod";

/* -------------------------------------------------------------------------- */
/*                                  PROFILE                                   */
/* -------------------------------------------------------------------------- */

const updateProfileBodySchema = z.object({
  name: z.string().min(1).max(100).optional(),

  bio: z.string().max(500).optional(),
});

const updateAvatarBodySchema = z.object({
  avatarUrl: z.string().url(),
});

/* -------------------------------------------------------------------------- */
/*                               SUBMISSIONS                                  */
/* -------------------------------------------------------------------------- */

const getUserSubmissionsQuerySchema = z.object({
  page: z.coerce.number().min(1).default(1),

  limit: z.coerce.number().min(1).max(100).default(10),

  status: z.string().optional(),

  language: z.string().optional(),

  problemId: z.string().optional(),

  sortBy: z
    .enum(["CREATED_AT", "STATUS", "LANGUAGE"])
    .default("CREATED_AT")
    .optional(),

  sortOrder: z.enum(["asc", "desc"]).default("desc").optional(),
});

/* -------------------------------------------------------------------------- */
/*                              PUBLIC PROFILE                                */
/* -------------------------------------------------------------------------- */

const getPublicProfileParamsSchema = z.object({
  username: z.string().min(1),
});

/* -------------------------------------------------------------------------- */
/*                                  EXPORTS                                   */
/* -------------------------------------------------------------------------- */

export {
  updateProfileBodySchema,
  updateAvatarBodySchema,
  getUserSubmissionsQuerySchema,
  getPublicProfileParamsSchema,
};

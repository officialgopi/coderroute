import { User } from "@prisma/client";
import { db } from "../../../db";
import { env } from "../../../env";
import { ApiError, ApiResponse, AsyncHandler } from "../../utils";
import { CORS_OPTIONS } from "./auth.constant";
import { generateJWT, sanitizeUser } from "./auth.service";

const oauthLogin = AsyncHandler(async (req, res) => {
  if (!req.user) {
    return res.redirect(env.CLIENT_URL);
  }

  const intermediateData = req.user as {
    name: string;
    email: string;
    avatar?: string;
    username: string;
  };

  let user = await db.user.findUnique({
    where: {
      email: intermediateData.email,
    },
  });

  if (!user) {
    user = await db.user.create({
      data: {
        email: intermediateData.email,
        name: intermediateData.name,
        username:
          intermediateData.username ??
          intermediateData.email.split("@")[0] +
            Math.floor(Math.random() * 10000),
        avatar: intermediateData.avatar,
        isEmailVerified: true,
        authProvider: "GOOGLE",
      },
    });
  }

  const accessToken = generateJWT(user.id, env.JWT_SECRET, env.JWT_EXPIRES_IN);
  const refreshToken = generateJWT(
    user.id,
    env.JWT_REFRESH_SECRET,
    env.JWT_REFRESH_EXPIRES_IN
  );

  await db.session.create({
    data: {
      userId: user.id,
      token: refreshToken,
      sessionExpiry: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    },
  });

  res.cookie("access-token", accessToken, CORS_OPTIONS);
  res.cookie("refresh-token", refreshToken, CORS_OPTIONS);

  return res.redirect(env.CLIENT_URL);
});

const getProfile = AsyncHandler(async (req, res) => {
  if (!req.user) {
    throw new ApiError(401, "Unauthorized");
  }

  const user = await db.user.findUnique({
    where: {
      id: req.user.id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      username: true,
      avatar: true,
      isEmailVerified: true,
      role: true,
      authProvider: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  new ApiResponse(
    200,
    {
      user: sanitizeUser(user as User),
    },
    "User fetched successfully"
  ).send(res);
});

export { oauthLogin, getProfile };

import { db } from "../../db";
import { env } from "../../env";
import { sanitizeUser } from "../features/auth/auth.service";
import { ApiError, AsyncHandler } from "../utils";
import jwt from "jsonwebtoken";

const isAuthenticated = AsyncHandler(async (req, res, next) => {
  const accessToken = req.cookies["access-token"];

  if (!accessToken) {
    throw new ApiError(401, "Unauthorized");
  }

  const decoded = jwt.verify(accessToken, env.JWT_SECRET) as {
    userId: string;
  } & jwt.JwtPayload;

  if (!decoded.userId) {
    throw new ApiError(401, "Unauthorized");
  }

  if (!decoded.exp || decoded.exp * 1000 < Date.now()) {
    throw new ApiError(401, "Token expired");
  }

  const user = await db.user.findUnique({
    where: {
      id: decoded.userId,
    },
  });

  if (!user) {
    throw new ApiError(401, "Unauthorized");
  }

  req.user = sanitizeUser(user) as Express.User;
  next();
});

export { isAuthenticated };

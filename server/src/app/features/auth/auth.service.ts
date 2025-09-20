import { User } from "@prisma/client";
import crypto from "crypto";
import jwt from "jsonwebtoken";

function createVerificationToken() {
  return crypto.randomBytes(32).toString("hex");
}

function hashToken(token: string) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

function generateJWT(userId: string, secret: string, expiresIn: string) {
  return jwt.sign(
    {
      userId,
    },
    secret,
    {
      expiresIn,
    } as jwt.SignOptions
  );
}

function sanitizeUser(user: User) {
  const sanitizedUser = {
    id: user.id,
    email: user.email,
    name: user.name,
    avatar: user.avatar,
    username: user.username,
    isEmailVerified: user.isEmailVerified,
    role: user.role,
    authProvider: user.authProvider,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };

  return sanitizedUser;
}

export { createVerificationToken, hashToken, generateJWT, sanitizeUser };

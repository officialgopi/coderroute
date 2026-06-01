import "dotenv/config";

import { z } from "zod";
import { logger } from "../logger";

function parseEnv(env: NodeJS.ProcessEnv) {
  const envSchema = z.object({
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
    PORT: z.coerce.number().default(3000),
    CLIENT_URL: z.url(),
    CLIENT_URL_LOCAL_1: z.url().optional(),
    CLIENT_URL_LOCAL_2: z.url().optional(),
    CLIENT_URL_LOCAL_3: z.url().optional(),
    DATABASE_URL: z.url(),
    JUDGE0_BASE_URL: z.url(),
    JUDGE0_API_KEY: z.string(),
    GOOGLE_CLIENT_ID: z.string(),
    GOOGLE_CLIENT_SECRET: z.string(),
    GOOGLE_REDIRECT_URI: z.url().optional(),
    GOOGLE_REDIRECT_URI_LOCAL: z.url().optional(),
    JWT_SECRET: z.string(),
    JWT_EXPIRES_IN: z.string(),
    JWT_REFRESH_SECRET: z.string(),
    JWT_REFRESH_EXPIRES_IN: z.string(),
    GEMINI_API_KEY: z.string(),
    LIVEBLOCKS_SECRET_KEY: z.string(),
    GOOGLE_LOGIN_REDIRECT_URL: z.url().optional(),
  });

  const parsed = envSchema.safeParse(env);

  if (!parsed.success || !parsed.data) {
    logger.error(`  ❌ Invalid environment variables`, {
      error: parsed.error.format(),
    });
    throw new Error("Invalid environment variables");
  }

  if (parsed.data.NODE_ENV === "production" && !parsed.data.CLIENT_URL) {
    logger.error(`  ❌ CLIENT_URL is required in production environment`);
    throw new Error("CLIENT_URL is required in production environment");
  }

  parsed.data.CLIENT_URL =
    parsed.data.NODE_ENV === "production"
      ? parsed.data.CLIENT_URL
      : (parsed.data.CLIENT_URL_LOCAL_1 ??
        parsed.data.CLIENT_URL_LOCAL_2 ??
        parsed.data.CLIENT_URL_LOCAL_3 ??
        `http://localhost:5173`);
  if (parsed.data.NODE_ENV !== "production") {
    parsed.data.GOOGLE_REDIRECT_URI =
      parsed.data.GOOGLE_REDIRECT_URI_LOCAL ||
      `http://localhost:${parsed.data.PORT}/api/auth/google/callback`;
  }

  parsed.data.GOOGLE_LOGIN_REDIRECT_URL = `${parsed.data.CLIENT_URL}/problems`;

  return parsed.data;
}

export const env = parseEnv(process.env);

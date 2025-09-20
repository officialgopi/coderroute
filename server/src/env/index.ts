import "dotenv/config";

import { z } from "zod";
import { logger } from "../logger";

function parseEnv(env: NodeJS.ProcessEnv) {
  const envSchema = z.object({
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
    PORT: z.coerce.number().default(3000),
    DATABASE_URL: z.url(),
    JUDGE0_BASE_URL: z.url(),
    JUDGE0_API_KEY: z.string(),
  });

  const parsed = envSchema.safeParse(env);

  if (!parsed.success || !parsed.data) {
    logger.error(`  ❌ Invalid environment variables`, {
      error: parsed.error.format(),
    });
    throw new Error("Invalid environment variables");
  }

  return parsed.data;
}

export const env = parseEnv(process.env);

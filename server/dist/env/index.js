"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
require("dotenv/config");
const zod_1 = require("zod");
const logger_1 = require("../logger");
function parseEnv(env) {
    const envSchema = zod_1.z.object({
        NODE_ENV: zod_1.z
            .enum(["development", "test", "production"])
            .default("development"),
        PORT: zod_1.z.coerce.number().default(3000),
        CLIENT_URL: zod_1.z.url(),
        DATABASE_URL: zod_1.z.url(),
        JUDGE0_BASE_URL: zod_1.z.url(),
        JUDGE0_API_KEY: zod_1.z.string(),
        GOOGLE_CLIENT_ID: zod_1.z.string(),
        GOOGLE_CLIENT_SECRET: zod_1.z.string(),
        GOOGLE_REDIRECT_URI: zod_1.z.string(),
        JWT_SECRET: zod_1.z.string(),
        JWT_EXPIRES_IN: zod_1.z.string(),
        JWT_REFRESH_SECRET: zod_1.z.string(),
        JWT_REFRESH_EXPIRES_IN: zod_1.z.string(),
    });
    const parsed = envSchema.safeParse(env);
    if (!parsed.success || !parsed.data) {
        logger_1.logger.error(`  ❌ Invalid environment variables`, {
            error: parsed.error.format(),
        });
        throw new Error("Invalid environment variables");
    }
    return parsed.data;
}
exports.env = parseEnv(process.env);

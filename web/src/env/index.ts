import z from "zod";

export const envSchema = z.object({
  VITE_API_BASE_URL: z.url().default("http://localhost:3000"),
});

function parseEnv(env: Record<string, string>) {
  const result = envSchema.safeParse(env);
  if (!result.success) {
    throw new Error("Invalid environment variables");
  }
  return result.data;
}

export const env = parseEnv(import.meta.env);

import { PrismaClient } from "@prisma/client";
import { env } from "../env";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

declare global {
  var prisma: PrismaClient | undefined;
}
const pool =
  globalThis.__pgPool ??
  new Pool({
    connectionString: env.DATABASE_URL,
    ssl: true,
  });

if (env.NODE_ENV !== "production") {
  globalThis.__pgPool = pool;
}

const adapter = new PrismaPg(pool);

const prisma =
  globalThis.prisma ??
  new PrismaClient({
    adapter,
  });

if (env.NODE_ENV !== "production") {
  globalThis.prisma = prisma;
}

export { prisma as db };

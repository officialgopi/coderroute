import { PrismaClient } from "@prisma/client";
import { env } from "../../env";

declare global {
  var prisma: PrismaClient | undefined;
}

const prismaClient = globalThis.prisma ?? new PrismaClient();

if (env.NODE_ENV !== "production") globalThis.prisma = prismaClient;

export { prismaClient as db };

import { CorsOptions } from "cors";
import { env } from "../../../env";
import { CookieOptions } from "express";

export const CORS_OPTIONS: CorsOptions = {
  origin: env.CLIENT_URL,
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
};

export const COOKIE_OPTIONS: CookieOptions = {
  // domain: env.CLIENT_URL,
  httpOnly: true,
  secure: env.NODE_ENV === "production",
  sameSite: "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

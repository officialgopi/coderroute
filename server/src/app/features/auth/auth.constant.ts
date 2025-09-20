import { CorsOptions } from "cors";
import { env } from "../../../env";

export const CORS_OPTIONS: CorsOptions = {
  origin: env.CLIENT_URL,
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
};

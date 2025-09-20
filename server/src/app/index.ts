import express from "express";
import { env } from "../env";

const app = express();

app.use(express.json());

import cookieParser from "cookie-parser";
import cors from "cors";

app.use(cookieParser());
app.use(
  cors({
    origin: env.CLIENT_URL,
    credentials: true,
  })
);

import { initPassport } from "./libs/passport.lib";
initPassport();

export { app };

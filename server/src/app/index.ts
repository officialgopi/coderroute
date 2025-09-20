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

//Routes
import { authRouter } from "./features/auth/auth.route";
app.use("/api/auth", authRouter);

//Global Error Handler
import { globalErrorHandler } from "./middlewares/error.middleware";
app.use(globalErrorHandler);

export { app };

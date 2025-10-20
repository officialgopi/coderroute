import express from "express";
import { env } from "../env";

const app = express();

app.use(express.json());

import cookieParser from "cookie-parser";
import cors from "cors";

app.use(cookieParser());
app.use(
  cors({
    origin: env.NODE_ENV === "development" ? "*" : env.CLIENT_URL,
    credentials: true,
  })
);

import { initPassport } from "./libs/passport.lib";
initPassport();

//Routes
import { allRoutes } from "./features";
app.use("/api", allRoutes);

// Swagger Documentation
import { swaggerRouter } from "./libs/swagger.lib";
app.use("/api/api-doc", swaggerRouter);

//Global Error Handler
import { globalErrorHandler } from "./middlewares/error.middleware";
app.use(globalErrorHandler);

export { app };

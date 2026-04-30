import express from "express";
import { env } from "../env";

const app = express();

app.use(express.json());

import cookieParser from "cookie-parser";
import cors from "cors";

app.use(cookieParser());
app.use(
  cors({
    origin: [
      env.CLIENT_URL,
      ...(env.NODE_ENV === "development" && [
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:4173",
      ]),
    ],
    credentials: true,
  }),
);

import { initPassport } from "./libs/passport.lib";
initPassport();

//Routes
import { allRoutes } from "./features";
app.use("/api", allRoutes);

// Health Check Route
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    timestamp: Date.now(),
  });
});

// Swagger Documentation
import { swaggerRouter } from "./libs/swagger.lib";
app.use("/api/api-doc", swaggerRouter);

//Global Error Handler
import { globalErrorHandler } from "./middlewares/error.middleware";
app.use(globalErrorHandler);

export { app };

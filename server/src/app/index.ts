import express from "express";

const app = express();

app.use(express.json());

import cookieParser from "cookie-parser";
import cors from "cors";

app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  })
);

export { app };

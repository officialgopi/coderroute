import { Router } from "express";
import { isAuthenticated } from "../../middlewares/auth.middleware";
import { createSessionForUserUsingLiveblocks } from "./collaborative-code-editor.controller";

const liveblocksRoutes = Router();

liveblocksRoutes.post(
  "/create-session",
  isAuthenticated,
  createSessionForUserUsingLiveblocks
);

export { liveblocksRoutes };

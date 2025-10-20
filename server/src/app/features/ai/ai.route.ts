import { Router } from "express";
import { isAuthenticated } from "../../middlewares/auth.middleware";
import {
  chatWithAiAssistant,
  getChatsWithAiByParamsAssistant,
} from "./ai.controller";

const aiRouter = Router();

aiRouter.use(isAuthenticated);

aiRouter.post("/chat", chatWithAiAssistant);
aiRouter.get("/chat/:problemId", getChatsWithAiByParamsAssistant);

export { aiRouter };

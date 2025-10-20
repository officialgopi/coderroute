import OpenAI from "openai";
import { env } from "../../env";

const gemini = new OpenAI({
  apiKey: env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

const GEMINI_MODELS = {
  GEMINI_PRO_2_5: "gemini-2.5-pro",
  GEMINI_FLASH_2_5: "gemini-2.5-flash",
};

export { gemini, GEMINI_MODELS };

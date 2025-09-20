import { Router } from "express";
import passport from "passport";
import { env } from "../../../env";
import { getProfile, oauthLogin } from "./auth.controller";

const router = Router();

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
  })
);
//GOOGLE LOGIN FALLBACK
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${env.CLIENT_URL}`,
    session: false,
  }),
  oauthLogin
);
router.get("/me", getProfile);

export { router as authRouter };

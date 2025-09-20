import { Router } from "express";
import passport from "passport";
import { env } from "../../../env";
import {
  getProfile,
  logout,
  oauthLogin,
  refreshAccessToken,
} from "./auth.controller";
import { isAuthenticated } from "../../middlewares/auth.middleware";

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
router.get("/me", isAuthenticated, getProfile);
router.delete("/logout", isAuthenticated, logout);
router.put("/", refreshAccessToken);

export { router as authRouter };

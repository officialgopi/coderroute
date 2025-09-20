"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const env_1 = require("../../../env");
const auth_controller_1 = require("./auth.controller");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const router = (0, express_1.Router)();
exports.authRouter = router;
router.get("/google", passport_1.default.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
}));
//GOOGLE LOGIN FALLBACK
router.get("/google/callback", passport_1.default.authenticate("google", {
    failureRedirect: `${env_1.env.CLIENT_URL}`,
    session: false,
}), auth_controller_1.oauthLogin);
router.get("/me", auth_middleware_1.isAuthenticated, auth_controller_1.getProfile);
router.delete("/logout", auth_middleware_1.isAuthenticated, auth_controller_1.logout);
router.put("/", auth_controller_1.refreshAccessToken);

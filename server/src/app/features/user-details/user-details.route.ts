import { Router } from "express";
import { isAuthenticated } from "../../middlewares/auth.middleware";

const userDetailsRouter = Router();

userDetailsRouter.use(isAuthenticated);
userDetailsRouter.get("/");

export { userDetailsRouter };

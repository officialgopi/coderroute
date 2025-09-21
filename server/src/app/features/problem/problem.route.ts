import { Router } from "express";
import { checkAdmin, isAuthenticated } from "../../middlewares/auth.middleware";
import { createProblem } from "./problem.controller";

const router = Router();

router.use(isAuthenticated);

router.post("/", checkAdmin, createProblem);
router.get("/");
router.get("/get-problem/:id");
router.get("/get-solved-problems");
router.put("/:id", checkAdmin);
router.delete("/:id", checkAdmin);

export { router as problemRouter };

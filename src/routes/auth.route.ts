import { Router } from "express";
import * as authController from "../controllers/auth.controller";
import { auth } from "../middlewares/auth";

const router = Router();

router.post("/register", auth, authController.register);

export default router;
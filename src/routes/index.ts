import { Router } from "express";
import authRouter from "./auth.route";
import userRouter from "./user.route";
import predictionRouter from "./prediction.route";
import { auth } from "../middlewares/auth";
import { isRegistered } from "../middlewares/isRegistered";

const router = Router();

router.use("/auth", auth, authRouter);
router.use("/user", auth, isRegistered, userRouter);
router.use("/prediction", auth, isRegistered, predictionRouter);

export default router;

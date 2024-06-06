import { Router } from "express";
import * as predictionController from "../controllers/prediction.controller";

const router = Router();

router.post("/", predictionController.predict);
router.get("/last", predictionController.lastInput)

export default router;
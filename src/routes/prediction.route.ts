import { Router } from "express";
import * as predictionController from "../controllers/prediction.controller";

const router = Router();

router.post("/", predictionController.predict);
router.get("/last", predictionController.lastInput);
router.get("/history", predictionController.getAllHistory);
router.get("/history/:id", predictionController.getHistoryById);

export default router;
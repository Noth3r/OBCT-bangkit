import { Router } from "express";
import * as predictionController from "../controllers/prediction.controller";

const router = Router();

router.post("/", predictionController.predict);

export default router;
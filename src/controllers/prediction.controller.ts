import { Request, Response } from "express";
import {
  getPredictionApi,
  saveInput,
  savePrediction,
} from "../services/prediction.service";

export const predict = async (req: Request, res: Response) => {
  try {
    const { user, body, token } = req;

    const savedInput = await saveInput({ userId: user.id, ...body });

    if (!savedInput) {
      return res.status(400).json({ message: "Failed to save input" });
    }

    const prediction = await getPredictionApi(
      { ...savedInput, ...user },
      token
    );

    await savePrediction({
      userId: user.id,
      inputDataId: savedInput.id,
      ...prediction,
    });

    return res.status(200).json(prediction);
  } catch (error) {
    console.error("Prediction error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

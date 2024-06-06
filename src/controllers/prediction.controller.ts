import { Request, Response } from "express";
import {
    getLatestInput,
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

export const lastInput = async (req: Request, res: Response) => {
    try {
        const { user } = req;
    
        const lastInput = await getLatestInput(user.id);
    
        if (!lastInput) {
        return res.status(404).json({ message: "No input found" });
        }
    
        return res.status(200).json(lastInput);
    } catch (error) {
        console.error("Last input error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
    }
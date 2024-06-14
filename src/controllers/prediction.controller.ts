import { Request, Response } from "express";
import {
  getInputWithPrediction,
  getInputWithPredictionById,
  getLatestInput,
  getPredictionApi,
  saveInput,
  savePrediction,
  saveRecomendation,
} from "../services/prediction.service";
import { reccomendation } from "../utils/prediction";

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

    const data = await savePrediction({
      userId: user.id,
      inputDataId: savedInput.id,
      prediction: prediction.prediction
    });

    if (!data) {
      return res.status(400).json({ message: "Failed to save prediction" });
    }

    const recommendation = reccomendation.find((r) =>
      r.class.includes(prediction.prediction)
    );

    const recRes = await saveRecomendation({
      predictionId: data.id,
      userId: user.id,
      recommendation: recommendation?.recommendation || "",
    });

    const result = {
      ...savedInput,
      Prediction: {
        ...data,
        Recommendation: {
          ...recRes,
        },
      }
    };

    return res.status(200).json(result);
  } catch (error) {
    console.error("Prediction error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllHistory = async (req: Request, res: Response) => {
  try {
    const { user } = req;

    const { skip, take } = req.query;

    const history = await getInputWithPrediction(user.id, 
      skip ? parseInt(skip as string) : undefined,
      take ? parseInt(take as string) : undefined
    );

    if (!history) {
      return res.status(404).json({ message: "No history found" });
    }

    return res.status(200).json(history);
  } catch (error) {
    console.error("All history error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getHistoryById = async (req: Request, res: Response) => {
  try {
    const { user } = req;
    const { id } = req.params;

    const history = await getInputWithPredictionById(id, user.id);

    if (!history) {
      return res.status(404).json({ message: "No history found" });
    }

    return res.status(200).json(history);
  } catch (error) {
    console.error("History by id error:", error);
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
};

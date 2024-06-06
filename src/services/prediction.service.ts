import { Gender, InputData, Prediction, User } from "@prisma/client";
import db from "../utils/db";

export const saveInput = async (inputData: InputData) => {
  return db.inputData.create({
    data: inputData,
  });
};

export const getLatestInput = async (userId: string) => {
  return db.inputData.findFirst({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const savePrediction = async (prediction: Prediction) => {
  return db.prediction.create({
    data: prediction,
  });
};

export const getAllPredictions = async (userId: string) => {
  return db.prediction.findMany({
    where: {
      userId,
    },
  });
};

export const getPrediction = async (id: string) => {
  return db.prediction.findUnique({
    where: {
      inputDataId: id,
    },
  });
};

export const getPredictionApi = async (
  input: InputData & User,
  token: string
) => {
  const res = await fetch("http://localhost:5000/api/predict", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      Gender: convertGenderToInt(input.gender!),
      Age: convertAge(input.dateOfBirth!),
      Height: input.height,
      Weight: input.weight,
      Family_History_With_Overweight: input.family_history_with_overweight,
      "Frequently_Consumed_High-Calorie_Food":
        input.frequently_consumed_high_calorie_food,
      Frequency_of_Consumption_of_Vegetables:
        input.frequency_of_consumption_of_vegetables,
      Number_of_Main_Meals: input.number_of_main_meals,
      Consumption_of_Food_between_Meals:
        input.consumption_of_food_between_meals,
      Smoke: input.smoke,
      Consumption_of_Water_Daily: input.consumption_of_water_daily,
      Monitor_Calorie_Intake: input.monitor_calorie_intake,
      Frequency_of_Physical_Activity: input.frequency_of_physical_activity,
      Time_Using_Electronic_Devices: input.time_using_electronic_devices,
      Consumption_of_Alcohol: input.consumption_of_alcohol,
      Type_of_Transportation_Used: input.type_of_transportation_used,
    }),
  });

  const data = await res.json();
  return data;
};

const convertAge = (dateOfBirth: Date) => {
  const diff = Date.now() - dateOfBirth.getTime();
  const ageDate = new Date(diff);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

const convertGenderToInt = (gender: Gender) => {
  return gender.toLowerCase() == "male" ? 1 : 0;
};

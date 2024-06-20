import { Prisma, User } from "@prisma/client";
import { model, generationConfig, parts } from "../utils/llm";
import {
  convertParameters,
  convertParametersBoolean,
  convertAge,
  convertPrediction,
} from "../utils/prediction";

export const llmRecommendation = async (
  input: Prisma.InputDataUncheckedCreateInput & User,
  prediction: number
) => {
  const data = [
    {
      text: `input: **User:**\n\n* Gender: ${input.gender}\n* Age: ${convertAge(
        input.dateOfBirth!
      )}\n* Height: ${input.height * 100}\n* Weight: ${
        input.weight
      }\n* Family history of overweight: ${convertParametersBoolean(
        input.family_history_with_overweight
      )}\n* Frequently consumes high-calorie food: ${convertParametersBoolean(
        input.frequently_consumed_high_calorie_food
      )}\n* Frequency of vegetable consumption: ${convertParameters(
        input.frequency_of_consumption_of_vegetables,
        7
      )}\n* Number of main meals: ${convertParameters(
        input.number_of_main_meals,
        8
      )}\n* Consumption of food between meals: ${convertParameters(
        input.consumption_of_food_between_meals,
        9
      )}\n* Smokes: ${convertParametersBoolean(
        input.smoke
      )}\n* Daily water consumption: ${convertParameters(
        input.consumption_of_water_daily,
        11
      )}\n* Monitors calorie intake: ${convertParametersBoolean(
        input.monitor_calorie_intake
      )}\n* Frequency of physical activity: ${convertParameters(
        input.frequency_of_physical_activity,
        13
      )}\n* Time using electronic devices: ${convertParameters(
        input.time_using_electronic_devices,
        14
      )}\n* Consumes alcohol: ${convertParameters(
        input.consumption_of_alcohol,
        15
      )}\n* Type of transportation used: ${convertParameters(
        input.type_of_transportation_used,
        16
      )}\n\n**Level:** ${convertPrediction(prediction)}`,
    },
    { text: "output: " },
  ];

  parts.push(...data);

  console.log(parts);

  const result = await model.generateContent({
    contents: [{ role: "user", parts }],
    generationConfig,
  });

  return result.response.text();
};

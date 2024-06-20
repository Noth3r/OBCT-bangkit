import { Gender } from "@prisma/client";

export const convertAge = (dateOfBirth: Date) => {
  const diff = Date.now() - dateOfBirth.getTime();
  const ageDate = new Date(diff);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

export const convertGenderToInt = (gender: Gender) => {
  return gender.toLowerCase() == "male" ? 1 : 0;
};

export const convertPrediction = (prediction: number) => {
  switch (prediction) {
    case 0:
      return "Insufficient Weight";
    case 1:
      return "Normal Weight";
    case 2:
      return "Overweight 1";
    case 3:
      return "Overweight 2";
    case 4:
      return "Obesity Level 1";
    case 5:
      return "Obesity Level 2";
    case 6:
      return "Obesity Level 3";
    default:
      return "Unknown";
  }
};

export const convertParametersBoolean = (input: number) => {
  return input == 1 ? "Yes" : "No";
};

export const convertParameters = (input: number, index: number) => {
  if (index == 7) {
    switch (input) {
      case 1:
        return "Never";
      case 2:
        return "Sometimes";
      case 3:
        return "Always";
      default:
        return "Unknown";
    }
  } else if (index == 8) {
    switch (input) {
      case 1:
        return "1 or 2 meals";
      case 2:
        return "3 meals";
      case 3:
        return "More than 3 meals";
      default:
        return "Unknown";
    }
  } else if (index == 9) {
    switch (input) {
      case 0:
        return "No";
      case 1:
        return "Sometimes";
      case 2:
        return "Frequently";
      case 3:
        return "Always";
      default:
        return "Unknown";
    }
  } else if (index == 11) {
    switch (input) {
      case 1:
        return "Less than 1 liter";
      case 2:
        return "1-2 liters";
      case 3:
        return "More than 2 liters";
      default:
        return "Unknown";
    }
  } else if (index == 13) {
    switch (input) {
      case 0:
        return "No physical activity";
      case 1:
        return "1-2 days a week";
      case 2:
        return "3-4 days a week";
      case 3:
        return "5 or more days a week";
      default:
        return "Unknown";
    }
  } else if (index == 14) {
    switch (input) {
      case 0:
        return "0-2 hours";
      case 1:
        return "3-5 hours";
      case 2:
        return "More than 5 hours";
      default:
        return "Unknown";
    }
  } else if (index == 15) {
    switch (input) {
      case 0:
        return "Never";
      case 1:
        return "Sometimes";
      case 2:
        return "Frequently";
      case 3:
        return "Always";
      default:
        return "Unknown";
    }
  } else if (index == 16) {
    switch (input) {
      case 0:
        return "Bike";
      case 1:
        return "Motorbike";
      case 2:
        return "Walking";
      case 3:
        return "Automobile";
      case 4:
        return "Public Transportation";
      default:
        return "Unknown";
    }
  } else {
    return "Unknown";
  }
};

export const reccomendation = [
  {
    class: [0],
    recommendation:
      "Eating small meals frequently throughout the day can help you gain weight! Try snacking on healthy, high-energy foods like cheese, nuts, milk-based smoothies, and dried fruit. You can also do some light exercise to increase your appetite!",
  },
  {
    class: [1],
    recommendation:
      "You've reached a healthy weight! Keep up healthy eating habits and lifestyle going strong! You're on fire! 🔥",
  },
  {
    class: [2, 3],
    recommendation:
      "Let's trim down those salty, sugary, and fatty snacks! Instead, amp up the fruits and veggies. How about mixing things up with some brisk walking, jogging, swimming, or tennis for around 150 to 300 minutes a week? Let's get moving!",
  },
  {
    class: [4, 5, 6],
    recommendation:
      "Ready to make a healthy change? Let's dive into more plant-based goodness with beans, lentils, and soy! And hey, if you're into fish, aim for it twice a week. Remember, fish packs high-quality protein and tends to be lower in saturated fat and cholesterol compared to red meat. It's all about balance! Don't forget to team up with healthcare pros like dietitians and physicians for top-notch support. Mix it up with aerobic exercises like cycling or brisk walking and strength training to crush those weight loss goals and tone those muscles! Let's rock it! 💪🥦🐟",
  },
];

export const className = [
  {
    class: 0,
    name: "Insufficient Weight",
  },
  {
    class: 1,
    name: "Normal Weight",
  },
  {
    class: 2,
    name: "Overweight 1",
  },
  {
    class: 3,
    name: "Overweight 2",
  },
  {
    class: 4,
    name: "Obesity Level 1",
  },
  {
    class: 5,
    name: "Obesity Level 2",
  },
  {
    class: 6,
    name: "Obesity Level 3",
  },
];

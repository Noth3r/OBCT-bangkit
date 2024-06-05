import { Request, Response } from "express";
import { updateUser } from "../services/user.service";
import { User } from "@prisma/client";

export const register = async (req: Request, res: Response) => {
  try {
    const { user, body } = req;

    console.log(req.user)

    if (user.isRegistered) {
      return res.status(400).json({ message: "User is already registered" });
    }

    const updatedData: Partial<User> = {
      isRegistered: true,
      dateOfBirth: body.dateOfBirth,
    };

    const optionalFields: (keyof User)[] = ["name", "picture"];

    optionalFields.forEach((field) => {
      if (body[field]) {
        updatedData[field] = body[field];
      }
    });

    const newUser = await updateUser(user.id, updatedData);

    return res.status(200).json(newUser);
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
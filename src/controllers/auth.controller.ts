import { Request, Response } from "express";
import {getBearerToken } from "../services/auth.service";
import { updateUser } from "../services/user.service";

export const register = async (req: Request, res: Response) => {
  const token = getBearerToken(req.headers.authorization!);

  if (!token) {
    return res.status(400).json({ message: "Token is required" });
  }

  try {
    if (req.user.isRegistered) {
      return res.status(400).json({ message: "User is already registered" });
    }

    const newUser = await updateUser(req.user.id, { isRegistered: true, dateOfBirth: req.body.dateOfBirth });

    return res.status(200).json(newUser);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

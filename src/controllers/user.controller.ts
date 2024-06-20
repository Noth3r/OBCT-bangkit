import { Request, Response } from "express";

export const getProfile = async (req: Request, res: Response) => {
  // #swagger.tags = ['User']
  try {
    const { user } = req;
    return res.status(200).json(user);
  } catch (error) {
    console.error("Profile error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

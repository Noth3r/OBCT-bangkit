import { Request, Response } from "express";
import { createUser, findUser, getBearerToken, getUser, verifyToken } from "../services/auth.service";

export const login = async (req: Request, res: Response) => {
  const token = getBearerToken(req.headers.authorization!);

  if (!token) {
    return res.status(400).json({ message: "Token is required" });
  }

  try {
    const decodedToken = await verifyToken(token);
    if (!decodedToken) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    
    const user = await getUser(decodedToken.uid);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isFirstTime = user.metadata.creationTime === user.metadata.lastSignInTime;
    const createdUser = isFirstTime ? await createUser(user) : await findUser(user.uid);

    return res.status(200).json(createdUser);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

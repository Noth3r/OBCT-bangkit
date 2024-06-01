import { Request, Response, NextFunction } from "express";
import { getBearerToken, getUser, verifyToken } from "../services/auth.service";
import { createUser, findUser } from "../services/user.service";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    const token = getBearerToken(req.headers.authorization!);

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
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

        if (!createdUser) {
            return res.status(404).json({ message: "User not found" });
        }

        req.user = createdUser;
        next();
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
}
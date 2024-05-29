import { Request, Response, NextFunction } from "express";
import { findUser, getBearerToken, verifyToken } from "../services/auth.service";

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

        const user = await findUser(decodedToken.uid);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
}
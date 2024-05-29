import { Request, Response, NextFunction } from "express";
import { findUser, verifyToken } from "../services/auth.service";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const decodedToken = await verifyToken(token);
        if (!decodedToken) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const _user = await findUser(decodedToken.uid);

        req.body = { ...req.body, _user };
        next();
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
}
import { NextFunction, Request, Response } from "express";

export const isRegistered = async (req: Request, res: Response, next: NextFunction) => {
    const { user } = req;
    if (!user.isRegistered) {
        return res.status(403).json({ message: "User is not registered" });
    }
    next();
};
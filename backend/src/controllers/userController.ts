import {Request, Response, NextFunction} from "express";
import User from "../models/User";


export const getUserProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const user = req.user;

        const userProfile = await User.findOne({username: user.username});
        if (!userProfile) {
            res.status(404).json({message: "User not found"});
            return;
        }

        res.status(200).json({user: userProfile});

    } catch (error) {
        next(error);
    }
}
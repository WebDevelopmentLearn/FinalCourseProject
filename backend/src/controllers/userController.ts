import {Request, Response, NextFunction} from "express";
import User from "../models/User";
import {logDebug} from "../utils/Logger";


export const getUserProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const user = req.user;
        console.log(user);

        const userProfile = await User.findOne(user._id);
        if (!userProfile) {
            res.status(404).json({message: "User not found"});
            return;
        }

        res.status(200).json(userProfile);

        await logDebug(`[getUserProfile] User profile for ${userProfile.username} was sent`);

    } catch (error) {
        next(error);
    }
}
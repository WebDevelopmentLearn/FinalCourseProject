import {Request, Response, NextFunction} from "express";
import {getUserByEmail, getUserByUsername} from "../services/authService";

/**
 * This middleware check if the user trying to register using an existing username
 * @param req - Request
 * @param res - Response
 * @param next - NextFunction
 */
export const checkUsername = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const {username} = req.body;

        const user = await getUserByUsername(username);
        if (user) {
            res.status(400).json({message: "Username is already exist"});
            return;
        }

        next();// if the username is not exist, continue to the next middleware
    } catch (error: any) {
        next(error);
    }
}

/**
 * This middleware check if the user trying to register using an existing email
 * @param req - Request
 * @param res - Response
 * @param next - NextFunction
 */
export const checkEmail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const {email} = req.body;

        const user = await getUserByEmail(email);
        if (user) {
            res.status(400).json({message: "Email is already exist"});
            return;
        }

        next();// if the username is not exist, continue to the next middleware
    } catch (error: any) {
        next(error);
    }
}
import {Request, Response, NextFunction} from "express";
import {createUser, getUserByEmail, getUserByUsername, saveRefreshToken} from "../services/authService";
import {IUser} from "../entitys/interfaces";
import {comparePasswords} from "../utils/utils";
import {Model, Types} from "mongoose";
import {generateAccessToken, generateRefreshToken} from "../config/jwt";
import {validateRefreshToken} from "../middleware/authMiddleware";


export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { email, full_name, username, password } = req.body;
        if (!email || !full_name || !username || !password)  res.status(400).json({ message: "All fields are required" });

        // Do something with the data
        const newUser: IUser | null = await createUser(email, full_name, username, password);

        if (newUser === null) {
            res.status(400).json({ message: "User with this email or username already exists" });
            return;
        }

        res.status(201).json({ message: "User created successfully",
            user: {
                email: newUser.email,
                full_name: newUser.full_name,
                username: newUser.username,
            }
        });

    } catch (error) {
        next(error);
    }
}


export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { email, username, password } = req.body;
        if (!email && !username || !password) res.status(400).json({ message: "All fields are required" });
        
        const user: IUser | null = await getUserByEmail(email) || await getUserByUsername(username);

        if (user === null) {
            res.status(400).json({ message: "User not found" });
            return;
        }

        const isPasswordCorrect: boolean = await comparePasswords(password, user.password);

        if (!isPasswordCorrect) {
            res.status(401).json({ message: "Incorrect username or password" });
            return;
        }

        const accessToken: string = generateAccessToken({
            id: user._id
        });

        const refreshToken: string = generateRefreshToken({
            id: user._id
        });

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict"
        });

        //TODO: Don't forget to remove it
        const saveRefreshTokenInCookie = false;

        if (saveRefreshTokenInCookie) {
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict"
            });
        }

        await saveRefreshToken(user._id as Types.ObjectId, refreshToken);

        res.status(200).json({ message: "Logged in successfully",
            user: {
                email: user.email,
                full_name: user.full_name,
                username: user.username,
            }
        });

    } catch (error) {
        next(error);
    }
}

export const logout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        next(error);
    }
}

export const refreshAccessToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const refreshToken: string = req.cookies.refreshToken;
        const { id } = req.body;
        if (!id && !refreshToken) {
            res.status(401).json({ message: "Refresh token is required" });
            return;
        }

        const validRefreshToken: boolean = await validateRefreshToken(id, refreshToken);
        if (!validRefreshToken) {
            res.status(401).json({ message: "Invalid refresh token" });
            return;
        }

        const accessToken: string = generateAccessToken({
            id
        });

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict"
        });

        console.log("Access token refreshed successfully: ", accessToken);

        res.status(200).json({ message: "Access token refreshed successfully" });
    } catch (error) {
        next(error);
    }
}
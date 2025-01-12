import {Request, Response, NextFunction} from "express";
import {createUser, getUserByEmail, getUserByUsername, saveRefreshToken} from "../services/authService";
import {IUser} from "../entitys/interfaces";
import {comparePasswords} from "../utils/utils";
import {Model, Types} from "mongoose";
import {generateAccessToken, generateRefreshToken} from "../config/jwt";
import {validateRefreshToken} from "../middleware/authMiddleware";
import {logInfo} from "../utils/Logger";


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
        if (!email && !username || !password) {
            res.status(400).json({ message: "All fields are required" });
            await logInfo(`[login] All fields are required`);
            return;
        }
        
        const user: IUser | null = await getUserByEmail(email) || await getUserByUsername(username);

        if (user === null) {
            res.status(400).json({ message: "User not found" });
            await logInfo(`[login] User not found`);
            return;
        }

        const isPasswordCorrect: boolean = await comparePasswords(password, user.password);

        if (!isPasswordCorrect) {
            res.status(401).json({ message: "Incorrect username or password" });
            await logInfo(`[login] Incorrect username or password`);
            return;
        }

        const accessToken: string = generateAccessToken({
            id: user._id
        });
        await logInfo(`[login] Access token generated successfully: ${accessToken}`);

        const refreshToken: string = generateRefreshToken({
            id: user._id
        });
        await logInfo(`[login] Refresh token generated successfully: ${refreshToken}`);

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 1000 * 60 * 60 // 1 hour
        });
        await logInfo(`[login] Access token saved in cookie`);


        //TODO: Don't forget to remove it
        const saveRefreshTokenInCookie = false;

        if (saveRefreshTokenInCookie) {
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict"
            });
            await logInfo(`[login] Refresh token saved in cookie`);
        }

        await saveRefreshToken(user._id as Types.ObjectId, refreshToken);
        await logInfo(`[login] Refresh token saved in database`);

        res.status(200).json({ message: "Logged in successfully",
            user: {
                email: user.email,
                full_name: user.full_name,
                username: user.username,
            }
        });
        await logInfo(`[login] User logged in successfully`);

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
import {Request, Response, NextFunction} from "express";

import {IUser} from "../entitys/interfaces";
import {comparePasswords} from "../utils/utils";
import {Types} from "mongoose";
import {generateAccessToken, generateRefreshToken} from "../config/jwt";
import {validateRefreshToken} from "../middleware/authMiddleware";
import {logDebug, logErrorWithObj, logInfo} from "../utils/Logger";
import jwt from "jsonwebtoken";
import AuthService from "../services/authService";
import AuthRepository from "../repositories/authRepository";
import {body, validationResult} from "express-validator";

class AuthController {

    // Валидация данных для регистрации пользователя
    static validateRegistration() {
        return [
            body('email').isEmail().withMessage('Invalid email format'),
            body('username').notEmpty().withMessage('Username is required'),
            body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
        ];
    }

    // Обработка ошибки валидации
    static handleValidationErrors(req: Request, res: Response, next: NextFunction): void {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() })
            return;
        }
        next();
    }

    public static async register(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { email, full_name, username, password } = req.body;
            if (!email || !full_name || !username || !password)  res.status(400).json({ message: "All fields are required" });

            // Do something with the data
            const userData = {
                email,
                full_name,
                username,
                password
            }
            const newUser: IUser | null = await AuthService.registerUser(userData);

            if (newUser === null) {
                res.status(409).json({ message: "User with this email or username already exists" });
                await logInfo(`[AuthController.register] User with this email or username already exists`);
                return;
            }

            res.status(201).json({ message: "User created successfully",
                user: {
                    email: newUser.email,
                    full_name: newUser.full_name,
                    username: newUser.username,
                }
            });
            await logInfo(`[AuthController.register] User created successfully`);

        } catch (error: unknown) {
            next(error);
        }
    }

    public static async login(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { email, username, password } = req.body;
            if (!email && !username || !password) {
                res.status(400).json({ message: "All fields are required" });
                await logInfo(`[AuthController.login] All fields are required`);
                return;
            }

            const user: IUser | null = await AuthRepository.getUserByEmailOrUsername(email, username);//await AuthRepository.getUserByEmail(email) || await AuthService.getUserByUsername(username);

            if (user === null) {
                res.status(400).json({ message: "User not found" });
                await logInfo(`[AuthController.login] User not found`);
                return;
            }

            const isPasswordCorrect: boolean = await comparePasswords(password, user.password);

            if (!isPasswordCorrect) {
                res.status(401).json({ message: "Incorrect username or password" });
                await logInfo(`[AuthController.login] Incorrect username or password`);
                return;
            }

            const accessToken: string = generateAccessToken({
                id: user._id
            });//Generate access token
            await logDebug(`[AuthController.login] Access token generated successfully: ${accessToken}`);

            const refreshToken: string = generateRefreshToken({
                id: user._id
            });//Generate refresh token
            await logDebug(`[AuthController.login] Refresh token generated successfully: ${refreshToken}`);

            const accessTokenExpires: string = process.env.JWT_ACCESS_EXPIRES_IN || "15m";
            const maxAgeAccess: number = Number(accessTokenExpires.split("m")[0]);

            res.cookie("accessToken", accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 1000 * 60 * maxAgeAccess  // 2 minutes
            });
            await logInfo(`[AuthController.login] Access token saved in cookie`);


            //TODO: Don't forget to remove it
            const saveRefreshTokenInCookie = true;

            if (saveRefreshTokenInCookie) {
                res.cookie("refreshToken", refreshToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "strict",
                    maxAge: 1000 * 60 * 15  // 15 minutes
                });
                await logInfo(`[AuthController.login] Refresh token saved in cookie`);
            }

            await AuthService.saveRefreshToken(user._id as Types.ObjectId, refreshToken);
            await logInfo(`[AuthController.login] Refresh token saved in database`);

            res.status(200).json({ message: "Logged in successfully",
                user: {
                    email: user.email,
                    full_name: user.full_name,
                    username: user.username,
                }
            });
            await logInfo(`[AuthController.login] User logged in successfully`);

        } catch (error: unknown) {
            next(error);
        }
    }

    public static async logout(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            res.clearCookie("accessToken");
            res.clearCookie("refreshToken");
            res.status(200).json({ message: "Logged out successfully" });
            await logInfo(`[AuthController.logout] User logged out successfully`);
        } catch (error: unknown) {
            next(error);
        }
    }

    public static async refreshAccessToken(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const refreshToken: string = req.cookies.refreshToken;

            if (!refreshToken) {
                res.status(401).json({message: "Refresh token is required"});
                await logInfo("[AuthController.refreshAccessToken] Refresh token is required");
                return;
            }

            const decoded: any = jwt.verify(refreshToken, process.env.JWT_SECRET as string);
            console.log("Decoded refresh token:", decoded);
            const validRefreshToken = await validateRefreshToken(decoded.id, refreshToken);

            if (!validRefreshToken) {
                res.status(401).json({message: "Invalid or expired refresh token"});
                await logInfo("[AuthController.refreshAccessToken] Invalid or expired refresh token");
                return;
            }


            const accessToken: string = generateAccessToken({
                id: decoded.id
            });

            res.cookie("accessToken", accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 2 * 60 * 1000, // Access token действует 15 минут
            });

            // console.log("Access token refreshed successfully: ", accessToken);
            await logDebug(`[AuthController.refreshAccessToken] Access token refreshed successfully: ${accessToken}`);

            res.status(200).json({
                message: "Access token refreshed successfully",
                // accessToken, // Отправляем токен на фронт
            });
            await logInfo("[AuthController.refreshAccessToken] Access token refreshed successfully");
        } catch (error: unknown) {
            next(error);
        }
    }


    public static async checkAccessToken(req: Request, res: Response, next: NextFunction): Promise<void> {
        const accessToken = req.cookies.accessToken;

        if (!accessToken) {
            res.status(401).json({ message: 'Access token is required' });
            await logInfo('[AuthController.checkAccessToken] Access token is required');
            return;
        }

        try {
            const decoded = jwt.verify(accessToken, process.env.JWT_SECRET as string);
            console.log('Decoded token:', decoded);
            await logInfo(`[AuthController.checkAccessToken] Decoded token: ${decoded}`);
            res.status(200).json({ message: 'Token is valid' });
            return;
        } catch (err: unknown) {
            console.error('Token validation error:', err);
            await logErrorWithObj('[AuthController.checkAccessToken] Token validation error', err);
            res.status(403).json({ message: 'Invalid or expired token' });
            return;
        }
    }


}










export default AuthController;
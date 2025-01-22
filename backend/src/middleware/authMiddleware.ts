import RefreshToken from "../models/RefreshToken";
import {compareToken} from "../utils/utils";
import {IRefreshToken, IUser} from "../entitys/interfaces";
import {Types} from "mongoose";
import {logErrorWithObj, logInfo} from "../utils/Logger";
import {verifyToken} from "../config/jwt";
import jwt, {JwtPayload, VerifyErrors} from "jsonwebtoken";
import {Request, Response, NextFunction} from "express";


export const validateRefreshToken = async (userId: string, refreshToken: string): Promise<boolean> => {
    try {
        const refreshTokenDoc: IRefreshToken | null = await RefreshToken.findOne({ user: userId });

        if (!refreshTokenDoc) {
            await logInfo(`[validateRefreshToken] Refresh token not found for userId: ${userId}`);
            return false;
        }

        // Проверяем срок действия токена
        if (refreshTokenDoc.expires < new Date()) {
            await logInfo(`[validateRefreshToken] Refresh token expired for userId: ${userId}`);
            return false;
        }

        // Сравниваем токен с хэшированным токеном
        const isTokenValid = await compareToken(refreshToken, refreshTokenDoc.token);

        if (!isTokenValid) {
            await logInfo(`[validateRefreshToken] Invalid refresh token for userId: ${userId}`);
        }

        return isTokenValid;
    } catch (error: unknown) {
        await logErrorWithObj("validateRefreshToken", { userId, error });
        return false;
    }
}

export const checkAccessToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const accessToken = req.cookies.accessToken;

        if (!accessToken) {
            res.status(401).json({message: "Access token is required"});
            await logInfo("[checkAccessToken] Access token is required");
            return;
        }

        await logInfo(`[checkAccessToken] Access token: ${accessToken}`);
        // verifyToken(accessToken, req, res, next);
        jwt.verify(accessToken, process.env.JWT_SECRET as string, async (err: VerifyErrors | null, decoded: any) => {
            if (err) {
                res.status(401).json({
                    message: "Forbidden: Invalid or expired token"
                });
                await logInfo("[checkAccessToken] Forbidden: Invalid or expired token");
                return
            }
            req.user = decoded;
            next();
        });
        // next();
    } catch (error: unknown) {
        await logErrorWithObj("checkAccessToken", error);
        res.status(500).json({message: "Internal server error"});
    }
}

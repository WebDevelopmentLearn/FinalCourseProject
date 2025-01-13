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
        const refreshTokenDoc: IRefreshToken | null = await RefreshToken.findOne({userId});
        if (refreshTokenDoc === null) {
            return false;
        }

        return compareToken(refreshToken, refreshTokenDoc.token);
    } catch (error: any) {
        await logErrorWithObj("validateRefreshToken", error);
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
    } catch (error: any) {
        await logErrorWithObj("checkAccessToken", error);
        res.status(500).json({message: "Internal server error"});
    }
}

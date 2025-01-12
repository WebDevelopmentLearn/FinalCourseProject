import jwt from 'jsonwebtoken';
import {Request, Response, NextFunction} from "express";


export const generateAccessToken = (payload: object): string => {
    return jwt.sign(payload, process.env.JWT_SECRET as string, {
        expiresIn: process.env.JWT_ACCESS_EXPIRES_IN
    });
}

export const generateRefreshToken = (payload: object): string => {
    return jwt.sign(payload, process.env.JWT_SECRET as string, {
        expiresIn: process.env.JWT_REFRESH_EXPIRES_IN
    });
}

export const verifyToken = (req: Request, res: Response, next: NextFunction, token: string): void => {
    // return jwt.verify(token, process.env.JWT_SECRET as string);
    jwt.verify(token, process.env.JWT_SECRET as string, (err, user: any) => {
        if (err) {
            res.status(403).json({
                message: "Forbidden: Invalid or expired token"
            });
            return
        }
        req.user = user as any;
        next();  // Передаем управление дальше
    });
}

export const decodeToken = (token: string): any => {
    return jwt.decode(token);
}

export const getBearerToken = (authorization: string): string => {
    return authorization.split(' ')[1];
}

export const getAuthorization = (token: string): string => {
    return `Bearer ${token}`;
}


import fs from "fs";
import path from "path";
import bcrypt from "bcrypt";
import {logDebug} from "./Logger";
import jwt from "jsonwebtoken";

export const defaultAvatarPath = path.join(__dirname, '../public/default_avatar.png');

export const defaultAvatarBase64 = `data:image/png;base64,${fs.readFileSync(defaultAvatarPath).toString('base64')}`;

export const getWorkDir = (): string => {
    return __dirname;
}

export const getFormattedDateTime = (date: Date, locale: string = 'ru-RU'): string => {
    return date.toLocaleString(locale, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    })
};

export const hashPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

export const comparePasswords = async (password: string, hashedPassword: string): Promise<boolean> => {
    return await bcrypt.compare(password, hashedPassword);
}


export const hashToken = async (token: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(token, salt);
};

export const compareToken = async (token: string, hashedToken: string): Promise<boolean> => {
    console.log("Comparing tokens");
    console.log("Token:", token);
    console.log("Hashed token:", hashedToken);
    // bcrypt.compare(token, hashedToken);
    return await bcrypt.compare(token, hashedToken);
};


export const getUserIdFromToken = (accessToken: string): string => {
    const decoded: any = jwt.verify(accessToken, process.env.JWT_SECRET as string);
    console.log("[getUserIdFromToken] Decoded:", decoded);
    if (decoded) {
        return decoded.id;
    }
    return "";
}


export const parseTime = (time: string): number => {
    const timeValue = parseInt(time);
    if (isNaN(timeValue)) {
        throw new Error('Invalid time value');
    }

    if (time.includes("d")) {
        return timeValue * 24 * 60 * 60 * 1000;
    } else if (time.includes("h")) {
        return timeValue * 60 * 60 * 1000;
    } else if (time.includes("m")) {
        return timeValue * 60 * 1000;
    } else if (time.includes("s")) {
        return timeValue * 1000;
    }

    throw new Error('Invalid time format. Use "d", "h", "m", or "s".');
}

import fs from "fs";
import path from "path";
import bcrypt from "bcrypt";

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


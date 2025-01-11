import {getFormattedDateTime} from "./utils";
import { promises as fsp } from "fs";

const getCurrentDate = (): string => {
    const date = new Date();
    return getFormattedDateTime(date);
}

let logFileName: string | null = null;
// Инициализация: создание директории один раз
const initializeLogsDirectory = async(): Promise<void> => {
    try {
        await fsp.mkdir("logs", { recursive: true });
        console.log("Directory logs created successfully");
    } catch (err) {
        console.error("Failed to create logs directory:", err);
    }
}

const getLogFileName = (): string => {
    if (!logFileName) {
        const date = getCurrentDate()
            .replace(/:/g, ".")
            .replace(/,/g, "")
            .replace(/ /g, "_");
        logFileName = `logs/${date}.txt`;
    }
    return logFileName;
};

async function writeToLogFile(dataFromFile: string): Promise<void> {
    const fileName = getLogFileName();

    try {
        await fsp.appendFile(fileName, dataFromFile, "utf-8");
    } catch (err) {
        console.error('Error writing to file:', err);
    }
}

const Logger = async (message: string, type: string) => {
    const formDate = getCurrentDate();
    try {
        await writeToLogFile(`[${formDate}] [${type}] ${message}\n`);
    } catch (err) {
        console.error('Error writing log:', err);
    }
}


export const logInfo = async (message: string) => {
    await Logger(message, "INFO");
    console.log(message);
}

export const logError = async (message: string) => {
    await Logger(message, "ERROR");
    console.error(message);
}

export const logErrorWithObj = async (message: string, obj: any) => {
    await Logger(`${message} ${JSON.stringify(obj)}`, "ERROR");
    console.error(message, obj);
}

export const logWarning = async (message: string) => {
    await Logger(message, "WARNING");
    console.warn(message);
}

export const logDebug = async (message: string) => {
    await Logger(message, "DEBUG");
    console.debug(message);
}

// Вызов инициализации
initializeLogsDirectory();
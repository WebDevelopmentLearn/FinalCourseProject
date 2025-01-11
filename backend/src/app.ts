import express, {Application, NextFunction, Request, Response} from "express";
import cors from "cors";
import "dotenv/config";
import {logErrorWithObj, logInfo} from "./utils/Logger";
import {connectToDatabase} from "./config/db";
import ErrorHandler from "./utils/ErrorHandler";
const app: Application = express();

const PORT = process.env.BACK_PORT || 3333;
const URL = process.env.BACK_URL || "http://localhost";


const start = async () => {
    try {
        await logInfo("Starting server...");
        await logInfo("Connecting to database...");
        await connectToDatabase();


        app.use(express.json());
        app.use(express.urlencoded({extended: true}));
        app.use(cors());


        //TODO: Fix the error handler
        // @ts-ignore
        app.use(ErrorHandler);

        app.listen(PORT, () => {
            logInfo(`Server is running at: ${URL}:${PORT}`);
        });
    } catch (error) {
        await logErrorWithObj("An error occurred while starting the server: ", error);
        process.exit(1);
    }
}

start();
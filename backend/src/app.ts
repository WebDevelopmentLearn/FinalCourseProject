import express, {Application, NextFunction, Request, Response} from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";
import {logErrorWithObj, logInfo} from "./utils/Logger";
import {connectToDatabase} from "./config/db";
import ErrorHandler from "./utils/ErrorHandler";
import {configureCors} from "./config/cors";

import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import postRoutes from "./routes/postRoutes";
import commentRoutes from "./routes/commentRoutes";

const app: Application = express();

const PORT = process.env.BACK_PORT || 3333;
const URL = process.env.URL || "localhost";
const ENV = process.env.NODE_ENV || "development";

declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}


const start = async () => {
    try {
        await logInfo("Starting server...");
        await logInfo("Connecting to database...");
        await connectToDatabase();
        const corsOptions = configureCors();

        app.use(express.json());
        app.use(express.urlencoded({extended: true}));
        app.use(cors(corsOptions));
        app.use(cookieParser());


        //TODO: Fix the error handler
        app.use(ErrorHandler);
        app.use("/api/auth", authRoutes);
        app.use("/api/user", userRoutes);
        app.use("/api/posts", postRoutes);
        app.use("/api/comments", commentRoutes);

        app.get("/", (req: Request, res: Response) => {
            res.send("Server is running");
        });

        app.listen(Number(PORT), URL, () => {
            logInfo(`Server is running at: http://${URL}:${PORT}`);
        });
    } catch (error) {
        await logErrorWithObj("An error occurred while starting the server: ", error);
        process.exit(1);
    }
}

start();
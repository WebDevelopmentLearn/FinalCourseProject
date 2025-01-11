import mongoose from 'mongoose';
import "dotenv/config";
import {logErrorWithObj, logInfo} from "../utils/Logger";

const MONGO_URI: string = process.env.MONGO_URI || "";

async function connectToDatabase(): Promise<void> {
    try {
        await mongoose.connect(MONGO_URI);
        await logInfo("Connected successfully to MongoDB");
    } catch (error) {
        //console.error("Failed to connect to MongoDB: ", error);
        await logErrorWithObj("Failed to connect to MongoDB: ", error);
        throw error;
    }
}

export {connectToDatabase};
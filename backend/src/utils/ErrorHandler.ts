// Мидлвара для обработки ошибок
import {Request, Response, NextFunction, ErrorRequestHandler} from "express";
import multer, {MulterError} from "multer";
import {CustomError} from "./Interfaces";

// Интерфейс ошибки, расширяющий стандартный Error
const ErrorHandler: ErrorRequestHandler = async (
    err: CustomError | MulterError | Error,
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    console.error(err.stack);

    if (err instanceof multer.MulterError) {
        res.status(400).json({
            message: "File size should be less than 5MB",
        });
        return
    }

    if (err instanceof CustomError) {
        if (err.status === 400 || err.code === 400) {
            res.status(400).json({
                message: err.message || "Bad Request",
            });
            return;
        }
    }

    res.status(500).json({
        message: "Internal Server Error",
    });
};

export default ErrorHandler;
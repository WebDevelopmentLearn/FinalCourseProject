import {NextFunction, Router, Request, Response} from "express";
import AuthController from "../controllers/authController";

const router: Router = Router();

router.post("/register",
    AuthController.validateRegistration(), // Валидация
    AuthController.handleValidationErrors,  // Обработка ошибок валидации
    AuthController.register);

router.post("/login", AuthController.login);

router.post("/logout",  AuthController.logout);

router.post("/refresh-access-token", AuthController.refreshAccessToken);

router.get("/check-access-token", AuthController.checkAccessToken);


export default router;
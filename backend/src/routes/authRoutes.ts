import {NextFunction, Router, Request, Response} from "express";
import {checkEmail, checkUsername} from "../middleware/checkData";
import {login, logout, refreshAccessToken, register} from "../controllers/authController";

const router: Router = Router();

router.post("/register", checkUsername, checkEmail, register);

router.post("/login", login);

router.post("/logout",  logout);

router.post("/refresh-access-token", refreshAccessToken);


export default router;
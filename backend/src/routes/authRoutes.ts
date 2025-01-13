import {NextFunction, Router, Request, Response} from "express";
import {checkEmail, checkUsername} from "../middleware/checkData";
import {login, logout, refreshAccessToken, register, checkAccessToken} from "../controllers/authController";

const router: Router = Router();

router.post("/register", checkUsername, checkEmail, register);

router.post("/login", login);

router.post("/logout",  logout);

router.post("/refresh-access-token", refreshAccessToken);

// @ts-ignore
router.get("/check-access-token", checkAccessToken);


export default router;
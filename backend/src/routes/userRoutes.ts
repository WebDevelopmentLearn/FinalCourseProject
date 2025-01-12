import {NextFunction, Router, Request, Response} from "express";
import {checkAccessToken} from "../middleware/authMiddleware";
import {getUserProfile} from "../controllers/userController";

const router: Router = Router();

router.get("/profile", checkAccessToken, getUserProfile);



export default router;
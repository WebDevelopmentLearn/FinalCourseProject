import {NextFunction, Router, Request, Response} from "express";
import {checkAccessToken} from "../middleware/authMiddleware";
import {editProfile, getUserProfile} from "../controllers/userController";

const router: Router = Router();

router.get("/profile", checkAccessToken, getUserProfile);
router.put("/update-profile", checkAccessToken, editProfile);



export default router;
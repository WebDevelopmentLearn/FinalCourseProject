import {Router} from "express";
import {checkAccessToken} from "../middleware/authMiddleware";
import UserController from "../controllers/userController";

const router: Router = Router();

router.get("/profile", checkAccessToken, UserController.getUserProfile);
router.put("/update-profile", checkAccessToken, UserController.editProfile);



export default router;
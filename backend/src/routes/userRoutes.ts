import {Router} from "express";
import {checkAccessToken} from "../middleware/authMiddleware";
import UserController from "../controllers/userController";
import UploadFiles from "../middleware/uploadImage";
import {MulterError} from "multer";

const router: Router = Router();

router.get("/profile", checkAccessToken, UserController.getUserProfile);
router.get("/profile/:userId", checkAccessToken, UserController.getUserProfileById);
router.put("/update-profile", UploadFiles.uploadSingle("avatar"), checkAccessToken, UserController.editProfile);
router.put("/follow/:userId", checkAccessToken, UserController.followUser);



export default router;
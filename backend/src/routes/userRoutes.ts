import {Router} from "express";
import {checkAccessToken} from "../middleware/authMiddleware";
import UserController from "../controllers/userController";
import UploadFiles from "../middleware/uploadImage";
import {MulterError} from "multer";

const router: Router = Router();

router.get("/profile", checkAccessToken, UserController.getUserProfile);
router.put("/update-profile",  (req, res, next) => {
    UploadFiles.uploadSingle("avatar")(req, res, (err) => {
        if (err instanceof MulterError) {
            console.error("Multer error:", err.message);
            return res.status(400).json({ message: err.message });
        } else if (err) {
            console.error("Unexpected error:", err.message);
            return res.status(500).json({ message: "Internal server error" });
        }
        next();
    });
}, checkAccessToken, UserController.editProfile);



export default router;
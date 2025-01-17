import {NextFunction, Router, Request, Response} from "express";
import {checkAccessToken} from "../middleware/authMiddleware";
import PostController from "../controllers/postController";
import upload from "../middleware/uploadImage";
import UploadFiles from "../middleware/uploadImage";

const router: Router = Router();

router.post("/create-post", UploadFiles.uploadMultiple("photo", 5), checkAccessToken, PostController.createPost);

router.put("/update-post/:postId", checkAccessToken, PostController.updatePost);

router.get("/all-posts", checkAccessToken, PostController.getAllPosts);



export default router;
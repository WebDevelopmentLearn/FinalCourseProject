import {NextFunction, Router, Request, Response} from "express";
import {checkAccessToken} from "../middleware/authMiddleware";
import PostController from "../controllers/postController";
import upload from "../middleware/uploadImage";
import UploadFiles from "../middleware/uploadImage";

const router: Router = Router();

router.post("/create-post", UploadFiles.uploadMultiple("photos", 5), checkAccessToken, PostController.createPost);

router.put("/update-post/:postId", checkAccessToken, PostController.updatePost);

router.get("/all-posts", checkAccessToken, PostController.getAllPosts);

router.get("/posts-by-user/:userId", checkAccessToken, PostController.getPostsByUser)

router.get("/post-by-id/:postId", checkAccessToken, PostController.getPostById)



export default router;
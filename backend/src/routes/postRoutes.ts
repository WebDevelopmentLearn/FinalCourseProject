import {NextFunction, Router, Request, Response} from "express";
import {checkAccessToken} from "../middleware/authMiddleware";
import PostController from "../controllers/postController";
import upload from "../middleware/uploadImage";

const router: Router = Router();

router.post("/create-post", upload.single("photo"), checkAccessToken, PostController.createPost);

router.get("/all-posts", checkAccessToken, PostController.getAllPosts);



export default router;
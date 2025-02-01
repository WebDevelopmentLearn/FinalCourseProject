import {NextFunction, Router, Request, Response} from "express";
import {checkAccessToken} from "../middleware/authMiddleware";
import CommentController from "../controllers/commentController";

const router: Router = Router();

router.post("/create-comment/:postId", checkAccessToken, CommentController.createComment);
router.get("/get-comments/:postId", CommentController.getCommentsByPostId);



export default router;
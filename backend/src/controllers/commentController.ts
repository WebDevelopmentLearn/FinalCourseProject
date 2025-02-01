import {NextFunction, Request, Response} from "express";
import PostService from "../services/postService";
import {logError} from "../utils/Logger";
import {Types} from "mongoose";
import CommentService from "../services/commentService";
import {ICommentDoc} from "../entitys/interfaces";
import {getUserIdFromToken} from "../utils/utils";


class CommentController {

    public static async createComment(req: Request, res: Response, next: NextFunction): Promise<void> {
        const {content}: {content: string} = req.body;
        if (!content) {
            res.status(400).json({ message: "Field content is required" });
            return
        }
        const {postId} = req.params;
        if (!postId) {
            res.status(400).json({ message: "Param postId is required" });
            return;
        }

        const userId = getUserIdFromToken(req.cookies.accessToken);

        if (!userId) {
            res.status(400).json({ message: "Userid is required" });
            return;
        }

        try {

            const targetPost = await PostService.getPostById(postId);
            if (targetPost === null) {
                res.status(404).json({
                    message: `Post with id=${postId} not found`
                });
                await logError("[CommentController.createComment] Error creating comment");
                return;
            }

            const commentData = {
                post: postId,
                author: {
                    _id: userId
                },
                content: content
            }

            const newComment: ICommentDoc | null = await CommentService.createCommentDoc(commentData);

            if (newComment === null) {
                res.status(500).json({message: "Error creating post"});
                await logError("[CommentController.createComment] Error creating comment");
                return;
            }

            targetPost.comments?.push(new Types.ObjectId(newComment._id));
            await targetPost.save();

            res.status(201).json({message: "Comment created successfully", newComment});


        } catch (error: unknown) {
            next(error);
        }
    }

    public static async getCommentsByPostId(req: Request, res: Response, next: NextFunction): Promise<void> {
        const {postId} = req.params;
        if (!postId) res.status(400).json({ message: "Param postId is required" });

        try {
            const comments: ICommentDoc[] = await CommentService.getCommentsByPostId(postId);

            res.status(200).json({comments});

        } catch (error: unknown) {
            next(error);
        }
    }

}

export default CommentController;
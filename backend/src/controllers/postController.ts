import {Request, Response, NextFunction} from "express";
import {getUserIdFromToken} from "../utils/utils";
import UserService from "../services/userService";
import {IPostDoc, IUser} from "../entitys/interfaces";
import PostService from "../services/postService";
import {logError} from "../utils/Logger";
import Post from "../models/Post";
import {Types} from "mongoose";

class PostController {


    public static async createPost(req: Request, res: Response, next: NextFunction): Promise<void> {
        const userId = getUserIdFromToken(req.cookies.accessToken);
        try {
            const {content} = req.body;
            console.log("userid: ", userId);
            if (!userId || !content) {
                res.status(400).json({message: "All fields are required"});
                return;
            }

            const targetUser: IUser | null = await UserService.getUserById(userId);

            if (targetUser === null) {
                res.status(404).json({message: "User not found"});
                return;
            }


            if (req.files && Array.isArray(req.files) && targetUser) {
                const imageBase64Arr: string[] = req.files.map((file: Express.Multer.File) => file.buffer.toString("base64"));

                // const encodedImageBase64 = `data:${req.file.mimetype};base64,${imageBase64}`;
                const encodedImageBase64Arr = imageBase64Arr.map((imageBase64: string) => `data:image/png;base64,${imageBase64}`);



                // const post: IPost | null = await Post.create({
                //     photo: encodedImageBase64,
                //     content: content,
                //     author: {
                //         _id: userId
                //     }
                // });

                const postData = {
                    photo: encodedImageBase64Arr,
                    content: content,
                    author: {
                        _id: userId
                    }
                }

                const newPost: IPostDoc | null = await PostService.createPost(postData);

                if (newPost === null) {
                    res.status(500).json({message: "Error creating post"});
                    await logError("[PostController.createPost] Error creating post");
                    return;
                }

                targetUser.posts?.push(new Types.ObjectId(newPost._id));
                await targetUser.save();

                res.status(201).json({message: "Post created successfully", newPost});

            } else {
                res.status(400).json({message: "Image is required"});
                return;
            }

        } catch (error) {
            next(error);
            // if (error instanceof multer.MulterError) {
            //     res.status(400).send(error.message);  // Send Multer's error message
            // } else {
            //     res.status(500).send('Error creating post');
            // }
        }
    }

    public static async updatePost(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const {postId} = req.params;
            const {content} = req.body;

            if (!postId || !content) {
                res.status(400).json({message: "All fields are required"});
                return;
            }

            const post: IPostDoc | null = await PostService.getPostById(postId);

            if (post === null) {
                res.status(404).json({message: "Post not found"});
                return;
            }

            post.content = content;
            await post.save();

            res.status(200).json({message: "Post updated successfully", post});
        } catch (error) {
            next(error);
        }
    }

    public static async getAllPosts(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const posts = await PostService.getAllPosts();

            res.status(200).json(posts);
        } catch (error: unknown) {
            next(error);
        }
    }

    public static async getPostsByUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        const userId: string = req.params.userId;
        if (!userId) {
            res.status(400).json({
                message: "Param userId is required"
            });
            return;
        }
        try {
            const usersPosts: IPostDoc[] = await PostService.getAllPostsByUserId(userId);

            res.status(200).json(usersPosts);
        } catch (error: unknown) {
            next(error);
        }
    }

    public static async getPostById(req: Request, res: Response, next: NextFunction): Promise<void> {
        const postId: string = req.params.postId;
        if (!postId) {
            res.status(400).json({
                message: "Param postId is required"
            });
            return;
        }
        try {
            const targetPost = await PostService.getPostById(postId);

            if (targetPost === null) {
                res.status(404).json({
                    message: "Required post is not found"
                });
                return;
            }

            res.status(200).json(targetPost);
        } catch (error: unknown) {
            next(error);
        }
    }
}

export default PostController;
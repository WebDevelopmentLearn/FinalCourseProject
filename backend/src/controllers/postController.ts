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

            console.log(req.file);
            if (req.file && targetUser) {
                const imageBase64 = req.file.buffer.toString("base64");

                const encodedImageBase64 = `data:${req.file.mimetype};base64,${imageBase64}`;

                // const post: IPost | null = await Post.create({
                //     photo: encodedImageBase64,
                //     content: content,
                //     author: {
                //         _id: userId
                //     }
                // });

                const postData = {
                    photo: encodedImageBase64,
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

    public static async getAllPosts(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const posts = await PostService.getAllPosts();

            res.status(200).json(posts);
        } catch (error) {
            next(error);
        }
    }
}

export default PostController;
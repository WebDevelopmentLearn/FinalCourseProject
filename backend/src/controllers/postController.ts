import {Request, Response, NextFunction} from "express";
import {getUserIdFromToken} from "../utils/utils";
import UserService from "../services/userService";
import {IPostDoc, IUser} from "../entitys/interfaces";
import PostService from "../services/postService";
import {logError} from "../utils/Logger";
import {cloudinary} from "../config/cloudinary";
import Post from "../models/Post";
import {Types} from "mongoose";
import {MulterRequest} from "../middleware/uploadImage";
import sharp from "sharp";
import Photo from "../models/Photo";

class PostController {


    public static async createPost(req: Request, res: Response, next: NextFunction): Promise<void> {
        const userId = getUserIdFromToken(req.cookies.accessToken);

        try {
            const { content } = req.body;
            console.log("userid: ", userId);

            if (!userId || !content) {
                res.status(400).json({ message: "All fields are required" });
                return;
            }

            const targetUser: IUser | null = await UserService.getUserById(userId);

            if (targetUser === null) {
                res.status(404).json({ message: "User not found" });
                return;
            }

            const uploadedPhotos = (
                await Promise.all(
                    (req as unknown as MulterRequest).files.map(async (file) => {
                        const { width, height } = await sharp(file.buffer).metadata();
                        if (!height || !width) return undefined; // Если метаданные недоступны, возвращаем undefined

                        let aspectRatio = "4:4";
                        if (width / height > 1) {
                            aspectRatio = "16:9";
                        } else if (width / height < 1) {
                            aspectRatio = "4:5";
                        }

                        return new Promise<{ url: string; public_id: string }>((resolve, reject) => {
                            cloudinary.uploader.upload_stream(
                                {
                                    folder: "posts",
                                    transformation: [
                                        { aspect_ratio: aspectRatio, crop: "fill", gravity: "auto" },
                                    ],
                                },
                                (error, result) => {
                                    if (error) {
                                        reject(error);
                                    } else if (result) {
                                        resolve({
                                            url: result.secure_url,
                                            public_id: result.public_id,
                                        });
                                    }
                                }
                            ).end(file.buffer);
                        });
                    })
                )
            ).filter((photo): photo is { url: string; public_id: string } => photo !== undefined); // Фильтруем undefined

            // Создание записей в базе данных для каждой фотографии
            const photoDocuments = await Promise.all(
                uploadedPhotos.map(async ({ url, public_id }) => {
                    const photo = new Photo({
                        url,
                        public_id,
                        post: null, // Связь с постом будет добавлена позже
                    });
                    await photo.save();
                    return photo._id;
                })
            );

            // Создание нового поста
            const post = await Post.create({
                photos: photoDocuments,
                content,
                author: targetUser._id,
            });

            // Обновление поля `post` в каждом документе Photo
            await Promise.all(
                photoDocuments.map(async (photoId) => {
                    await Photo.findByIdAndUpdate(photoId, { post: post._id });
                })
            );

            // Добавление поста в список постов пользователя
            // @ts-ignore
            targetUser.posts.push(post._id);
            await targetUser.save();

            // Заполнение данных о фото в ответе
            await post.populate("photos", "url public_id");

            res.status(201).json({ message: "Post created successfully", post });
        } catch (error) {
            next(error);
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

    public static async deletePost(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const {postId} = req.params;

            if (!postId) {
                res.status(400).json({message: "Param postId is required"});
                return;
            }

            const post: IPostDoc | null = await PostService.getPostById(postId);

            if (post === null) {
                res.status(404).json({message: "Post not found"});
                return;
            }

            await post.deleteOne();
            // await Photo.deleteMany({post: Types.ObjectId(postId)});
            // await UserService.deletePostFromUser(post.author, postId);
            // await cloudinary.api.delete_resources_by_prefix(`posts/${postId}`);

            res.status(200).json({message: "Post deleted successfully"});
        } catch (error) {
            next(error);
        }
    }

    public static async getAllPosts(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { page, limit } = req.query;
        try {
            const posts = await PostService.getAllPosts(Number(page), Number(limit));

            res.status(200).json(posts);
        } catch (error: unknown) {
            next(error);
        }
    }

    public static async getPostsByUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        const userId: string = req.params.userId;
        const { page, limit } = req.query;
        if (!userId) {
            res.status(400).json({
                message: "Param userId is required"
            });
            return;
        }
        try {
            const usersPosts = await PostService.getAllPostsByUserId(userId, Number(page), Number(limit));

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
import Post from "../models/Post";
import {IPostDoc} from "../entitys/interfaces";
import {Error} from "mongoose";

class PostRepository {

    public static async createPostDoc(postData: any): Promise<IPostDoc> {
        try {
            const post: IPostDoc = new Post(postData);
            await post.save();
            return post;
        } catch (error: unknown) {
            console.error("Error in createPostDoc:", error);
            throw new Error("Error while creating post");
        }
    }

    static async getAllPosts(): Promise<IPostDoc[]> {
        try {
            const allPosts: IPostDoc[] = await Post.find().populate("author", {
                _id: 1,
                username: 1,
                avatar: 1
            }).populate("comments");

            return allPosts;
        } catch (error: unknown) {
            console.error("Error in getAllPosts:", error);
            throw new Error("Error while creating post");
        }
    }

    static async getAllPostsByUserId(userId: string): Promise<IPostDoc[]> {
        try {
            const allPosts: IPostDoc[] = await Post.find({author: userId}).populate("author", {
                _id: 1,
                username: 1,
                avatar: 1
            }).populate("comments");

            return allPosts;
        } catch (error: unknown) {
            console.error("Error in getAllPosts:", error);
            throw new Error("Error while creating post");
        }
    }

    static async getPostById(postId: string): Promise<IPostDoc | null> {
        try {
            const post: IPostDoc | null = await Post
                .findById(postId)
                .populate("author", {
                    _id: 1,
                    username: 1,
                    avatar: 1
                }).populate({
                    path: "comments",
                    populate: [
                        {
                            path: "author",
                            select: `_id username avatar`
                        }
                    ]
                });

            return post;
        } catch (error: unknown) {
            console.error("Error in getPostById:", error);
            throw new Error("Error while getting post by id");
        }
    }
}

export default PostRepository;
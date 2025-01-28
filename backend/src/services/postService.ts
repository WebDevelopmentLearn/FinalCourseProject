import Post from "../models/Post";
import PostRepository from "../repositories/postRepository";
import {IPostDoc} from "../entitys/interfaces";
import {Types} from "mongoose";

class PostService {


    public static async createPost(postData: { title: string; content: string; author: string; photos?: string }): Promise<IPostDoc> {
        try {
            const newPost: IPostDoc = await PostRepository.createPostDoc(postData);
            return newPost;
        } catch (error) {
            console.error("Error in creating post:", error);
            throw new Error("Failed to create post.");
        }
    }

    static async getAllPosts(page = 1, limit = 10): Promise<{ posts: IPostDoc[]; total: number; totalPages: number; currentPage: number }> {
        try {
            const result = await PostRepository.getAllPosts(page, limit);
            return result;
        } catch (error) {
            console.error("Error in fetching posts:", error);
            throw new Error("Failed to fetch posts.");
        }
    }

    static async getAllPostsByUserId(userId: string, page = 1, limit = 10): Promise<{ posts: IPostDoc[]; total: number; totalPages: number; currentPage: number }> {
        try {
            const result = await PostRepository.getAllPostsByUserId(userId, page, limit);
            return result;
        } catch (error) {
            console.error("Error in fetching posts by user ID:", error);
            throw new Error("Failed to fetch posts by user ID.");
        }
    }

    static async getPostById(postId: string): Promise<IPostDoc | null> {
        try {
            const post: IPostDoc | null = await PostRepository.getPostById(postId);
            if (!post) {
                console.error("Post not found with ID:", postId);
                return null;
            }
            return post;
        } catch (error) {
            console.error("Error in fetching post by ID:", error);
            throw new Error("Failed to fetch post by ID.");
        }
    }

    static async deletePostById(postId: string): Promise<void> {
        try {
            await PostRepository.deletePostById(postId);
        } catch (error) {
            console.error("Error in deleting post:", error);
            throw new Error("Failed to delete post.");
        }
    }


}

export default PostService;
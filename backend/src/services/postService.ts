import Post from "../models/Post";
import PostRepository from "../repositories/postRepository";
import {IPostDoc} from "../entitys/interfaces";
import {Types} from "mongoose";

class PostService {


    public static async createPost(postData: any): Promise<IPostDoc | null> {
        const newPost: IPostDoc = await PostRepository.createPostDoc(postData);

        return newPost;
    }

    static async getAllPosts(): Promise<IPostDoc[]> {
        const allPosts: IPostDoc[] = await PostRepository.getAllPosts();
        return allPosts;
    }

    static async getPostById(postId: string): Promise<IPostDoc | null> {
        const post: IPostDoc | null = await PostRepository.getPostById(postId);

        if (post === null) {
            return null;
        }

        return post;

    }
}

export default PostService;
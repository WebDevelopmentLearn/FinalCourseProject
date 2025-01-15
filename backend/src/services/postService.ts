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
}

export default PostService;
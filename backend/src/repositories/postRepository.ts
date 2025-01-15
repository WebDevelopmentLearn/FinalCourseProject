import Post from "../models/Post";
import {IPostDoc} from "../entitys/interfaces";

class PostRepository {

    public static async createPostDoc(postData: any): Promise<IPostDoc> {
        try {
            const post: IPostDoc = new Post(postData);
            await post.save();
            return post;
        } catch (error: any) {
            console.error("Error in createPostDoc:", error);
            throw new Error("Error while creating post");
        }
    }

    static async getAllPosts(): Promise<IPostDoc[]> {
        try {
            const allPosts: IPostDoc[] = await Post.find().populate("author");

            return allPosts;
        } catch (error) {
            console.error("Error in getAllPosts:", error);
            throw new Error("Error while creating post");
        }
    }
}

export default PostRepository;
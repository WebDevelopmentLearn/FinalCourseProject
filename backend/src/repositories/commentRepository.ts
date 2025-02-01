import {logErrorWithObj} from "../utils/Logger";
import Comment from "../models/Comment";
import {ICommentDoc} from "../entitys/interfaces";

class CommentRepository {

    static async createCommentDoc(commentData: any) {
        const newComment: ICommentDoc = new Comment(commentData);
        await newComment.populate("author", {
            _id: 1,
            username: 1,
            avatar: 1
        });
        return await newComment.save();
    }

    static async getCommentsByPostId(postId: string): Promise<ICommentDoc[]> {

        const comments: ICommentDoc[] = await Comment.find({post: postId}).populate("author", {
            _id: 1,
            username: 1,
            avatar: 1
        });

        return comments;
    }
}

export default CommentRepository;
import {logErrorWithObj} from "../utils/Logger";
import Comment from "../models/Comment";
import {ICommentDoc} from "../entitys/interfaces";

class CommentRepository {

    static async createCommentDoc(commentData: any) {
        try {
            const newComment: ICommentDoc = new Comment(commentData);
            await newComment.populate("author", {
                _id: 1,
                username: 1,
                avatar: 1
            });
            await newComment.save();

            return newComment;

        } catch (error: unknown) {
            await logErrorWithObj("createCommentDoc", error);
            throw new Error("Error while creating comment");
        }
    }
}

export default CommentRepository;
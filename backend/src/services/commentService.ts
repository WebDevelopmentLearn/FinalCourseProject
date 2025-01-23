import Comment from "../models/Comment";
import {ICommentDoc} from "../entitys/interfaces";
import CommentRepository from "../repositories/commentRepository";


class CommentService {

    public static async createCommentDoc(commentData: any) {
        const newCommentDoc: ICommentDoc = await CommentRepository.createCommentDoc(commentData);

        return newCommentDoc;
    }

}

export default CommentService;
import {model, Model, Schema, Types} from "mongoose";
import {ICommentDoc} from "../entitys/interfaces";


const commentSchema: Schema = new Schema({
    post: {
        type: Types.ObjectId,
        ref: "Post"
    },
    author: {
        type: Types.ObjectId,
        ref: "User"
    },
    content: {
        type: String,
        required: true
    },
    likes: [{
        type: Types.ObjectId,
        ref: "Like"
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
});


const Comment: Model<ICommentDoc> = model<ICommentDoc>('Comment', commentSchema);

export default Comment;
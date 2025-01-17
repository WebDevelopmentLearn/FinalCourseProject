import {Schema, Document, Types, model, Model} from 'mongoose'
import {IPostDoc} from "../entitys/interfaces";




const postSchema: Schema = new Schema({
   author: {
       type: Types.ObjectId,
         ref: 'User',
   },
    photo: {
       type: [String],
        max: 5,
        required: true
    },
    content: {
       type: String,
        required: true,
        maxlength: 2200
    },
    likes: [{
        type: Types.ObjectId,
        ref: 'Like',
    }],
    comments: [{
        type: Types.ObjectId,
        ref: 'Comment',
    }],
    createdAt: {
       type: Date,
        default: Date.now
    },
});


const Post: Model<IPostDoc> = model<IPostDoc>('Post', postSchema);

export default Post;
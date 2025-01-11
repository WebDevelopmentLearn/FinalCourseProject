import {Schema, Document, Types, model} from 'mongoose'
import {IPost} from "../entitys/interfaces";



const PostSchema: Schema = new Schema({
   author: {
       type: Types.ObjectId,
         ref: 'User',
   },
    image: {
         type: String,
         required: true
    },
    description: {
       type: String,
        required: true,
        maxlength: 2000
    },
    likes: [{
        type: Types.ObjectId,
        ref: 'Like',
    }],
    comments: [{
        type: Types.ObjectId,
        ref: 'Comment',
    }],


});

const Post = model<IPost>('Post', PostSchema);

export default Post;
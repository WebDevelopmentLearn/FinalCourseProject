import {Schema, Document, Types, model} from 'mongoose'
import {defaultAvatarBase64} from "../utils/utils";
import {IUser} from "../entitys/interfaces";



const UserSchema: Schema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    full_name: {
        type: String,
        required: true
    },
    password:
        {type: String,
            required: true
        },
    bio: {
        type: String,
        default: ""
    },
    avatar: {
        type: String,
        default: defaultAvatarBase64
    },
    website: {
        type: String,
        default: ""
    },
    notifications: {
        type: [{
            type: Types.ObjectId,
            ref: 'Notification'
        }],
        default: []
    },
    posts: {
        type: [{
            type: Types.ObjectId,
            ref: 'Post'
        }],
        default: []
    },
    followers: {
        type: [{
            type: Types.ObjectId,
            ref: 'User'
        }],
        default: []
    },
    following: {
        type: [{
            type: Types.ObjectId,
            ref: 'User'
        }],
        default: []
    },

});

const User = model<IUser>('User', UserSchema);

export default User;
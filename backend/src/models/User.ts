import {Schema, Document, Types, model, CallbackWithoutResultAndOptionalError, Model} from 'mongoose'
import {defaultAvatarBase64, hashPassword} from "../utils/utils";
import {IUser} from "../entitys/interfaces";



const userSchema: Schema = new Schema({
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

/**
 * Hashes the password before saving the user
 */
userSchema.pre('save', async function (next: CallbackWithoutResultAndOptionalError): Promise<void> {
    try {
        if (!this.isModified("password")) return next();//if the password is not modified, we don't need to hash it again

        this.password = await hashPassword(this.password as string);//hash the password + cast this.password to string
        next();
    } catch (error: any) {
        next(error);
    }
});

const User: Model<IUser> = model<IUser>('User', userSchema);

export default User;
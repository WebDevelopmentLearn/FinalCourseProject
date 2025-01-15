import {Document, Types} from "mongoose";

export interface IPostDoc extends Document {
    _id: Types.ObjectId | string;
    author: Types.ObjectId | string;
    image: string;
    description: string;
    likes: Types.ObjectId[];
    comments: Types.ObjectId[];
    createdAt: Date;

}

export interface IUser extends Document {
    _id: Types.ObjectId | string;
    username: string;
    email: string;
    full_name: string;
    password: string;
    bio?: string;
    avatar?: string;//Base64
    website?: string;
    notifications?: Types.ObjectId[];
    posts?: Types.ObjectId[];
    followers?: Types.ObjectId[];
    following?: Types.ObjectId[];
}

export interface IComment extends Document {

}

export interface INotification extends Document {

}

export interface IExplore extends Document {

}

export interface IFollow extends Document {

}

export interface ILike extends Document {

}

export interface IMessage extends Document {

}

export interface IRefreshToken extends Document {
    token: string;
    user: Types.ObjectId | string;
    expires: Date;
}

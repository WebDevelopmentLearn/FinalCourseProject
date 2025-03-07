export interface IUser {
    _id:  string;
    username: string;
    email?: string;
    full_name?: string;
    bio?: string;
    avatar?: string;//Base64
    website?: string;
    notifications?: any[];//TODO: Notification[]
    posts?: IPost[];
    followers?: IUser[];
    following?: IUser[];
}

export interface IPost {
    _id: string;
    author: IUser;
    photos: IImage[];
    content: string;
    likes: IUser[];
    comments: ICommentCard[];
    createdAt: string;
}

export interface IComment {
    _id: string;
    author: IUser;
    content: string;
    likes: IUser[];
    createdAt: string;
}

export interface ICommentCard {
    _id?: string;
    author: IUser;
    content: string;
    createdAt: string;
    likes: IUser[];
}


export interface IImage {
    blob: Blob;
    url: string;
    _id?: string;
}


export interface Notification {
    id: number;
    author: IUser;
    notificationType: "like" | "comment" | "follow";
    date: string;
    post: IPost;
}



export interface IRegisterData {
    email: string;
    full_name: string;
    username: string;
    password: string;
}


export interface ILoginData {
    email?: string;
    username?: string;
    password: string;
}


export type PixelCrop = {
    x: number;
    y: number;
    width: number;
    height: number;
};



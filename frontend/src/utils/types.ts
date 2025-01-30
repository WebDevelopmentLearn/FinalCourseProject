export interface IUser {
    _id:  string;
    username: string;
    email?: string;
    full_name?: string;
    bio?: string;
    avatar?: string;//Base64
    website?: string;
    notifications?: any[];
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




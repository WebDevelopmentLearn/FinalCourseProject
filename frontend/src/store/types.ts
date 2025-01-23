import {IPost, IUser} from "../utils/Entitys.ts";

export interface IPostState {
    posts: IPost[];
    currentPost: IPost | null;
    postsStatus: "IDLE" | "LOADING" | "SUCCESS" | "FAILED";
    postsError: any;
    currentPostStatus: "IDLE" | "LOADING" | "SUCCESS" | "FAILED";
    currentPostError: any;
}

export interface IImagesState {
    images: any[];
    imagesUrls: any[];
}

export interface IUserState {
    user: IUser | null;
    userStatus: "IDLE" | "LOADING" | "SUCCESS" | "FAILED";
    userError: any;
    updateProfileStatus: "IDLE" | "LOADING" | "SUCCESS" | "FAILED";
    updateProfileError: any;
}
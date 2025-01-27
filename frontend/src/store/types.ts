import {IPost, IUser} from "../utils/Entitys.ts";

export interface IModalState {
    createPostModalIsOpen: boolean;
}

export interface IAuthState {
    registerStatus: string;
    loginStatus: string;
    logoutStatus: string;
    registerError: any;
    loginError: any;
    logoutError: any;
}

export interface IPostState {
    posts: IPost[];
    currentPost: IPost | null;
    postsStatus: "IDLE" | "LOADING" | "SUCCESS" | "FAILED";
    postsError: any;
    currentPostStatus: "IDLE" | "LOADING" | "SUCCESS" | "FAILED";
    currentPostError: any;
    createCommentStatus: "IDLE" | "LOADING" | "SUCCESS" | "FAILED";
    createCommentError: any;
}

export interface IUserState {
    user: IUser | null;
    userStatus: "IDLE" | "LOADING" | "SUCCESS" | "FAILED";
    userError: any;

    currentUser:  IUser | null;
    currentUserStatus: "IDLE" | "LOADING" | "SUCCESS" | "FAILED";
    currentUserError: any,

    updateProfileStatus: "IDLE" | "LOADING" | "SUCCESS" | "FAILED";
    updateProfileError: any;
}
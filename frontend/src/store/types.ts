import {IComment, IPost, IUser} from "../utils/types.ts";

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
    loading: boolean;
    hasMore: boolean;
    page: number;
    limit: number;

    postsByUser: IPost[];

    currentPost: IPost | null;
    postsStatus: "IDLE" | "LOADING" | "SUCCESS" | "FAILED";
    postsError: any;
    currentPostStatus: "IDLE" | "LOADING" | "SUCCESS" | "FAILED";
    currentPostError: any;
    createCommentStatus: "IDLE" | "LOADING" | "SUCCESS" | "FAILED";
    createCommentError: any;

    deletePostStatus: "IDLE" | "LOADING" | "SUCCESS" | "FAILED";
    deletePostError: any;

    currentPostComments: IComment[];
    currentPostCommentsStatus: "IDLE" | "LOADING" | "SUCCESS" | "FAILED";
    currentPostCommentsError: any;

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

    followUserStatus: "IDLE" | "LOADING" | "SUCCESS" | "FAILED";
    followUserError: any;

    unfollowUserStatus: "IDLE" | "LOADING" | "SUCCESS" | "FAILED";
    unfollowUserError: any;
}
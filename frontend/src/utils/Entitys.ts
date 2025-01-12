import React, {CSSProperties} from "react";

//Types
//================================================

export type AvatarCircleProps = {
    avatar: string,
    avatarSize?:  "small" | "medium" | "big" | string,
    className?: string,
    hasLink?: boolean,
}

export type CustomButtonProps = {
    title?: string;
    type?: "button" | "submit" | "reset";
    styles?: CSSProperties;
    onClick?: () => void;
    className?: string;
}

type CustomInputType = "text" | "password" | "email" | "number" | "tel" | "url" | "search" | "date" | "time" | "datetime-local" | "month" | "week" | "color";

export type CustomInputProps = {
    type: CustomInputType;
    placeholder?: string;
    className?: string;
    style?: React.CSSProperties;
    value?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    min?: number | string;
    max?: number | string;
    id?: string;
}

export type ExpandableTextProps = {
    textClass?: string;
    text: string;
    maxHeight?: number;
}

export type SignInFormValues = {
    usernameOrEmail: string;
    password: string;
}

export type ForgotPasswordFormValues = {
    emailOrUsername: string;
}

export type InterlocutorCardProps = {
    name: string;
    message: string;
    time: string;
    avatar: string;
}

export type PostCardInProfileProps = {
    post: {
        postId: number;
        image: string;
    },
    onClick?: () => void;
}


//Interfaces
//================================================

export interface IUser {
    _id:  string;
    username: string;
    email: string;
    full_name: string;
    password: string;
    bio: string;
    avatar: string;//Base64
    website: string;
    notifications: object[];
    posts: object[];
    followers: object[];
    following: object[];
}

export interface Post {
    id: number;
    author: IUser;
    title: string;
    description: string;
    image: string;
    url: string;
    comments: IUser[];
    // likes: number;
    // comments: number;
    // tags: string[];
    // date: string;
}


export interface Notification {
    id: number;
    author: IUser;
    notificationType: "like" | "comment" | "follow";
    date: string;
    post: Post;
    url: Post["url"];
}


export interface ICommentCard {
    avatar: string;
    author: string;
    commentDesc: string;
    date: string;
    likesCount: number;
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

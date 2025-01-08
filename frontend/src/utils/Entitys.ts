import React, {CSSProperties} from "react";

//Types
//================================================

export type AvatarCircleProps = {
    avatar: string,
    avatarSize?:  "small" | "medium" | "big" | string,
    className?: string,
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

export interface User {
    id: number;
    username: string;
    avatar: string;
}

export interface Post {
    id: number;
    author: User;
    title: string;
    description: string;
    image: string;
    url: string;
    comments: User[];
    // likes: number;
    // comments: number;
    // tags: string[];
    // date: string;
}


export interface Notification {
    id: number;
    author: User;
    notificationType: "like" | "comment" | "follow";
    date: string;
    post: Post;
    url: Post["url"];
}


import React, {CSSProperties} from "react";

//Interfaces
//================================================
export interface IUser {
    _id:  string;
    username: string;
    email: string;
    full_name: string;
    bio?: string;
    avatar: string;//Base64
    website?: string;
    notifications?: object[];
    posts?: object[];
    followers?: object[];
    following?: object[];
}



export interface Notification {
    id: number;
    author: IUser;
    notificationType: "like" | "comment" | "follow";
    date: string;
    post: IPost;
    // url: IPost["url"];
}


export interface ICommentCard {
    author: IUser;
    commentDesc: string;
    createdAt: string;
    likes: string[];
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




//PROPS
export type ImageCropperModalProps = {
    handleClose: () => void;
    imageSrc: any;
}

export type UploadImageIconProps = {
    className: string;
}

export type SliderProps = {
    style?: CSSProperties;
    className?: string;
    inModal?: boolean;
    isEditModal?: boolean;
    maxWidth?: number;
    maxImages?: number;
    postImages?: string[];
    // onHandleFiles: () => void;
}

export type ImageCropperProps = {
    handleClose: () => void;
    imageSrc: any;
}

export type InterlocutorCardProps = {
    name: string;
    message: string;
    time: string;
    avatar: string;
}


export interface IPost {
    _id: string;
    author: IUser;
    photo: string[];
    content: string;
    likes: string[];
    comments: ICommentCard[];
    createdAt: string;

}
export type PostCardProps = {
    onClick?: () => void;
    post: IPost;
}

export type PostCardInProfileProps = {
    post: IPost,
    onClick?: () => void;
}


export type AvatarCircleProps = {
    user: IUser;
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
    disabled?: boolean;
}

type CustomInputType = "text" | "password" | "email" | "number" | "tel" | "url" | "search" | "date" | "time" | "datetime-local" | "month" | "week" | "color";

export type CustomInputProps = {
    type: CustomInputType;
    placeholder?: string;
    className?: string;
    style?: React.CSSProperties;
    value?: string;
    defaultValue?: string;
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


//FORM VALUES
export type SignInFormValues = {
    usernameOrEmail: string;
    password: string;
}

export type ForgotPasswordFormValues = {
    emailOrUsername: string;
}
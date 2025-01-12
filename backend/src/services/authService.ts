import {NextFunction, Request, Response} from "express";
import User from "../models/User";
import {IRefreshToken, IUser} from "../entitys/interfaces";
import {Model, Types} from "mongoose";
import {logErrorWithObj} from "../utils/Logger";
import RefreshToken from "../models/RefreshToken";
import {hashToken} from "../utils/utils";

const getAdditionalData = async (user: IUser | null, getPosts?: boolean, getFollowers?: boolean, getFollowing?: boolean, getNotifications?: boolean) => {
    try {
        if (user === null) {
            return;
        }

        if (getPosts) {
            await user.populate("posts");
        }

        if (getFollowers) {
            await user.populate("followers");
        }

        if (getFollowing) {
            await user.populate("following");
        }

        if (getNotifications) {
            await user.populate("notifications");
        }
    } catch (error: any) {
        await logErrorWithObj("getAdditionalData", error);
    }
}


export const getUserByUsername = async (username: string, getPosts?: boolean, getFollowers?: boolean, getFollowing?: boolean, getNotifications?: boolean) => {
    try {
        const user = await User
            .findOne({username})
            .exec();

        await getAdditionalData(user, getPosts, getFollowers, getFollowing, getNotifications);

        if (!user) {
           return null;
        }

        return user;
    } catch (error: any) {
        await logErrorWithObj("getUser", error);
        return null;
    }
}

export const getUserByEmail = async (email: string, getPosts?: boolean, getFollowers?: boolean, getFollowing?: boolean, getNotifications?: boolean) => {
    try {
        const user = await User
            .findOne({email})
            .exec();

        await getAdditionalData(user, getPosts, getFollowers, getFollowing, getNotifications);

        if (!user) {
            return null;
        }

        return user;
    } catch (error: any) {
        await logErrorWithObj("getUser", error);
        return null;
    }
}


export const createUser = async (email: string, full_name: string, username: string, password: string): Promise<IUser | null> => {
    try {
        const user = new User({
            email,
            full_name,
            username,
            password
        });

        await user.save();

        return user;
    } catch (error: any) {
        await logErrorWithObj("createUser", error);
        return null;
    }
}

export const saveRefreshToken = async (userId: Types.ObjectId, refreshToken: string): Promise<void> => {
    try {
        const hashedToken = await hashToken(refreshToken);

        const refreshTokenExpireTime = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

       await RefreshToken.create({
            user: userId,
            token: hashedToken,
            expires: refreshTokenExpireTime
        });

    } catch (error: any) {
        await logErrorWithObj("createRefreshToken", error);

    }
}

import {Request, Response, NextFunction} from "express";
import User from "../models/User";
import {logDebug} from "../utils/Logger";
import {Types} from "mongoose";
import {getUserIdFromToken} from "../utils/utils";
import UserService from "../services/userService";
import {IUser} from "../entitys/interfaces";


class UserController {
    public static async getUserProfileById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const userId: string = req.params.userId;

            if (!userId) {
                res.status(401).json({
                    message: "Param UserId is required"
                });
                return;
            }

            const userProfile = await UserService.getUserById(userId);
            if (!userProfile) {
                res.status(404).json({message: "User not found"});
                return;
            }

            res.status(200).json(userProfile);

            await logDebug(`[getUserProfile] User profile for ${userProfile.username} was sent`);

        } catch (error: unknown) {
            next(error);
        }
    }

    public static async getUserProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const user = req.user;
            console.log(user);

            const userProfile = await UserService.getUserById(user.id);
            if (!userProfile) {
                res.status(404).json({message: "User not found"});
                return;
            }

            res.status(200).json(userProfile);

            await logDebug(`[getUserProfile] User profile for ${userProfile.username} was sent`);

        } catch (error: unknown) {
            next(error);
        }
    }


    public static async editProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
        const userId = getUserIdFromToken(req.cookies.accessToken);
        const {username, bio, website}: {username?: string, bio?: string, website?: string} = req.body;
        try {
            if (!userId) {
                res.status(401).json({
                    message: "AccessToken is required"
                })
                return;
            }

            const targetUser: IUser | null = await UserService.getUserById(userId);
            if (targetUser === null) {
                res.status(404).json({
                    message: "User not found"
                });
                return;
            }

            const updatedData: {username?: string, bio?: string, website?: string, avatar?: string} = {};
            //{username, bio, website}
            if (username)  updatedData.username = username;
            if (bio)  updatedData.bio = bio;
            if (website)  updatedData.website = website;


            if (req.file) {
                const imageBase64: string = req.file.buffer.toString("base64");
                const encodedBase64Image: string = `data:${req.file.mimetype};base64,${imageBase64}`;
                updatedData.avatar = encodedBase64Image;
            }

            const updateUser = await UserService.updateProfile(targetUser, updatedData);

            res.status(201).json({
                message: "User has been updated",
                updateUser
            });

        } catch (error: unknown) {
            next(error);
        }
    }


    static async followUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const userId = getUserIdFromToken(req.cookies.accessToken);
            const followId = req.params.userId;
            if (!userId || !followId) {
                res.status(400).json({message: "All fields are required"});
                return;
            }

            const user: IUser | null = await UserService.getUserById(userId);
            const followUser: IUser | null = await UserService.getUserById(followId);
            if (!user || !followUser) {
                res.status(404).json({message: "User not found"});
                return;
            }

            if (user.id === followId) {
                res.status(400).json({message: "You can't follow yourself"});
                return;
            }

            // @ts-ignore
            const isFollowing = user.following.includes(followId);
            if (isFollowing) {
                res.status(400).json({message: "You are already following this user"});
                return;
            }

            // @ts-ignore
            user.following.push(followId);

            // @ts-ignore
            followUser.followers.push(userId);

            await user.save();
            await followUser.save();

            res.status(201).json({message: "User followed successfully"});

        } catch (error: unknown) {
            next(error);
        }
    }

    static async unfollowUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            // const userId = getUserIdFromToken(req.cookies.accessToken);
            // const {unfollowId} = req.body;
            // if (!userId || !unfollowId) {
            //     res.status(400).json({message: "All fields are required"});
            //     return;
            // }
            //
            // const user: IUser | null = await UserService.getUserById(userId);
            // const unfollowUser: IUser | null = await UserService.getUserById(unfollowId);
            // if (!user || !unfollowUser) {
            //     res.status(404).json({message: "User not found"});
            //     return;
            // }
            //
            // if (user.id === unfollowId) {
            //     res.status(400).json({message: "You can't unfollow yourself"});
            //     return;
            // }
            //
            // const isFollowing = user.following.includes(unfollowId);
            // if (!isFollowing) {
            //     res.status(400).json({message: "You are not following this user"});
            //     return;
            // }
            //
            // user.following = user.following.filter((id: string) => id !== unfollowId);
            // // unfollowUser.followers = unfollowUser.followers.filter((id: string) => id !== userId);
            // //push to followers array userId = string
            // // @ts-ignore
            // unfollowUser.followers = unfollowUser.followers.filter((id: string) => id !== userId);
            //
            // await user.save();
            // await unfollowUser.save();
            //
            // res.status(201).json({message: "User unfollowed successfully"});

        } catch (error: unknown) {
            next(error);
        }
    }
}

export default UserController;
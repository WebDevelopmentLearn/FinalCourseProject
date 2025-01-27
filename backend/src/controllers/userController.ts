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
            // const user = req.user;
            // console.log(user);
            console.log("Req.body: ", req.body);
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

            console.log("UpdateUser: ", updateUser);


            res.status(201).json({
                message: "User has been updated",
                updateUser
            });


        } catch (error: unknown) {
            next(error);
        }
    }
}

export default UserController;
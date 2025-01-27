import User from "../models/User";
import {logErrorWithObj} from "../utils/Logger";
import {IUser} from "../entitys/interfaces";
import UserRepository from "../repositories/userRepository";


class UserService {

    // public static async getUserById(id: string): Promise<IUser | null> {
    //     try {
    //         const user: IUser | null = await User.findById(id).populate("posts");
    //
    //         return user;
    //     } catch (error: unknown) {
    //         await logErrorWithObj("getUser", error);
    //         throw new Error("Error while getting user by id");
    //     }
    // }

    public static async getUserById(id: string): Promise<IUser | null> {
        const user: IUser | null = await UserRepository.findUserById(id);
        if (!user) {
            // throw new Error("User not found");
            await logErrorWithObj("getUserById", "User not found");
            return null;
        }
        return user;
    }

    public static async getUserByEmail(email: string) {
        try {
            const user = await User
                .findOne({email})
                .exec();

            if (!user) {
                return null;
            }

            return user;
        } catch (error: unknown) {
            await logErrorWithObj("getUser", error);
            throw new Error("Error while getting user by email");
        }
    }

    public static async getUserByUsername(username: string) {
        try {
            const user = await User
                .findOne({username})
                .exec();

            if (!user) {
                return null;
            }

            return user;
        } catch (error: unknown) {
            await logErrorWithObj("getUser", error);
            throw new Error("Error while getting user by username");
        }
    }


    public static async updateProfile(targetUser: IUser, profileData: any) {
        try {
            console.log("Profile data: ", profileData);
           const updatedUser = await targetUser.updateOne(profileData, {
               new: true
           });

           return updatedUser;
        } catch (error: unknown) {
            await logErrorWithObj("getUser", error);
            throw new Error("Error while getting user by username");
        }
    }
}

export default UserService;
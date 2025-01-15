import User from "../models/User";
import {logErrorWithObj} from "../utils/Logger";
import {IPostDoc, IUser} from "../entitys/interfaces";


export const getUsers = async () => {
    try {
        return await User.find();
    } catch (error) {
        console.error("Error in getUsers:", error);
    }
}

class UserService {

    public static async getUserById(id: string): Promise<IUser | null> {
        try {
            // const user = await User
            //     .findById(id)
            //     .exec();
            //
            // if (!user) {
            //     return null;
            // }

            return await User.findById(id);
        } catch (error: any) {
            await logErrorWithObj("getUser", error);
            throw new Error("Error while getting user by id");
        }
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
        } catch (error: any) {
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
        } catch (error: any) {
            await logErrorWithObj("getUser", error);
            throw new Error("Error while getting user by username");
        }
    }
}

export default UserService;
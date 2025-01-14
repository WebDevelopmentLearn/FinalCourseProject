import {IUser} from "../entitys/interfaces";
import User from "../models/User";
import {logErrorWithObj} from "../utils/Logger";

class AuthRepository {

    public static async createUser(userData: any) {
        try {
            const user: IUser = new User(userData);
            await user.save();
            return user;
        } catch (error: any) {
            await logErrorWithObj("createUser", error);
            throw new Error("Error while creating user");
        }
    }

    public static async getUserByEmailOrUsername(email: string, username: string) {
        return await User.findOne({
            $or: [{ email }, { username }]
        }).exec();
    }
}

export default AuthRepository;
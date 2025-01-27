import {IUser} from "../entitys/interfaces";
import User from "../models/User";
import {logErrorWithObj} from "../utils/Logger";

class AuthRepository {

    public static async createUserDoc(userData: any) {
        const user: IUser = new User(userData);
        return await user.save();
    }

    public static async getUserByEmailOrUsername(email: string, username: string) {
        return await User.findOne({
            $or: [{ email }, { username }]
        }).exec();
    }
}

export default AuthRepository;
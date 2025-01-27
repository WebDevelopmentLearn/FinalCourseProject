import {IUser} from "../entitys/interfaces";
import User from "../models/User";


class UserRepository {

    public static async findUserById(userId: string): Promise<IUser | null> {
        return User.findById(userId);
    }
}

export default UserRepository;
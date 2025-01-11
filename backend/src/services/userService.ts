import User from "../models/User";


export const getUsers = async () => {
    try {
        return await User.find();
    } catch (error) {
        console.error("Error in getUsers:", error);
    }
}
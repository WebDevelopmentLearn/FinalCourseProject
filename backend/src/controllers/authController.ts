import {Request, Response, NextFunction} from "express";
import {createUser} from "../services/authService";
import {IUser} from "../entitys/interfaces";


export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { email, full_name, username, password } = req.body;
        if (!email || !full_name || !username || !password)  res.status(400).json({ message: "All fields are required" });

        // Do something with the data
        const newUser: IUser | null = await createUser(email, full_name, username, password);

        if (newUser === null) {
            res.status(400).json({ message: "User with this email or username already exists" });
            return;
        }

        res.status(201).json({ message: "User created successfully",
            user: {
                email: newUser.email,
                full_name: newUser.full_name,
                username: newUser.username,
            }
        });

    } catch (error) {
        next(error);
    }
}
import { StatusCodes } from "http-status-codes";
import { User } from "../model/User";
import { Request, Response } from "express";

interface userProperty {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    contactNumber: string;
}

export const createUser = async (req: Request, res: Response) => {
    try {
        const input: userProperty = req.body;
        if (input) {
            const user = await User.findOne({ $or: [{ email: input.email }, { username: input.username }] });
            if (!user) {
                const newUser = new User(input);
                await newUser.save();
                return res.send({ success: true, message: "User created succssfully" })
            } else {
                throw { statusCode: StatusCodes.CONFLICT, message: 'User already exists' };
            }
        } else {
            throw { statusCode: StatusCodes.NOT_FOUND, message: 'Input is required' }
        }
    } catch (error: any) {
        const statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
        const message = error.message || "Something went wrong";
        res.status(statusCode).send(message);
    }
}
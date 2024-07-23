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
        console.log(input);
        if (Object.keys(input).length > 0) {
            const user = await User.findOne({ $or: [{ email: input.email }, { username: input.username }] });
            if (!user) {
                const newUser = new User(input);
                await newUser.save();
                return res.status(StatusCodes.CREATED).send({ success: true, message: "User created succssfully" })
            } else {
                throw { statusCode: StatusCodes.CONFLICT, message: 'User already exists' };
            }
        } else {
            throw { statusCode: StatusCodes.BAD_REQUEST, message: 'Input is required' }
        }
    } catch (error: any) {
        const statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
        const message = error.message || "Something went wrong";
        // console.log(message, statusCode);
        res.status(statusCode).send({ message: message, success: false });
    }
}




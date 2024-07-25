import { StatusCodes } from "http-status-codes";
import { User } from "../model/User";
import { Request, Response } from "express";


/**
 * Creates a new user in the system if the user does not already exist based on email or username.
 * 
 * @param {Request} req - The request object containing user details in the request body(firstName,lastName,userName,email,contactNumber).
 * @param {Response} res - The response object used to send a response to the client.
 * @returns {Promise<void>} - A promise that resolves when the user is successfully created or an error response is sent.
 * 
 * @throws {Object} Throws an object with `statusCode` and `message` properties if an error occurs.
 * - `statusCode` (number): The HTTP status code to send in the response.
 * - `message` (string): A description of the error that occurred.
 * 
 * @description
 * - The function extracts user details from the request body and validates the input.
 * - It checks if a user with the same email or username already exists in the database.
 * - If no such user is found, a new `User` object is created and saved to the database.
 * - A 201 status code with a success message is returned if the user is created successfully.
 * - If a user with the same email or username already exists, a 409 error is thrown with a message indicating that the user already exists.
 * - If no input data is provided, a 400 error is thrown with a message indicating that input is required.
 * - Catches and handles any errors by sending an appropriate response with the error message and status code.
 * 
 * @param {userProperty} input - The user details provided in the request body.
 * @param {string} input.username - The username of the user.
 * @param {string} input.firstName - The first name of the user.
 * @param {string} input.lastName - The last name of the user.
 * @param {string} input.email - The email address of the user.
 * @param {string} input.contactNumber - The contact number of the user.
 */
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
        res.status(statusCode).send({ message: message, success: false });
    }
}




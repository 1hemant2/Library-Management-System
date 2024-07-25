import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { Admin } from "../model/Admin";
import { StatusCodes } from "http-status-codes";
import jwt from 'jsonwebtoken'

/**
 * Creates a new Admin.
 * 
 * This function performs the following operations:
 * - Extracts the admin details from the request body.
 * - Checks if an admin with the provided email or username already exists in the repository.
 * - Validates the email format and password length; if invalid, throws a `BAD_REQUEST` error.
 * - Hashes the password using `bcrypt` for secure storage.
 * - Creates and saves the new admin record in the repository.
 * - Returns the newly created admin record with a status of `CREATED` if successful.
 * - If an admin with the same email or username already exists, throws a `CONFLICT` error.
 * - Handles errors and sends an appropriate response with a default `INTERNAL_SERVER_ERROR` status if no status code is provided.
 * 
 * @param {Request} req - The request object containing the admin details in the request body.
 * @param {body} - username,firstName,lastName,password,email,contactNumber.
 * @param {Response} res - The response object used to send the result or error response.
 * @throws {Object} - Throws an error with status code `BAD_REQUEST` and a message if the email is invalid or password length is insufficient.
 * @throws {Object} - Throws an error with status code `CONFLICT` and a message if an admin with the same email or username already exists.
 * @throws {Object} - Throws an error with status code `INTERNAL_SERVER_ERROR` and a message for unexpected internal errors.
 * 
 * @returns {void} - A JSON response with the newly created admin record and a success flag.
 */

interface AdminProperties {
    username: string;
    firstName: string;
    lastName: string;
    password: string;
    email: string;
    contactNumber: string;
}

export const createAdmin = async (req: Request, res: Response) => {
    try {
        const input: AdminProperties = req.body;
        if (Object.keys(input).length === 0) {
            throw { statusCode: StatusCodes.BAD_REQUEST, message: "Body should not be empty" };
        }
        const existingAdmin = await Admin.findOne({ $or: [{ email: input.email }, { username: input.username }] });

        if (!existingAdmin) {
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

            if (!emailRegex.test(input.email)) {
                throw { message: 'Please enter a valid email', statusCode: StatusCodes.BAD_REQUEST };
            }

            if (input.password.length < 4) {
                throw { message: 'Password length must be at least 4 characters', statusCode: StatusCodes.BAD_REQUEST };
            }

            input.password = await bcrypt.hash(input.password, 10);
            const newAdmin = new Admin(input);
            await newAdmin.save();
            res.status(StatusCodes.CREATED).send({ message: "user register successfully", success: true });
        } else {
            throw { message: 'Admin already exists', statusCode: StatusCodes.CONFLICT };
        }
    } catch (error: any) {
        const message = error.message || 'Something went wrong';
        const statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
        res.status(statusCode).send({ message, success: false });
    }
};

/**
 * Creates a get existing  Admin.
 * 
 * This function performs the following operations:
 * - Extracts the admin details from the request body.
 * - Checks if an admin with the provided email or username already exists in the repository.
 * - Hashes the password using `bcrypt` for validation.
 * - If existing admin is validate success fully fetched the data.
 * - Returns the newly  admin record with a status of `OK` if successful.
 * - If an admin with the same email or username not already exists, throws a `NOT_FOUND` error.
 * - Handles errors and sends an appropriate response with a default `INTERNAL_SERVER_ERROR` status if no status code is provided.
 * 
 * @param {Request} req - The request object containing the admin details in the request body.
 * @param {Response} res - The response object used to send the result or error response.
 * 
 * @throws {Object} - Throws an error with status code `BAD_REQUEST` and a message if the email is invalid
 * @throws {Object} - Throws an error with status code `NOT_FOUND` and a message if an admin with the same username not exists.
 * @throws {Object} - Throws an error with status code `INTERNAL_SERVER_ERROR` and a message for unexpected internal errors.
 * 
 * @returns {void} - A JSON response with the token,success message and a success flag.
 */

interface getAdminProperties {
    admin?: string;
    password: string;
}
export const getAdmin = async (req: Request, res: Response) => {
    try {
        const input: getAdminProperties = req.body;
        if (Object.keys(input).length > 0) {
            const existingAdmin = await Admin.findOne({ $or: [{ email: input.admin }, { username: input.admin }] });
            if (!existingAdmin) {
                throw { message: "admin doen't exist", statusCode: StatusCodes.NOT_FOUND };
            }
            const password = input.password;
            const result = await bcrypt.compare(password, existingAdmin.password);
            if (result) {
                const adminPayload = {
                    id: existingAdmin.id,
                    username: existingAdmin.username
                }
                const secretKey: string = process.env.SECRET_KEY || "dasfas";
                const token = jwt.sign(adminPayload, secretKey, { expiresIn: '30d' });
                return res.status(StatusCodes.OK).send({ message: 'login successful', token, success: true });
            } else {
                throw { message: 'Invalid credential.', statusCode: StatusCodes.UNAUTHORIZED }
            }
        } else {
            throw { statusCode: StatusCodes.BAD_REQUEST, message: "Body should not be empty" };
        }
    } catch (error: any) {
        const message = error.message || 'Something went wrong';
        const statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
        res.status(statusCode).send({ message, success: false });
    }
};

/**
 * @description Verifies if an admin exists in the system based on the provided ID.
 * @param {Request} req - The Express request object, containing the body with the admin ID.
 * @param {Response} res - The Express response object used to send the response.
 * @returns {Promise<void>} A promise that resolves to void. Sends a response indicating whether the admin exists or an error occurred.
 * @throws {Object} Throws an error with a message and status code if the admin does not exist or if the request body is empty.
 * @throws {Error} Throws an internal server error if an unexpected issue occurs during execution.
 */

export const varifyAdmin = async (req: Request, res: Response) => {
    try {
        const input = req.body;
        if (Object.keys(input).length > 0) {
            const existingAdmin = await Admin.findById(input.id);
            if (!existingAdmin) {
                throw { message: "admin doen't exist", statusCode: StatusCodes.NOT_FOUND };
            }
            return res.status(StatusCodes.OK).send({ message: 'Admin exist', success: true });
        } else {
            throw { message: "admin doen't exist", statusCode: StatusCodes.NOT_FOUND };
        }
    } catch (error: any) {
        const message = error.message || 'Something went wrong';
        const statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
        res.status(statusCode).send({ message, success: false });
    }
};



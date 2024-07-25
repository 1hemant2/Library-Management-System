import { createUser } from "../controller/userController";
import { Router } from "express";

const route = Router();

/**
 * Creates a new user in the system if the user does not already exist based on email or username.
 * 
 * This function performs the following operations:
 * - Extracts user details from the request body.
 * - Checks if a user with the same email or username already exists in the database.
 * - If no such user is found, creates a new `User` object and saves it to the database.
 * - Returns a success message with a `201 Created` status code if the user is created successfully.
 * - Throws a `409 Conflict` error if a user with the same email or username already exists.
 * - Throws a `400 Bad Request` error if no input data is provided.
 * - Catches and handles any unexpected errors by sending an appropriate error response.
 * 
 * @param {Request} req - The Express request object containing the user details in the request body.
 * @param {Object} req.body - The request body should contain:
 *   - `username` (string): The username of the user.
 *   - `firstName` (string): The first name of the user.
 *   - `lastName` (string): The last name of the user.
 *   - `email` (string): The email address of the user.
 *   - `contactNumber` (string): The contact number of the user.
 * @param {Response} res - The Express response object used to send the result or error response.
 * @returns {Promise<void>} - A promise that resolves to void. Sends a JSON response with a success message or an error message.
 * 
 * @throws {Object} - Throws an error with status code `BAD_REQUEST` and a message if no input data is provided.
 * @throws {Object} - Throws an error with status code `CONFLICT` and a message if a user with the same email or username already exists.
 * @throws {Error} - Throws an error with status code `INTERNAL_SERVER_ERROR` and a message for unexpected internal errors.
 * 
 * @description
 * - Extracts user details from the request body and verifies that input data is provided.
 * - Checks the database for an existing user with the same email or username.
 * - If the user does not exist, creates a new user record and saves it to the database.
 * - If the user already exists, returns a conflict error.
 * - Handles errors by sending a response with the appropriate status code and error message.
 */
route.post('/register', createUser)


export default route;
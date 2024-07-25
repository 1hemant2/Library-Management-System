import { Router } from "express";
const route = Router();
import { userTransaction } from "../controller/transactionController";

/**
 * Retrieves and returns the transaction history for a specific user, including details about the books involved.
 * 
 * This function performs the following operations:
 * - Extracts the user identifier (email or username) from the request parameters.
 * - Checks if the user identifier is provided in the request parameters.
 * - Finds the user in the database by either email or username.
 * - Populates the user's transactions with details about the books involved (e.g., name, author).
 * - Returns a success message with the transaction data if the user is found.
 * - Throws a `CONFLICT` error if the user does not exist.
 * - Throws a `BAD_REQUEST` error if the input is missing.
 * - Handles any unexpected errors by sending an appropriate error response.
 * 
 * @param {Request} req - The Express request object containing the user identifier in the request parameters.
 * @param {Object} req.params - The request parameters should contain:
 *   - `user` (string): The email or username of the user whose transaction history is being retrieved.
 * @param {Response} res - The Express response object used to send the result or error response.
 * @returns {Promise<void>} - A promise that resolves to void. Sends a JSON response with the transaction data or an error message.
 * 
 * @throws {Object} - Throws an error with status code `BAD_REQUEST` and a message if the user identifier is missing.
 * @throws {Object} - Throws an error with status code `CONFLICT` and a message if the user does not exist.
 * @throws {Error} - Throws an error with status code `INTERNAL_SERVER_ERROR` and a message for unexpected internal errors.
 * 
 * @description
 * - Retrieves the user identifier from the request parameters.
 * - Verifies that the user identifier is provided and throws an error if not.
 * - Finds the user by email or username and populates their transactions with details about the books involved.
 * - If the user is found, returns a success message and the transaction data with a status code of `CREATED`.
 * - If the user does not exist, returns a `CONFLICT` error.
 * - Handles any errors by sending an appropriate error response with the error message and status code.
 */

route.get('/userTransaction/:user', userTransaction);

export default route;
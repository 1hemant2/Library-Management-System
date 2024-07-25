import { createAdmin, getAdmin, varifyAdmin } from "../controller/adminController";
import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware";
const route = Router();

/**
 * Creates a new Admin.
 * 
 * @route POST /register
 * @param {Request} req - The request object containing the admin details in the request body.
 * @param {body} req.body - The request body should contain the following properties:
 *   - `username` (string): The username for the new admin.
 *   - `firstName` (string): The first name of the new admin.
 *   - `lastName` (string): The last name of the new admin.
 *   - `password` (string): The password for the new admin, which will be hashed before storage.
 *   - `email` (string): The email address for the new admin, which will be validated for proper format.
 *   - `contactNumber` (string): The contact number of the new admin.
 * @param {Response} res - The response object used to send the result or error response.
 * @returns {void} - A JSON response with the newly created admin record and a success flag if creation is successful.
 * 
 * @throws {Object} Throws an error with `statusCode` and `message` properties if:
 * - The request body is empty, with a `BAD_REQUEST` error.
 * - An admin with the same email or username already exists, with a `CONFLICT` error.
 * - The email format is invalid or password length is insufficient, with a `BAD_REQUEST` error.
 * - Unexpected internal errors occur, with a default `INTERNAL_SERVER_ERROR` error.
 * 
 * @description
 * - Extracts the admin details from the request body.
 * - Checks if an admin with the provided email or username already exists in the repository.
 * - Validates the email format using a regular expression and ensures the password length is at least 4 characters.
 * - Hashes the password using `bcrypt` for secure storage.
 * - Creates and saves a new admin record in the repository.
 * - Responds with a success message and a `CREATED` status if the admin is successfully registered.
 * - Handles various errors and sends an appropriate response with the error message and status code.
 */
route.post('/register', createAdmin)

/**
 * Authenticates an existing Admin.
 * 
 * This function performs the following operations:
 * - Extracts the admin details from the request body.
 * - Checks if an admin with the provided email or username exists in the repository.
 * - Compares the provided password with the hashed password stored in the repository using `bcrypt`.
 * - If the password matches, generates a JSON Web Token (JWT) for the admin.
 * - Returns the token along with a success message and status of `OK` if authentication is successful.
 * - If the admin does not exist, throws a `NOT_FOUND` error.
 * - If the password does not match, throws an `UNAUTHORIZED` error.
 * - Handles various errors and sends an appropriate response with the error message and status code.
 * 
 * @param {Request} req - The request object containing the admin details in the request body.
 * @param {body} req.body - The request body should contain:
 *   - `admin` (string): The email or username of the admin.
 *   - `password` (string): The password for the admin.
 * @param {Response} res - The response object used to send the result or error response.
 * @returns {void} - A JSON response with the JWT token, success message, and a success flag if authentication is successful.
 * 
 * @throws {Object} - Throws an error with status code `BAD_REQUEST` and a message if the request body is empty.
 * @throws {Object} - Throws an error with status code `NOT_FOUND` and a message if no admin with the provided email or username exists.
 * @throws {Object} - Throws an error with status code `UNAUTHORIZED` and a message if the provided password does not match.
 * @throws {Object} - Throws an error with status code `INTERNAL_SERVER_ERROR` and a message for unexpected internal errors.
 * 
 * @description
 * - Extracts admin credentials (email or username and password) from the request body.
 * - Checks if an admin with the provided email or username exists in the database.
 * - Validates the provided password against the hashed password stored in the database.
 * - If authentication is successful, generates a JWT for the admin and sends it in the response.
 * - Handles errors such as non-existent admin, incorrect password, or empty request body, and responds with the appropriate error message and status code.
 */
route.post('/login', getAdmin)

/**
 * Verifies if an admin exists in the system based on the provided ID.
 * 
 * This function performs the following operations:
 * - Extracts the admin ID from the request body.
 * - Checks if an admin with the provided ID exists in the repository.
 * - Returns a success message with status `OK` if the admin exists.
 * - Throws a `NOT_FOUND` error if the admin does not exist or if the request body is empty.
 * - Handles various errors and sends an appropriate response with the error message and status code.
 * 
 * @param {Request} req - The Express request object containing the admin ID in the request body.
 * @param {Object} req.body - The request body should contain:
 *   - `id` (string): The ID of the admin to be verified.
 * @param {Response} res - The Express response object used to send the result or error response.
 * @returns {Promise<void>} - A promise that resolves to void. Sends a JSON response indicating whether the admin exists or an error occurred.
 * 
 * @throws {Object} - Throws an error with status code `NOT_FOUND` and a message if the admin does not exist or if the request body is empty.
 * @throws {Error} - Throws an error with status code `INTERNAL_SERVER_ERROR` and a message for unexpected internal errors.
 * 
 * @description
 * - Extracts the admin ID from the request body.
 * - Checks if an admin with the provided ID exists in the database.
 * - If the admin exists, responds with a success message indicating that the admin exists.
 * - If the admin does not exist or if the request body is empty, responds with a `NOT_FOUND` error.
 * - Handles any internal server errors and responds with an appropriate error message and status code.
 */
route.get('/varify', authMiddleware, varifyAdmin);


export default route;  
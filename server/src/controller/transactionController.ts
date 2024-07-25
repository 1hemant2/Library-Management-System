import { LibraryTransaction } from "../model/LibraryTransaction";
import { User } from "../model/User";
import { Book } from "../model/Book";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

/**
 * Creates a new transaction record for issuing or returning a book, and updates the user's transaction history.
 * 
 * @param {Request} req - The request object containing transaction details in the request body(username or email,bookName).
 * @param {Response} res - The response object used to send a response to the client.
 * @returns {Promise<{ message: string, success: boolean }>} - A promise that resolves with a success message and status, or an error message if the transaction fails.
 * 
 * @throws {Object} Throws an object with `statusCode` and `message` properties if an error occurs.
 * - `statusCode` (number): The HTTP status code to send in the response.
 * - `message` (string): A description of the error that occurred.
 * 
 * @description
 * - The function retrieves the input data from the request body(username or email , bookname).
 * - It checks if the input data is provided, and throws a 400 error if it is missing.
 * - It finds the user in the database using either the username or email provided in the input.
 * - Throws a 404 error if the user is not found.
 * - It finds the book with the specified name in the database.
 * - Throws a 404 error if the book is not found.
 * - Depending on the `transactionType` (either 'issue' or 'return'), it calculates the due date for the transaction.
 * - Creates a new `LibraryTransaction` record with the user ID, book ID, transaction type, and due date (if applicable).
 * - Saves the transaction record and adds the transaction ID to the user's transaction history.
 * - Saves the updated user record.
 * - Returns a success message if the transaction is completed successfully.
 * - Catches and handles any errors, returning an error message with the appropriate status code.
 */
export const createTransaction = async (req: Request, res: Response) => {
    try {
        const input = req.body;
        if (Object.keys(input).length === 0) {
            throw { message: "input is required", statusCode: StatusCodes.BAD_REQUEST };
        }
        const user = await User.findOne({ $or: [{ username: input.user }, { email: input.user }] });
        if (!user) {
            throw { message: "user doesn't exist", statusCode: StatusCodes.NOT_FOUND };
        }
        const book = await Book.findOne({ name: input.bookName });
        if (!book) {
            throw { message: "Book doesn't exist", statusCode: StatusCodes.NOT_FOUND };
        }
        const dueDate = input.transactionType === 'issue' ? new Date() : null;
        if (dueDate) {
            dueDate.setDate(dueDate.getDate() + 15);
        }
        const transaction = new LibraryTransaction({
            user: user._id,
            book: book._id,
            transactionType: input.transactionType,
            dueDate: dueDate
        });
        await transaction.save();
        // console.log(book, user.transaction, d._id);
        user.transaction.push(transaction._id);
        await user.save();
        return ({ message: `transaction completed`, success: true });
    } catch (error: any) {
        // const statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
        const message = error.message || 'something went wrong';
        return ({ success: false, message: message });
    }
}

/**
 * Retrieves and returns the transaction history for a specific user, including details about the books involved.
 * 
 * @param {Request} req - The request object containing the user's email or username in the request parameters.
 * @param {Response} res - The response object used to send a response to the client.
 * @returns {Promise<void>} - A promise that resolves when the user's transaction history is successfully retrieved and sent in the response, or an error response is sent.
 * 
 * @throws {Object} Throws an object with `statusCode` and `message` properties if an error occurs.
 * - `statusCode` (number): The HTTP status code to send in the response.
 * - `message` (string): A description of the error that occurred.
 * 
 * @description
 * - The function retrieves the input data (user identifier) from the request parameters.
 * - It checks if the input data is provided and throws a 400 error if it is missing.
 * - It finds the user in the database by either email or username and populates the user's transactions with details about the books involved.
 * - If the user is found, it returns a 201 status code with a success message and the transaction data in the response.
 * - If the user is not found, it throws a 409 error with a message indicating that the user does not exist.
 * - Catches and handles any errors by sending an appropriate response with the error message and status code.
 */
export const userTransaction = async (req: Request, res: Response) => {
    try {
        const input = req.params;
        if (Object.keys(input).length > 0) {
            const user = await User.findOne({ $or: [{ email: input.user }, { username: input.user }] }).populate({
                path: 'transaction',
                populate: [
                    {
                        path: 'book',
                        select: 'name author'
                    }
                ]
            });

            if (user) {
                return res.status(StatusCodes.CREATED).send({ success: true, message: "all the data related to user", data: user.transaction })
            } else {
                throw { statusCode: StatusCodes.CONFLICT, message: 'User does not exists' };
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
import { Book } from "../model/Book";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { createTransaction } from "./transactionController";

/**
 * Handles the request to add a new book to the database.

 * @function addBook
 * @param {Request} req - The Express request object. It should contain the body with the book's details (name, author,avilabality).
 * @param {Response} res - The Express response object. It will send a JSON response indicating success or failure of the operation.
 * 
 * @throws {Object} Throws an error with a status code and message if the operation fails or if input validation fails.
 * 
 * @returns {Promise<void>} A promise that resolves to void. Sends a JSON response with status and message indicating the result of the operation.
 * 
 */

export const addBook = async (req: Request, res: Response) => {
    try {
        const input = req.body;
        if (Object.keys(input).length > 0) {
            const book = await Book.findOne({ name: input.name });
            if (!book) {
                const newBook = new Book(input);
                await newBook.save();
                return res.status(StatusCodes.CREATED).send({ success: true, message: "Book added succssfully" })
            } else {
                throw { statusCode: StatusCodes.CONFLICT, message: 'Book already exists' };
            }
        } else {
            throw { message: "Input is required", statusCode: StatusCodes.BAD_REQUEST };
        }
    } catch (error: any) {
        const statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
        const message = error.message || "Something went wrong";
        res.status(statusCode).send({ message: message, success: false });
    }
}


/**
 * Handles the request to change the availability of a book in the database.
 * 
 * @async
 * @function changeBookAvaiblity
 * @param {Request} req - The Express request object. It should contain the body with the book's name and current availability.
 * @param {Response} res - The Express response object. It will send a JSON response indicating success or failure of the operation.
 * 
 * @throws {Object} Throws an error with a status code and message if the operation fails or if input validation fails.
 * 
 * @returns {Promise<void>} A promise that resolves to void. Sends a JSON response with status and message indicating the result of the operation.
 */
interface addBookAvaiblityProperties {
    name: string,
    currentAvailability: number
}

export const changeBookAvaiblity = async (req: Request, res: Response) => {
    try {
        const input: addBookAvaiblityProperties = req.body;
        if (Object.keys(input).length > 0) {
            const book = await Book.findOne({ name: input.name });
            if (book) {
                book.currentAvailability = input.currentAvailability;
                await book.save();
                return res.status(StatusCodes.CREATED).send({ success: true, message: "Book avilability changes", currentAvailability: book.currentAvailability })
            } else {
                throw { statusCode: StatusCodes.CONFLICT, message: 'Book already exists' };
            }
        } else {
            throw { statusCode: StatusCodes.BAD_REQUEST, message: "input is required" };
        }
    } catch (error: any) {
        const statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
        const message = error.message || "Something went wrong";
        res.status(statusCode).send({ message: message, success: false });
    }
}

/**
 * Deletes a book from the database based on the provided name in the request parameters.
 * 
 * @param {Request} req - The request object containing params(name of book).
 * @param {Response} res - The response object used to send a response to the client.
 * @returns {Promise<void>} - A promise that resolves when the book has been successfully deleted or an error response is sent.
 * 
 * @throws {Object} Throws an object with `statusCode` and `message` properties if an error occurs.
 * - `statusCode` (number): The HTTP status code to send in the response.
 * - `message` (string): A description of the error that occurred.
 * 
 * @description
 * - If the request parameters contain a `name`, it attempts to find and delete the book with that name.
 * - If the book is found, it deletes the book and responds with a success message.
 * - If the book is not found, it throws a 404 error with a message indicating that the book does not exist.
 * - If no parameters are provided, it throws a 400 error indicating that input is required.
 * - Handles errors by sending a response with the appropriate status code and error message.
 */
export const deleteBook = async (req: Request, res: Response) => {
    try {
        const input = req.params;
        if (Object.keys(input).length > 0) {
            const book = await Book.findOne({ name: input.name });
            if (book) {
                await Book.deleteOne({ name: input.name });
                return res.status(StatusCodes.OK).send({ success: true, message: "Book deleted succssfully" })
            } else {
                throw { statusCode: StatusCodes.NOT_FOUND, message: 'Book does not exist' };
            }
        } else {
            throw { statusCode: StatusCodes.BAD_REQUEST, message: "input is required" };
        }
    } catch (error: any) {
        const statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
        const message = error.message || "Something went wrong";
        res.status(statusCode).send({ message: message, success: false });
    }
}

/**
 * Retrieves a paginated list of books from the database based on the provided page number.
 * 
 * @param {Request} req - The request object containing the page number in the request parameters.
 * @param {Response} res - The response object used to send a response to the client.
 * @returns {Promise<void>} - A promise that resolves when the book list has been successfully retrieved and sent to the client, or an error response is sent.
 * 
 * @throws {Object} Throws an object with `statusCode` and `message` properties if an error occurs.
 * - `statusCode` (number): The HTTP status code to send in the response.
 * - `message` (string): A description of the error that occurred.
 * 
 * @description
 * - The function uses the page number from the request parameters to determine which page of books to retrieve.
 * - If the page number is invalid (i.e., not a number or less than 1), it throws a 400 error with an appropriate message.
 * - Calculates the number of books to skip based on the page number and page length (12 books per page).
 * - Retrieves a paginated list of books from the database and counts the total number of books.
 * - Calculates the total number of pages based on the total number of books and the page length.
 * - Responds with a success message, the list of books, and the total number of pages.
 * - Handles errors by sending a response with the appropriate status code and error message.
 */
export const getBooks = async (req: Request, res: Response) => {
    try {
        const pageLength = 12;
        const pageNo: number = Number(req.params.pageNo);
        if (isNaN(pageNo) || pageNo < 1) {
            throw { message: 'Invalid page number', statusCode: StatusCodes.BAD_REQUEST }
        }
        const skip = (pageNo - 1) * pageLength;
        const book = await Book.find()
            .skip(skip).limit(pageLength);
        const count = await Book.countDocuments()
        const totalPage = count % 12 === 0 ? count / pageLength : Math.ceil(count / pageLength);
        return res.status(StatusCodes.OK).send({ message: "all the book are here", data: book, success: true, totalPage });

    } catch (error: any) {
        const statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
        const message = error.message || "Something went wrong";
        res.status(statusCode).send({ message: message, success: false });
    }
}

/**
 * Retrieves details of a specific book from the database based on the provided book name.
 * 
 * @param {Request} req - The request object containing the book name in the request parameters.
 * @param {Response} res - The response object used to send a response to the client.
 * @returns {Promise<void>} - A promise that resolves when the book details have been successfully retrieved and sent to the client, or an error response is sent.
 * 
 * @throws {Object} Throws an object with `statusCode` and `message` properties if an error occurs.
 * - `statusCode` (number): The HTTP status code to send in the response.
 * - `message` (string): A description of the error that occurred.
 * 
 * @description
 * - The function retrieves the book name from the request parameters.
 * - It then queries the database to find a book with the specified name.
 * - If the book is found, it responds with the book details along with a success message.
 * - If the book is not found or an error occurs during the query, it handles the error by sending a response with the appropriate status code and error message.
 */
export const bookDetails = async (req: Request, res: Response) => {
    try {
        const bookName: string = req.params.bookName;
        const book = await Book.findOne({ name: bookName })
        return res.status(StatusCodes.OK).send({ message: "Book details is here", data: book, success: true, });

    } catch (error: any) {
        const statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
        const message = error.message || "Something went wrong";
        res.status(statusCode).send({ message: message, success: false });
    }
}

/**
 * Searches for books in the database based on the provided name in the request parameters.
 * 
 * @param {Request} req - The request object containing the search input in the request parameters.
 * @param {Response} res - The response object used to send a response to the client.
 * @returns {Promise<void>} - A promise that resolves when the search results have been successfully retrieved and sent to the client, or an error response is sent.
 * 
 * @throws {Object} Throws an object with `statusCode` and `message` properties if an error occurs.
 * - `statusCode` (number): The HTTP status code to send in the response.
 * - `message` (string): A description of the error that occurred.
 * 
 * @description
 * - The function checks if any input parameters are provided in the request.
 * - If no input is provided, it throws a 400 error indicating that input is required.
 * - It then queries the database to find books with names matching the provided search input.
 * - Responds with a success message and the found book data.
 * - Handles errors by sending a response with the appropriate status code and error message.
 */
export const searchBook = async (req: Request, res: Response) => {
    try {
        const input = req.params;
        if (Object.keys(input).length === 0) {
            throw { statusCode: StatusCodes.BAD_REQUEST, message: "input is required" };
        }
        const data = await Book.find({ name: input.name });
        res.status(StatusCodes.OK).send({ message: "Book found", data: data, success: true });
    } catch (error: any) {
        const statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
        const message = error.message || "Something went wrong";
        res.status(statusCode).send({ message: message, success: false });
    }
}


/**
 * Issues a book to a user by updating the book's availability and creating a transaction record.
 * 
 * @param {Request} req - The request object containing the book details in the request body(username-whom to assign,bookName).
 * @param {Response} res - The response object used to send a response to the client.
 * @returns {Promise<void>} - A promise that resolves when the book has been successfully issued or an error response is sent.
 * 
 * @throws {Object} Throws an object with `statusCode` and `message` properties if an error occurs.
 * - `statusCode` (number): The HTTP status code to send in the response.
 * - `message` (string): A description of the error that occurred.
 * 
 * @description
 * - The function retrieves the input data from the request body.
 * - It first attempts to create a transaction record using the `createTransaction` function.
 * - If the transaction creation fails, it throws a 500 error indicating that something went wrong.
 * - It then finds the book with the specified name from the database.
 * - If the book is found and is available (i.e., `currentAvailability` is greater than 0), it decrements the availability count and saves the updated book record.
 * - Responds with a success message, the updated availability of the book, and a success flag.
 * - If the book is not found, it throws a 404 error with a message indicating that the book was not found.
 * - If the book is found but is not available, it throws a 409 error indicating a conflict due to the book being unavailable.
 * - Handles errors by logging the error message and sending a response with the appropriate status code and error message.
 */
export const issueBook = async (req: Request, res: Response) => {
    try {
        const input = req.body;

        const transaction = await createTransaction(req, res);
        if (!transaction.success) {
            throw { message: "something went wrong", statucCode: StatusCodes.INTERNAL_SERVER_ERROR }
        }
        const book = await Book.findOne({ name: input.bookName });

        if (book && book.currentAvailability > 0) {
            book.currentAvailability -= 1;
            await book.save();

            return res.status(StatusCodes.OK).send({
                message: "Book issued",
                success: true,
                currentAvailability: book.currentAvailability
            });
        } else if (!book) {
            throw { statusCode: StatusCodes.NOT_FOUND, message: 'Book not found' };
        } else {
            throw { statusCode: StatusCodes.CONFLICT, message: 'Book is not available' };
        }
    } catch (error: any) {
        const statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
        const message = error.message || "Something went wrong";
        res.status(statusCode).send({ message: message, success: false });
    }
};

/**
 * Handles the return of a book by updating its availability in the database and creating a transaction record.
 * 
 * @param {Request} req - The request object containing the book details in the request body {username,bookname}.
 * @param {Response} res - The response object used to send a response to the client.
 * @returns {Promise<void>} - A promise that resolves when the book has been successfully returned and updated in the database, or an error response is sent.
 * 
 * @throws {Object} Throws an object with `statusCode` and `message` properties if an error occurs.
 * - `statusCode` (number): The HTTP status code to send in the response.
 * - `message` (string): A description of the error that occurred.
 * 
 * @description
 * - The function retrieves the input data from the request body.
 * - It attempts to create a transaction record using the `createTransaction` function.
 * - If transaction creation fails, it throws a 500 error indicating an internal server error.
 * - It then finds the book with the specified name from the database.
 * - If the book is found, it increments the `currentAvailability` count and saves the updated book record.
 * - Responds with a success message, the updated availability of the book, and a success flag.
 * - If the book is not found, it throws a 404 error with a message indicating that the book was not found.
 * - Handles errors by logging the error message and sending a response with the appropriate status code and error message.
 */
export const returnBook = async (req: Request, res: Response) => {
    try {
        const input = req.body;

        const transaction = await createTransaction(req, res);
        if (!transaction.success) {
            throw { message: "something went wrong", statucCode: StatusCodes.INTERNAL_SERVER_ERROR }
        }
        const book = await Book.findOne({ name: input.bookName });
        if (book) {
            book.currentAvailability += 1;
            await book.save();

            return res.status(StatusCodes.OK).send({
                message: "Book returned",
                success: true,
                currentAvailability: book.currentAvailability
            });
        } else if (!book) {
            throw { statusCode: StatusCodes.NOT_FOUND, message: 'Book not found' };
        } else {
            throw { statusCode: StatusCodes.CONFLICT, message: 'Book is not available' };
        }
    } catch (error: any) {
        const statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
        const message = error.message || "Something went wrong";
        res.status(statusCode).send({ message: message, success: false });
    }
};
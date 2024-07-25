import { Router } from "express";
const route = Router();
import { addBook, bookDetails, changeBookAvaiblity, deleteBook, getBooks, issueBook, returnBook, searchBook } from "../controller/bookController";
import authMiddleware from "../middleware/authMiddleware";

/**
 * Route to add a new book to the database.
 * 
 * @route POST /addBook
 * @middleware authMiddleware - Middleware to authenticate the request.
 * @handler addBook - Function to handle the addition of a new book.
 *
 * @returns {Object} JSON response with status and message indicating the result of the operation.
 * 
 * @example
 * // Request body example:
 * {
 *   "name": "Book Name",
 *   "author": "Author Name",
 *   "availability": true
 * }
 * 
 * // Success response example:
 * {
 *   "success": true,
 *   "message": "Book added successfully"
 * }
 * 
 * // Failure response example (book already exists):
 * {
 *   "success": false,
 *   "message": "Book already exists"
 * }
 * 
 * // Failure response example (input validation failed):
 * {
 *   "success": false,
 *   "message": "Input is required"
 * }
 */
route.post('/addBook', authMiddleware, addBook);

/**
 * Retrieves a paginated list of books from the database based on the provided page number.
 * 
 * @route GET /getBook/:pageNo
 * @param {Request} req - The Express request object containing the page number in the request parameters.
 * @param {Response} res - The Express response object used to send a response to the client.
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
route.get('/getBook/:pageNo', getBooks);

/**
 * Retrieves details of a specific book from the database based on the provided book name.
 * 
 * @route GET /bookDetails/:bookName
 * @middleware authMiddleware - Middleware to authenticate the request.
 * @param {Request} req - The Express request object containing the book name in the request parameters.
 * @param {Response} res - The Express response object used to send a response to the client.
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
route.get('/bookDetails/:bookName', authMiddleware, bookDetails);

/**
 * Handles the request to change the availability of a book in the database.
 * 
 * @route PATCH /avilability
 * @middleware authMiddleware - Middleware to authenticate the request.
 * @param {Request} req - The Express request object. It should contain the body with the book's name and current availability.
 * @param {Response} res - The Express response object. It will send a JSON response indicating success or failure of the operation.
 * @returns {Promise<void>} - A promise that resolves to void. Sends a JSON response with status and message indicating the result of the operation.
 * 
 * @throws {Object} Throws an object with `statusCode` and `message` properties if an error occurs or if input validation fails.
 * - `statusCode` (number): The HTTP status code to send in the response.
 * - `message` (string): A description of the error that occurred.
 * 
 * @description
 * - The function expects the request body to contain the book's name and current availability.
 * - It first checks if the request body has the necessary properties.
 * - If valid, it queries the database to find the book with the specified name.
 * - If the book is found, it updates the current availability and saves the changes.
 * - If the book is not found or an error occurs, it handles the error by sending a response with the appropriate status code and error message.
 */
route.patch('/avilability', authMiddleware, changeBookAvaiblity);

/**
 * Issues a book to a user by updating the book's availability and creating a transaction record.
 * 
 * @route POST /issue
 * @middleware authMiddleware - Middleware to authenticate the request.
 * @param {Request} req - The request object containing the book details in the request body (username - whom to assign, bookName).
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
route.post('/issue', authMiddleware, issueBook)

/**
 * Handles the return of a book by updating its availability in the database and creating a transaction record.
 * 
 * @route POST /return
 * @middleware authMiddleware - Middleware to authenticate the request.
 * @param {Request} req - The request object containing the book details in the request body (username, bookName).
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
route.post('/return', authMiddleware, returnBook)

/**
 * Deletes a book from the database based on the provided name in the request parameters.
 * 
 * @route DELETE /delete/:name
 * @middleware authMiddleware - Middleware to authenticate the request.
 * @param {Request} req - The request object containing params (name of the book).
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
route.delete('/delete/:name', authMiddleware, deleteBook)

/**
 * Searches for books in the database based on the provided name in the request parameters.
 * 
 * @route GET /search/:name
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
route.get('/search/:name', searchBook)

export default route;   
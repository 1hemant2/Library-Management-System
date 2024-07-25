import { Book } from "../model/Book";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { createTransaction } from "./transactionController";

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

export const searchBook = async (req: Request, res: Response) => {
    try {
        const input = req.body;
        if (Object.keys(input).length === 0) {
            throw { statusCode: StatusCodes.BAD_REQUEST, message: "input is required" };
        }
        const data = await Book.find({ name: input.name });

        console.log(data);
        res.status(StatusCodes.OK).send({ message: "Book found", data: data, success: true });
    } catch (error: any) {
        const statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
        const message = error.message || "Something went wrong";
        res.status(statusCode).send({ message: message, success: false });
    }
}

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
            // console.log('Updated Book Availability:', book.currentAvailability);

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
        console.error('Error:', message);
        res.status(statusCode).send({ message: message, success: false });
    }
};

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
        console.error('Error:', message);
        res.status(statusCode).send({ message: message, success: false });
    }
};
import { Book } from "../model/Book";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

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

export const addBookAvaiblity = async (req: Request, res: Response) => {
    try {
        const input: addBookAvaiblityProperties = req.body();
        if (Object.keys(input).length > 0) {
            const book = await Book.findOne({ name: input.name });
            if (book) {
                book.currentAvailability = input.currentAvailability;
                await book.save();
                return res.status(StatusCodes.CREATED).send({ success: true, message: "Book added succssfully" })
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
        const input = req.body();
        if (Object.keys(input).length > 0) {
            const book = await Book.findOne({ name: input.name });
            if (book) {
                await Book.deleteOne({ name: input.name });
                return res.status(StatusCodes.CREATED).send({ success: true, message: "Book deleted succssfully" })
            } else {
                throw { statusCode: StatusCodes.CONFLICT, message: 'Book does not exist' };
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
        const pageLength = 4;
        const pageNo: number = Number(req.params.pageNo);
        if (isNaN(pageNo) || pageNo < 1) {
            return res.status(400).send({ message: 'Invalid page number' });
        }
        const skip = (pageNo - 1) * pageLength;
        const book = await Book.find().skip(skip).limit(pageLength);
        if (book.length === 0) {
            throw { message: "book inventory is empty", satatusCode: StatusCodes.NOT_FOUND }
        } else {
            return res.status(StatusCodes.OK).send({ message: "all the book are here", data: book, success: true });
        }
    } catch (error: any) {
        const statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
        const message = error.message || "Something went wrong";
        res.status(statusCode).send({ message: message, success: false });
    }
}

export const searchBook = async (req: Request, res: Response) => {
    try {
        const input = req.body;
        if (Object.keys(input).length > 0) {
            throw { statusCode: StatusCodes.BAD_REQUEST, message: "input is required" };
        }
        const data = await Book.find({ name: input.name });
        if (!data) {
            throw { message: "No book exist", statusCode: StatusCodes.NOT_FOUND };
        }
        res.status(StatusCodes.OK).send({ message: "Book found", data: data, success: true });
    } catch (error: any) {
        const statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
        const message = error.message || "Something went wrong";
        res.status(statusCode).send({ message: message, success: false });
    }
}
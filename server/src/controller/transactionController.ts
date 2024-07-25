import { LibraryTransaction } from "../model/LibraryTransaction";
import { User } from "../model/User";
import { Book } from "../model/Book";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

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
                return res.status(StatusCodes.CREATED).send({ success: true, message: "User created succssfully", data: user.transaction })
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
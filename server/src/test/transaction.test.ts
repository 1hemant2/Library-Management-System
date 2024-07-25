import { LibraryTransaction } from "../model/LibraryTransaction";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { mockRequest, mockResponse } from "jest-mock-req-res";
import { createTransaction, userTransaction } from "../controller/transactionController";
import { User } from "../model/User";
import { Book } from "../model/Book";

jest.mock('../model/LibraryTransaction');
jest.mock('../model/User');
jest.mock('../model/Book');

describe('transactionController - createTransaction', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return success message and true if transaction created successfully', async () => {
        const req = mockRequest({
            body: {
                username: 'testu1',
                email: 'testu1@gmail.com',
                bookName: "A Song of Ice and Fire",
                transactionType: 'borrow'
            }
        });

        (User.findOne as jest.Mock).mockResolvedValue({
            _id: 'userId',
            transaction: [],
            save: jest.fn().mockResolvedValue({ transaction: ['transactionId'] })
        });
        (Book.findOne as jest.Mock).mockResolvedValue({ _id: 'bookId' });
        (LibraryTransaction.prototype.save as jest.Mock).mockResolvedValue({ _id: 'transactionId' });

        const result = await createTransaction(req as Request, {} as Response);

        expect(result).toEqual({
            message: "transaction completed",
            success: true,
        });
    });

    it('should return an error message and false if input is missing', async () => {
        const req = mockRequest({ body: {} });

        const result = await createTransaction(req as Request, {} as Response);

        expect(result).toEqual({
            message: "input is required",
            success: false,
        });
    });

    it('should return an error message and false if user does not exist', async () => {
        const req = mockRequest({
            body: {
                username: 'testu1',
                email: 'testu1@gmail.com',
                bookName: "A Song of Ice and Fire",
                transactionType: 'borrow'
            }
        });

        (User.findOne as jest.Mock).mockResolvedValue(null);
        (Book.findOne as jest.Mock).mockResolvedValue({ _id: 'bookId' });

        const result = await createTransaction(req as Request, {} as Response);

        expect(result).toEqual({
            message: "user doesn't exist",
            success: false,
        });
    });

    it('should return an error message and false if book does not exist', async () => {
        const req = mockRequest({
            body: {
                username: 'testu1',
                email: 'testu1@gmail.com',
                bookName: "A Song of Ice and Fire",
                transactionType: 'borrow'
            }
        });

        (User.findOne as jest.Mock).mockResolvedValue({ _id: 'userId', transaction: [] });
        (Book.findOne as jest.Mock).mockResolvedValue(null);

        const result = await createTransaction(req as Request, {} as Response);

        expect(result).toEqual({
            message: "Book doesn't exist",
            success: false,
        });
    });

    it('should return 500 error message and false if an unexpected error occurs', async () => {
        const req = mockRequest({
            body: {
                username: 'testu1',
                email: 'testu1@gmail.com',
                bookName: "A Song of Ice and Fire",
                transactionType: 'borrow'
            }
        });
        (User.findOne as jest.Mock).mockRejectedValue(new Error('Something went wrong'));
        const result = await createTransaction(req as Request, {} as Response);
        expect(result).toEqual({
            message: 'Something went wrong',
            success: false,
        });
    });
});

describe('transactionController - userTransaction', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return 200 if transaction is successful and data is found', async () => {
        const req = mockRequest({
            params: {
                username: 'testu1'
            }
        });

        const mockUser = {
            transaction: [
                { _id: 'transaction1', book: { name: 'Book 1', author: 'Author 1' } },
                { _id: 'transaction2', book: { name: 'Book 2', author: 'Author 2' } }
            ]
        };

        (User.findOne as jest.Mock).mockResolvedValue(mockUser);

        (User.findOne as jest.Mock).mockImplementationOnce(() => ({
            populate: jest.fn().mockResolvedValue(mockUser)
        }));

        const res = mockResponse();

        await userTransaction(req as Request, res as Response);

        expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
        expect(res.send).toHaveBeenCalledWith({
            message: "User history",
            data: [
                { _id: 'transaction1', book: { name: 'Book 1', author: 'Author 1' } },
                { _id: 'transaction2', book: { name: 'Book 2', author: 'Author 2' } }
            ],
            success: true,
        });
    });

    it('should return 400 if input is missing', async () => {
        const req = mockRequest({ params: {} });

        const res = mockResponse();

        await userTransaction(req as Request, res as Response);

        expect(res.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
        expect(res.send).toHaveBeenCalledWith({
            message: 'Input is required',
            success: false,
        });
    });


    it('should return 404 if user does not exist', async () => {
        const req = mockRequest({
            params: {
                user: 'nonexistentuser'  // Adjusted key to match the API
            }
        });

        const mockUser = {
            transaction: [
                { _id: 'transaction1', book: { name: 'Book 1', author: 'Author 1' } },
                { _id: 'transaction2', book: { name: 'Book 2', author: 'Author 2' } }
            ]
        };

        (User.findOne as jest.Mock).mockResolvedValue(mockUser);

        (User.findOne as jest.Mock).mockImplementationOnce(() => ({
            populate: jest.fn().mockResolvedValue(null)
        }));
        // (User.findOne as jest.Mock).mockResolvedValue(false);

        const res = mockResponse();

        await userTransaction(req as Request, res as Response);

        expect(res.status).toHaveBeenCalledWith(StatusCodes.NOT_FOUND);
        expect(res.send).toHaveBeenCalledWith({
            message: 'User does not exists',
            success: false,
        });
    });

    it('should return 500 if an unexpected error occurs', async () => {
        const req = mockRequest({
            params: {
                username: 'testu1'
            }
        });
        const mockUser = {
            transaction: [
                { _id: 'transaction1', book: { name: 'Book 1', author: 'Author 1' } },
                { _id: 'transaction2', book: { name: 'Book 2', author: 'Author 2' } }
            ]
        };

        (User.findOne as jest.Mock).mockResolvedValue(mockUser);

        (User.findOne as jest.Mock).mockImplementationOnce(() => ({
            populate: jest.fn().mockRejectedValueOnce(new Error('Something went wrong'))
        }));

        const res = mockResponse();

        // Call the userTransaction function
        await userTransaction(req as Request, res as Response);

        // Verify that the response status and body are as expected
        expect(res.status).toHaveBeenCalledWith(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res.send).toHaveBeenCalledWith({
            message: 'Something went wrong',
            success: false,
        });
    });

});



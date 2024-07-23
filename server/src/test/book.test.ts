import { Book } from "../model/Book";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { mockRequest, mockResponse } from "jest-mock-req-res";
import { addBook } from "../controller/bookController";

jest.mock('../model/Book');

describe('Book controller -addBook', () => {
    afterEach(() => {
        jest.clearAllMocks();
    })
    it('it should return 201 if book added', async () => {
        const req = mockRequest({
            body: {
                name: "A Song of Ice and Fire",
                author: "George R.R. Martin",
                currentAvailability: 10
            }
        })
        const res = mockResponse();
        Book.findOne = jest.fn().mockResolvedValue(null);
        Book.prototype.save = jest.fn().mockResolvedValue(req);
        await addBook(req as Request, res as Response);
        expect(res.status).toHaveBeenCalledWith(StatusCodes.CREATED);
        expect(res.send).toHaveBeenCalledWith({
            message: "Book added succssfully",
            success: true,
        });
    })
    it('should return 409 if user already exist', async () => {
        const req = mockRequest({
            body: {
                username: "testu1",
                email: "testu1@gmail.com",
            }
        })
        const res = mockResponse();
        Book.findOne = jest.fn().mockResolvedValue({});
        await addBook(req as Request, res as Response);
        expect(res.status).toHaveBeenCalledWith(StatusCodes.CONFLICT);
        expect(res.send).toHaveBeenCalledWith({
            message: 'Book already exists',
            success: false,
        });
    })

    it('should return 404 if user body is empty', async () => {
        const req = mockRequest({ body: {} });
        const res = mockResponse({});
        Book.findOne = jest.fn().mockResolvedValue({});
        await addBook(req as Request, res as Response);
        expect(res.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
        expect(res.send).toHaveBeenCalledWith({
            message: 'Input is required',
            success: false
        })
    })

    it('should return 500 if an unexpected error occurs', async () => {
        const req = mockRequest({
            body: {
                "email": "testu1@gmail.com",
                "password": "1234"
            }
        });
        const res = mockResponse();

        Book.findOne = jest.fn().mockRejectedValue(new Error('Something went wrong'));

        await addBook(req as Request, res as Response);

        expect(res.status).toHaveBeenCalledWith(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res.send).toHaveBeenCalledWith({
            message: 'Something went wrong',
            success: false
        });
    });
})
describe('Book controller -addAviblity', () => {
    afterEach(() => {
        jest.clearAllMocks();
    })
    it('it should return 201 if book added', async () => {
        const req = mockRequest({
            body: {
                name: "A Song of Ice and Fire",
                author: "George R.R. Martin",
                currentAvailability: 10
            }
        })
        const res = mockResponse();
        Book.findOne = jest.fn().mockResolvedValue(null);
        Book.prototype.save = jest.fn().mockResolvedValue(req);
        await addBook(req as Request, res as Response);
        expect(res.status).toHaveBeenCalledWith(StatusCodes.CREATED);
        expect(res.send).toHaveBeenCalledWith({
            message: "Book added succssfully",
            success: true,
        });
    })
    it('should return 409 if user already exist', async () => {
        const req = mockRequest({
            body: {
                username: "testu1",
                email: "testu1@gmail.com",
            }
        })
        const res = mockResponse();
        Book.findOne = jest.fn().mockResolvedValue({});
        await addBook(req as Request, res as Response);
        expect(res.status).toHaveBeenCalledWith(StatusCodes.CONFLICT);
        expect(res.send).toHaveBeenCalledWith({
            message: 'Book already exists',
            success: false,
        });
    })

    it('should return 404 if user body is empty', async () => {
        const req = mockRequest({ body: {} });
        const res = mockResponse({});
        Book.findOne = jest.fn().mockResolvedValue({});
        await addBook(req as Request, res as Response);
        expect(res.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
        expect(res.send).toHaveBeenCalledWith({
            message: 'Input is required',
            success: false
        })
    })

    it('should return 500 if an unexpected error occurs', async () => {
        const req = mockRequest({
            body: {
                "email": "testu1@gmail.com",
                "password": "1234"
            }
        });
        const res = mockResponse();

        Book.findOne = jest.fn().mockRejectedValue(new Error('Something went wrong'));

        await addBook(req as Request, res as Response);

        expect(res.status).toHaveBeenCalledWith(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res.send).toHaveBeenCalledWith({
            message: 'Something went wrong',
            success: false
        });
    });
})


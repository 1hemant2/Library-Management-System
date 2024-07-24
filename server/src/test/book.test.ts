import { Book } from "../model/Book";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { mockRequest, mockResponse } from "jest-mock-req-res";
import { addBook, deleteBook, getBooks, searchBook } from "../controller/bookController";

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
        (Book.findOne as jest.Mock).mockResolvedValue(false);
        (Book.prototype.save as jest.Mock).mockResolvedValue(req.body);
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
describe('Book controller -deleteBook', () => {
    afterEach(() => {
        jest.clearAllMocks();
    })
    it('should return 200 if the book is deleted successfully', async () => {
        const req = mockRequest({
            body: {
                name: "A Song of Ice and Fire",
            }
        });
        const res = mockResponse();

        (Book.findOne as jest.Mock).mockResolvedValue(true);
        (Book.deleteOne as jest.Mock).mockResolvedValue(true);

        await deleteBook(req as Request, res as Response);

        expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
        expect(res.send).toHaveBeenCalledWith({
            message: "Book deleted succssfully",
            success: true,
        });
    });

    it('should return 400 if user body is empty', async () => {
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

    it('should return 404 if the book is not found', async () => {
        const req = mockRequest({
            body: {
                name: "Non-existent Book",
            }
        });
        const res = mockResponse();
        (Book.findOne as jest.Mock).mockResolvedValue(false)

        await deleteBook(req as Request, res as Response);

        expect(res.status).toHaveBeenCalledWith(StatusCodes.NOT_FOUND);
        expect(res.send).toHaveBeenCalledWith({
            message: 'Book does not exist',
            success: false
        });
    });
    it('should return 500 if an unexpected error occurs', async () => {
        const req = mockRequest({
            body: {
                name: "A Song of Ice and Fire",
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
describe('Book controller -getBook', () => {
    afterEach(() => {
        jest.clearAllMocks();
    })
    it('should return 200 if books are found', async () => {
        const req = mockRequest({ params: { pageNo: '1' } });
        const res = mockResponse();
        const mockBookFind = {
            skip: jest.fn().mockReturnThis(),
            limit: jest.fn().mockResolvedValue([{}, {}])
        };
        (Book.find as jest.Mock).mockReturnValue(mockBookFind);
        await getBooks(req as Request, res as Response);
        expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
        expect(res.send).toHaveBeenCalledWith({
            message: "all the book are here",
            success: true,
            data: [{}, {}]
        });
    });
    it('should return 400 if page are not  found or less than 1', async () => {
        const req = mockRequest({ params: { pageNo: '0' } });
        const res = mockResponse();
        const mockBookFind = {
            skip: jest.fn().mockReturnThis(),
            limit: jest.fn().mockResolvedValue([{}, {}])
        };
        (Book.find as jest.Mock).mockReturnValue(mockBookFind);
        await getBooks(req as Request, res as Response);
        expect(res.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
        expect(res.send).toHaveBeenCalledWith({
            message: "Invalid page number",
            success: false,
        });
    });

    it('should return 500 if an unexpected error occurs', async () => {
        const req = mockRequest({ params: { pageNo: '1' } });
        const res = mockResponse();

        const mockBookFind = {
            skip: jest.fn().mockReturnThis(),
            limit: jest.fn().mockRejectedValue(new Error('Something went wrong'))
        };
        (Book.find as jest.Mock).mockReturnValue(mockBookFind);
        await getBooks(req as Request, res as Response);

        expect(res.status).toHaveBeenCalledWith(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res.send).toHaveBeenCalledWith({
            message: 'Something went wrong',
            success: false
        });
    });
})
describe('Book controller -searchBook', () => {
    afterEach(() => {
        jest.clearAllMocks();
    })
    it('should return 200 if books are found', async () => {
        const req = mockRequest({
            body: {
                name: "A Song of Ice and Fire",
            }
        });
        const res = mockResponse();
        (Book.find as jest.Mock).mockResolvedValue([{}]);
        await searchBook(req as Request, res as Response);
        expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
        expect(res.send).toHaveBeenCalledWith({
            message: "Book found",
            success: true,
            data: [{}]
        });
    });

    it('should return 400 if page are not  found or less than 1', async () => {
        const req = mockRequest();
        const res = mockResponse();

        (Book.find as jest.Mock).mockResolvedValue([]);
        await searchBook(req as Request, res as Response);
        expect(res.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
        expect(res.send).toHaveBeenCalledWith({
            message: "input is required",
            success: false,
        });
    });

    it('should return 500 if an unexpected error occurs', async () => {
        const req = mockRequest({ body: { name: "A Song of Ice and Fire", } });
        const res = mockResponse();

        (Book.find as jest.Mock).mockRejectedValue(new Error('Something went wrong'));
        await searchBook(req as Request, res as Response);

        expect(res.status).toHaveBeenCalledWith(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res.send).toHaveBeenCalledWith({
            message: 'Something went wrong',
            success: false
        });
    });
})



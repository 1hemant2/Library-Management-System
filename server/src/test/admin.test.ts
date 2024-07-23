import { createAdmin, getAdmin } from '../controller/adminController';
import { Admin } from '../model/Admin';
import { Request, Response } from 'express';
import { mockRequest, mockResponse } from 'jest-mock-req-res';
import bcrypt from 'bcrypt';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken'


jest.mock('../model/Admin');
jest.mock('bcrypt');
jest.mock('jsonwebtoken');

describe('Admin Controller -createAdmin', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should create a new admin and return 201 status', async () => {
        const req = mockRequest({
            body: {
                "username": "testa1",
                "email": "testa1@gmail.com",
                "firstName": "test",
                "lastName": "a1",
                "password": "1234",
                "contactNumber": "43214312"
            },
        });
        const res = mockResponse();
        (bcrypt.hash as jest.Mock).mockResolvedValue('hashedpassword');

        Admin.findOne = jest.fn().mockResolvedValue(null);
        Admin.prototype.save = jest.fn().mockResolvedValue(req.body);

        await createAdmin(req as Request, res as Response);

        expect(res.status).toHaveBeenCalledWith(StatusCodes.CREATED);
        expect(res.send).toHaveBeenCalledWith({
            message: "user register successfully",
            success: true,
        });
    });

    // it('should return 400 if body is empty'), async () => {
    //     const req = mockRequest({});
    //     const res = mockResponse();
    //     Admin
    // }

    it('should return 409 if admin already exists', async () => {
        const req = mockRequest({
            body: {
                email: 'test@example.com',
            },
        });
        const res = mockResponse();

        Admin.findOne = jest.fn().mockResolvedValue({}); // Simulate existing admin

        await createAdmin(req as Request, res as Response);

        expect(res.status).toHaveBeenCalledWith(StatusCodes.CONFLICT);
        expect(res.send).toHaveBeenCalledWith({
            message: 'Admin already exists',
            success: false,
        });
    });

});


describe('Admin Controller - getAdmin', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return 200 and a token when credentials are correct', async () => {
        const req = mockRequest({
            body: {
                "email": "testa1@gmail.com",
                "password": "1234"
            }
        });
        const res = mockResponse();

        const adminMock = {
            email: 'testa1@gmail.com',
            password: 'hashedpassword'
        };

        Admin.findOne = jest.fn().mockResolvedValue(adminMock);
        (bcrypt.compare as jest.Mock).mockResolvedValue(true);
        (jwt.sign as jest.Mock).mockReturnValue('token');

        await getAdmin(req as Request, res as Response);

        expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
        expect(res.send).toHaveBeenCalledWith({
            message: 'login successful',
            token: 'token',
            success: true
        });
    });

    it('should return 404 if admin does not exist', async () => {
        const req = mockRequest({
            body: {
                "email": "testa1@gmail.com",
                "password": "1234"
            }
        });
        const res = mockResponse();

        Admin.findOne = jest.fn().mockResolvedValue(null);

        await getAdmin(req as Request, res as Response);

        expect(res.status).toHaveBeenCalledWith(StatusCodes.NOT_FOUND);
        expect(res.send).toHaveBeenCalledWith({
            message: "admin doen't exist",
            success: false
        });
    });

    it('should return 401 if password is incorrect', async () => {
        const req = mockRequest({
            body: {
                "email": "testa1@gmail.com",
                "password": "wrongpassword"
            }
        });
        const res = mockResponse();

        const adminMock = {
            email: 'testa1@gmail.com',
        };

        Admin.findOne = jest.fn().mockResolvedValue(adminMock);
        (bcrypt.compare as jest.Mock).mockResolvedValue(false);

        await getAdmin(req as Request, res as Response);

        expect(res.status).toHaveBeenCalledWith(StatusCodes.UNAUTHORIZED);
        expect(res.send).toHaveBeenCalledWith({
            message: 'Invalid email or password.',
            success: false
        });
    });

    // it('should return 400 if body is empty', async () => {
    //     const req = mockRequest({ body: {} });
    //     const res = mockResponse();
    //     await getAdmin(req as Request, res as Response);
    //     expect(res.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
    //     expect(res.send).toHaveBeenCalledWith({
    //         message: 'Body should not be empty',
    //         success: false
    //     });
    // });

    it('should return 500 if an unexpected error occurs', async () => {
        const req = mockRequest({
            body: {
                "email": "testa1@gmail.com",
                "password": "1234"
            }
        });
        const res = mockResponse();

        Admin.findOne = jest.fn().mockRejectedValue(new Error('Unexpected error'));

        await getAdmin(req as Request, res as Response);

        expect(res.status).toHaveBeenCalledWith(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res.send).toHaveBeenCalledWith({
            message: 'Unexpected error',
            success: false
        });
    });
});
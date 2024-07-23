import { User } from "../model/User";
import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import { createUser } from "../controller/userController";
import { mockRequest, mockResponse } from 'jest-mock-req-res';

jest.mock('../model/User');
describe('User Controller -createUser', () => {
    afterEach(() => {
        jest.clearAllMocks();
    })
    it('it should return 201 if  user  created', async () => {
        const req = mockRequest({
            body: {
                username: "testu1",
                firstName: "test",
                lastName: "u2",
                email: "testu1@gmail.com",
                contactNumber: "7644944378"
            }
        });
        const res = mockResponse();
        User.findOne = jest.fn().mockResolvedValue(null);
        User.prototype.save = jest.fn().mockResolvedValue(req.body);
        await createUser(req as Request, res as Response);
        expect(res.status).toHaveBeenCalledWith(StatusCodes.CREATED);
        expect(res.send).toHaveBeenCalledWith({
            message: "User created succssfully",
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
        User.findOne = jest.fn().mockResolvedValue({});
        await createUser(req as Request, res as Response);


        expect(res.status).toHaveBeenCalledWith(StatusCodes.CONFLICT);
        expect(res.send).toHaveBeenCalledWith({
            message: 'User already exists',
            success: false,
        });
    })

    it('should return 404 if user body is empty', async () => {
        const req = mockRequest({ body: {} });
        const res = mockResponse({});
        User.findOne = jest.fn().mockResolvedValue({});
        await createUser(req as Request, res as Response);
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

        User.findOne = jest.fn().mockRejectedValue(new Error('Unexpected error'));

        await createUser(req as Request, res as Response);

        expect(res.status).toHaveBeenCalledWith(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res.send).toHaveBeenCalledWith({
            message: 'Unexpected error',
            success: false
        });
    });
})



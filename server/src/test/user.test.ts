import { User } from "../model/User";
import { StatusCodes } from "http-status-codes";
import { Request, Response } from "supertest";
import { createUser } from "../controller/userController";
import { mockRequest, mockResponse } from 'jest-mock-req-res';

jest.mock('../model/User');
describe('User Controller -createUser', () => {
    afterEach(() => {
        jest.clearAllMocks();
    })
    it('it should create a user', async () => {
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

    })
})
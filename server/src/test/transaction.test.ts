// import { LibraryTransaction } from "../model/LibraryTransaction";
// import { Request, Response } from "express";
// import { StatusCodes } from "http-status-codes";
// import { mockRequest, mockResponse } from "jest-mock-req-res";
// import { createTransaction } from "../controller/transactionController";
// import { User } from "../model/User";
// import { Book } from "../model/Book";

// jest.mock('../model/LibraryTransaction');
// jest.mock('../model/User')
// jest.mock('../model/Book');
// describe('transactionController -createTransaction', () => {
//     afterEach(() => {
//         jest.clearAllMocks();
//     })
//     it('return 200 if transaction creted successfully', async () => {
//         const req = mockRequest({
//             body: {
//                 username: 'testu1',
//                 email: 'testu1@gmail.com',
//                 bookName: "A Song of Ice and Fire",
//                 transactionType: 'borrow'
//             }
//         });
//         const res = mockResponse();
//         (User.findOne as jest.Mock).mockResolvedValue({});
//         (Book.findOne as jest.Mock).mockResolvedValue({ _id: '3498uea32432' });
//         (LibraryTransaction.prototype.save as jest.Mock).mockResolvedValue({
//             _id: 'transactionId'
//         });
//         (User.prototype.save as jest.Mock).mockResolvedValue({ transaction: [] });

//         await createTransaction(req as Request, res as Response);
//         expect(res.status).toHaveBeenCalledWith(StatusCodes.CREATED);
//         expect(res.send).toHaveBeenCalledWith({
//             message: "transaction completed",
//             success: true,
//         });
//     })
// })
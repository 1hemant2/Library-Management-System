import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from "express";

/**
 * Middleware for authenticating requests using a JWT token.
 *
 * This middleware function checks for the presence of an `Authorization` header in the request. 
 * It verifies the JWT token and, if valid, extracts the user ID from the token and attaches it to the request body.
 * If the token is missing, invalid, or expired, it responds with an appropriate error message.
 *
 * @param {Request} req - The request object, which should contain the `Authorization` header with the JWT token.
 * @param {Response} res - The response object used to send error responses if authentication fails.
 * @param {NextFunction} next - The next middleware function in the stack.
 * @returns {void} - Calls the `next` function if authentication is successful, otherwise sends an error response.
 *
 * @throws {Error} - If the `Authorization` header is missing, the token is missing, or the token is invalid or expired.
 */

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers['authorization'];
        if (!authHeader) {
            throw new Error("Authorization header is missing");
        }
        const token = authHeader.split(" ")[1];
        if (!token) {
            throw new Error("Token is missing from Authorization header");
        }
        const secret = process.env.SECRET_KEY || "dasfas";

        const decryptedToken = jwt.verify(token, secret);
        if (typeof decryptedToken === "string" || typeof decryptedToken === "number") {
            throw new Error("User doesn't exist");
        }
        req.body.id = decryptedToken.id;
        next();
    } catch (error: any) {
        if (error.message === "jwt expired") {
            return res.status(401).send("Token has expired");
        } else {
            return res.status(401).send({ message: error.message, success: false });
        }
    }
}

export default authMiddleware;
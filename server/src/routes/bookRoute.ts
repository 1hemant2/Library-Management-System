import { Router } from "express";
const route = Router();
import { addBook } from "../controller/bookController";
import authMiddleware from "../middleware/authMiddleware";

route.post('/addBook', authMiddleware, addBook);

export default route;
import { Router } from "express";
const route = Router();
import { addBook, bookDetails, changeBookAvaiblity, deleteBook, getBooks, issueBook, returnBook } from "../controller/bookController";
import authMiddleware from "../middleware/authMiddleware";

route.post('/addBook', authMiddleware, addBook);
route.get('/getBook/:pageNo', getBooks);
route.get('/bookDetails/:bookName', authMiddleware, bookDetails);
route.patch('/avilability', authMiddleware, changeBookAvaiblity);
route.post('/issue', authMiddleware, issueBook)
route.post('/return', authMiddleware, returnBook)
route.delete('/delete/:name', authMiddleware, deleteBook)

export default route;  
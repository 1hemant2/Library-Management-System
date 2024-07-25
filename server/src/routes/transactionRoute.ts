import { Router } from "express";
const route = Router();
import { userTransaction } from "../controller/transactionController";

route.get('/userTransaction/:user', userTransaction);

export default route;
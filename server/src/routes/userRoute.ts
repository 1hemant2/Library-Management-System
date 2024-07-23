import { createUser } from "../controller/userController";
import { Router } from "express";

const route = Router();

route.post('/register', createUser)


export default route;
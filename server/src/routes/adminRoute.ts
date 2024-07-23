import { createAdmin, getAdmin } from "../controller/adminController";
import { Router } from "express";
const route = Router();

route.post('/register', createAdmin)
    .post('/login', getAdmin);




export default route;
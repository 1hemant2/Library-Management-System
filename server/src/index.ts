import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import "./config/dbconfig";
import cors from 'cors';
app.use(cors());
app.use(express.json());
import adminRoute from "../src/routes/adminRoute";
import userRoute from "../src/routes/userRoute";
import bookRoute from "../src/routes/bookRoute";
import transactionRoute from '../src/routes/transactionRoute';


app.use("/admin", adminRoute);
app.use("/user", userRoute);
app.use("/book", bookRoute);
app.use("/transaction", transactionRoute);

const PORT = process.env.PORT || 8;
app.listen(PORT, () => {
    console.log(`server has started on ${PORT},😀😀✅😁🙋`);
})

import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import "./config/dbconfig";
import cors from 'cors';
app.use(cors());
app.use(express.json());
import adminRoute from "../src/routes/adminRoute";


app.use("/admin", adminRoute);


const PORT = process.env.PORT || 8;
app.listen(PORT, () => {
    console.log(`server has started on ${PORT},😀😀✅😁🙋`);
})

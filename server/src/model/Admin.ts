import { timeStamp } from "console";
import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        uniqued: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        // match: [/^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, and one special character.']
    },
    email: {
        type: String,
        required: true,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.']
    },
    contactNumber: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "admin",
    }
},
    { timestamps: true }
)
export const Admin = mongoose.model("Admin", adminSchema);
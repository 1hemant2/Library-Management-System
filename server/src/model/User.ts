import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    contactNumber: {
        type: String,
        required: true
    },
    transaction: [{
        type: Schema.Types.ObjectId,
        ref: 'LibraryTransaction'
    }]
},
    { timestamps: true }
)
export const User = mongoose.model("User", userSchema);
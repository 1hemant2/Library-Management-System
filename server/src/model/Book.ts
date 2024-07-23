import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true,
    },
    currentAvailability: {
        type: Number,
        default: 0
    }

},
    { timestamps: true }
)
export const Book = mongoose.model("Book", bookSchema);

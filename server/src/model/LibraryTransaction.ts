import mongoose, { Schema } from "mongoose";

const libraryTransactionSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    book: {
        type: Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },
    transactionType: {
        type: String,
        enum: ['borrowed', 'returned'],
        required: true
    },
    dueDate: {
        type: Date,
    }
},
    { timestamps: true }
);

export const LibraryTransaction = mongoose.model("LibraryTransaction", libraryTransactionSchema);

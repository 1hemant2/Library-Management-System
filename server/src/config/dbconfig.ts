import mongoose from "mongoose";
mongoose.connect(process.env.DATABASE_CONNECTION as string);
const connection = mongoose.connection;
connection.on('connected', () => {
    console.log('database connected successfuly');
})
connection.on('error', () => {
    console.log('database connection failed')
})

export default connection; 
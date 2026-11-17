import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const db = process.env.DATABASE_URL;

export const connectdb = async () => {
    try {
        await mongoose.connect(db);
        console.log("Database successfully connected");
    } catch (error) {
        console.log("mongodb connection error:" + error);
        process.exit(1); 
    }
};


import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const db = process.env.DATABASE_URL;
const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/user", (req, res) => {
    return res.status(200).json({ message: "Morning guys" });
});

app.listen(port, () => {
    console.log(`Server running on ${port}`);
});

mongoose.connect(db)
    .then(() => {
        console.log("Database successfully connected");
    })
    .catch((error) => {
        console.log(`Failed to connect to database because: ${error.message}`);
    });

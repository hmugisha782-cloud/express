
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import { connectdb } from "./src/database/db.js";
import { StatusCodes } from "http-status-codes";
import router from "./src/routes/index.js";

dotenv.config();

const app = express();
app.use(cors());

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb",extended: true
    
}))
app.use("/api/v1", router);

app.listen(port, () => {
    console.log(`Server running on ${port}`);
});
connectdb();



app.use((req,res)=>{
    res.status(StatusCodes.BAD_GATEWAY).json({
        success:false,
        messange:"Router not found"
    })
})
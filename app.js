import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/user.js";
import taskRouter from "./routes/tasks.js"
import {config} from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors";
config({
    path: "./data/config.env"
});


export const app= express();


//middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods:["GET","POST","PUT","DELETE"],
    credentials: true,
}));

// app.use(userRouter)
app.use("/api/v1/users",userRouter);
app.use("/api/v1/tasks",taskRouter);

app.use(errorMiddleware);



app.get("/",(req,res)=>{
    res.send("Nice Working!!");

})


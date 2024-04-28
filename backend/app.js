import express from "express";
import { dbConnection } from "./database/dbConnection.js";
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import cors from "cors";
import fileUpload from "express-fileupload";
import userRouter from "./router/userRouter.js";
import appointmentRouter from './router/appointmentRouter.js' 

const app = express();
dotenv.config();

app.use(
  cors({
    origin: "*",
    method: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/appointment", appointmentRouter);

dbConnection();

export default app;

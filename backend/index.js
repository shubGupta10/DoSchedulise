import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors"
import dotenv from "dotenv"
import route from "./routes/userRoutes.js";

const app = express();
app.use(bodyParser.json());
app.use(cors());
dotenv.config();


const PORT = process.env.PORT
const URL = process.env.MONGOURL


mongoose.connect(URL).then(()=> {
    console.log("DB Connected Successfully");
    app.listen(PORT, ()=> {
        console.log(`Server is running at https://localhost:${PORT}`);
    })

}).catch(error => console.log(error));

app.use("/api", route);
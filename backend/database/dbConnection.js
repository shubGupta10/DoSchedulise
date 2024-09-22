import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

export const dbConnection = () => {
  const mongoURI = process.env.MONGOURL; 

  if (!mongoURI) {
    console.error('MongoDB URI is not defined. Please check your environment variables.');
    return;
  }

  mongoose
    .connect(mongoURI, {
      dbName: "DoSchedulise",
    })
    .then(() => {
      console.log("Connected to database!");
    })
    .catch((err) => {
      console.log("Some error occurred while connecting to the database:", err);
    });
};

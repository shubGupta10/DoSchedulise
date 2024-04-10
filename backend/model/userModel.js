import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fname:{
        type: String,
        required: true
    },
    lname:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        min: [8, "Password must be of 8 characters"],
        max: [10, "Password must be of 10 characters"]
    },
})

export default mongoose.model("User", userSchema);
import { Schema, model } from "mongoose";

const userSchema= new Schema({
    nmae: String,
    email: {type: String, unique: true},
    password: String, 
    token: String,
    validado: {type: Boolean, default: false},
    //role: {type: String, default: "user"}, type es un objectId types: ObjectId
});

const User= model("User", userSchema);

export default User;
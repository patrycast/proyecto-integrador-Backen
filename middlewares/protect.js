import User from "../models/user.js";
import jwt from "jsonwebtoken";


const protect= async (req, res, next) => {
    try {
        const token= req.header("Authorization").replace("Bearer ", "");

        if(!token){
            return res.status(401).json({message: "No token provided"});
        }
        const decoded= jwt.verify(token, process.env.JWT_KEY);
        const user= await User.findById(decoded.user);

        if(!user) {
            return res.status(401).json({message: "User not found"})
        }
        req.user= user;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token', error });
    }
}

export default protect;
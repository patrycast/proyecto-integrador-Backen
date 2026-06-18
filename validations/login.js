import { body } from "express-validator";
import User from "../models/user.js";
import bcrypt from "bcryptjs";

const validateExistUser= async (value) => {
    const user= await User.findOne({ email: value });
    if(!user) {
        throw new Error("El email no está registrado");
    }
    return true;
}

const validatePassword= async (value, { req }) => {
    const user= await User.findOne({ email: req.body.email });
    if(!user) {
        throw new Error("El email no está registrado");
    }
    
    const isMatch= await bcrypt.compare(value, user.password);
    if(!isMatch) {
        throw new Error("La contraseña es incorrecta");
    }
    return true;
}




const loginValidation= [
    body("email")
        .isEmail().withMessage("El email no es válido"),
    body("password")
        .isLength({ min: 6 })
        .withMessage("La contraseña debe tener al menos 6 caracteres"),
    body("password").isStrongPassword().withMessage("La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un símbolo"),
    body("email").custom(validateExistUser),
    body("password").custom(validatePassword)
]

export default loginValidation;
import { body } from "express-validator";
import User from "../models/user.js";


const validateExistUser= async (value) => {
        const user= await User.findOne({
            email: value,
        })
        if (user) {
            throw new Error("El email ya está registrado")
        }
        return true;
    }

// const validationExistPassword= async (value, {req}) => { 
//         const user= await User.findOne({
//             password: req.body.password})

//             if(user.password !== value){
//                 throw new Error("La contraseña no coincide")
//             }
//             return true;
    
//     }  

const registerValidation= [
    body("name")
    .notEmpty().withMessage("El nombre es obligatorio")
    .isLength({min: 3}).withMessage("El nombre debe tener al menos 3 caracteres"),

    body("email").isEmail().withMessage("El email no es válido"),

    body("password").isLength({min: 6}).withMessage("La contraseña debe tener al menos 6 caracteres"),
    body("password").isStrongPassword().withMessage("La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un símbolo"),
    body("email").custom(validateExistUser),
    // body("password").custom(validationExistPassword),
    
]

export default registerValidation;
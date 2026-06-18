import User from "../models/user.js";
import Randomstring from "randomstring";
import mail from "../utils/mail.js";
import jwt from "jsonwebtoken";

export const register= async (req, res) => {
    try {
        const { name, email, password }= req.body;
        const token= Randomstring.generate(6);

        const user= new User({name, email, password, token});
        await user.save();

        mail(user.email, "Confirmación de Registro", `Tu código de verificación es: ${token}`);

        res.status(201).json({
            message: "Usuario registrado exitosamente", 
            user,
        })
    } catch(error) {
        res.status(500).json({
            // message: "Error al registrar el usuario",
            error: error.message,
        })
    }
}



export const confirm= async (req,res) => {
    try {
        const { token } = req.query;
        const user= await User.findOne({ token })

        if(!user) {
            return res.status(404).json({error: "Usuario no encontrado" })
        }

        user.validado= true;
        await user.save();

        mail(user.email, "Confirmación de Registro", "Tu cuenta ha sido verificada correctamente, ya puedes iniciar sesión");
        res.status(200).json({
            message: "Cuenta verificada correctamente", user
        })

    } catch(error) {
        res.status(500).json({
            error: error.message
        })
    }
}



export const login= async (req, res) => {
    try {
        const { email } = req.body;
        const user= await User.findOne({ email });
        const token= jwt.sign({ user: user._id }, process.env.JWT_KEY, { expiresIn: "4h" });
        res.status(200).json({ token });
    } catch(error) {
        res.status(500).json({
            error: error.message
        })
    }
}


// export const refreshToken= async (req, res) => {
//     try {
//         const { email } = req.body;
//         const user= await User.findOne({email});
//         jwt.verify(req.headers["token"], process.env.JWT_KEY, (err, decoded) => {
//             if(err) {
//                 return res.status(401).json({ error: "Token inválido" });
//             }
//             const refreshToken= jwt.sign({user: user._id}, process.env.JWT_KEY, { expiresIn: "4h" });
//             res.status(200).json({ token: refreshToken });
//         });
//         } catch(error) {
//             res.status(500).json({
//                 error: error.message
//             })
//         }
//     }



export const refreshToken = async (req, res) => {
  try {

    const token = req.headers["token"];

    if (!token) {
      return res.status(401).json({error: "Token requerido"});
    }

    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {

      if (err) {
        return res.status(401).json({error: "Token inválido" });
      }

      // decoded.user viene del login
      const refreshToken = jwt.sign({ user: decoded.user }, process.env.JWT_KEY,{ expiresIn: "4h" }
      );

      res.status(200).json({token: refreshToken});

    });

  } catch (error) {res.status(500).json({ error: error.message });
  }
};

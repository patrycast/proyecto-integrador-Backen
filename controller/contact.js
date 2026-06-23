import Contact from "../models/contact.js";

export const createContact = async (req, res) => {
    try {
        const { name, lastName, email, message } = req.body;

        const contact = new Contact({ name, lastName, email, message });
        await contact.save();

        res.status(201).json({ 
            message: "Mensaje enviado correctamente",
            contact 
        });
    } catch (error) {
        res.status(500).json({ 
            message: "Error al enviar el mensaje", 
            error: error.message 
        });
    }
};
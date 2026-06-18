import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "651c3504bb1132",
    pass: "967f6bf256837a"
  },
  from: "651c3504bb1132",
});

const mail = async (to, subject, text) => {
    try{
        await transport.sendMail({
        to,
        subject,
        text,
        });
        console.log("Correo enviado exitosamente");
    }catch(error){
        console.error("Error al enviar el correo:", error);
    }

};

export default mail;
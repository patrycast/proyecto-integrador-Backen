import express from "express";
import "dotenv/config";
import cors from "cors";
import auth  from "./routes/auth.js";
import connect from "./middlewares/connect.js";
import orders from "./routes/orders.js";
import contact from "./routes/contact.js";

const app= express();

const PORT= process.env.PORT || 3030;

app.use(express.json());

app.use(express.urlencoded({extended: true}));
app.use(cors());

app.use(connect);

app.use("/auth", auth);
app.use("/orders", orders);
app.use("/contact", contact);



app.listen(PORT, ()=>{
    console.log(`Servidor escuchando en el puerto ${PORT}`);
})
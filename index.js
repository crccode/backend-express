import express from "express";
import conectarDB from "./config/db.js";
import dotenv from "dotenv";

const app = express();
// ACCESO A LA VARIABLE DE ENTORNO
dotenv.config();
// VARIABLE PORT SI NO EXISTE TOMA POR DEFECTO 4000
const PORT = process.env.PORT || 4000;

//CONEXION A LA BD
conectarDB();

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
})
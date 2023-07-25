import express from "express";
import conectarDB from "./config/db.js";
import dotenv from "dotenv";

import usuarioRoutes from "./routes/usuarioRoutes.js";

const app = express();
// HABILITAMOS LA OPCION PARA QUE PUEDA LEER LOS JSON
app.use(express.json());
// ACCESO A LA VARIABLE DE ENTORNO
dotenv.config();
// VARIABLE PORT SI NO EXISTE TOMA POR DEFECTO 4000
const PORT = process.env.PORT || 4000;

//CONEXION A LA BD
conectarDB();

// ROUTING
// use TE PERMTE SOPORTAR LOS METODOS GET, PUT, DELETE 
app.use("/api/usuarios", usuarioRoutes)

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
})
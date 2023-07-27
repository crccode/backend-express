import express from "express";
import conectarDB from "./config/db.js";
import dotenv from "dotenv";

import usuarioRoutes from "./routes/usuarioRoutes.js";
import proyectoRoutes from "./routes/proyectoRoutes.js";

import cors from "cors";

const app = express();
// HABILITAMOS LA OPCION PARA QUE PUEDA LEER LOS JSON
app.use(express.json());
// ACCESO A LA VARIABLE DE ENTORNO
dotenv.config();
// VARIABLE PORT SI NO EXISTE TOMA POR DEFECTO 4000
const PORT = process.env.PORT || 4000;

//CONEXION A LA BD
conectarDB();

// Configurar CORS
const whitelist = [process.env.FRONTEND_URL];
// origin VERIFICA QUIEN ESTA REALIZANDO LA PETICION DE CONEXION
const corsOptions = {
  origin: function (origin, callback) {
    // VERIFICA QUE ESTE EN LA LISTA LA IP
    if (whitelist.includes(origin)) {
      // Puede consultar la API
      callback(null, true);
    } else {
      // No esta permitido
      callback(new Error("Error de Cors"));
    }
  },
};

app.use(cors(corsOptions));

// ROUTING
// use TE PERMTE SOPORTAR LOS METODOS GET, PUT, DELETE 
app.use("/api/usuarios", usuarioRoutes)
app.use("/api/proyectos", proyectoRoutes);


app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
})
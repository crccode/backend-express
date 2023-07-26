import express from "express";

import {registrar, autenticar, confirmar} from "../controllers/usurioController.js"

const router = express.Router();

// METODOS VERBOSE END POINT USUARIOS
router.post("/", registrar) //CREAR USUARIO     /api/usuarios
router.post("/login", autenticar) // AUTENTICAR USUARIO      /api/usuarios/login
// EL : SE USA PARA GENERAR ROUTING DINAMICO 
// cada usuario tiene un token unico asi que : soporta multiple valores 
router.get("/confirmar/:token", confirmar) // CONFIRMAR      /api/usuarios/confirmar/20
export default router
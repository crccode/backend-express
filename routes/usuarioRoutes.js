import express from "express";

import {registrar, autenticar} from "../controllers/usurioController.js"

const router = express.Router();

// METODOS VERBOSE
router.post("/", registrar) //CREAR USUARIO     /api/usuarios
router.post("/login", autenticar) // AUTENTICAR USUARIO      /api/usuarios/login

export default router;
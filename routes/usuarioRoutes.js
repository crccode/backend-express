import express from "express";

import {registrar, autenticar, confirmar, olvidePassword, comprobarToken, nuevoPassword, perfil} from "../controllers/usurioController.js"

import checkAuth from "../middleware/checkAuth.js";
const router = express.Router();

// METODOS VERBOSE END POINT USUARIOS
router.post("/", registrar) //CREAR USUARIO     /api/usuarios
router.post("/login", autenticar) // AUTENTICAR USUARIO      /api/usuarios/login
// EL : SE USA PARA GENERAR ROUTING DINAMICO 
// cada usuario tiene un token unico asi que : soporta multiple valores 
router.get("/confirmar/:token", confirmar) // CONFIRMAR      /api/usuarios/confirmar/20
router.post("/olvide-password", olvidePassword) //      /api/usuarios/olvide-password


//router.get("/olvide-password/:token", comprobarToken) //   /api/usuarios/olvide-password/1
//router.post("/olvide-password/:token", nuevoPassword) //   /api/usuarios/olvide-password/1
// ESTO ES EQUIVALENTE A USAR LAS DOS LINEAS ANTERIORES
router.route("/olvide-password/:token").get(comprobarToken).post(nuevoPassword);
// checkAuth verifica que el usuario exista, que se le mande token en el header, si todo va bien se va perfil
router.get("/perfil", checkAuth, perfil);   // /api/usuarios/perfil

export default router
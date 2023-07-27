import express from "express";

import {
  obtenerProyectos,
  nuevoProyecto,
  obtenerProyecto,
  editarProyecto,
  eliminarProyecto,
  buscarColaborador,
  agregarColaborador,
  eliminarColaborador,
} from "../controllers/proyectoController.js";

// TODO LO RELACIONADO A PROYECTO EL USUARIO DEBE ESTAR AUTENTICADO
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router
  .route("/")
  // PRIMERO REVISAMOS LA AUTENTICACION Y DESPUES obtenerProyectos
  .get(checkAuth, obtenerProyectos)
  .post(checkAuth, nuevoProyecto);

// ESTAS TRES FUNCIONES REQUIEREN EL id LO AGRUPAMOS 
router
  .route("/:id")
  .get(checkAuth, obtenerProyecto)
  .put(checkAuth, editarProyecto)
  .delete(checkAuth, eliminarProyecto);

router.post("/colaboradores", checkAuth, buscarColaborador);
router.post("/colaboradores/:id", checkAuth, agregarColaborador);
router.post("/eliminar-colaborador/:id", checkAuth, eliminarColaborador);

export default router;

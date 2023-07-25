import express from "express";

import {usuarios} from "../controllers/usurioController.js"
const router = express.Router();

// METODOS VERBOSE
router.get("/", usuarios)

export default router;
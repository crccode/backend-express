import express from "express";

import {registrar} from "../controllers/usurioController.js"
const router = express.Router();

// METODOS VERBOSE
router.post("/", registrar)

export default router;
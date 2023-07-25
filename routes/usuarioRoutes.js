import express from "express";
const router = express.Router();

// METODOS VERBOSE
router.get("/", (req,res) => {
    res.send("DESDE LA API");
});

export default router;

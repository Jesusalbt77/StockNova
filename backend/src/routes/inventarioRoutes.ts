import { Router } from "express";

import {
  registrarEntrada,
  registrarSalida,
  obtenerMovimientos
} from "../controllers/inventarioController";

import { autenticar } from "../middleware/authMiddleware";

const router = Router();

router.post("/entry", autenticar, registrarEntrada);

router.post("/exit", autenticar, registrarSalida);

router.get("/movements", autenticar, obtenerMovimientos);

export default router;
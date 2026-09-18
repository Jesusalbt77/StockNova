import { Router } from "express";

import {
  registrarUsuario,
  iniciarSesion,
  obtenerUsuarioActual
} from "../controllers/authController";

import { autenticar } from "../middleware/authMiddleware";

const router = Router();

router.post("/register", registrarUsuario);

router.post("/login", iniciarSesion);

router.get("/me", autenticar, obtenerUsuarioActual);

export default router;
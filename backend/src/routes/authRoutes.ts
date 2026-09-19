
import { Router } from "express";

import {
  registrarUsuario,
  iniciarSesion,
  obtenerUsuarioActual,
  actualizarPerfil,
  cambiarContraseña
} from "../controllers/authController";

import { autenticar } from "../middleware/authMiddleware";

const router = Router();

router.post(
  "/register",
  registrarUsuario
);

router.post(
  "/login",
  iniciarSesion
);

router.get(
  "/me",
  autenticar,
  obtenerUsuarioActual
);

router.put(
  "/profile",
  autenticar,
  actualizarPerfil
);

router.put(
  "/change-password",
  autenticar,
  cambiarContraseña
);

// Ruta temporal de prueba
router.get(
  "/test-change-password",
  (req, res) => {
    res.json({
      success: true,
      message:
        "La ruta de autenticación está funcionando correctamente"
    });
  }
);

export default router;

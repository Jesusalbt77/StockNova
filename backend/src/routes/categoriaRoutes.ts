import { Router } from "express";

import {
  obtenerCategorias,
  crearCategoria,
  actualizarCategoria,
  eliminarCategoria
} from "../controllers/categoriaController";

import { autenticar } from "../middleware/authMiddleware";
import { requerirRol } from "../middleware/roleMiddleware";

const router = Router();

router.get(
  "/",
  autenticar,
  obtenerCategorias
);

router.post(
  "/",
  autenticar,
  requerirRol("ADMIN"),
  crearCategoria
);

router.put(
  "/:id",
  autenticar,
  requerirRol("ADMIN"),
  actualizarCategoria
);

router.delete(
  "/:id",
  autenticar,
  requerirRol("ADMIN"),
  eliminarCategoria
);

export default router;
import { Router } from "express";

import {
  obtenerProductos,
  obtenerProductoPorId,
  crearProducto,
  actualizarProducto,
  eliminarProducto
} from "../controllers/productoController";

import { autenticar } from "../middleware/authMiddleware";
import { requerirRol } from "../middleware/roleMiddleware";

const router = Router();

router.get(
  "/",
  autenticar,
  obtenerProductos
);

router.get(
  "/:id",
  autenticar,
  obtenerProductoPorId
);

router.post(
  "/",
  autenticar,
  requerirRol("ADMIN"),
  crearProducto
);

router.put(
  "/:id",
  autenticar,
  requerirRol("ADMIN"),
  actualizarProducto
);

router.delete(
  "/:id",
  autenticar,
  requerirRol("ADMIN"),
  eliminarProducto
);

export default router;
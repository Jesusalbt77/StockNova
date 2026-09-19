import { Router } from "express";

import {
  obtenerProveedores,
  obtenerProveedorPorId,
  crearProveedor,
  actualizarProveedor,
  eliminarProveedor
} from "../controllers/supplierController";

import { autenticar } from "../middleware/authMiddleware";
import { requerirRol } from "../middleware/roleMiddleware";

const router = Router();

router.get(
  "/",
  autenticar,
  obtenerProveedores
);

router.get(
  "/:id",
  autenticar,
  obtenerProveedorPorId
);

router.post(
  "/",
  autenticar,
  requerirRol("ADMIN"),
  crearProveedor
);

router.put(
  "/:id",
  autenticar,
  requerirRol("ADMIN"),
  actualizarProveedor
);

router.delete(
  "/:id",
  autenticar,
  requerirRol("ADMIN"),
  eliminarProveedor
);

export default router;
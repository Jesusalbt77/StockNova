import { Router } from "express";

import { obtenerDashboard } from "../controllers/dashboardController";

import { autenticar } from "../middleware/authMiddleware";

const router = Router();

router.get(
  "/",
  autenticar,
  obtenerDashboard
);

export default router;
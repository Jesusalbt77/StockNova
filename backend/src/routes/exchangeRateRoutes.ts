import { Router } from "express";

import {
  consultarTasaDeCambio
} from "../controllers/exchangeRateController";

const router = Router();

router.get(
  "/",
  consultarTasaDeCambio
);

export default router;
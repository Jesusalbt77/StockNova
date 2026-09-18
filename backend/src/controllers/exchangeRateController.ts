import { Request, Response } from "express";

import { obtenerTasaDeCambio } from "../services/exchangeRateService";

export const consultarTasaDeCambio = async (
  req: Request,
  res: Response
) => {
  try {
    const datos = await obtenerTasaDeCambio();

    res.json({
      success: true,
      data: datos
    });
  } catch (error) {
    console.error(
      "Error al consultar tasa de cambio:",
      error
    );

    res.status(500).json({
      success: false,
      message: "No se pudo obtener la tasa de cambio"
    });
  }
};
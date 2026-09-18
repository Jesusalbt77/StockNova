import axios from "axios";

export const obtenerTasaDeCambio = async () => {
  try {
    const respuesta = await axios.get(
      "https://open.er-api.com/v6/latest/USD"
    );

    return {
      base: respuesta.data.base_code,
      tasas: respuesta.data.rates
    };
  } catch (error) {
    console.error(
      "Error al consultar la API de tasa de cambio:",
      error
    );

    throw new Error(
      "No se pudo obtener la tasa de cambio"
    );
  }
};
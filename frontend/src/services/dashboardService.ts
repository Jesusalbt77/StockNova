import api from "./api";

export interface DashboardData {
  totalProductos: number;
  totalCategorias: number;
  productosStockBajo: number;
  movimientosInventario: number;
  valorInventario: number;
}

interface DashboardResponse {
  success: boolean;
  dashboard: DashboardData;
}

export const obtenerDashboard =
  async (): Promise<DashboardData> => {
    const respuesta =
      await api.get<DashboardResponse>("/dashboard");

    return respuesta.data.dashboard;
  };
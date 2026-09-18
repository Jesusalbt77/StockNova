import { useEffect, useState } from "react";
import {
  obtenerDashboard,
  type DashboardData
} from "../services/dashboardService";

function Dashboard() {
  const [datos, setDatos] = useState<DashboardData | null>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    obtenerDashboard()
      .then((datosRecibidos) => {
        console.log(
          "Datos del dashboard:",
          datosRecibidos
        );

        setDatos(datosRecibidos);
      })
      .catch((error) => {
        console.error(
          "Error al obtener dashboard:",
          error
        );

        setError(
          "No se pudieron cargar los datos del dashboard."
        );
      })
      .finally(() => {
        setCargando(false);
      });
  }, []);

  return (
    <div>
      <div className="dashboard-header">
        <h1>Dashboard</h1>

        <p>
          Bienvenido a Stock Nova. Desde aquí podrás
          controlar el inventario de tu negocio.
        </p>
      </div>

      {cargando && (
        <div className="dashboard-card">
          <p>Cargando información...</p>
        </div>
      )}

      {error && (
        <div className="dashboard-card">
          <p>{error}</p>
        </div>
      )}

      {!cargando && !error && datos && (
        <div className="dashboard-cards">
          <div className="dashboard-card">
            <h2>Productos</h2>
            <p>{datos.totalProductos}</p>
          </div>

          <div className="dashboard-card">
            <h2>Categorías</h2>
            <p>{datos.totalCategorias}</p>
          </div>

          <div className="dashboard-card">
            <h2>Stock bajo</h2>
            <p>{datos.productosStockBajo}</p>
          </div>

          <div className="dashboard-card">
            <h2>Movimientos</h2>
            <p>{datos.movimientosInventario}</p>
          </div>
        </div>
      )}

      {!cargando && !error && datos && (
        <div className="dashboard-card">
          <h2>Valor del inventario</h2>

          <p>
            RD${" "}
            {datos.valorInventario.toLocaleString(
              "es-DO",
              {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              }
            )}
          </p>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
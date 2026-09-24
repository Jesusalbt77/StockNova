import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import {
obtenerDashboard,
type DashboardData
} from "../services/dashboardService";

function Dashboard() {
const [datos, setDatos] =
useState<DashboardData | null>(null);

const [, setCargando] =
useState(true);

const [error, setError] =
useState("");

const location = useLocation();

useEffect(() => {
let componenteActivo = true;

const cargarDashboard = async () => {
  try {
    setCargando(true);
    setError("");

    const datosRecibidos =
      await obtenerDashboard();

    if (!componenteActivo) {
      return;
    }

    if (
      datosRecibidos &&
      typeof datosRecibidos.totalProductos === "number" &&
      typeof datosRecibidos.totalCategorias === "number" &&
      typeof datosRecibidos.productosStockBajo === "number" &&
      typeof datosRecibidos.movimientosInventario === "number" &&
      typeof datosRecibidos.valorInventario === "number"
    ) {
      setDatos(datosRecibidos);
    } else {
      setError(
        "Los datos recibidos del dashboard no son válidos."
      );
    }
  } catch (error) {
    console.error(
      "Error al obtener dashboard:",
      error
    );

    if (!componenteActivo) {
      return;
    }

    setError(
      "No se pudieron cargar los datos del dashboard."
    );
  } finally {
    if (componenteActivo) {
      setCargando(false);
    }
  }
};

cargarDashboard();

return () => {
  componenteActivo = false;
};

}, [location.pathname]);

const productosNormales =
datos !== null
? Math.max(
0,
datos.totalProductos -
datos.productosStockBajo
)
: 0;

const porcentajeStockNormal =
datos !== null &&
datos.totalProductos > 0
? Math.round(
(productosNormales /
datos.totalProductos) *
100
)
: 0;

const porcentajeStockBajo =
datos !== null &&
datos.totalProductos > 0
? Math.round(
(datos.productosStockBajo /
datos.totalProductos) *
100
)
: 0;

return ( <div className="dashboard-page">

  <div className="dashboard-header">

    <div>
      <span className="dashboard-eyebrow">
        PANEL DE CONTROL
      </span>

      <h1>
        Dashboard
      </h1>

      <p>
        Supervisa el estado de tu inventario
        desde un solo lugar.
      </p>
    </div>

    <div className="dashboard-header-icon">

      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path d="M4 19V9" />
        <path d="M10 19V5" />
        <path d="M16 19v-7" />
        <path d="M22 19V3" />
      </svg>

    </div>

  </div>


  {error && (
    <div className="dashboard-card dashboard-error">
      <p>
        {error}
      </p>
    </div>
  )}


  <div className="dashboard-cards">

    <div className="dashboard-card stat-card">

      <div className="stat-card-top">

        <div className="stat-icon products-icon">

          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="m21 8-9-5-9 5 9 5 9-5Z" />
            <path d="m3 12 9 5 9-5" />
            <path d="m3 16 9 5 9-5" />
          </svg>

        </div>

        <span className="stat-label">
          PRODUCTOS
        </span>

      </div>

      <div className="stat-value">
        {datos === null
          ? "—"
          : datos.totalProductos}
      </div>

      <p className="stat-description">
        Productos registrados
      </p>

    </div>


    <div className="dashboard-card stat-card">

      <div className="stat-card-top">

        <div className="stat-icon categories-icon">

          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M4 5h16v4H4z" />
            <path d="M4 11h16v4H4z" />
            <path d="M4 17h10v2H4z" />
          </svg>

        </div>

        <span className="stat-label">
          CATEGORÍAS
        </span>

      </div>

      <div className="stat-value">
        {datos === null
          ? "—"
          : datos.totalCategorias}
      </div>

      <p className="stat-description">
        Categorías disponibles
      </p>

    </div>


    <div className="dashboard-card stat-card">

      <div className="stat-card-top">

        <div className="stat-icon warning-icon">

          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M12 3 2 21h20L12 3Z" />
            <path d="M12 9v5" />
            <path d="M12 18h.01" />
          </svg>

        </div>

        <span className="stat-label">
          ALERTAS
        </span>

      </div>

      <div className="stat-value">
        {datos === null
          ? "—"
          : datos.productosStockBajo}
      </div>

      <p className="stat-description">
        Productos con stock bajo
      </p>

    </div>


    <div className="dashboard-card stat-card">

      <div className="stat-card-top">

        <div className="stat-icon movement-icon">

          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M12 3v18" />
            <path d="m7 8 5-5 5 5" />
            <path d="m17 16-5 5-5-5" />
          </svg>

        </div>

        <span className="stat-label">
          MOVIMIENTOS
        </span>

      </div>

      <div className="stat-value">
        {datos === null
          ? "—"
          : datos.movimientosInventario}
      </div>

      <p className="stat-description">
        Movimientos registrados
      </p>

    </div>

  </div>


  <div className="inventory-value-card">

    <div className="inventory-value-icon">

      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <circle
          cx="12"
          cy="12"
          r="9"
        />

        <path d="M12 7v10" />

        <path d="M15 9.5c-.5-1-1.5-1.5-3-1.5s-2.5.7-2.5 1.8c0 2.8 5.5 1.4 5.5 4.2 0 1.2-1 2-2.8 2-1.5 0-2.6-.6-3.2-1.6" />
      </svg>

    </div>

    <div className="inventory-value-content">

      <span>
        VALOR TOTAL DEL INVENTARIO
      </span>

      <h2>
        RD${" "}

        {datos === null
          ? "—"
          : datos.valorInventario.toLocaleString(
              "es-DO",
              {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              }
            )}
      </h2>

      <p>
        Valor estimado de los productos
        actualmente registrados.
      </p>

    </div>

  </div>


  <section className="inventory-status-section">

    <div className="inventory-status-header">

      <div>

        <span className="inventory-status-eyebrow">
          ESTADO DEL INVENTARIO
        </span>

        <h2>
          Estado general del stock
        </h2>

        <p>
          Distribución actual de los productos
          según su nivel de stock.
        </p>

      </div>

    </div>


    <div className="inventory-status-card">

      <div className="inventory-status-main">

        <div className="inventory-status-icon">

          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <path d="M12 3 2 21h20L12 3Z" />
            <path d="M12 9v5" />
            <path d="M12 18h.01" />
          </svg>

        </div>

        <div>

          <span>
            PRODUCTOS CON STOCK BAJO
          </span>

          <strong>
            {datos === null
              ? "—"
              : datos.productosStockBajo}
          </strong>

        </div>

      </div>


      <div className="inventory-status-details">

        <div className="inventory-status-item">

          <div className="inventory-status-item-top">

            <span className="status-normal-dot" />

            <span>
              Stock normal
            </span>

            <strong>
              {datos === null
                ? "—"
                : `${productosNormales} (${porcentajeStockNormal}%)`}
            </strong>

          </div>

        </div>


        <div className="inventory-status-item">

          <div className="inventory-status-item-top">

            <span className="status-low-dot" />

            <span>
              Stock bajo
            </span>

            <strong>
              {datos === null
                ? "—"
                : `${datos.productosStockBajo} (${porcentajeStockBajo}%)`}
            </strong>

          </div>

        </div>


        <div className="inventory-status-bar">

          <div
            className="inventory-status-normal"
            style={{
              width:
                datos === null
                  ? "0%"
                  : `${porcentajeStockNormal}%`
            }}
          />

          <div
            className="inventory-status-low"
            style={{
              width:
                datos === null
                  ? "0%"
                  : `${porcentajeStockBajo}%`
            }}
          />

        </div>

      </div>

    </div>

  </section>

</div>

);
}

export default Dashboard;

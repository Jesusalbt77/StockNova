import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import categoriaRoutes from "./routes/categoriaRoutes";
import productoRoutes from "./routes/productoRoutes";
import inventarioRoutes from "./routes/inventarioRoutes";
import authRoutes from "./routes/authRoutes";
import dashboardRoutes from "./routes/dashboardRoutes";
import exchangeRateRoutes from "./routes/exchangeRateRoutes";
import supplierRoutes from "./routes/supplierRoutes";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173"
  })
);

const PORT = process.env.PORT || 3000;

// Permite recibir JSON
app.use(express.json());

// Ruta de prueba
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Stock Nova API funcionando"
  });
});

// Rutas de categorías
app.use("/api/categories", categoriaRoutes);

// Rutas de productos
app.use("/api/products", productoRoutes);

// Rutas de inventario
app.use("/api/inventory", inventarioRoutes);

// Rutas de autenticación
app.use("/api/auth", authRoutes);

// Rutas del dashboard
app.use("/api/dashboard", dashboardRoutes);

// API externa de tasa de cambio
app.use("/api/exchange-rate", exchangeRateRoutes);

// Rutas de proveedores
app.use("/api/suppliers", supplierRoutes);

app.listen(PORT, () => {
  console.log(
    `Stock Nova API ejecutándose en http://localhost:${PORT}`
  );
});
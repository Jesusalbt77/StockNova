import { Request, Response } from "express";
import { prisma } from "../config/prisma";

export const obtenerDashboard = async (
  req: Request,
  res: Response
) => {
  try {
    const totalProductos = await prisma.product.count();

    const totalCategorias = await prisma.category.count();

    const productosStockBajo = await prisma.product.count({
      where: {
        stock: {
          lte: prisma.product.fields.minStock
        }
      }
    });

    const movimientosInventario =
      await prisma.inventoryMovement.count();

    const productos = await prisma.product.findMany({
      select: {
        price: true,
        stock: true
      }
    });

    const valorInventario = productos.reduce(
      (total, producto) => {
        return total + Number(producto.price) * producto.stock;
      },
      0
    );

    res.json({
      success: true,
      dashboard: {
        totalProductos,
        totalCategorias,
        productosStockBajo,
        movimientosInventario,
        valorInventario
      }
    });
  } catch (error) {
    console.error("Error al obtener dashboard:", error);

    res.status(500).json({
      success: false,
      message: "Error al obtener los datos del dashboard"
    });
  }
};
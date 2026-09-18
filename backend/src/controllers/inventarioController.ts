import { Request, Response } from "express";
import { prisma } from "../config/prisma";

export const registrarEntrada = async (
  req: Request,
  res: Response
) => {
  try {
    const { productId, quantity } = req.body;

    const productoIdNumero = Number(productId);
    const cantidadNumero = Number(quantity);

    if (
      !Number.isInteger(productoIdNumero) ||
      productoIdNumero <= 0
    ) {
      return res.status(400).json({
        success: false,
        message: "El ID del producto no es válido"
      });
    }

    if (
      !Number.isInteger(cantidadNumero) ||
      cantidadNumero <= 0
    ) {
      return res.status(400).json({
        success: false,
        message:
          "La cantidad debe ser un número entero mayor que 0"
      });
    }

    const producto = await prisma.product.findUnique({
      where: {
        id: productoIdNumero
      }
    });

    if (!producto) {
      return res.status(404).json({
        success: false,
        message: "El producto no existe"
      });
    }

    const resultado = await prisma.$transaction(
      async (tx) => {
        const productoActualizado =
          await tx.product.update({
            where: {
              id: productoIdNumero
            },
            data: {
              stock: {
                increment: cantidadNumero
              }
            }
          });

        const movimiento =
          await tx.inventoryMovement.create({
            data: {
              productId: productoIdNumero,
              userId: res.locals.user.id,
              type: "ENTRADA",
              quantity: cantidadNumero
            }
          });

        return {
          producto: productoActualizado,
          movimiento
        };
      }
    );

    res.status(201).json({
      success: true,
      message:
        "Entrada de inventario registrada correctamente",
      ...resultado
    });
  } catch (error) {
    console.error(
      "Error al registrar entrada:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Error al registrar la entrada de inventario"
    });
  }
};

export const registrarSalida = async (
  req: Request,
  res: Response
) => {
  try {
    const { productId, quantity } = req.body;

    const productoIdNumero = Number(productId);
    const cantidadNumero = Number(quantity);

    if (
      !Number.isInteger(productoIdNumero) ||
      productoIdNumero <= 0
    ) {
      return res.status(400).json({
        success: false,
        message: "El ID del producto no es válido"
      });
    }

    if (
      !Number.isInteger(cantidadNumero) ||
      cantidadNumero <= 0
    ) {
      return res.status(400).json({
        success: false,
        message:
          "La cantidad debe ser un número entero mayor que 0"
      });
    }

    const producto = await prisma.product.findUnique({
      where: {
        id: productoIdNumero
      }
    });

    if (!producto) {
      return res.status(404).json({
        success: false,
        message: "El producto no existe"
      });
    }

    if (producto.stock < cantidadNumero) {
      return res.status(400).json({
        success: false,
        message: "No hay suficiente stock disponible"
      });
    }

    const resultado = await prisma.$transaction(
      async (tx) => {
        const productoActualizado =
          await tx.product.update({
            where: {
              id: productoIdNumero
            },
            data: {
              stock: {
                decrement: cantidadNumero
              }
            }
          });

        const movimiento =
          await tx.inventoryMovement.create({
            data: {
              productId: productoIdNumero,
              userId: res.locals.user.id,
              type: "SALIDA",
              quantity: cantidadNumero
            }
          });

        return {
          producto: productoActualizado,
          movimiento
        };
      }
    );

    res.status(201).json({
      success: true,
      message:
        "Salida de inventario registrada correctamente",
      ...resultado
    });
  } catch (error) {
    console.error(
      "Error al registrar salida:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Error al registrar la salida de inventario"
    });
  }
};

export const obtenerMovimientos = async (
  req: Request,
  res: Response
) => {
  try {
    const movimientos =
      await prisma.inventoryMovement.findMany({
        include: {
          product: true,
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              role: true
            }
          }
        },
        orderBy: {
          createdAt: "desc"
        }
      });

    res.json(movimientos);
  } catch (error) {
    console.error(
      "Error al obtener movimientos:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Error al obtener los movimientos"
    });
  }
};

import { Request, Response } from "express";
import { prisma } from "../config/prisma";

export const obtenerProductos = async (
  req: Request,
  res: Response
) => {
  try {
    const productos = await prisma.product.findMany({
      include: {
        category: true
      }
    });

    res.json(productos);
  } catch (error) {
    console.error("Error al obtener productos:", error);

    res.status(500).json({
      success: false,
      message: "Error al obtener los productos"
    });
  }
};

export const obtenerProductoPorId = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "El ID del producto no es válido"
      });
    }

    const producto = await prisma.product.findUnique({
      where: {
        id
      },
      include: {
        category: true
      }
    });

    if (!producto) {
      return res.status(404).json({
        success: false,
        message: "El producto no existe"
      });
    }

    res.json(producto);
  } catch (error) {
    console.error("Error al obtener producto:", error);

    res.status(500).json({
      success: false,
      message: "Error al obtener el producto"
    });
  }
};

export const crearProducto = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      name,
      description,
      price,
      stock,
      minStock,
      categoryId
    } = req.body;

    if (!name || typeof name !== "string") {
      return res.status(400).json({
        success: false,
        message: "El nombre del producto es obligatorio"
      });
    }

    const nombreLimpio = name.trim();

    if (nombreLimpio.length === 0) {
      return res.status(400).json({
        success: false,
        message: "El nombre del producto no puede estar vacío"
      });
    }

    const precioNumero = Number(price);

    if (isNaN(precioNumero) || precioNumero <= 0) {
      return res.status(400).json({
        success: false,
        message: "El precio debe ser un número mayor que 0"
      });
    }

    const stockNumero =
      stock === undefined ? 0 : Number(stock);

    if (!Number.isInteger(stockNumero) || stockNumero < 0) {
      return res.status(400).json({
        success: false,
        message:
          "El stock debe ser un número entero mayor o igual a 0"
      });
    }

    const stockMinimoNumero =
      minStock === undefined ? 0 : Number(minStock);

    if (
      !Number.isInteger(stockMinimoNumero) ||
      stockMinimoNumero < 0
    ) {
      return res.status(400).json({
        success: false,
        message:
          "El stock mínimo debe ser un número entero mayor o igual a 0"
      });
    }

    const categoriaIdNumero = Number(categoryId);

    if (
      !Number.isInteger(categoriaIdNumero) ||
      categoriaIdNumero <= 0
    ) {
      return res.status(400).json({
        success: false,
        message: "El ID de la categoría no es válido"
      });
    }

    const categoria = await prisma.category.findUnique({
      where: {
        id: categoriaIdNumero
      }
    });

    if (!categoria) {
      return res.status(404).json({
        success: false,
        message: "La categoría no existe"
      });
    }

    const producto = await prisma.product.create({
      data: {
        name: nombreLimpio,
        description:
          description && typeof description === "string"
            ? description.trim()
            : null,
        price: precioNumero,
        stock: stockNumero,
        minStock: stockMinimoNumero,
        categoryId: categoriaIdNumero
      },
      include: {
        category: true
      }
    });

    res.status(201).json(producto);
  } catch (error) {
    console.error("Error al crear producto:", error);

    res.status(500).json({
      success: false,
      message: "Error al crear el producto"
    });
  }
};

export const actualizarProducto = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        success: false,
        message: "El ID del producto no es válido"
      });
    }

    const productoExistente =
      await prisma.product.findUnique({
        where: {
          id
        }
      });

    if (!productoExistente) {
      return res.status(404).json({
        success: false,
        message: "El producto no existe"
      });
    }

    const {
      name,
      description,
      price,
      stock,
      minStock,
      categoryId
    } = req.body;

    if (!name || typeof name !== "string") {
      return res.status(400).json({
        success: false,
        message: "El nombre del producto es obligatorio"
      });
    }

    const nombreLimpio = name.trim();

    if (nombreLimpio.length === 0) {
      return res.status(400).json({
        success: false,
        message: "El nombre del producto no puede estar vacío"
      });
    }

    const precioNumero = Number(price);

    if (isNaN(precioNumero) || precioNumero <= 0) {
      return res.status(400).json({
        success: false,
        message: "El precio debe ser un número mayor que 0"
      });
    }

    const stockNumero = Number(stock);

    if (!Number.isInteger(stockNumero) || stockNumero < 0) {
      return res.status(400).json({
        success: false,
        message:
          "El stock debe ser un número entero mayor o igual a 0"
      });
    }

    const stockMinimoNumero = Number(minStock);

    if (
      !Number.isInteger(stockMinimoNumero) ||
      stockMinimoNumero < 0
    ) {
      return res.status(400).json({
        success: false,
        message:
          "El stock mínimo debe ser un número entero mayor o igual a 0"
      });
    }

    const categoriaIdNumero = Number(categoryId);

    if (
      !Number.isInteger(categoriaIdNumero) ||
      categoriaIdNumero <= 0
    ) {
      return res.status(400).json({
        success: false,
        message: "El ID de la categoría no es válido"
      });
    }

    const categoria = await prisma.category.findUnique({
      where: {
        id: categoriaIdNumero
      }
    });

    if (!categoria) {
      return res.status(404).json({
        success: false,
        message: "La categoría no existe"
      });
    }

    const productoActualizado =
      await prisma.product.update({
        where: {
          id
        },
        data: {
          name: nombreLimpio,
          description:
            description &&
            typeof description === "string"
              ? description.trim()
              : null,
          price: precioNumero,
          stock: stockNumero,
          minStock: stockMinimoNumero,
          categoryId: categoriaIdNumero
        },
        include: {
          category: true
        }
      });

    res.json(productoActualizado);
  } catch (error) {
    console.error("Error al actualizar producto:", error);

    res.status(500).json({
      success: false,
      message: "Error al actualizar el producto"
    });
  }
};

export const eliminarProducto = async (
  req: Request,
  res: Response
) => {
  console.log(">>> ELIMINAR PRODUCTO EJECUTADO <<<");

  try {
    const id = Number(req.params.id);

    console.log(">>> ID RECIBIDO:", id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        success: false,
        message: "El ID del producto no es válido"
      });
    }

    const producto = await prisma.product.findUnique({
      where: {
        id
      }
    });

    console.log(
      ">>> PRODUCTO ENCONTRADO:",
      producto
    );

    if (!producto) {
      return res.status(404).json({
        success: false,
        message: "El producto no existe"
      });
    }

    const movimientos =
      await prisma.inventoryMovement.count({
        where: {
          productId: id
        }
      });

    console.log(
      ">>> MOVIMIENTOS ENCONTRADOS:",
      movimientos
    );

    if (movimientos > 0) {
      return res.status(409).json({
        success: false,
        message:
          "No se puede eliminar este producto porque tiene movimientos de inventario registrados."
      });
    }

    await prisma.product.delete({
      where: {
        id
      }
    });

    console.log(
      ">>> PRODUCTO ELIMINADO CORRECTAMENTE <<<"
    );

    res.json({
      success: true,
      message: "Producto eliminado correctamente"
    });
  } catch (error) {
    console.error(
      ">>> ERROR REAL AL ELIMINAR PRODUCTO:",
      error
    );

    const mensajeError =
      error instanceof Error
        ? error.message
        : "Error desconocido";

    res.status(500).json({
      success: false,
      message: mensajeError
    });
  }
};

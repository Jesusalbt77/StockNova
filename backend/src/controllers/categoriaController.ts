import { Request, Response } from "express";
import { prisma } from "../config/prisma";

export const obtenerCategorias = async (
  req: Request,
  res: Response
) => {
  try {
    const categorias = await prisma.category.findMany({
      include: {
        products: true
      }
    });

    res.json(categorias);
  } catch (error) {
    console.error("Error al obtener categorías:", error);

    res.status(500).json({
      success: false,
      message: "Error al obtener las categorías"
    });
  }
};

export const crearCategoria = async (
  req: Request,
  res: Response
) => {
  try {
    const { name } = req.body;

    // Validar que el nombre exista
    if (!name || typeof name !== "string") {
      return res.status(400).json({
        success: false,
        message: "El nombre de la categoría es obligatorio"
      });
    }

    // Eliminar espacios innecesarios
    const nombreLimpio = name.trim();

    // Evitar nombres vacíos
    if (nombreLimpio.length === 0) {
      return res.status(400).json({
        success: false,
        message: "El nombre de la categoría no puede estar vacío"
      });
    }

    // Comprobar si ya existe
    const categoriaExistente = await prisma.category.findUnique({
      where: {
        name: nombreLimpio
      }
    });

    if (categoriaExistente) {
      return res.status(409).json({
        success: false,
        message: "La categoría ya existe"
      });
    }

    // Crear categoría
    const categoria = await prisma.category.create({
      data: {
        name: nombreLimpio
      }
    });

    res.status(201).json(categoria);
  } catch (error) {
    console.error("Error al crear categoría:", error);

    res.status(500).json({
      success: false,
      message: "Error al crear la categoría"
    });
  }
};

export const actualizarCategoria = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);
    const { name } = req.body;

    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "El ID de la categoría no es válido"
      });
    }

    if (!name || typeof name !== "string") {
      return res.status(400).json({
        success: false,
        message: "El nombre de la categoría es obligatorio"
      });
    }

    const nombreLimpio = name.trim();

    if (nombreLimpio.length === 0) {
      return res.status(400).json({
        success: false,
        message: "El nombre de la categoría no puede estar vacío"
      });
    }

    const categoria = await prisma.category.update({
      where: {
        id
      },
      data: {
        name: nombreLimpio
      }
    });

    res.json(categoria);
  } catch (error) {
    console.error("Error al actualizar categoría:", error);

    res.status(500).json({
      success: false,
      message: "Error al actualizar la categoría"
    });
  }
};

export const eliminarCategoria = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "El ID de la categoría no es válido"
      });
    }

    const categoria = await prisma.category.findUnique({
      where: {
        id
      }
    });

    if (!categoria) {
      return res.status(404).json({
        success: false,
        message: "La categoría no existe"
      });
    }

    await prisma.category.delete({
      where: {
        id
      }
    });

    res.json({
      success: true,
      message: "Categoría eliminada correctamente"
    });
  } catch (error) {
    console.error("Error al eliminar categoría:", error);

    res.status(500).json({
      success: false,
      message: "Error al eliminar la categoría"
    });
  }
};
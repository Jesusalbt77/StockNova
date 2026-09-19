import { Request, Response } from "express";
import { prisma } from "../config/prisma";

export const obtenerCategorias = async (
  req: Request,
  res: Response
) => {
  try {
    const categorias =
      await prisma.category.findMany({
        include: {
          products: true
        }
      });

    res.setHeader(
      "Content-Type",
      "application/json; charset=utf-8"
    );

    res.json(categorias);
  } catch (error) {
    console.error(
      "Error al obtener categorías:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Error al obtener las categorías"
    });
  }
};

export const crearCategoria = async (
  req: Request,
  res: Response
) => {
  try {
    const { name } = req.body;

    if (
      !name ||
      typeof name !== "string"
    ) {
      return res.status(400).json({
        success: false,
        message:
          "El nombre de la categoría es obligatorio"
      });
    }

    const nombreLimpio = name.trim();

    if (nombreLimpio.length === 0) {
      return res.status(400).json({
        success: false,
        message:
          "El nombre de la categoría no puede estar vacío"
      });
    }

    const categoriaExistente =
      await prisma.category.findUnique({
        where: {
          name: nombreLimpio
        }
      });

    if (categoriaExistente) {
      return res.status(409).json({
        success: false,
        message:
          "La categoría ya existe"
      });
    }

    const categoria =
      await prisma.category.create({
        data: {
          name: nombreLimpio
        }
      });

    res.setHeader(
      "Content-Type",
      "application/json; charset=utf-8"
    );

    res.status(201).json(categoria);
  } catch (error) {
    console.error(
      "Error al crear categoría:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Error al crear la categoría"
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
        message:
          "El ID de la categoría no es válido"
      });
    }

    if (
      !name ||
      typeof name !== "string"
    ) {
      return res.status(400).json({
        success: false,
        message:
          "El nombre de la categoría es obligatorio"
      });
    }

    const nombreLimpio = name.trim();

    if (nombreLimpio.length === 0) {
      return res.status(400).json({
        success: false,
        message:
          "El nombre de la categoría no puede estar vacío"
      });
    }

    const categoria =
      await prisma.category.update({
        where: {
          id
        },
        data: {
          name: nombreLimpio
        }
      });

    res.setHeader(
      "Content-Type",
      "application/json; charset=utf-8"
    );

    res.json(categoria);
  } catch (error) {
    console.error(
      "Error al actualizar categoría:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Error al actualizar la categoría"
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
        message:
          "El ID de la categoría no es válido"
      });
    }

    const categoria =
      await prisma.category.findUnique({
        where: {
          id
        }
      });

    if (!categoria) {
      return res.status(404).json({
        success: false,
        message:
          "La categoría no existe"
      });
    }

    await prisma.category.delete({
      where: {
        id
      }
    });

    res.setHeader(
      "Content-Type",
      "application/json; charset=utf-8"
    );

    res.json({
      success: true,
      message:
        "Categoría eliminada correctamente"
    });
  } catch (error) {
    console.error(
      "Error al eliminar categoría:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Error al eliminar la categoría"
    });
  }
};
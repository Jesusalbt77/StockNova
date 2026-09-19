import { Request, Response } from "express";
import { prisma } from "../config/prisma";

export const obtenerProveedores = async (
  req: Request,
  res: Response
) => {
  try {
    const proveedores = await prisma.supplier.findMany({
      orderBy: {
        name: "asc"
      }
    });

    res.json(proveedores);
  } catch (error) {
    console.error(
      "Error al obtener proveedores:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Error al obtener los proveedores"
    });
  }
};

export const obtenerProveedorPorId = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        success: false,
        message: "El ID del proveedor no es válido"
      });
    }

    const proveedor =
      await prisma.supplier.findUnique({
        where: {
          id
        }
      });

    if (!proveedor) {
      return res.status(404).json({
        success: false,
        message: "El proveedor no existe"
      });
    }

    res.json(proveedor);
  } catch (error) {
    console.error(
      "Error al obtener proveedor:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Error al obtener el proveedor"
    });
  }
};

export const crearProveedor = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      name,
      email,
      phone
    } = req.body;

    if (!name || typeof name !== "string") {
      return res.status(400).json({
        success: false,
        message: "El nombre del proveedor es obligatorio"
      });
    }

    const nombreLimpio = name.trim();

    if (nombreLimpio.length === 0) {
      return res.status(400).json({
        success: false,
        message:
          "El nombre del proveedor no puede estar vacío"
      });
    }

    const emailLimpio =
      email && typeof email === "string"
        ? email.trim()
        : null;

    const telefonoLimpio =
      phone && typeof phone === "string"
        ? phone.trim()
        : null;

    const proveedor =
      await prisma.supplier.create({
        data: {
          name: nombreLimpio,
          email: emailLimpio,
          phone: telefonoLimpio
        }
      });

    res.status(201).json(proveedor);
  } catch (error) {
    console.error(
      "Error al crear proveedor:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Error al crear el proveedor"
    });
  }
};

export const actualizarProveedor = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        success: false,
        message: "El ID del proveedor no es válido"
      });
    }

    const proveedorExistente =
      await prisma.supplier.findUnique({
        where: {
          id
        }
      });

    if (!proveedorExistente) {
      return res.status(404).json({
        success: false,
        message: "El proveedor no existe"
      });
    }

    const {
      name,
      email,
      phone
    } = req.body;

    if (!name || typeof name !== "string") {
      return res.status(400).json({
        success: false,
        message: "El nombre del proveedor es obligatorio"
      });
    }

    const nombreLimpio = name.trim();

    if (nombreLimpio.length === 0) {
      return res.status(400).json({
        success: false,
        message:
          "El nombre del proveedor no puede estar vacío"
      });
    }

    const emailLimpio =
      email && typeof email === "string"
        ? email.trim()
        : null;

    const telefonoLimpio =
      phone && typeof phone === "string"
        ? phone.trim()
        : null;

    const proveedorActualizado =
      await prisma.supplier.update({
        where: {
          id
        },
        data: {
          name: nombreLimpio,
          email: emailLimpio,
          phone: telefonoLimpio
        }
      });

    res.json(proveedorActualizado);
  } catch (error) {
    console.error(
      "Error al actualizar proveedor:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Error al actualizar el proveedor"
    });
  }
};

export const eliminarProveedor = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        success: false,
        message: "El ID del proveedor no es válido"
      });
    }

    const proveedor =
      await prisma.supplier.findUnique({
        where: {
          id
        }
      });

    if (!proveedor) {
      return res.status(404).json({
        success: false,
        message: "El proveedor no existe"
      });
    }

    await prisma.supplier.delete({
      where: {
        id
      }
    });

    res.json({
      success: true,
      message: "Proveedor eliminado correctamente"
    });
  } catch (error) {
    console.error(
      "Error al eliminar proveedor:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Error al eliminar el proveedor"
    });
  }
};
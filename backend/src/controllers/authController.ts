import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../config/prisma";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET no está configurado en el archivo .env");
}

export const registrarUsuario = async (
  req: Request,
  res: Response
) => {
  try {
    const { name, email, password } = req.body;

    // Validar nombre
    if (!name || typeof name !== "string") {
      return res.status(400).json({
        success: false,
        message: "El nombre es obligatorio"
      });
    }

    const nombreLimpio = name.trim();

    if (nombreLimpio.length === 0) {
      return res.status(400).json({
        success: false,
        message: "El nombre no puede estar vacío"
      });
    }

    // Validar email
    if (!email || typeof email !== "string") {
      return res.status(400).json({
        success: false,
        message: "El email es obligatorio"
      });
    }

    const emailLimpio = email.trim().toLowerCase();

    // Validar contraseña
    if (!password || typeof password !== "string") {
      return res.status(400).json({
        success: false,
        message: "La contraseña es obligatoria"
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "La contraseña debe tener al menos 6 caracteres"
      });
    }

    // Comprobar si el usuario ya existe
    const usuarioExistente = await prisma.user.findUnique({
      where: {
        email: emailLimpio
      }
    });

    if (usuarioExistente) {
      return res.status(409).json({
        success: false,
        message: "El email ya está registrado"
      });
    }

    // Cifrar contraseña
    const passwordHash = await bcrypt.hash(password, 10);

    // Crear usuario
    const usuario = await prisma.user.create({
      data: {
        name: nombreLimpio,
        email: emailLimpio,
        password: passwordHash,
        role: "USER"
      }
    });

    // No devolver la contraseña
    res.status(201).json({
      success: true,
      message: "Usuario registrado correctamente",
      user: {
        id: usuario.id,
        name: usuario.name,
        email: usuario.email,
        role: usuario.role
      }
    });
  } catch (error) {
    console.error("Error al registrar usuario:", error);

    res.status(500).json({
      success: false,
      message: "Error al registrar el usuario"
    });
  }
};

export const iniciarSesion = async (
  req: Request,
  res: Response
) => {
  try {
    const { email, password } = req.body;

    // Validar email
    if (!email || typeof email !== "string") {
      return res.status(400).json({
        success: false,
        message: "El email es obligatorio"
      });
    }

    // Validar contraseña
    if (!password || typeof password !== "string") {
      return res.status(400).json({
        success: false,
        message: "La contraseña es obligatoria"
      });
    }

    const emailLimpio = email.trim().toLowerCase();

    // Buscar usuario
    const usuario = await prisma.user.findUnique({
      where: {
        email: emailLimpio
      }
    });

    if (!usuario) {
      return res.status(401).json({
        success: false,
        message: "Email o contraseña incorrectos"
      });
    }

    // Comparar contraseña
    const passwordCorrecta = await bcrypt.compare(
      password,
      usuario.password
    );

    if (!passwordCorrecta) {
      return res.status(401).json({
        success: false,
        message: "Email o contraseña incorrectos"
      });
    }

    // Crear token JWT
    const token = jwt.sign(
      {
        userId: usuario.id,
        role: usuario.role
      },
      JWT_SECRET,
      {
        expiresIn: "8h"
      }
    );

    // Devolver token y datos públicos del usuario
    res.json({
      success: true,
      message: "Inicio de sesión correcto",
      token,
      user: {
        id: usuario.id,
        name: usuario.name,
        email: usuario.email,
        role: usuario.role
      }
    });
  } catch (error) {
    console.error("Error al iniciar sesión:", error);

    res.status(500).json({
      success: false,
      message: "Error al iniciar sesión"
    });
  }
};

export const obtenerUsuarioActual = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = res.locals.user.id;

    const usuario = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!usuario) {
      return res.status(404).json({
        success: false,
        message: "El usuario no existe"
      });
    }

    res.json({
      success: true,
      user: {
        id: usuario.id,
        name: usuario.name,
        email: usuario.email,
        role: usuario.role
      }
    });
  } catch (error) {
    console.error("Error al obtener usuario:", error);

    res.status(500).json({
      success: false,
      message: "Error al obtener el usuario"
    });
  }
};
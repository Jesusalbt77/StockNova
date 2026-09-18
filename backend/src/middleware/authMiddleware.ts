import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET no está configurado en el archivo .env");
}

interface TokenPayload {
  userId: number;
  role: string;
}

export const autenticar = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authorization = req.headers.authorization;

    if (!authorization) {
      return res.status(401).json({
        success: false,
        message: "No se proporcionó un token de autenticación"
      });
    }

    const partes = authorization.split(" ");

    if (partes.length !== 2 || partes[0] !== "Bearer") {
      return res.status(401).json({
        success: false,
        message: "Formato de token inválido"
      });
    }

    const token = partes[1];

    const payload = jwt.verify(
      token,
      JWT_SECRET
    ) as TokenPayload;

    res.locals.user = {
      id: payload.userId,
      role: payload.role
    };

    next();
  } catch (error) {
    console.error("Error de autenticación:", error);

    return res.status(401).json({
      success: false,
      message: "Token inválido o expirado"
    });
  }
};
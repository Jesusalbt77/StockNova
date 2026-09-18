import { Request, Response, NextFunction } from "express";

export const requerirRol = (...rolesPermitidos: string[]) => {
  return (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const usuario = res.locals.user;

    if (!usuario) {
      return res.status(401).json({
        success: false,
        message: "Usuario no autenticado"
      });
    }

    if (!rolesPermitidos.includes(usuario.role)) {
      return res.status(403).json({
        success: false,
        message: "No tienes permisos para realizar esta acción"
      });
    }

    next();
  };
};
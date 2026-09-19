import api from "./api";

export interface Usuario {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface LoginResponse {
  success: boolean;
  message: string;
  token: string;
  user: Usuario;
}

export const iniciarSesion = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  const respuesta = await api.post("/auth/login", {
    email,
    password
  });

  const datos: LoginResponse = respuesta.data;

  sessionStorage.setItem(
    "stocknova_token",
    datos.token
  );

  sessionStorage.setItem(
    "stocknova_user",
    JSON.stringify(datos.user)
  );

  return datos;
};

export const obtenerToken = (): string | null => {
  return sessionStorage.getItem(
    "stocknova_token"
  );
};

export const obtenerUsuario = (): Usuario | null => {
  const usuario = sessionStorage.getItem(
    "stocknova_user"
  );

  if (!usuario) {
    return null;
  }

  return JSON.parse(usuario);
};

export const cerrarSesion = (): void => {
  sessionStorage.removeItem(
    "stocknova_token"
  );

  sessionStorage.removeItem(
    "stocknova_user"
  );
};
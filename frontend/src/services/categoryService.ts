import api from "./api";

export interface Category {
  id: number;
  name: string;
}

export const obtenerCategorias =
  async (): Promise<Category[]> => {
    const respuesta =
      await api.get<Category[]>(
        "/categories"
      );

    const datos = respuesta.data;

    if (Array.isArray(datos)) {
      return datos;
    }

    return [];
  };

export const crearCategoria = async (
  name: string
): Promise<Category> => {
  const respuesta =
    await api.post<Category>(
      "/categories",
      {
        name
      }
    );

  return respuesta.data;
};

export const actualizarCategoria = async (
  id: number,
  name: string
): Promise<Category> => {
  const respuesta =
    await api.put<Category>(
      `/categories/${id}`,
      {
        name
      }
    );

  return respuesta.data;
};

export const eliminarCategoria = async (
  id: number
): Promise<void> => {
  await api.delete(
    `/categories/${id}`
  );
};
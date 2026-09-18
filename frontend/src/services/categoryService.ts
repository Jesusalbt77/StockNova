import api from "./api";

export interface Category {
  id: number;
  name: string;
}

interface CategoryResponse {
  success: boolean;
  message: string;
  category: Category;
}

export const obtenerCategorias =
  async (): Promise<Category[]> => {
    const respuesta = await api.get("/categories");

    const datos = respuesta.data;

    if (Array.isArray(datos)) {
      return datos;
    }

    if (Array.isArray(datos.categories)) {
      return datos.categories;
    }

    if (Array.isArray(datos.data)) {
      return datos.data;
    }

    return [];
  };

export const crearCategoria = async (
  name: string
): Promise<Category> => {
  const respuesta =
    await api.post<CategoryResponse>(
      "/categories",
      {
        name
      }
    );

  return respuesta.data.category;
};

export const actualizarCategoria = async (
  id: number,
  name: string
): Promise<Category> => {
  const respuesta =
    await api.put<CategoryResponse>(
      `/categories/${id}`,
      {
        name
      }
    );

  return respuesta.data.category;
};

export const eliminarCategoria = async (
  id: number
): Promise<void> => {
  await api.delete(`/categories/${id}`);
};
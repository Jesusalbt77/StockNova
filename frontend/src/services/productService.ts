import api from "./api";
import type { Product } from "../types/product";

export const obtenerProductos = async (): Promise<Product[]> => {
  const respuesta = await api.get("/products");

  const datos = respuesta.data;

  if (Array.isArray(datos)) {
    return datos;
  }

  if (Array.isArray(datos.products)) {
    return datos.products;
  }

  if (Array.isArray(datos.data)) {
    return datos.data;
  }

  return [];
};

export interface CrearProductoData {
  name: string;
  description?: string;
  price: number;
  stock: number;
  minStock: number;
  categoryId: number;
}

interface CrearProductoResponse {
  success: boolean;
  message: string;
  product: Product;
}

export const crearProducto = async (
  producto: CrearProductoData
): Promise<Product> => {
  const respuesta =
    await api.post<CrearProductoResponse>(
      "/products",
      producto
    );

  return respuesta.data.product;
};

export const actualizarProducto = async (
  id: number,
  producto: CrearProductoData
): Promise<Product> => {
  const respuesta =
    await api.put<CrearProductoResponse>(
      `/products/${id}`,
      producto
    );

  return respuesta.data.product;
};

export const eliminarProducto = async (
  id: number
): Promise<void> => {
  await api.delete(`/products/${id}`);
};
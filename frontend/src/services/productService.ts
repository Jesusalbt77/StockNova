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
  minStock: number;
  categoryId: number;
}

export const crearProducto = async (
  producto: CrearProductoData
): Promise<Product> => {
  const respuesta = await api.post<Product>(
    "/products",
    producto
  );

  return respuesta.data;
};

export const actualizarProducto = async (
  id: number,
  producto: CrearProductoData
): Promise<Product> => {
  const respuesta = await api.put<Product>(
    `/products/${id}`,
    producto
  );

  return respuesta.data;
};

export const eliminarProducto = async (
  id: number
): Promise<void> => {
  await api.delete(`/products/${id}`);
};
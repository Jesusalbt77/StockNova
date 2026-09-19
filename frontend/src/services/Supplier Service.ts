import api from "./API";

export interface Supplier {
  id: number;
  name: string;
  email: string | null;
  phone: string | null;
}

export interface CreateSupplierData {
  name: string;
  email?: string;
  phone?: string;
}

export interface UpdateSupplierData {
  name: string;
  email?: string;
  phone?: string;
}

export const getSuppliers = async (): Promise<Supplier[]> => {
  const response = await api.get<Supplier[]>("/suppliers");

  return response.data;
};

export const getSupplierById = async (
  id: number
): Promise<Supplier> => {
  const response = await api.get<Supplier>(`/suppliers/${id}`);

  return response.data;
};

export const createSupplier = async (
  data: CreateSupplierData
): Promise<Supplier> => {
  const response = await api.post<Supplier>("/suppliers", data);

  return response.data;
};

export const updateSupplier = async (
  id: number,
  data: UpdateSupplierData
): Promise<Supplier> => {
  const response = await api.put<Supplier>(
    `/suppliers/${id}`,
    data
  );

  return response.data;
};

export const deleteSupplier = async (
  id: number
): Promise<void> => {
  await api.delete(`/suppliers/${id}`);
};
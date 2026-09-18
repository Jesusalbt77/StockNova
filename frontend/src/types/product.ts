export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  stock: number;
  minStock: number;
  categoryId: number;
  createdAt: string;
}
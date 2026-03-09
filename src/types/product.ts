export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  material: string;
  images: string[];
  category: string;
}

export interface OrderData {
  product: Product;
  quantity: number;
}

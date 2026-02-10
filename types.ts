export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
  // Opcional: cantidad disponible en stock (unidades)
  stock?: number;
  // Opcional: precios mayoristas (por paquete). Ej: [{ qty: 6, price: 10000 }, ...]
  wholesalePrices?: WholesalePrice[];
}

export interface CartItem extends Product {
  quantity: number;
}

export interface UserDetails {
  name: string;
  address: string;
  phone: string;
  instructions: string;
}

export interface WholesalePrice {
  qty: number;
  // precio total por ese paquete (no unitario)
  price: number;
}
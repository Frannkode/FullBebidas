export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
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
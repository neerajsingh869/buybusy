export interface ProductDB {
  image: string;
  price: number;
  title: string;
  category: string;
}

export interface Product extends ProductDB {
  id: string;
}

export interface CartItem extends Product {
  qty: number;
}

export interface Order {
  id: number;
  orderedOn: string;
  products: CartItem[];
  totalPrice: number;
}

export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

export type UserId = null | undefined | string;

export type Theme = "light" | "dark";

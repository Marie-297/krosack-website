
export interface Address {
  _id: string;
  userId: string;
  fullName: string;
  phoneNumber: string;
  pincode: number;
  area: string;
  city: string;
  state: string;
  __v: number;
}
export interface Product {
  _id: string;
  userId: string;
  name: string;
  description: string;
  price: number;
  offerPrice: number;
  image: string[];
  category: string;
  date: number;
  __v: number;
}
export interface OrderItem {
  _id: string;
  product: Product;
  quantity: number;
}
export interface Order {
  _id: string;
  userId: string;
  items: OrderItem[];
  address: Address;
  amount: number;
  date: number;
  __v: number;
}


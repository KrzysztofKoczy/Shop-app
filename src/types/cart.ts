import type { Product } from "../api/products";

export type CartItem = {
    product: Product;
    quantity: number;
}
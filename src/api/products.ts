import type { Product } from "../types/product";

const PRODUCTS_API_URL = "https://fakestoreapi.com/products";

export function fetchProducts(): Promise<Product[]> {
    return fetch(PRODUCTS_API_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Nie udało się pobrać produktów");
        }
        return response.json();
      })
      .then((data) => data as Product[]);
  }


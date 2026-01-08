import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Product } from "../types/product";
import { fetchProducts } from "../api/products";

type ProductContextType = {
    products: Product[];
    isLoading: boolean;
    error: string | null;
    randomProduct: Product | null;
}

const ProductContext = createContext<ProductContextType | null>(null);

export function ProductProvider({ children }: { children: React.ReactNode }) {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
        setIsLoading(true);
    
        fetchProducts()
          .then((data) => {
            setProducts(data);
            setError(null);
          })
          .catch((error) => {
            setError("Nie udało się pobrać produktów")
          })
          .finally(() => {
            setIsLoading(false);
          });
      }, []);  

      const randomProduct = useMemo(() => {
        if (products.length === 0) return null;
        const randomIndex = Math.floor(Math.random() * products.length);
        return products[randomIndex];
      }, [products]);

      return (
        <ProductContext.Provider value={{ products, isLoading, error, randomProduct }}>
          {children}
        </ProductContext.Provider>
      );
}

export function useProduct() {
    const context = useContext(ProductContext);

    if (!context) throw new Error("useProduct must be used within ProductProvider");
  
    return context;
}
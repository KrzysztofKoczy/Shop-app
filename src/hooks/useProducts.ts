import { useMemo } from "react";
import { useQuery, type QueryObserverResult } from "@tanstack/react-query";
import { fetchProducts } from "../api/products";
import type { Product } from "../types/product";

type UseProductsResult = {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  randomProduct: Product | null;
  refetch: () => Promise<QueryObserverResult<Product[], Error>>;
};

const PRODUCTS_QUERY_KEY = ["products"];

export function useProducts(): UseProductsResult {
  const { data, isLoading, isFetching, isError, error, refetch } = useQuery<
    Product[],
    Error
  >({
    queryKey: PRODUCTS_QUERY_KEY,
    queryFn: fetchProducts,
    staleTime: 60000,
  });

  const products = data ?? [];

  const randomProduct = useMemo(() => {
    if (products.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * products.length);
    return products[randomIndex];
  }, [products]);

  return {
    products,
    isLoading: isLoading || isFetching,
    error: isError ? error?.message ?? "Nie udało się pobrać produktów" : null,
    randomProduct,
    refetch,
  };
}


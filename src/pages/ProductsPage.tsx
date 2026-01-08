import { useProduct } from "../context/ProductContext";
import { useMemo, useState } from "react";
import ProductsSort from "../components/products/ProductsSort";
import type { ProductsSortOption } from "../types/sort";
import { sortProducts } from "../helpers/products";
import ProductsList from "../components/products/ProductsList";


export default function ProductsPage() {
  const { products, isLoading, error } = useProduct();
  const [sortBy, setSortBy] = useState<ProductsSortOption>("default");


  function handleSortChange(value: ProductsSortOption) {
    setSortBy(value);
  }

  const sortedProducts = useMemo(() => sortProducts(products, sortBy), [products, sortBy]);

  return (
    <main>
      <h1>Products</h1>

      {isLoading && <p>Trwa ładowanie produktów...</p>}

      {error && <p>{error}</p>}

      <ProductsSort selectedOption={sortBy} disabled={isLoading || !!error} onOptionChange={handleSortChange}/>

      <div className="products-container">
        {!isLoading && !error && <ProductsList products={sortedProducts}/>}
      </div>
    </main>
  );
}


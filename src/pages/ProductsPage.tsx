import { useEffect, useMemo, useState } from "react";
import type { Product } from "../api/products";
import { fetchProducts } from "../api/products";
import ProductsSort from "../components/products/ProductsSort";
import type { ProductsSortOption } from "../types/sort";
import { sortProducts } from "../helpers/products";


export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<ProductsSortOption>("default");
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

  function handleSortChange(value: ProductsSortOption) {
    setSortBy(value);
  }

  const sortedProducts = useMemo(() => sortProducts(products, sortBy), [products, sortBy]);

  return (
    <main>
      <h1>Products</h1>

      {isLoading && <p>Trwa ładowanie produktów...</p>}

      {error && <p>{error}</p>}

      {/* add disable functionality */}
      <ProductsSort selectedOption={sortBy} onOptionChange={handleSortChange}/>

      <div className="products-container">
        {!isLoading && !error && sortedProducts.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.title} className="product-image" />
            <h2>{product.title}</h2>
            <p>{product.price}</p>
            <p>{product.category}</p>
            <p>Ocena: {product.rating.rate} ({product.rating.count} Opini)</p>
          </div>
        ))}
      </div>
    </main>
  );
}


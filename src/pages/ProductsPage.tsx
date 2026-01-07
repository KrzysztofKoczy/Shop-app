import { useEffect, useMemo, useState } from "react";
import type { Product } from "../api/products";
import { fetchProducts } from "../api/products";
import ProductsSort, {
  type ProductsSortOption,
} from "../components/products/ProductsSort";


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

  // TODO move to helpers
  const sortedProducts = useMemo(() => {
    const items = [...products];

    switch(sortBy) {
      case 'title-asc':
        return items.sort((a, b) => a.title.localeCompare(b.title))
      case 'title-desc':
        return items.sort((a, b) => b.title.localeCompare(a.title))
      case 'price-asc':
        return items.sort((a, b) => a.price - b.price)
      case 'price-desc':
        return items.sort((a, b) => b.price - a.price)
      default:
        return products
    }
  }, [products, sortBy])

  return (
    <main>
      <h1>Products</h1>

      {isLoading && <p>Trwa ładowanie produktów...</p>}

      {error && <p>{error}</p>}


{/* add disable functionality */}
      <ProductsSort selectedOption={sortBy} onOptionChange={handleSortChange}/>
      <p>{sortBy}</p>

<div
  style={{
    display: "flex",
    flexWrap: "wrap",
    gap: "16px",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "100%"
  }}>


  {!isLoading && !error &&
    sortedProducts.map((product) => (

        <div
          key={product.id}
          style={{
            width: "200px",
            height: "auto",
            fontSize: "12px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            border: "1px solid gray"
          }}
          className="product"
        >
          <img src={product.image} alt={product.title} style={{ width: "64px", height: "64px" }} />
          <h2>{product.title}</h2>
          <p>{product.price}</p>
          <p>{product.category}</p>
          <p>
            Ocena: {product.rating.rate} ({product.rating.count} Opini)
          </p>
        </div>

    ))
    
    }
</div>
    </main>
  );
}


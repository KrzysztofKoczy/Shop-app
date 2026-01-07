import { useEffect, useState } from "react";
import type { Product } from "../api/products";
import { fetchProducts } from "../api/products";



export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>("default");



  useEffect(() => {
    setIsLoading(true);

    fetchProducts()
      .then((data) => {
        console.log("products", data);
        setProducts(data);
        // TODO remove error if exist
      })
      .catch((error) => {
        // TODO add error state handle useState setError...
        console.error("Nie udało się pobrać produktów", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);



  // sortowanie po tytule, cenie lub domyślnie
  return (
    <main>
      <h1>Products</h1>

      {isLoading && <p>Trwa ładowanie produktów...</p>}

      {/* add error handle */}

<div
  style={{
    display: "flex",
    flexWrap: "wrap",
    gap: "16px",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "100%"
  }}>

{/* add error to condition */}
  {!isLoading &&
    products.map((product) => (
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
    ))}
</div>

    </main>
  );
}


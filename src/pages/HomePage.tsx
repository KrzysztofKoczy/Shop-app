import ProductItem from "../components/products/ProductItem";
import { useProducts } from "../hooks/useProducts";

export default function HomePage() {
  const { randomProduct } = useProducts();

  return (
    <main>
      <h1>Home</h1>
      <div className="home-product">
        {randomProduct && <ProductItem product={randomProduct} />}
      </div>
    </main>
  );
}


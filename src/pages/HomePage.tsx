import ProductItem from "../components/products/ProductItem";
import { useProduct } from "../context/ProductContext";

export default function HomePage() {
  const { randomProduct } = useProduct();

  return (
    <main>
      <h1>Home</h1>
      <div className="home-product">
        {randomProduct && <ProductItem product={randomProduct} />}
      </div>
    </main>
  );
}


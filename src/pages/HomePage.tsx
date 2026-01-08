import ProductItem from "../components/products/ProductItem";
import { useProduct } from "../context/ProductContext";

export default function HomePage() {
  const { randomProduct } = useProduct();

  return (
    <main>
      <h1>Home</h1>
      {/* add random roduct */}
      {randomProduct && <ProductItem product={randomProduct} />}
     
    </main>
  );
}


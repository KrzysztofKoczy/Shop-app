import { useProduct } from "../context/ProductContext";

export default function HomePage() {
  const { randomProduct } = useProduct();

  return (
    <main>
      <h1>Home</h1>
      <p>{randomProduct && randomProduct.title} </p>
      {/* add random roduct */}
    </main>
  );
}


import { useState } from "react";
import type { Product } from "../../api/products";
import { useCart } from "../../context/CartContext";

type ProductItem = {
    product: Product
};

export default function ProductItem({ product }: ProductItem) {
  const [quantity, setQuantity] = useState(0);
  const { addToCart } = useCart();

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1)
  }

  const handleDecrement = () => {
    setQuantity((prev) => Math.max(0, prev - 1));
  };

  const handleAddToCart = () => {
    if (quantity > 0) {
        addToCart(product, quantity);
        setQuantity(0);
    }
  }

  return (
    <>
      <img src={product.image} alt={product.title} className="product-image" />
      <h2>{product.title}</h2>
      <p>{product.price}</p>
      <p>{product.category}</p>
      <p>Ocena: {product.rating.rate} ({product.rating.count} Opini)</p>
      <div className="product-quantity-selector">
        <span>{quantity}</span>
        <button onClick={handleDecrement}>-</button>
        <button onClick={handleIncrement}>+</button>
        <button onClick={handleAddToCart} disabled={quantity === 0}>
          Dodaj do koszyka
        </button>
      </div>
    </>
  );
}
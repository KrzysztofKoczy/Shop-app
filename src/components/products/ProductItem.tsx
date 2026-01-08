import { useState } from "react";
import { useCart } from "../../context/CartContext";
import type { Product } from "../../types/product";

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
      <p>Rating: {product.rating.rate} ({product.rating.count} Reviews)</p>
      <div>
        <div className="product-bottom-section">
          <button aria-label="Decrement quantity" onClick={handleDecrement}>-</button>
          <span>{quantity}</span>
          <button aria-label="Increment quantity" onClick={handleIncrement}>+</button>
        </div>
        <button aria-label="Add to basket" onClick={handleAddToCart} disabled={quantity === 0}>
          Add to basket
        </button>
      </div>

    </>
  );
}
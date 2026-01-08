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
      <p>Ocena: {product.rating.rate} ({product.rating.count} Opini)</p>
      <div>
        <div className="product-bottom-section">
          <button onClick={handleDecrement}>-</button>
          <span>{quantity}</span>
          <button onClick={handleIncrement}>+</button>
        </div>
        <button className="btn-add-cart" onClick={handleAddToCart} disabled={quantity === 0}>
          Dodaj do koszyka
        </button>
      </div>

    </>
  );
}
import { useCart } from "../../context/CartContext";

type CartButtonProps = {
    openCart: () => void;
}

export default function CartButton({ openCart } : CartButtonProps) {
    const { getTotalItems } = useCart();

    return (
        <button className="cart-button" aria-label="Koszyk" onClick={openCart}>
          <div className="icon-wrapper">
          <svg viewBox="0 0 24 24"
              className="icon"
              fill="none"
              stroke="currentColor"
              strokeWidth="2">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
          </div>
          <span className="badge">
            {getTotalItems}
          </span>
        </button>
      );
}
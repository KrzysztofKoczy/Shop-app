import { useCart } from "../../context/CartContext";

type CartDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, removeFromCart, updateQuantity } = useCart();

  if (!isOpen) return null;

  return (
    <>
      <div className="cart-drawer-overlay" onClick={onClose}></div>
      
      <div className="cart-drawer">
        <div className="cart-drawer-header">
          <h2>Koszyk</h2>
          <button 
            className="cart-drawer-close" 
            onClick={onClose}
            aria-label="Zamknij koszyk"
          >
            ✕
          </button>
        </div>
        
        <div className="cart-drawer-content">
          {items.length === 0 ? (
            <p>Twój koszyk jest pusty</p>
          ) : (
            <ul className="cart-items-list">
            {items.map((item) => (
              <li key={item.product.id} className="cart-item">
                <img src={item.product.image} 
                    alt={item.product.title} 
                    className="cart-item-image"/>
                <div className="cart-item-info">
                  <p>{item.product.title}</p>
                  <div className="product-bottom-section ">
                    <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)}>+</button>
                  </div>
                </div>
                <button className="cart-item-remove" onClick={() => removeFromCart(item.product.id)}>
                  Usuń
                </button>
              </li>
            ))}
          </ul>
          )}
        </div>
      </div>
    </>
  );
}


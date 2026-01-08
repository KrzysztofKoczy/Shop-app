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
      <div className="cart-drawer-overlay"></div>
      
      <div className="cart-drawer">
        <div className="cart-drawer-header">
          <h2>Basket</h2>
          <button className="cart-drawer-close" aria-label="Close cart drawer" onClick={onClose}>✕</button>
        </div>
        
        <div className="cart-drawer-content">
          {items.length === 0 ? (
            <p>Your basket is empty</p>
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
                    <button aria-label="Decrement quantity" onClick={() => updateQuantity(item.product.id, item.quantity - 1)}>-</button>
                    <span>{item.quantity}</span>
                    <button aria-label="Increment quantity" onClick={() => updateQuantity(item.product.id, item.quantity + 1)}>+</button>
                  </div>
                </div>
                <button className="cart-item-remove" aria-label="Remove item" onClick={() => removeFromCart(item.product.id)}>
                  Remove
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


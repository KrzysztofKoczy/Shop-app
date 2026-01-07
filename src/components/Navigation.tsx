import { useState } from "react";
import { NavLink } from "react-router-dom";
import CartDrawer from "./cart/cartDrawer";
import { useCart } from "../context/CartContext";

export default function Navigation() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { getTotalItems } = useCart();


  return (
    <nav className="navigation">
      <div className="navigation-links">
      <NavLink to='/' end>Home</NavLink>
      <NavLink to='/products'>Products</NavLink>
      </div>
      
      <button onClick={() => setIsCartOpen(true)}>Koszyk</button>
      <p>{ getTotalItems() }</p>

      
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </nav>
  );
}


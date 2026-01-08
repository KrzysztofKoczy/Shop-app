import { useState } from "react";
import { NavLink } from "react-router-dom";
import CartDrawer from "../cart/CartDrawer";
import CartButton from "../cart/CartButton";

export default function Navigation() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <nav className="navigation">
      <div className="navigation-links">
        <NavLink to='/home'>Home</NavLink>
        <NavLink to='/products'>Products</NavLink>
      </div>
      
      <CartButton openCart={() => setIsCartOpen(true)}/>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </nav>
  );
}


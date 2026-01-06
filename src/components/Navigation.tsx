import { NavLink } from "react-router-dom";

export default function Navigation() {
  return (
    <nav>
      <NavLink to='/' end>Home</NavLink>
      <NavLink to='/products'>Products</NavLink>
    </nav>
  );
}


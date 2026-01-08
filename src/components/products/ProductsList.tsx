import type { Product } from "../../types/product";
import ProductItem from "./ProductItem";

type ProductsListProps = {
  products: Product[];
};

export default function ProductsList({ products }: ProductsListProps) {
  return (
    <>
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <ProductItem product={product}/>
        </div>
      ))}
    </>
  )
}

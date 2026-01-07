import type { Product } from "../../api/products";

type ProductItem = {
    product: Product
};

export default function ProductItem({ product }: ProductItem) {
    return (
        <>
          <img src={product.image} alt={product.title} className="product-image" />
          <h2>{product.title}</h2>
          <p>{product.price}</p>
          <p>{product.category}</p>
          <p>Ocena: {product.rating.rate} ({product.rating.count} Opini)</p>
        </>
    )
}
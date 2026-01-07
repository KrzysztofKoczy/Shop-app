import type { Product } from "../api/products";
import type { ProductsSortOption } from "../types/sort";

export const sortProducts = (products: Product[], sortBy: ProductsSortOption): Product[] => {
    const items = [...products];

    switch (sortBy) {
        case "title-asc":
        return items.sort((a, b) => a.title.localeCompare(b.title));
        case "title-desc":
        return items.sort((a, b) => b.title.localeCompare(a.title));
        case "price-asc":
        return items.sort((a, b) => a.price - b.price);
        case "price-desc":
        return items.sort((a, b) => b.price - a.price);
        default:
        return products;
    }
}
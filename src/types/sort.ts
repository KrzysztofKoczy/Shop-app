export type ProductsSortOption =
  | "default"
  | "title-asc"
  | "title-desc"
  | "price-asc"
  | "price-desc";

export const PRODUCTS_SORT_LABELS: Record<ProductsSortOption, string> = {
  default: "Default",
  "title-asc": "Title A→Z",
  "title-desc": "Title Z→A",
  "price-asc": "Price ascending",
  "price-desc": "Price descending",
};

export const PRODUCTS_SORT_OPTIONS: ProductsSortOption[] = [
  "default",
  "title-asc",
  "title-desc",
  "price-asc",
  "price-desc",
];


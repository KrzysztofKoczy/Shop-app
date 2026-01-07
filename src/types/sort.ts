export type ProductsSortOption =
  | "default"
  | "title-asc"
  | "title-desc"
  | "price-asc"
  | "price-desc";

export const PRODUCTS_SORT_LABELS: Record<ProductsSortOption, string> = {
  default: "Domyślnie",
  "title-asc": "Tytuł A→Z",
  "title-desc": "Tytuł Z→A",
  "price-asc": "Cena rosnąco",
  "price-desc": "Cena malejąco",
};

export const PRODUCTS_SORT_OPTIONS: ProductsSortOption[] = [
  "default",
  "title-asc",
  "title-desc",
  "price-asc",
  "price-desc",
];


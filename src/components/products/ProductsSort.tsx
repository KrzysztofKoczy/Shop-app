import type { ProductsSortOption } from "../../types/sort";
import { PRODUCTS_SORT_LABELS, PRODUCTS_SORT_OPTIONS } from "../../types/sort";

type ProductsSortProps = {
  selectedOption: ProductsSortOption;
  disabled: boolean;
  onOptionChange: (value: ProductsSortOption) => void;
};

export default function ProductsSort({ selectedOption, disabled, onOptionChange }: ProductsSortProps) {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onOptionChange(event.target.value as ProductsSortOption);
  };

  return (
    <section>
      <label>
        Sortuj według:{" "}
        <select disabled={disabled} value={selectedOption} onChange={handleChange}>
          {PRODUCTS_SORT_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {PRODUCTS_SORT_LABELS[option]}
            </option>
          ))}
        </select>
      </label>
    </section>
  );
}



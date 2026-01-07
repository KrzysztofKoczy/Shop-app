export type ProductsSortOption = "default" | "title-asc" | "title-desc" | "price-asc" | "price-desc";
// TODO add ENUM maybe

type ProductsSortProps = {
  selectedOption: ProductsSortOption;
  onOptionChange: (value: ProductsSortOption) => void;
};

export default function ProductsSort({ selectedOption, onOptionChange }: ProductsSortProps) {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(event.target.value)
    onOptionChange(event.target.value as ProductsSortOption);
  };

  return (
    <section>
      <label>
        Sortuj według:{" "}
        <select value={selectedOption} onChange={handleChange}>
            {/* change that options to loop */}
          <option value="default">Domyślnie</option>
          <option value="title-asc">Tytuł A→Z</option>
          <option value="title-desc">Tytuł Z→A</option>
          <option value="price-asc">Cena rosnąco</option>
          <option value="price-desc">Cena malejąco</option>
        </select>
      </label>
    </section>
  );
}



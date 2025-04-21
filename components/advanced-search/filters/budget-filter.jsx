import { fetchFilters } from "@/lib/fetch";
import BudgetFilterItems from "./budget-filter-items";

export default async function BudgetFilter({ baseEndpoint, filters }) {
  const filterOptions = await fetchFilters(`${baseEndpoint}/budget`, filters);

  return (
    <BudgetFilterItems
      items={filterOptions}
      selectedItems={{
        minPrice:
          filters["minPrice"] && !isNaN(parseInt(filters["minPrice"]))
            ? parseInt(filters["minPrice"])
            : 200000,
        maxPrice:
          filters["maxPrice"] && !isNaN(parseInt(filters["maxPrice"]))
            ? parseInt(filters["maxPrice"])
            : 200000000,
      }}
    />
  );
}

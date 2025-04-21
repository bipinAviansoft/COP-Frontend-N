import { fetchFilters } from "@/lib/fetch";
import CarTypeFilterItems from "./car-type-filter-items";

export default async function CarTypeFilter({ filters, baseEndpoint }) {
  const filterOptions = await fetchFilters(
    `${baseEndpoint}/car-types`,
    filters
  );

  return (
    <CarTypeFilterItems
      items={filterOptions}
      selectedItems={filters["carTypes"]}
    />
  );
}

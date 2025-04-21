import { fetchFilters } from "@/lib/fetch";
import FilterItems from "./filter-items";

export default async function Filter({
  queryKey,
  endpoint,
  filters,
  searchFilter,
}) {
  const filterOptions = await fetchFilters(endpoint || queryKey, filters);

  return (
    <FilterItems
      searchFilter={searchFilter}
      queryKey={queryKey}
      items={filterOptions}
      selectedItems={filters[queryKey]}
    />
  );
}

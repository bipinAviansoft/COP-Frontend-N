import { fetchFilters } from "@/lib/fetch";
import LaunchMonthFilterItems from "./launch-month-filter-items";

export default async function LaunchMonthFilters({ filters, baseEndPoint }) {
  const filterOptions = await fetchFilters(
    `${baseEndPoint}/launch-months`,
    filters
  );

  return (
    <LaunchMonthFilterItems
      items={filterOptions}
      filters={filters}
      selectedItem={filters["launchMonth"]}
    />
  );
}

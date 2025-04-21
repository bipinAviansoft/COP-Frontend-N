import { filterPageConstants } from "@/data/constants";
import SearchFiltersMobile from "./search-filters-mobile";
import SortByOptionsMobile from "./sort-by-options-mobile";

export default function AdvSearchMobileActions({
  filters,
  pageType,
  baseEndpoint,
  sortByPrice,
}) {
  return (
    <div className="fixed left-1/2 -translate-x-1/2 bottom-12 z-30 shadow-2xl flex rounded-full overflow-hidden border border-gray-700 lg:hidden">
      {pageType !== filterPageConstants.UPCOMING_CARS && (
        <SortByOptionsMobile sortByPrice={sortByPrice} />
      )}
      <SearchFiltersMobile
        pageType={pageType}
        baseEndpoint={baseEndpoint}
        filters={filters}
      />
    </div>
  );
}

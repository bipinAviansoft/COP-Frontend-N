import { queryModels } from "@/lib/fetch";
import SearchResultCarCard from "../ui/search-result-car-card";
import Pagination from "../ui/pagination";
import SortByOptionsDesktop from "./sort-by-options-desktop";
import AppliedFilters from "./applied-filters";
import { filterPageConstants } from "@/data/constants";
import UpcomingCarMonthsSelection from "../upcoming-car/upcoming-car-months-selection";
import NoCarsFound from "../ui/no-cars-found";

export default async function SearchResults({
  endpoint,
  page,
  sortByPrice,
  filters,
  pageType,
  upcomingMonthsOptions,
}) {
  const result = await queryModels(endpoint, page, sortByPrice, filters);

  const { data: models, pagination } = result;
  const { totalRecords, totalPages } = pagination;

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex justify-between items-center">
        <h4 className="text-gray-darker lg:text-lg font-medium">
          <span className="inline-block px-2 py-0.5 bg-primary-lighter text-white rounded-lg mr-2">
            {totalRecords}
          </span>{" "}
          {pageType === filterPageConstants.UPCOMING_CARS
            ? "Upcoming Cars in India"
            : "Cars in India with search options"}
        </h4>
        {pageType !== filterPageConstants.UPCOMING_CARS ? (
          <span className="hidden lg:block">
            <SortByOptionsDesktop sortByPrice={sortByPrice} />
          </span>
        ) : (
          <span className="hidden lg:block">
            <UpcomingCarMonthsSelection
              options={upcomingMonthsOptions}
              selectedOption={filters["launchMonth"]}
            />
          </span>
        )}
      </div>
      <AppliedFilters filters={filters} pageType={pageType} />
      {!models || (models?.length === 0 && <NoCarsFound />)}
      <div className="grid grid-cols-2 gap-2 md:gap-3 lg:gap-4 lg:grid-cols-3">
        {models.map((model) => (
          <SearchResultCarCard
            key={model.model_id}
            carDetails={model}
            upcoming={pageType === filterPageConstants.UPCOMING_CARS}
          />
        ))}
      </div>
      {parseInt(totalPages) > 1 && (
        <div className="self-center my-4">
          <Pagination totalPages={totalPages} />
        </div>
      )}
    </div>
  );
}

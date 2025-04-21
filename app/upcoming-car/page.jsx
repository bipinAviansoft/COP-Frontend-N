import AdvSearchMobileActions from "@/components/advanced-search/adv-search-mobile-actions";
import SearchFilters from "@/components/advanced-search/search-filters";
import SearchResults from "@/components/advanced-search/search-results";
import UpcomingCarMonthsSelectionBox from "@/components/upcoming-car/upcoming-car-months-selection-box";
import { filterPageConstants } from "@/data/constants";
import { fetchData, fetchMetaData } from "@/lib/fetch";
import Image from "next/image";

export async function generateMetadata({ params }) {
  const bodyData = { page_name_slug: "upcoming-cars" };

  const data = await fetchMetaData(bodyData);

  return data;
}

export default async function UpcomingCar({ searchParams }) {
  const { page, ...filters } = searchParams;

  const monthsOptions = await fetchData("/upcoming-cars/launch-months");

  return (
    <>
      <section className="relative aspect-4/1">
        <Image
          src="https://static.caronphone.com/public/Banner/31/31.webp"
          alt="blue color car depicting upcoming car's page banner"
          fill
          className="object-cover object-center -z-10"
        />
        <div className="container flex flex-col justify-center absolute bottom-0 translate-y-2/3 left-1/2 -translate-x-1/2 md:top-1/2 md:-translate-y-1/2 z-10">
          <UpcomingCarMonthsSelectionBox
            options={monthsOptions}
            selectedOption={filters["launchMonth"]}
            searchOnClick
          />
        </div>
      </section>
      <section className="container pt-28 md:py-8 relative lg:grid lg:grid-cols-4 lg:gap-8">
        <div className="lg:col-span-3">
          <SearchResults
            page={page}
            pageType={filterPageConstants.UPCOMING_CARS}
            endpoint="/upcoming-cars/models"
            filters={filters}
            upcomingMonthsOptions={monthsOptions}
          />
        </div>
        <div className="hidden lg:block lg:col-span-1">
          <SearchFilters
            baseEndpoint="/upcoming-cars"
            filters={filters}
            pageType={filterPageConstants.UPCOMING_CARS}
          />
        </div>
      </section>
      <AdvSearchMobileActions
        pageType={filterPageConstants.UPCOMING_CARS}
        filters={filters}
        baseEndpoint="/upcoming-cars"
      />
    </>
  );
}

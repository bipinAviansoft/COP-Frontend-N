import AdvSearchMobileActions from "@/components/advanced-search/adv-search-mobile-actions";
import SearchFilters from "@/components/advanced-search/search-filters";
import SearchResults from "@/components/advanced-search/search-results";
import { filterPageConstants } from "@/data/constants";
import { fetchMetaData } from "@/lib/fetch";

export async function generateMetadata({ params }) {
  const bodyData = { page_name_slug: "newly-launched-cars" };

  const data = await fetchMetaData(bodyData);

  // return data;
  const canonicalUrl = `${process.env.NEXT_SITE_URL}/newly-launched-cars`;

  return {
    ...data,
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default function NewlyLaunchedCars({ searchParams }) {
  const { page, sort, ...filters } = searchParams;
  const currentPage = page || 1;
  const sortByPrice = sort || "ASC";

  return (
    <>
      <section className="container py-4 lg:py-8 lg:grid lg:grid-cols-4 lg:gap-8">
        <div className="hidden lg:block lg:col-span-1">
          <SearchFilters
            baseEndpoint="/newly-launched-cars"
            filters={filters}
            pageType={filterPageConstants.NEWLY_LAUNCHED_CARS}
          />
        </div>
        <div className="lg:col-span-3">
          <SearchResults
            pageType={filterPageConstants.NEWLY_LAUNCHED_CARS}
            endpoint="/newly-launched-cars/models"
            page={currentPage}
            sortByPrice={sortByPrice}
            filters={filters}
          />
        </div>
      </section>
      <AdvSearchMobileActions
        filters={filters}
        baseEndpoint="/newly-launched-cars"
        pageType={filterPageConstants.NEWLY_LAUNCHED_CARS}
        sortByPrice={sortByPrice}
      />
    </>
  );
}

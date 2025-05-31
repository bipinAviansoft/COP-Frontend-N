import AdvSearchMobileActions from "@/components/advanced-search/adv-search-mobile-actions";
import SearchFilters from "@/components/advanced-search/search-filters";
import SearchResults from "@/components/advanced-search/search-results";
import LatestAutomotiveNews from "@/components/homepage/latest-automotive-news";
import CommonBanner from "@/components/layout/common-banner/banner";
import { filterPageConstants } from "@/data/constants";
import { fetchBlogs, fetchMetaData } from "@/lib/fetch";

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

export default async function NewlyLaunchedCars({ searchParams }) {
  const { page, sort, ...filters } = searchParams;
  const currentPage = page || 1;
  const sortByPrice = sort || "ASC";

  const blogs = await fetchBlogs();

  return (
    <>
      <section>
        <CommonBanner
          bannerImgUrl="https://static.caronphone.com/public/Banner/53/53.webp"
          heading="Find The Best Cars  For You"
          description="Designed for car enthusiasts based on a variety of advanced criteria and detailed filters to help find the desired model smoothly"
        />
      </section>
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

      {blogs?.length > 0 ? (
        <section className="my-6 md:my-7 lg:my-8">
          <div className="container">
            <div className="py-6 px-3 md:py-10 md:px-5 lg:py-12 lg:px-7 bg-white shadow-xl rounded-3xl">
              <LatestAutomotiveNews blogs={blogs} />
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}

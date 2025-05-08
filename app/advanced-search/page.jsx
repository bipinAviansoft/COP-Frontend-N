import AdvSearchMobileActions from "@/components/advanced-search/adv-search-mobile-actions";
import SearchFilters from "@/components/advanced-search/search-filters";
import SearchResults from "@/components/advanced-search/search-results";
import CommonBanner from "@/components/layout/common-banner/banner";
import { fetchMetaData } from "@/lib/fetch";

export async function generateMetadata({ params }) {
  const bodyData = { page_name_slug: "advanced-search" };

  const data = await fetchMetaData(bodyData);
  // return data;
  const canonicalUrl = `${process.env.NEXT_SITE_URL}/advanced-search`;

  return {
    ...data,
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default async function AdvancedSearch({ searchParams }) {
  const { page, sort, ...filters } = searchParams;
  const currentPage = page || 1;
  const sortByPrice = sort || "ASC";

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
          <SearchFilters baseEndpoint="/advanced-search" filters={filters} />
        </div>
        <div className="lg:col-span-3">
          <SearchResults
            endpoint="/advanced-search/models"
            page={currentPage}
            sortByPrice={sortByPrice}
            filters={filters}
          />
        </div>
      </section>
      <AdvSearchMobileActions
        baseEndpoint="/advanced-search"
        filters={filters}
        sortByPrice={sortByPrice}
      />
    </>
  );
}

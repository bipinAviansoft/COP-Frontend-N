import BrandsList from "@/components/allbrandspage/brands-list";
import CommonBanner from "@/components/layout/common-banner/banner";
import { fetchData, fetchMetaData } from "@/lib/fetch";

export async function generateMetadata({ params }) {
  const bodyData = { page_name_slug: "all-brands" };

  const data = await fetchMetaData(bodyData);

  // return data;
  const canonicalUrl = `${process.env.NEXT_SITE_URL}/all-brand`;

  return {
    ...data,
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default async function AllBrands() {
  const brandsData = await fetchData("/brands");

  return (
    <>
      {/* Banner  */}
      <CommonBanner
        bannerImgUrl="https://static.caronphone.com/public/Banner/53/53.webp"
        heading="Top Car Brands In India"
        description="An extensive showcase of India's popular car brands that are continuing to expand the boundaries of technology in India."
      />

      {/* Brands Listing  */}
      <section className="container py-6 lg:py-6">
        <BrandsList brands={brandsData} />
      </section>
    </>
  );
}

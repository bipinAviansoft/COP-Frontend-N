import { fetchBlogs, fetchData, fetchMetaData } from "@/lib/fetch";
import PricePageModule from "@/components/car-module/price-page-module";

export async function generateMetadata({ params }) {
  const { brandSlug, modelSlug, variantSlug } = params;

  const bodyData = {
    page_name_slug: "car-module",
    brand: brandSlug.replace("-cars", ""),
    model: modelSlug,
    ...(variantSlug && { variant: variantSlug }),
  };

  try {
    const data = await fetchMetaData(bodyData);
    // return data;
    const canonicalUrl = `${process.env.NEXT_SITE_URL}/${brandSlug}/${modelSlug}/${variantSlug}/price`;

    return {
      ...data,
      alternates: {
        canonical: canonicalUrl,
      },
    };
  } catch (error) {
    console.error("MetaData fetch failed:", error);
    return {};
  }
}

export default async function page({ params }) {
  const { brandSlug, modelSlug, variantSlug } = params;

  try {
    if (!variantSlug) return new Error();

    const [
      headerData,
      modelDescriptionData,
      similarModelsData,
      reviewData,
      priceData,
    ] = await Promise.all([
      fetchData(`/brands/${brandSlug}/${modelSlug}/${variantSlug}`),
      fetchData(`/brands/${brandSlug}/${modelSlug}/modelDesc`),
      fetchData(`/brands/${brandSlug}/similarModels`),
      fetchData(`/ratings-and-reviews/${brandSlug}/${modelSlug}`),
      fetchData(`/brands/${brandSlug}/${modelSlug}/${variantSlug}/price`),
    ]);

    const headerDetails = headerData?.variant_detail?.[0];

    if (!headerDetails) return new Error();

    const [blogs] = await Promise.all([fetchBlogs(headerDetails?.brand_name)]);

    return (
      <PricePageModule
        brandSlug={brandSlug}
        modelSlug={modelSlug}
        variantSlug={variantSlug}
        headerDetails={headerDetails}
        modelDescriptionData={modelDescriptionData}
        similarModelsData={similarModelsData}
        modelPage={false}
        reviewData={reviewData}
        priceData={priceData}
        blogs={blogs?.result}
      />
    );
  } catch (error) {
    console.error("Price page load failed:", error);
    return new Error();
  }
}

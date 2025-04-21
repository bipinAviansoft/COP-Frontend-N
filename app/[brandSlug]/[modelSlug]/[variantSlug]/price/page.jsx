import { fetchBlogs, fetchData, fetchMetaData } from "@/lib/fetch";
import PricePageModule from "@/components/car-module/price-page-module";

export async function generateMetadata({ params }) {
  const { brandSlug, modelSlug, variantSlug } = params;
  let bodyData;

  if (variantSlug) {
    bodyData = {
      page_name_slug: "car-module",
      brand: brandSlug.replace("-cars", ""),
      model: modelSlug,
      variant: variantSlug,
    };
  } else {
    bodyData = {
      page_name_slug: "car-module",
      brand: brandSlug.replace("-cars", ""),
      model: modelSlug,
    };
  }

  const data = await fetchMetaData(bodyData);
  return data;
}

export default async function page({ params }) {
  const { brandSlug, modelSlug, variantSlug } = params;

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

  const headerDetails = headerData?.variant_detail[0];

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
}

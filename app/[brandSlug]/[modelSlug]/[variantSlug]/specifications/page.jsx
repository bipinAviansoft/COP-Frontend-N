import SpecsModuleInteractiveWrapper from "@/components/car-module/specs-module-interactive.wrapper";
import { fetchBlogs, fetchData, fetchMetaData } from "@/lib/fetch";

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
    specificationData,
  ] = await Promise.all([
    fetchData(`/brands/${brandSlug}/${modelSlug}/${variantSlug}`),
    fetchData(`/brands/${brandSlug}/${modelSlug}/modelDesc`),
    fetchData(`/brands/${brandSlug}/similarModels`),
    fetchData(
      `/brands/${brandSlug}/${modelSlug}/${variantSlug}/specifications?short=false`
    ),
  ]);

  const headerDetails = headerData?.variant_detail[0];

  const [blogs, reviewData] = await Promise.all([
    fetchBlogs(headerDetails?.brand_name),
    fetchData(`/ratings-and-reviews/${brandSlug}/${modelSlug}`),
  ]);

  return (
    <SpecsModuleInteractiveWrapper
      brandSlug={brandSlug}
      modelSlug={modelSlug}
      variantSlug={variantSlug}
      headerDetails={headerDetails}
      modelDescriptionData={modelDescriptionData}
      similarModelsData={similarModelsData}
      specificationData={specificationData}
      modelPage={false}
      blogs={blogs?.result}
      reviewData={reviewData}
    />
  );
}

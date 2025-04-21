import { fetchBlogs, fetchData, fetchMetaData } from "@/lib/fetch";
import VariantsModuleInteractiveWrapper from "@/components/car-module/variants-module-interactive-wrapper";

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

  const variantsData = await fetchData(
    `/brands/${brandSlug}/${modelSlug}`,
    true
  );

  const { fuel_types, variants } = variantsData;

  const [headerData, modelDescriptionData, similarModelsData, reviewData] =
    await Promise.all([
      fetchData(`/brands/${brandSlug}/${modelSlug}/${variantSlug}`),
      fetchData(`/brands/${brandSlug}/${modelSlug}/modelDesc`),
      fetchData(`/brands/${brandSlug}/similarModels`),
      fetchData(`/ratings-and-reviews/${brandSlug}/${modelSlug}`),
    ]);

  const headerDetails = headerData?.variant_detail[0];

  const [blogs] = await Promise.all([fetchBlogs(headerDetails?.brand_name)]);

  return (
    <>
      <VariantsModuleInteractiveWrapper
        headerDetails={headerDetails}
        modelDescriptionData={modelDescriptionData}
        fuel_types={fuel_types}
        variants={variants}
        brandSlug={brandSlug}
        modelSlug={modelSlug}
        variantSlug={variantSlug}
        modelPage={false}
        selectedVariantSlug={`${brandSlug}/${modelSlug}/${variantSlug}`}
        similarModelsData={similarModelsData}
        blogs={blogs?.result}
        modelType={headerDetails?.model_type}
        reviewData={reviewData}
      />
    </>
  );
}

import { fetchBlogs, fetchData, fetchMetaData } from "@/lib/fetch";
import SpecsModuleInteractiveWrapper from "@/components/car-module/specs-module-interactive.wrapper";
import ReviewPageModule from "@/components/car-module/review-page-module";

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
  const { brandSlug, modelSlug } = params;

  const variantsData = await fetchData(
    `/brands/${brandSlug}/${modelSlug}`,
    true
  );

  const baseVariantSlug = variantsData?.variants[0]?.slug;
  const variantSlug = baseVariantSlug?.split("/")[2];

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
    <ReviewPageModule
      brandSlug={brandSlug}
      modelSlug={modelSlug}
      variantSlug={variantSlug}
      headerDetails={headerDetails}
      modelDescriptionData={modelDescriptionData}
      similarModelsData={similarModelsData}
      modelPage={true}
      reviewData={reviewData}
      blogs={blogs?.result}
    />
    // <SpecsModuleInteractiveWrapper
    //   brandSlug={brandSlug}
    //   modelSlug={modelSlug}
    //   variantSlug={variantSlug}
    //   headerDetails={headerDetails}
    //   modelDescriptionData={modelDescriptionData}
    //   similarModelsData={similarModelsData}
    //   specificationData={specificationData}
    //   modelPage={true}
    // />
  );
}

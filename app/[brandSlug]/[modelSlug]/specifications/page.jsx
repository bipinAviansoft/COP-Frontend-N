import { fetchBlogs, fetchData, fetchMetaData } from "@/lib/fetch";
import SpecsModuleInteractiveWrapper from "@/components/car-module/specs-module-interactive.wrapper";

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
    return data;
  } catch (error) {
    console.error("MetaData fetch failed:", error);
    return {};
  }
}

export default async function page({ params }) {
  const { brandSlug, modelSlug } = params;

  try {
    const variantsData = await fetchData(
      `/brands/${brandSlug}/${modelSlug}`,
      true
    );

    const baseVariantSlug = variantsData?.variants?.[0]?.slug;
    const variantSlug = baseVariantSlug?.split("/")[2];

    if (!variantSlug) return new Error();

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

    const headerDetails = headerData?.variant_detail?.[0];

    if (!headerDetails) return new Error();

    const [blogs, reviewData] = await Promise.all([
      fetchBlogs(headerDetails.brand_name),
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
        modelPage={true}
        blogs={blogs?.result}
        reviewData={reviewData}
      />
    );
  } catch (error) {
    console.error("Specs page load failed:", error);
    return new Error();
  }
}

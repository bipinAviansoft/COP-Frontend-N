import { fetchBlogs, fetchData, fetchMetaData } from "@/lib/fetch";
import VariantsModuleInteractiveWrapper from "@/components/car-module/variants-module-interactive-wrapper";
import { resolveVariantData } from "@/lib/carModuleUtils";

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
    const canonicalUrl = `${process.env.NEXT_SITE_URL}/${brandSlug}/${modelSlug}/variants`;

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
  const { brandSlug, modelSlug } = params;

  try {
    const variantSlug = await resolveVariantData(brandSlug, modelSlug);

    if (!variantSlug) return new Error();

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

    const headerDetails = headerData?.variant_detail?.[0];

    if (!headerDetails) return new Error();

    const [blogs] = await Promise.all([fetchBlogs(headerDetails?.brand_name)]);

    return (
      <VariantsModuleInteractiveWrapper
        headerDetails={headerDetails}
        modelDescriptionData={modelDescriptionData}
        fuel_types={fuel_types}
        variants={variants}
        brandSlug={brandSlug}
        modelSlug={modelSlug}
        variantSlug={variantSlug}
        modelPage={true}
        selectedVariantSlug={`${brandSlug}/${modelSlug}`}
        similarModelsData={similarModelsData}
        blogs={blogs?.result}
        modelType={headerDetails?.model_type}
        reviewData={reviewData}
      />
    );
  } catch (error) {
    console.error("Variants page load failed:", error);
    return new Error();
  }
}

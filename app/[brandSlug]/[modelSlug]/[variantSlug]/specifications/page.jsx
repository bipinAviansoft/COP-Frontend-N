import SpecsModuleInteractiveWrapper from "@/components/car-module/specs-module-interactive.wrapper";
import { fetchBlogs, fetchData, fetchMetaData } from "@/lib/fetch";

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
    const canonicalUrl = `${process.env.NEXT_SITE_URL}/${brandSlug}/${modelSlug}/${variantSlug}/specifications`;

    return {
      ...data,
      alternates: {
        canonical: canonicalUrl,
      },
    };
  } catch (error) {
    console.error("Metadata fetch error (Specs Page):", error);
    return {};
  }
}

export default async function page({ params }) {
  const { brandSlug, modelSlug, variantSlug } = params;

  try {
    // const variantSlug = await resolveVariantData(brandSlug, modelSlug);
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
  } catch (error) {
    console.error("Specs Page Load Error:", error);
    return new Error();
  }
}

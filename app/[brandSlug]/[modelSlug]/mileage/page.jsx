import { fetchBlogs, fetchData, fetchMetaData } from "@/lib/fetch";
import MileagePageModule from "@/components/car-module/mileage-page-module";

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
    const canonicalUrl = `${process.env.NEXT_SITE_URL}/${brandSlug}/${modelSlug}/mileage`;

    return {
      ...data,
      alternates: {
        canonical: canonicalUrl,
      },
    };
  } catch (error) {
    console.error("Metadata fetch error:", error);
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

    const { variants } = variantsData || {};

    const baseVariantSlug = variants?.[0]?.slug;
    const variantSlug = baseVariantSlug?.split("/")[2];

    if (!variantSlug) {
      console.error("No valid variant slug found");
      return new Error();
    }

    const [headerData, modelDescriptionData, similarModelsData, reviewData] =
      await Promise.all([
        fetchData(`/brands/${brandSlug}/${modelSlug}/${variantSlug}`),
        fetchData(`/brands/${brandSlug}/${modelSlug}/modelDesc`),
        fetchData(`/brands/${brandSlug}/similarModels`),
        fetchData(`/ratings-and-reviews/${brandSlug}/${modelSlug}`),
      ]);

    const headerDetails = headerData?.variant_detail?.[0];

    if (!headerDetails) {
      console.error("Missing header details");
      return new Error();
    }

    const blogs = await fetchBlogs(headerDetails?.brand_name);

    return (
      <MileagePageModule
        brandSlug={brandSlug}
        modelSlug={modelSlug}
        variantSlug={variantSlug}
        headerDetails={headerDetails}
        modelDescriptionData={modelDescriptionData}
        similarModelsData={similarModelsData}
        modelPage={true}
        reviewData={reviewData}
        variants={variants}
        blogs={blogs?.result}
      />
    );
  } catch (error) {
    console.error("Mileage page fetch error:", error);
    return new Error();
  }
}

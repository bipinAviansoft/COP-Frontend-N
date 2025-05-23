import GalleryPageModule from "@/components/car-module/gallery-page-module";
import { fetchData, fetchMetaData } from "@/lib/fetch";

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
    const canonicalUrl = `${process.env.NEXT_SITE_URL}/${brandSlug}/${modelSlug}/${variantSlug}/images`;

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
      variantColorsData,
      galleryData,
      reviewData,
    ] = await Promise.all([
      fetchData(`/brands/${brandSlug}/${modelSlug}/${variantSlug}`),
      fetchData(`/brands/${brandSlug}/${modelSlug}/modelDesc`),
      fetchData(`/brands/${brandSlug}/similarModels`),
      fetchData(`/brands/${brandSlug}/${modelSlug}/${variantSlug}/colors`),
      fetchData(`/brands/${brandSlug}/${modelSlug}/gallery`),
      fetchData(`/ratings-and-reviews/${brandSlug}/${modelSlug}`),
    ]);

    const headerDetails = headerData?.variant_detail?.[0];

    if (!headerDetails) return new Error();

    return (
      <GalleryPageModule
        brandSlug={brandSlug}
        modelSlug={modelSlug}
        variantSlug={variantSlug}
        modelPage={false}
        headerDetails={headerDetails}
        modelDescriptionData={modelDescriptionData}
        similarModelsData={similarModelsData}
        variantColorsData={variantColorsData}
        galleryData={galleryData}
        reviewData={reviewData}
      />
    );
  } catch (error) {
    console.error("Gallery page load failed:", error);
    return new Error(error);
  }
}

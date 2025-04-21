import CarColorImagesVideosData from "@/components/car-module/car-color-images-videos-data";
import GalleryPageModule from "@/components/car-module/gallery-page-module";
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
  const { brandSlug, modelSlug } = params;

  const variantsData = await fetchData(
    `/brands/${brandSlug}/${modelSlug}`,
    true
  );

  const baseVariantSlug = variantsData?.variants[0]?.slug;
  const variantSlug = baseVariantSlug?.split("/")[2];

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

  const headerDetails = headerData?.variant_detail[0];

  return (
    <>
      <GalleryPageModule
        brandSlug={brandSlug}
        modelSlug={modelSlug}
        variantSlug={variantSlug}
        modelPage={true}
        headerDetails={headerDetails}
        modelDescriptionData={modelDescriptionData}
        similarModelsData={similarModelsData}
        variantColorsData={variantColorsData}
        galleryData={galleryData}
        reviewData={reviewData}
      />
    </>
  );
}

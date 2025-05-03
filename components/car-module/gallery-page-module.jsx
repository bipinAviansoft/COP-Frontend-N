import CarColorImagesVideosData from "./car-color-images-videos-data";
import CarHeaderData from "./car-header-data";
import CarModuleHeader from "./car-module-header";

export default function GalleryPageModule({
  brandSlug,
  modelSlug,
  variantSlug,
  modelPage,
  headerDetails,
  modelDescriptionData,
  similarModelsData,
  variantColorsData,
  galleryData,
  reviewData,
}) {
  const selectedVariantSlug = modelPage
    ? `${brandSlug}/${modelSlug}`
    : `${brandSlug}/${modelSlug}/${variantSlug}`;

  return (
    <>
      <div className="bg-[#F3F4F9] ">
        <CarModuleHeader
          brandSlug={brandSlug}
          modelSlug={modelSlug}
          variantSlug={variantSlug}
          modelPage={modelPage}
          reviewData={reviewData?.totalRating > 0}
          headerDetails={headerDetails}
          subPage="Images"
        />
        <div className="pt-[15px] md:pt-[30px]">
          <CarHeaderData
            headerDetails={headerDetails}
            selectedVariantSlug={selectedVariantSlug}
            description={modelDescriptionData?.description}
            modelPage={modelPage}
            pageTitle="Images"
            reviewData={reviewData}
          />
        </div>
        {/* car spec & other design sec */}
        <CarColorImagesVideosData
          headerDetails={headerDetails}
          variantColorsData={variantColorsData}
          galleryData={galleryData}
          page={false}
          modelPage={modelPage}
        />
      </div>
    </>
  );
}

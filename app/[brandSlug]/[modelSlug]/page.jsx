import CarModuleContent from "@/components/car-module/car-module-content";
import UpcomingCarContent from "@/components/car-module/upcoming-car-content";
import { fetchData, fetchMetaData } from "@/lib/fetch";

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

export default async function CarModuleWithoutVariant({ params }) {
  const { brandSlug, modelSlug } = params;

  const variantsData = await fetchData(
    `/brands/${brandSlug}/${modelSlug}`,
    true
  );

  if (variantsData?.upcoming_stage) {
    return (
      <UpcomingCarContent
        slug={`${brandSlug}/${modelSlug}`}
        brandSlug={brandSlug}
        modelSlug={modelSlug}
        upcomingCarData={variantsData}
        modelPage={true}
        upcoming_stage={variantsData?.upcoming_stage}
      />
    );
  }

  const baseVariantSlug = variantsData?.variants[0]?.slug;
  const variantSlug = baseVariantSlug?.split("/")[2];

  return (
    <CarModuleContent
      brandSlug={brandSlug}
      modelSlug={modelSlug}
      variantSlug={variantSlug}
      variantsData={variantsData}
      upcoming_stage={variantsData?.upcoming_stage}
      modelPage={true}
    />
  );
}

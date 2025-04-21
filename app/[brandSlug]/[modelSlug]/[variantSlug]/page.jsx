import CarModuleContent from "@/components/car-module/car-module-content";
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

export default async function CarModuleWithVariant({ params }) {
  const { brandSlug, modelSlug, variantSlug } = params;

  const variantsData = await fetchData(
    `/brands/${brandSlug}/${modelSlug}`,
    true
  );

  return (
    <CarModuleContent
      brandSlug={brandSlug}
      modelSlug={modelSlug}
      variantSlug={variantSlug}
      variantsData={variantsData}
      modelPage={false}
    />
  );
}

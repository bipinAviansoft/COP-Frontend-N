import CarModuleContent from "@/components/car-module/car-module-content";
import { fetchData, fetchMetaData } from "@/lib/fetch";

export async function generateMetadata({ params }) {
  const { brandSlug, modelSlug, variantSlug } = params;
  let bodyData;

  const variantsData = await fetchData(
    `/brands/${brandSlug}/${modelSlug}/${variantSlug}`,
    true
  );

  const pageImg = variantsData?.variant_image;

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

  try {
    const data = await fetchMetaData(bodyData, pageImg);
    // return data || {};
    const canonicalUrl = `${process.env.NEXT_SITE_URL}/${brandSlug}/${modelSlug}/${variantSlug}`;

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

export default async function CarModuleWithVariant({ params }) {
  const { brandSlug, modelSlug, variantSlug } = params;

  try {
    const variantsData = await fetchData(
      `/brands/${brandSlug}/${modelSlug}`,
      true
    );

    if (!variantsData) {
      console.error("No variant data found");
      return new Error();
    }

    return (
      <CarModuleContent
        brandSlug={brandSlug}
        modelSlug={modelSlug}
        variantSlug={variantSlug}
        variantsData={variantsData}
        modelPage={false}
      />
    );
  } catch (error) {
    console.error("CarModuleWithVariant error:", error);
    return new Error();
  }
}

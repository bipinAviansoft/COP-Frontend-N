export const dynamic = "force-dynamic";
import CarModuleContent from "@/components/car-module/car-module-content";
import UpcomingCarContent from "@/components/car-module/upcoming-car-content";
import { fetchData, fetchMetaData } from "@/lib/fetch";

export async function generateMetadata({ params }) {
  const { brandSlug, modelSlug, variantSlug } = params;
  let bodyData;

  const variantsData = await fetchData(
    `/brands/${brandSlug}/${modelSlug}`,
    true
  );

  let pageImg;

  if (variantsData?.upcoming_stage) {
    const upcomingCarData = await fetchData(
      `/upcoming-cars/models?brand=${brandSlug}&model=${modelSlug}`
    );
    pageImg = upcomingCarData?.data?.model_image;
  } else {
    pageImg = variantsData?.variants?.[0]?.variant_image;
  }

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
    const canonicalUrl = `${process.env.NEXT_SITE_URL}/${brandSlug}/${modelSlug}`;

    return {
      ...data,
      alternates: {
        canonical: canonicalUrl,
      },
    };

    // return data || {};
  } catch (error) {
    console.error("Meta generation failed:", error);
    return {};
  }
}

export default async function CarModuleWithoutVariant({ params }) {
  const { brandSlug, modelSlug } = params;

  try {
    const variantsData = await fetchData(
      `/brands/${brandSlug}/${modelSlug}`,
      true
    );

    if (!variantsData) {
      console.error("No variant data found");
      return new Error();
    }

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

    const baseVariantSlug = variantsData?.variants?.[0]?.slug;

    if (!baseVariantSlug) {
      console.error("No variants available");
      return new Error();
    }

    const variantSlug = baseVariantSlug.split("/")[2];

    return (
      <>
        <CarModuleContent
          brandSlug={brandSlug}
          modelSlug={modelSlug}
          variantSlug={variantSlug}
          variantsData={variantsData}
          upcoming_stage={variantsData?.upcoming_stage}
          modelPage={true}
        />
      </>
    );
  } catch (error) {
    console.error("CarModuleWithoutVariant error:", error);
    return new Error(); // Return 404 on failure
  }
}

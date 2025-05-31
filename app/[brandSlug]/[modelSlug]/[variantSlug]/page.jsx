import CarModuleContent from "@/components/car-module/car-module-content";
import { fetchData, fetchMetaData } from "@/lib/fetch";
import { redirect } from "next/navigation";

export async function generateMetadata({ params }) {
  const { brandSlug, modelSlug, variantSlug } = params;
  let bodyData;

  if (!brandSlug.includes("-cars")) {
    const cleanedBrandSlug = `${brandSlug}-cars`;
    return redirect(`/${cleanedBrandSlug}/${modelSlug}/${variantSlug}`);
  }

  const [variantsData, variantStatus] = await Promise.all([
    fetchData(`/brands/${brandSlug}/${modelSlug}`, true),
    fetchData(`/brands/${brandSlug}/${modelSlug}/${variantSlug}`),
  ]);

  if (!variantsData || variantsData.length == 0) {
    return redirect(`/${brandSlug}`);
  }

  if (!variantStatus || variantStatus.length == 0) {
    return redirect(`/${brandSlug}/${modelSlug}`);
  }

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

  if (variantSlug.includes("---")) {
    const cleanedSlug = variantSlug.replace(/---/g, "-");
    return redirect(`/${brandSlug}/${modelSlug}/${cleanedSlug}`);
  }

  if (!brandSlug.includes("-cars")) {
    const cleanedBrandSlug = `${brandSlug}-cars`;
    return redirect(`/${cleanedBrandSlug}/${modelSlug}/${variantSlug}`);
  }

  try {
    const [variantsData, variantStatus] = await Promise.all([
      fetchData(`/brands/${brandSlug}/${modelSlug}`, true),
      fetchData(`/brands/${brandSlug}/${modelSlug}/${variantSlug}`),
    ]);

    if (!variantsData) {
      return redirect(`/${brandSlug}`);
    }

    if (!variantStatus || variantStatus.length == 0) {
      return redirect(`/${brandSlug}/${modelSlug}`);
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

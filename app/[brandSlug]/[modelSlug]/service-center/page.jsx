import ServicePageModule from "@/components/car-module/service-page-module";
import { fetchBlogs, fetchData, fetchMetaData } from "@/lib/fetch";
import { cookies } from "next/headers";

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
    const canonicalUrl = `${process.env.NEXT_SITE_URL}/${brandSlug}/${modelSlug}/service-center`;

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
  const { brandSlug, modelSlug } = params;

  try {
    const variantsData = await fetchData(
      `/brands/${brandSlug}/${modelSlug}`,
      true
    );

    const baseVariantSlug = variantsData?.variants?.[0]?.slug;
    const variantSlug = baseVariantSlug?.split("/")[2];

    if (!variantSlug) {
      console.warn("Variant slug not found");
      return new Error();
    }

    const [headerData, modelDescriptionData, similarModelsData] =
      await Promise.all([
        fetchData(`/brands/${brandSlug}/${modelSlug}/${variantSlug}`),
        fetchData(`/brands/${brandSlug}/${modelSlug}/modelDesc`),
        fetchData(`/brands/${brandSlug}/similarModels`),
      ]);

    const headerDetails = headerData?.variant_detail?.[0];

    if (!headerDetails) {
      console.warn("Header details not found");
      return new Error();
    }

    const cookieStore = cookies();
    const cityId = cookieStore.get("city")?.value;

    const [blogs, dealersData, reviewData] = await Promise.all([
      fetchBlogs(headerDetails.brand_name),
      cityId
        ? fetchData(
            `/dealership?brand=${headerDetails.brand_name}&city=${cityId}`
          )
        : Promise.resolve([]),
      fetchData(`/ratings-and-reviews/${brandSlug}/${modelSlug}`),
    ]);

    return (
      <ServicePageModule
        brandSlug={brandSlug}
        modelSlug={modelSlug}
        variantSlug={variantSlug}
        headerDetails={headerDetails}
        modelDescriptionData={modelDescriptionData}
        similarModelsData={similarModelsData}
        dealersData={dealersData}
        modelPage={true}
        blogs={blogs?.result}
        reviewData={reviewData}
      />
    );
  } catch (error) {
    console.error("Service page load failed:", error);
    return new Error();
  }
}

import ServicePageModule from "@/components/car-module/service-page-module";
import { fetchBlogs, fetchData, fetchMetaData } from "@/lib/fetch";
import { cookies } from "next/headers";

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

  const [headerData, modelDescriptionData, similarModelsData] =
    await Promise.all([
      fetchData(`/brands/${brandSlug}/${modelSlug}/${variantSlug}`),
      fetchData(`/brands/${brandSlug}/${modelSlug}/modelDesc`),
      fetchData(`/brands/${brandSlug}/similarModels`),
    ]);

  const headerDetails = headerData?.variant_detail[0];

  const cookieStore = cookies();
  const cityId = cookieStore.get("city");

  const [blogs, dealersData, reviewData] = await Promise.all([
    fetchBlogs(headerDetails?.brand_name),
    fetchData(
      `/dealership?brand=${headerDetails?.brand_name}&city=${cityId?.value}`
    ),
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
}

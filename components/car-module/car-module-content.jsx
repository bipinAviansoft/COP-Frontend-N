import { fetchBlogs, fetchData } from "@/lib/fetch";
import CarModuleInteractiveWrapper from "./car-module-interactive-wrapper";
import { cookies } from "next/headers";

export default async function CarModuleContent({
  brandSlug,
  modelSlug,
  variantSlug,
  variantsData,
  modelPage,
  upcoming_stage,
}) {
  try {
    const [
      headerData,
      variantColorsData,
      modelDescriptionData,
      specificationData,
      similarModelsData,
      similarVariantsData,
      pricingData,
      galleryData,
      variantsMileageData,
      faqFullData,
      variantEmiData,
    ] = await Promise.all([
      fetchData(`/brands/${brandSlug}/${modelSlug}/${variantSlug}`),
      fetchData(`/brands/${brandSlug}/${modelSlug}/${variantSlug}/colors`),
      fetchData(`/brands/${brandSlug}/${modelSlug}/modelDesc`),
      fetchData(
        `/brands/${brandSlug}/${modelSlug}/${variantSlug}/specifications?short=true`
      ),
      fetchData(`/brands/${brandSlug}/similarModels`),
      fetchData(
        `/brands/${brandSlug}/${modelSlug}/${variantSlug}?similarVariants=true`
      ),
      fetchData(`/brands/${brandSlug}/${modelSlug}/${variantSlug}/price`),
      fetchData(`/brands/${brandSlug}/${modelSlug}/gallery`),
      fetchData(`/brands/${brandSlug}/${modelSlug}?type=mileage`),
      fetchData(`/faq/${brandSlug}/${modelSlug}/${variantSlug}`),
      fetchData(`/emi-calculator/${brandSlug}/${modelSlug}/${variantSlug}`),
    ]);

    const headerDetails = headerData?.variant_detail?.[0];

    if (!headerDetails) {
      console.error("Missing header details");
      return new Error();
    }

    const cookieStore = cookies();
    const cityId = cookieStore.get("city");

    const [dealersData, reviewData, blogs] = await Promise.all([
      fetchData(
        `/dealership?brand=${headerDetails?.brand_name}&city=${
          cityId?.value || ""
        }`
      ),
      fetchData(`/ratings-and-reviews/${brandSlug}/${modelSlug}`),
      fetchBlogs(headerDetails?.brand_name),
    ]);

    return (
      <CarModuleInteractiveWrapper
        brandSlug={brandSlug}
        modelSlug={modelSlug}
        variantSlug={variantSlug}
        variantsData={variantsData}
        headerDetails={headerDetails}
        pricingData={pricingData}
        variantColorsData={variantColorsData}
        modelDescriptionData={modelDescriptionData}
        specificationData={specificationData}
        similarModelsData={similarModelsData}
        galleryData={galleryData}
        similarVariantsData={similarVariantsData}
        modelPage={modelPage}
        variantsMileageData={variantsMileageData}
        faqFullData={faqFullData}
        dealersData={dealersData}
        variantEmiData={variantEmiData}
        reviewData={reviewData}
        blogs={blogs?.result}
      />
    );
  } catch (error) {
    console.error("CarModuleContent fetch error:", error);
    return new Error();
  }
}

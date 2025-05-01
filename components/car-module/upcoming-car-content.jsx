import { fetchBlogs, fetchData } from "@/lib/fetch";
import CarModuleInteractiveWrapper from "./car-module-interactive-wrapper";
import UpcomingCarModule from "./upcoming-car-module";

export default async function UpcomingCarContent({
  slug,
  brandSlug,
  modelSlug,
  upcomingCarData,
  modelPage,
  upcoming_stage,
}) {
  const carBrandsResponse = await fetchData("/brands?models=true");
  const carBrand = carBrandsResponse?.find(
    (data) => data.slug == `/${brandSlug}`
  );

  const carModelsResponse = await fetchData("/upcoming-cars/models");

  // Fetch all pages of car models
  let carModelsData = [];
  const totalPages = carModelsResponse?.pagination?.totalPages || 1;

  for (let page = 1; page <= totalPages; page++) {
    const carModelsResponsePage = await fetchData(
      `/upcoming-cars/models?page=${page}`
    );
    let data = carModelsResponsePage?.data;
    carModelsData = [...carModelsData, ...data];
  }

  // Find the car model based on the slug from all the pages
  const carDetail = carModelsData.find((data) => data.slug == slug);

  const brand = brandSlug.replace(/-cars$/, "").replace(/-/g, " ");

  // upcoming-cars/models?brand=jeep-cars&model=sub-4m-suv
  const [headerData, modelDescriptionData, similarModelsData, blogs] =
    await Promise.all([
      fetchData(`/upcoming-cars/models?brand=${brandSlug}&model=${modelSlug}`),
      fetchData(`/brands/${brandSlug}/${modelSlug}/modelDesc`),
      fetchData(`/brands/${brandSlug}/similarModels`),
      fetchBlogs(brand),
    ]);

  return (
    <>
      <UpcomingCarModule
        headerData={headerData?.data}
        modelDescriptionData={modelDescriptionData}
        carBrand={carBrand}
        carDetail={carDetail}
        brandSlug={brandSlug}
        modelSlug={modelSlug}
        upcomingCarData={upcomingCarData}
        modelPage={modelPage}
        upcoming_stage={upcoming_stage}
        similarModelsData={similarModelsData}
        blogs={blogs?.result}
      />
    </>
  );
}

import { fetchBlogs, fetchData } from "@/lib/fetch";
import UpcomingCarModule from "./upcoming-car-module";
import Script from "next/script";

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

  // const brand = brandSlug.replace(/-cars$/, "").replace(/-/g, " ");

  // upcoming-cars/models?brand=jeep-cars&model=sub-4m-suv
  const [headerData, modelDescriptionData, similarModelsData] =
    await Promise.all([
      fetchData(`/upcoming-cars/models?brand=${brandSlug}&model=${modelSlug}`),
      fetchData(`/brands/${brandSlug}/${modelSlug}/modelDesc`),
      fetchData(`/brands/${brandSlug}/similarModels`),
    ]);

  const [blogs] = await Promise.all([fetchBlogs(headerData?.data?.brand_name)]);

  // ✅ WebPage Schema
  const webpageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${headerData?.data?.brand_name} ${headerData?.data?.model_name}`,
    description: modelDescriptionData?.description || "",
    url: `${process.env.NEXT_SITE_URL}/${brandSlug}/${modelSlug}`,
    publisher: {
      "@type": "Organization",
      name: "CarOnPhone",
      logo: {
        "@type": "ImageObject",
        url: "https://caronphone.com/images/logo_white.png",
      },
    },
  };

  // ✅ BreadcrumbList Schema
  const breadcrumbItems = [
    {
      "@type": "ListItem",
      position: 1,
      item: {
        "@id": `${process.env.NEXT_SITE_URL}`,
        name: "Home",
      },
    },
    {
      "@type": "ListItem",
      position: 2,
      item: {
        "@id": `${process.env.NEXT_SITE_URL}/${brandSlug}`,
        name: headerData?.data?.brand_name || "",
      },
    },
    {
      "@type": "ListItem",
      position: 3,
      item: {
        "@id": `${process.env.NEXT_SITE_URL}/${brandSlug}/${modelSlug}`,
        name: headerData?.data?.model_name || "",
      },
    },
  ];

  // ✅ Final schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbItems,
  };

  // ✅ Product Schema
  const productSchema = [
    {
      "@context": "https://schema.org",
      "@type": "Product",
      name: `${headerData?.data?.brand_name} ${headerData?.data?.model_name}`,
      description: modelDescriptionData?.description || "",
      image: [`${headerData?.data?.model_image}`],
      sku: "",
      brand: {
        "@type": "Brand",
        name: `${headerData?.data?.brand_name}`,
      },
      review: {
        "@type": "Review",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "4.5",
          bestRating: "4.5",
        },
        author: {
          "@type": "Person",
          name: "CarOnPhone",
        },
      },
    },
  ];

  return (
    <>
      {/* ✅ Inject Schema Markups */}
      <Script id="schema-webpage" type="application/ld+json">
        {JSON.stringify(webpageSchema)}
      </Script>
      <Script id="schema-breadcrumb" type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </Script>
      <Script id="schema-product" type="application/ld+json">
        {JSON.stringify(productSchema)}
      </Script>

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
        blogs={blogs?.result || null}
      />
    </>
  );
}

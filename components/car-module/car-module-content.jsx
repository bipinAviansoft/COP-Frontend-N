import { fetchBlogs, fetchData } from "@/lib/fetch";
import CarModuleInteractiveWrapper from "./car-module-interactive-wrapper";
import { cookies } from "next/headers";
import Script from "next/script";

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

    const [dealersData, reviewData, blogs, faqList] = await Promise.all([
      fetchData(
        `/dealership?brand=${headerDetails?.brand_name}&city=${
          cityId?.value || ""
        }`
      ),
      fetchData(`/ratings-and-reviews/${brandSlug}/${modelSlug}`),
      fetchBlogs(headerDetails?.brand_name),
      fetchData(`/brands/${brandSlug}/${modelSlug}/${variantSlug}/faq`),
    ]);

    // ✅ WebPage Schema
    const webpageSchema = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: `${headerDetails?.brand_name} ${headerDetails?.model_name} ${
        modelPage ? "" : headerDetails?.variant_name
      }`,
      description: headerDetails?.image_title || "",
      url: modelPage
        ? `${process.env.NEXT_SITE_URL}/${brandSlug}/${modelSlug}`
        : `${process.env.NEXT_SITE_URL}/${brandSlug}/${modelSlug}/${variantSlug}`,
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
        name: "Home",
        item: `${process.env.NEXT_SITE_URL}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: headerDetails?.brand_name,
        item: `${process.env.NEXT_SITE_URL}/${brandSlug}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: headerDetails?.model_name,
        item: `${process.env.NEXT_SITE_URL}/${brandSlug}/${modelSlug}`,
      },
    ];

    // ✅ Add Variant breadcrumb if NOT on model page
    if (!modelPage && headerDetails?.variant_name) {
      breadcrumbItems.push({
        "@type": "ListItem",
        position: 4,
        name: headerDetails?.variant_name,
        item: `${process.env.NEXT_SITE_URL}/${brandSlug}/${modelSlug}/${variantSlug}`,
      });
    }

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
        name: `${headerDetails?.brand_name} ${headerDetails?.model_name} ${
          modelPage ? "" : headerDetails?.variant_name
        }`,
        description: headerDetails?.image_title || "",
        image: [`${headerDetails?.variant_image}`],
        sku: "",
        brand: {
          "@type": "Brand",
          name: `${headerDetails?.brand_name}`,
        },
        review: {
          "@type": "Review",
          reviewRating: {
            "@type": "Rating",
            ratingValue: `${reviewData?.totalRating}`,
            bestRating: `${reviewData?.averageRating}`,
          },
          author: {
            "@type": "Person",
            name: "CarOnPhone",
          },
        },
      },
    ];

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqList.map((faq) => ({
        "@type": "Question",
        name: faq.qus,
        acceptedAnswer: {
          "@type": "Answer",
          // Strip HTML tags from the answer for structured data
          text: faq.ans.replace(/<[^>]*>?/gm, ""),
        },
      })),
    };

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
        {faqList?.length > 0 && (
          <Script id="faq-schema" type="application/ld+json">
            {JSON.stringify(faqSchema)}
          </Script>
        )}

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
      </>
    );
  } catch (error) {
    console.error("CarModuleContent fetch error:", error);
    return new Error();
  }
}

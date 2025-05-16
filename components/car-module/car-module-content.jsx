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
    return null;
  }

  const cookieStore = cookies();
  const cityId = cookieStore.get("city");

  const [dealersData, reviewData, blogs, faqList, specificationSchemaData] =
    await Promise.all([
      fetchData(
        `/dealership?brand=${headerDetails?.brand_name}&city=${
          cityId?.value || ""
        }`
      ),
      fetchData(`/ratings-and-reviews/${brandSlug}/${modelSlug}`),
      fetchBlogs(headerDetails?.brand_name),
      fetchData(`/brands/${brandSlug}/${modelSlug}/${variantSlug}/faq`),
      fetchData(
        `/brands/${brandSlug}/${modelSlug}/${variantSlug}/specifications`
      ),
    ]);

  // ✅ WebPage Schema
  const webpageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Discover & Purchase New Cars in India | CarOnPhone",
    description:
      "Find your dream car on CarOnPhone. Discover new models, read reviews, and stay updated on Tata, Maruti, Toyota, Hyundai, and more. Book a test drive now!",
    url: "https://caronphone.com/",
    publisher: {
      "@type": "Organization",
      name: "CarOnPhone",
      logo: {
        "@type": "ImageObject",
        url: "https://caronphone.com/favicon.ico",
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
      description: modelDescriptionData?.description || "",
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
          ratingValue: `${
            reviewData?.averageRating > 0 ? reviewData?.averageRating : 4.5
          }`,
          bestRating: `${
            reviewData?.averageRating > 0 ? reviewData?.averageRating : 4.5
          }`,
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

  const getFeatureValue = (detailsArray, keyName) => {
    const feature = detailsArray?.find(
      (item) =>
        item?.features_name.trim().toLowerCase() ===
        keyName?.trim().toLowerCase()
    );
    return feature ? feature?.feature_value?.trim() : null;
  };

  const getFeatureValueFromSpecifications = (
    specifications,
    sectionName,
    keyName
  ) => {
    const section = specifications[sectionName];
    if (!section || !section.details) return null;

    const feature = section.details.find(
      (item) =>
        item.features_name.trim().toLowerCase() === keyName.trim().toLowerCase()
    );

    return feature ? feature.feature_value.trim() : null;
  };

  // ✅ Car Schema
  const carSchema = [
    {
      "@context": "https://schema.org",
      "@type": "Car",
      model: `${headerDetails?.model_name}`,
      image: [
        ...(galleryData?.Exterior?.graphic_file || []),
        ...(galleryData?.Interior?.graphic_file || []),
      ],
      offers: {
        priceCurrency: "INR",
        price: `${headerDetails?.ex_showroom_price || ""}`,
        availability: "https://schema.org/InStock",
      },
      brand: `${headerDetails?.brand_name}`,
      sku: "",
      manufacturer: {
        "@type": "Organization",
        name: `${headerDetails?.brand_name}`,
      },
      url: modelPage
        ? `${process.env.NEXT_SITE_URL}/${brandSlug}/${modelSlug}`
        : `${process.env.NEXT_SITE_URL}/${brandSlug}/${modelSlug}/${variantSlug}`,
      name: `${headerDetails?.brand_name} ${headerDetails?.model_name} ${headerDetails?.variant_name}`,
      vehicleIdentificationNumber: "",
      vehicleModelDate: "",
      itemCondition: "https://schema.org/NewCondition",
      bodyType: `${headerDetails?.ct_name}`,
      numberOfDoors: "",
      vehicleTransmission: [
        `${
          headerDetails?.model_type == 0
            ? headerDetails?.feature_values?.Transmission
            : getFeatureValue(
                specificationSchemaData?.Specifications?.Transmission?.details,
                "Type of Transmission"
              )
        }`,
      ],
      fuelType: variantsData?.fuel_types?.map((fuel) => ({
        "@type": "QualitativeValue",
        name: fuel,
      })),
      description: `${modelDescriptionData?.description || ""}`,
      mpn: "",
      numberOfForwardGears: "",
      fuelCapacity: {
        "@type": "QuantitativeValue",
        unitCode: "Ltr",
        value: `${getFeatureValue(
          specificationSchemaData?.Specifications?.Fuel?.details,
          "Fuel Tank Capacity"
        )}`,
      },
      numberOfAirbags: `${getFeatureValue(
        specificationData?.features?.safety_And_Driver_Assistance?.details,
        "No Of Airbags"
      )}`,
      fuelEfficiency: [
        {
          "@type": "QuantitativeValue",
          name: `${getFeatureValue(
            specificationSchemaData?.Specifications?.Fuel?.details,
            "Mileage"
          )}`,
        },
      ],
      vehicleEngine: [
        {
          fuelType: `${headerDetails?.feature_values?.Fuel}`,
          "@type": "EngineSpecification",
          engineDisplacement: {
            "@type": "QuantitativeValue",
            unitCode: "",
            value: `${getFeatureValue(
              specificationSchemaData?.Specifications?.Engine?.details,
              "Torque"
            )}`,
          },
          torque: {
            "@type": "QuantitativeValue",
            unitCode: "nm@rpm",
            value: `${getFeatureValue(
              specificationSchemaData?.Specifications?.Engine?.details,
              "Torque"
            )}`,
          },
          engineType: `${getFeatureValue(
            specificationSchemaData?.Specifications?.Engine?.details,
            "Type of Engine"
          )}`,
          enginePower: {
            "@type": "QuantitativeValue",
            unitCode: "bhp@rpm",
            value: `${getFeatureValue(
              specificationSchemaData?.Specifications?.Engine?.details,
              "Power"
            )}`,
          },
        },
      ],
      vehicleSeatingCapacity: `${variantEmiData?.seating_capacity || ""}`,
      color: [...new Set(variantColorsData?.map((item) => item.color_name))],
      aggregateRating: {
        "@type": "AggregateRating",
        reviewCount: `${
          reviewData?.totalRating > 0 ? reviewData?.totalRating : 10
        }`,
        ratingValue: `${
          reviewData?.averageRating > 0 ? reviewData?.averageRating : 4.5
        }`,
        worstRating: `${
          reviewData?.averageRating > 0 ? reviewData?.averageRating : 4.5
        }`,
        bestRating: `${
          reviewData?.averageRating > 0 ? reviewData?.averageRating : 4.5
        }`,
      },
      "@graph": [
        {
          "@type": "SiteNavigationElement",
          name: "FAQs",
          "@id": modelPage
            ? `${process.env.NEXT_SITE_URL}/faqs/${brandSlug}/${modelSlug}`
            : `${process.env.NEXT_SITE_URL}/faqs/${brandSlug}/${modelSlug}/${variantSlug}`,
          "@context": "https://schema.org",
          url: modelPage
            ? `${process.env.NEXT_SITE_URL}/faqs/${brandSlug}/${modelSlug}`
            : `${process.env.NEXT_SITE_URL}/faqs/${brandSlug}/${modelSlug}/${variantSlug}`,
        },
      ],
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
      {faqList?.length > 0 && (
        <Script id="faq-schema" type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </Script>
      )}
      <Script id="schema-car" type="application/ld+json">
        {JSON.stringify(carSchema)}
      </Script>

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
}

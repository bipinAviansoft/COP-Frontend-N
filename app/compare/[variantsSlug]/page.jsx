import CompareCarInteractiveWrapper from "@/components/compare-answer-page/compare-car-interactive-wrapper";
import CompareCarsName from "@/components/compare-car/compare-cars-name";
import { fetchData, fetchMetaData } from "@/lib/fetch";

export async function generateMetadata({ params }) {
  const { variantsSlug } = params;

  const canonicalUrl = `${process.env.NEXT_SITE_URL}/compare/${variantsSlug}`;

  function formatVariantSlug(slug) {
    const variants = slug.split("-and-");

    const formatted = variants.map((variant) => {
      const words = variant.split("-");
      const capitalizedWords = words.map(
        (word) => word.charAt(0).toUpperCase() + word.slice(1)
      );

      // You can change how many words to include (e.g., 2 or 3)
      return capitalizedWords.slice(0, 3).join(" ");
    });

    return formatted.join(" v/s ");
  }

  const compareCarsName = formatVariantSlug(variantsSlug);

  const data = {
    title: `${compareCarsName} Comparison – Price, Mileage, Specs & Features`,
    description: `Compare ${compareCarsName} on price, mileage, features, specifications, colours, service cost & performance. Make an informed choice on your next car!`,
    keywords: ``,
    openGraph: {
      title: `${compareCarsName} Comparison – Price, Mileage, Specs & Features`,
      description: `Compare ${compareCarsName} on price, mileage, features, specifications, colours, service cost & performance. Make an informed choice on your next car!`,
      url: canonicalUrl || "https://caronphone.com/",
      siteName: "CarOnPhone",
      images: [
        {
          url: "https://static.caronphone.com/public/brands/31/585/585.webp",
          width: 1200,
          height: 630,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${compareCarsName} Comparison – Price, Mileage, Specs & Features`,
      description: `Compare ${compareCarsName} on price, mileage, features, specifications, colours, service cost & performance. Make an informed choice on your next car!`,
      image: "https://static.caronphone.com/public/brands/31/585/585.webp",
    },
  };

  return {
    ...data,
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default async function CompareCarDetailPage({ params }) {
  const { variantsSlug } = params;

  const [comparisonData, brandModelsData] = await Promise.all([
    fetchData(`/compare-cars/${variantsSlug}`, true),
    fetchData("/brands?models=true"),
  ]);

  return (
    <section className="container kjsdkjsjk py-8 md:py-10 lg:py-12">
      <CompareCarsName />
      <CompareCarInteractiveWrapper
        variantsSlug={variantsSlug}
        data={comparisonData}
        brandModelsData={brandModelsData}
      />
    </section>
  );
}

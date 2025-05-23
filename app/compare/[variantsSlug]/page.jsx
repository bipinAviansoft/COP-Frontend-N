import CompareCarDetails from "@/components/compare-answer-page/compare-car-details";
import CompareCarInteractiveWrapper from "@/components/compare-answer-page/compare-car-interactive-wrapper";
import CompareCarsSection from "@/components/compare-answer-page/compare-cars-header";
import CompareCarsName from "@/components/compare-car/compare-cars-name";
import { fetchData, fetchMetaData } from "@/lib/fetch";

export async function generateMetadata({ params }) {
  const { variantsSlug } = params;
  const bodyData = { page_name_slug: "compare-page" };

  const data = await fetchMetaData(bodyData);

  // return data;
  const canonicalUrl = `${process.env.NEXT_SITE_URL}/compare/${variantsSlug}`;

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

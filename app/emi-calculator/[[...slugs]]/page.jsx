import CustomizeEmiSection from "@/components/emi-calculator-page/customize-emi-loan";
import CarSelectionModal from "@/components/layout/modals/car-selection-modal";
import { fetchData, fetchMetaData } from "@/lib/fetch";

export async function generateMetadata({ params }) {
  const bodyData = { page_name_slug: "emi-calculator" };

  const [brandSlug, modelSlug, variantSlug] = params?.slugs || [];

  const data = await fetchMetaData(bodyData);

  // return data;
  const canonicalUrl = brandSlug
    ? `${process.env.NEXT_SITE_URL}/emi-calculator/${brandSlug}/${modelSlug}/${variantSlug}`
    : `${process.env.NEXT_SITE_URL}/emi-calculator`;

  return {
    ...data,
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default async function Page({ params }) {
  const [brandSlug, modelSlug, variantSlug] = params?.slugs || [];

  const brandModelsData = await fetchData("/brands?models=true");

  const variantData =
    brandSlug &&
    modelSlug &&
    variantSlug &&
    (await fetchData(
      `/emi-calculator/${brandSlug}/${modelSlug}/${variantSlug}`
    ));

  return (
    <>
      <div className="bg-[#f6f2f2]">
        <CarSelectionModal />
        <section className="container py-6 lg:py-6 space-y-6">
          <h1 className="text-xl md:text-2xl xl:text-3xl font-bold text-gray-darker">
            Calculate your Car Loan EMI
          </h1>

          <CustomizeEmiSection
            brandSlug={brandSlug}
            modelSlug={modelSlug}
            variantSlug={variantSlug}
            brandModelsData={brandModelsData}
            variantData={variantData}
          />
        </section>
      </div>
    </>
  );
}

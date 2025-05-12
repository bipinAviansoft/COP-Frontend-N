import CustomizeEmiSection from "@/components/emi-calculator-page/customize-emi-loan";
import CarSelectionModal from "@/components/layout/modals/car-selection-modal";
import { fetchData, fetchMetaData } from "@/lib/fetch";

export async function generateMetadata({ params }) {
  const bodyData = { page_name_slug: "emi-calculator" };

  const [brandSlug, modelSlug, variantSlug] = params?.slugs || [];

  let variantData;

  if (brandSlug && modelSlug && variantSlug) {
    variantData = await fetchData(
      `/emi-calculator/${brandSlug}/${modelSlug}/${variantSlug}`
    );
  }

  const pageImg = variantData?.variant_image || null;

  const data = await fetchMetaData(bodyData, pageImg);
  // return data;
  const canonicalUrl = brandSlug
    ? `${process.env.NEXT_SITE_URL}/emi-calculator/${brandSlug}/${modelSlug}/${variantSlug}`
    : `${process.env.NEXT_SITE_URL}/emi-calculator`;

  if (brandSlug && modelSlug && variantSlug) {
    data.title = `${variantData?.name} ${data.title}`;
    data.openGraph.title = `${data.title}`;
    data.openGraph.url = `${canonicalUrl}`;
    data.twitter.title = `${data.title}`;
  }

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

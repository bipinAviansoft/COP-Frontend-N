import FaqDetails from "@/components/faqs-details/faqs-details";
import FaqMainBanner from "@/components/faqs-details/faqs-main-banner";
import { fetchData, fetchMetaData } from "@/lib/fetch";

export async function generateMetadata({ params }) {
  const bodyData = { page_name_slug: "faqs" };
  const [brandSlug, modelSlug, variantSlug] = params?.slugs || [];

  const data = await fetchMetaData(bodyData);

  let slug;

  if (brandSlug) {
    slug = variantSlug
      ? `${process.env.NEXT_SITE_URL}/faqs/${brandSlug}/${modelSlug}/${variantSlug}`
      : `${process.env.NEXT_SITE_URL}/faqs/${brandSlug}/${modelSlug}`;
  }

  // return data;
  const canonicalUrl = brandSlug ? slug : `${process.env.NEXT_SITE_URL}/faqs`;

  return {
    ...data,
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default async function FaqsPage({ params }) {
  const { slugs } = params;
  const [brandSlug, modelSlug, variantSlug] = slugs;

  let baseVariantSlug;

  if (!variantSlug) {
    const { variants } = await fetchData(`/brands/${brandSlug}/${modelSlug}`);
    baseVariantSlug = variants[0]?.slug?.split("/")[2];
  }

  const fullSlug = `${brandSlug}/${modelSlug}/${
    variantSlug || baseVariantSlug
  }`;

  const faqData = await fetchData(`/faq/${fullSlug}`);

  const { variant_name, variant_image, faqs } = faqData;

  return (
    <>
      <section className="py-8 lg:py-12 bg-white">
        <div className="container">
          <FaqMainBanner
            name={variant_name}
            imgUrl={variant_image}
            fullSlug={fullSlug}
          />
        </div>
      </section>

      <section className="py-8 lg:py-12 bg-gradient-to-r from-[#e7e7e7] to-[rgba(231,231,231,0.5)]">
        <div className="container">
          <FaqDetails faqs={faqs} />
        </div>
      </section>
    </>
  );
}

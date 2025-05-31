import FaqDetails from "@/components/faqs-details/faqs-details";
import FaqMainBanner from "@/components/faqs-details/faqs-main-banner";
import { fetchData, fetchMetaData } from "@/lib/fetch";
import { redirect } from "next/navigation";

export async function generateMetadata({ params }) {
  const bodyData = { page_name_slug: "faqs" };
  const [brandSlug, modelSlug, variantSlug] = params?.slugs || [];

  let baseVariantSlug;

  if (!variantSlug) {
    const { variants, upcoming_stage } = await fetchData(
      `/brands/${brandSlug}/${modelSlug}`
    );
    if (upcoming_stage == 1) {
      return redirect(`/${brandSlug}/${modelSlug}`);
    }
    baseVariantSlug = variants ? variants[0]?.slug?.split("/")[2] : null;
  }

  const fullSlug = `${brandSlug}/${modelSlug}/${
    variantSlug || baseVariantSlug
  }`;

  const faqData = await fetchData(`/faq/${fullSlug}`);

  const { variant_name, variant_image, faqs } = faqData;

  const data = await fetchMetaData(bodyData, variant_image);

  let slug;

  if (brandSlug) {
    slug = variantSlug
      ? `${process.env.NEXT_SITE_URL}/faqs/${brandSlug}/${modelSlug}/${variantSlug}`
      : `${process.env.NEXT_SITE_URL}/faqs/${brandSlug}/${modelSlug}`;
  }

  const canonicalUrl = brandSlug ? slug : `${process.env.NEXT_SITE_URL}/faqs`;

  if (brandSlug && modelSlug) {
    data.title = `${variant_name} ${
      variantSlug ? data.title : "- FAQs Your Questions Answered"
    } `;
    data.description = `Get answers to all your queries about the ${
      variantSlug ? variant_name : `(${variant_name})`
    }. Explore detailed FAQs covering engine specs, performance, safety features, dimensions, and more. Your complete guide to the ${
      variantSlug ? variant_name : `(${variant_name})`
    } awaits.`;
    data.openGraph.title = `${data.title}`;
    data.openGraph.description = data.description;
    data.openGraph.url = `${canonicalUrl}`;
    data.twitter.title = `${data.title}`;
    data.twitter.description = data.description;
  }

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

  if (!brandSlug.includes("-cars")) {
    const cleanedBrandSlug = `${brandSlug}-cars`;
    if (!variantSlug) {
      return redirect(`/faqs/${cleanedBrandSlug}/${modelSlug}`);
    } else {
      return redirect(`/faqs/${cleanedBrandSlug}/${modelSlug}/${variantSlug}`);
    }
  //   if (!brandSlug.includes("-cars")) {
  //     return redirect(`/faq/${cleanedBrandSlug}/${modelSlug}`);
  //   }
  // } else {
  //   if (!brandSlug.includes("-cars")) {
  //     const cleanedBrandSlug = `${brandSlug}-cars`;
  //     return redirect(`/faq/${cleanedBrandSlug}/${modelSlug}`);
  //   }
  }

  let baseVariantSlug;

  if (!variantSlug) {
    const { variants, upcoming_stage } = await fetchData(
      `/brands/${brandSlug}/${modelSlug}`
    );
    if (upcoming_stage == 1) {
      return redirect(`/${brandSlug}/${modelSlug}`);
    }
    baseVariantSlug = variants ? variants[0]?.slug?.split("/")[2] : null;
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

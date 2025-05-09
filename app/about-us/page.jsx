export const dynamic = "force-dynamic";
import AboutUsSection from "@/components/about-us/about-us-section";
import StepSection from "@/components/about-us/steps-section";
import { fetchMetaData } from "@/lib/fetch";

export async function generateMetadata({ params }) {
  const bodyData = { page_name_slug: "about-us" };

  const data = await fetchMetaData(bodyData);
  // return data;
  const canonicalUrl = `${process.env.NEXT_SITE_URL}/about-us`;

  return {
    ...data,
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default function Page() {
  return (
    <>
      <section className="container py-8 lg:py-12">
        <h1 className="text-2xl mb-5 lg:text-3xl xl:text-4xl font-bold lg:mb-8 text-black text-center">
          About Us
        </h1>
        <AboutUsSection />
      </section>

      <section className="container py-8 lg:py-12">
        <p className="text-sm lg:text-base font-normal text-gray-500 mb-3 lg:mb-5 text-center">
          At CarOnPhone, we hold a steadfast commitment to our core values.
          These values are the guiding principles that shape every aspect of our
          business, from the services we provide to the relationships we build
          with our customers.
        </p>
        <StepSection />
        <p className="text-sm lg:text-base font-normal text-gray-500 mt-3 lg:mt-5 text-center">
          These values aren&apos;t just words on paper; they are the principles
          that guide our actions every day. We invite you to join us on our
          journey as we continue to drive dreams home^ while staying true to
          these core values.
        </p>
      </section>
    </>
  );
}

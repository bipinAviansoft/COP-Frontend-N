import B2BpartnerSection from "@/components/b2b-inquiry/partner-section";
import { fetchMetaData } from "@/lib/fetch";

export async function generateMetadata({ params }) {
  const bodyData = { page_name_slug: "b2b-inquiry" };

  const data = await fetchMetaData(bodyData);

  return data;
}

export default function Page() {
  return (
    <>
      <section className="container py-8 lg:py-12">
        <B2BpartnerSection />
      </section>
    </>
  );
}

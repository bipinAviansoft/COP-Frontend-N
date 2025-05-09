export const dynamic = "force-dynamic";
import DealershipCards from "@/components/dealership/dealership-cards";
import { fetchData, fetchMetaData } from "@/lib/fetch";

export async function generateMetadata({ params }) {
  const bodyData = { page_name_slug: "dealership" };

  const data = await fetchMetaData(bodyData);

  // return data;
  const canonicalUrl = `${process.env.NEXT_SITE_URL}/dealership`;

  return {
    ...data,
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default async function DealershipPage() {
  const brandsCitiesData = await fetchData("/dealership/brands");

  return (
    <div className="bg-[#f6f2f2]">
      <section className="container py-8 lg:py-12 space-y-4 md:space-y-6 lg:space-y-8">
        <div className="space-y-4 lg:w-1/2">
          <h1 className="text-2xl md:text-2xl font-bold">
            New Car Dealer Showrooms
          </h1>
          <p className="text-base mb-3 font-normal text-gray-700">
            At the authorized destination for premium vehicles, discover
            exceptional service, expert guidance, and a wide selection of
            top-quality cars designed to enhance your driving experience.
          </p>
        </div>

        <DealershipCards brands={brandsCitiesData} />
      </section>
    </div>
  );
}

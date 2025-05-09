export const dynamic = "force-dynamic";
import EvChargingStation from "@/components/ev-charging-stations/ev-charging-cards";
import { fetchData, fetchMetaData } from "@/lib/fetch";

export async function generateMetadata({ params }) {
  const bodyData = { page_name_slug: "ev-charging-station" };

  const data = await fetchMetaData(bodyData);

  // return data;
  const canonicalUrl = `${process.env.NEXT_SITE_URL}/electric-car-charging-station`;

  return {
    ...data,
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default async function EvChargingStationsPage() {
  const cities = await fetchData("/electric-car-charging-station/cities");

  return (
    <div className="bg-[#f6f2f2]">
      <section className="container py-8 lg:py-12 space-y-4 md:space-y-6 lg:space-y-8">
        <h1 className="text-2xl md:text-2xl font-bold">
          Electric (EV) Charging Stations
        </h1>

        <EvChargingStation cities={cities} />
      </section>
    </div>
  );
}

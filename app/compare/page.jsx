import CarSelectionGrid from "@/components/compare-car/car-selection-grid";
import DiscoverDreamCarSection from "@/components/compare-car/discover-dream-car";
import CommonBanner from "@/components/layout/common-banner/banner";
import { fetchData, fetchMetaData } from "@/lib/fetch";
import BgImg from "@/public/images/best_car_buy_img.jpg";
import Image from "next/image";

export async function generateMetadata({ params }) {
  const bodyData = { page_name_slug: "compare-page" };

  const data = await fetchMetaData(bodyData);

  // return data;
  const canonicalUrl = `${process.env.NEXT_SITE_URL}/compare`;

  return {
    ...data,
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default async function Page() {
  const brandModelsData = await fetchData("/brands?models=true");

  return (
    <>
      {/* Banner  */}
      <CommonBanner
        bannerImgUrl="https://static.caronphone.com/public/Banner/66/66.webp"
        heading="Compare Cars in India"
        description="Compare up to 4 cars with all inclusive details to let you make sensible decisions to help find the desired model smoothly."
      />

      {/* Add Car Compare Section */}
      <section className="container py-4 md:py-6 lg:py-8">
        <CarSelectionGrid brandModelsData={brandModelsData} />
      </section>

      {/* Discover Your Dream Car Section */}
      <section className="py-8 md:py-10 lg:py-12 relative w-full h-[180px] lg:h-[260px] xl:h-[400px] 2xl:h-[500px]">
        <Image
          src={BgImg}
          alt=""
          className="w-full h-[180px] lg:h-[260px] xl:h-[400px] 2xl:h-[500px] object-cover absolute top-0 left-0 -z-0"
        />
        <div className="container">
          <DiscoverDreamCarSection />
        </div>
      </section>
    </>
  );
}

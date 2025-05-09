import Image from "next/image";
import BgImg from "@/public/images/car-loan-banner-img.png";
import LoanProviderSection from "@/components/carloanpage/loan-provider-section";
import LoanCriteria from "@/components/carloanpage/loan-criteria";
import { fetchData, fetchMetaData } from "@/lib/fetch";

export async function generateMetadata({ params }) {
  const bodyData = { page_name_slug: "car-loan" };

  const data = await fetchMetaData(bodyData);

  // return data;
  const canonicalUrl = `${process.env.NEXT_SITE_URL}/car-loan`;

  return {
    ...data,
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default async function Page() {
  const cities = await fetchData("/city/all");

  return (
    <>
      <section className="relative overflow-hidden py-6 lg:py-12">
        <Image
          src={BgImg}
          alt=""
          className="absolute w-full h-full left-0 top-0 object-cover -z-10"
        />
        <div className="container py-6 lg:py-6">
          <LoanProviderSection cities={cities} />
        </div>
      </section>

      <section className="container py-8 lg:py-20">
        <LoanCriteria />
      </section>
    </>
  );
}

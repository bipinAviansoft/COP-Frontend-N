import Image from "next/image";
import BgImg from "@/public/images/car-insurance-banner-bg.png";
import CarInsuranceSection from "@/components/car-insurance-page/car-insurance-section";
import CarInsurancePolicySection from "@/components/car-insurance-page/car-insurance-policy";
import CarInsuranceBenifitsSection from "@/components/car-insurance-page/car-insurance-benifits";
import { fetchData, fetchMetaData } from "@/lib/fetch";

export async function generateMetadata({ params }) {
  const bodyData = { page_name_slug: "car-insurance" };

  const data = await fetchMetaData(bodyData);

  return data;
}

export default async function CarInsurancePage() {
  const [brandModels, cities] = await Promise.all([
    fetchData("/brands?models=true"),
    fetchData("/city/all"),
  ]);

  return (
    <>
      <section className="relative overflow-hidden py-6 lg:py-12">
        <Image
          src={BgImg}
          alt=""
          className="absolute w-full h-full left-0 top-0 object-cover -z-10"
        />
        <div className="container py-6 lg:py-6">
          <CarInsuranceSection brandModels={brandModels} cities={cities} />
        </div>
      </section>

      <section className="container py-6 lg:py-20">
        <CarInsurancePolicySection />
      </section>

      <section className="car_insurance_benifits bg-[#e3eef3] pt-[50px] pb-[50px] md:pt-[100px] md:pb-[100px] lg:pt-[150px] lg:pb-[200px]">
        <div className="container">
          <CarInsuranceBenifitsSection />
        </div>
      </section>
    </>
  );
}

import WarningLightsSection from "@/components/warning-lights/warning-light-section";
import { fetchData, fetchMetaData } from "@/lib/fetch";

export async function generateMetadata({ params }) {
  const bodyData = { page_name_slug: "warning-lights" };

  const data = await fetchMetaData(bodyData);

  // return data;
  const canonicalUrl = `${process.env.NEXT_SITE_URL}/warning-lights`;

  return {
    ...data,
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default async function Page() {
  const warningLightsData = await fetchData("/warning-lights");

  return (
    <>
      <div className="portrait:flex landscape:hidden  items-center justify-center h-[calc(100vh-58px)] flex-col w-full gap-3">
        <i className="bx bx-mobile text-2xl"></i>
        <h3 className="text-lg font-semibold text-black">
          Please Rotate your Phone
        </h3>
      </div>
      <section className="bg-black py-[30px] px-[15px] lg:py-[30px] lg:px-[50px] 2xl:py-[50px] 2xl:px-[100px] portrait:hidden landscape:block">
        {warningLightsData?.length > 0 && (
          <WarningLightsSection data={warningLightsData} />
        )}
      </section>
    </>
  );
}

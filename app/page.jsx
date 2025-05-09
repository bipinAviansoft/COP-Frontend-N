import AllBrandsSection from "@/components/homepage/all-brands-section";
import CarsByBudget from "@/components/homepage/cars-by-budget";
import ElectricCarsSection from "@/components/homepage/electric-cars-section";
import FeaturedLinks from "@/components/homepage/featured-links";
import LatestAutomotiveNews from "@/components/homepage/latest-automotive-news";
import MainBanner from "@/components/homepage/main-banner";
import TrendingCars from "@/components/homepage/trending-cars";
import UpcomingCarsCarousel from "@/components/homepage/upcoming-cars-carousel";
import { fetchBlogs, fetchData, fetchMetaData } from "@/lib/fetch";
import Script from "next/script";

export async function generateMetadata({ params }) {
  const bodyData = { page_name_slug: "home" };
  const pageImg = "https://caronphone.com/images/logo_white.png";
  const data = await fetchMetaData(bodyData, pageImg);
  const canonicalUrl = `${process.env.NEXT_SITE_URL}`;

  return {
    ...data,
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default async function Home() {
  const [
    headBanners,
    carTypes,
    brandModels,
    evBanners,
    upComingBanners,
    blogs,
  ] = await Promise.all([
    fetchData("/home/head-banners"),
    fetchData("/home/car-types"),
    fetchData("/brands?models=true"),
    fetchData("/home/ev-banners", true),
    fetchData("/home/upcoming-banners"),
    fetchBlogs(),
  ]);

  // ✅ WebPage Schema
  const webpageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Discover & Purchase New Cars in India | CarOnPhone",
    description:
      "Find your dream car on CarOnPhone. Discover new models, read reviews, and stay updated on Tata, Maruti, Toyota, Hyundai, and more. Book a test drive now!",
    url: "https://caronphone.com/",
    publisher: {
      "@type": "Organization",
      name: "CarOnPhone",
      logo: {
        "@type": "ImageObject",
        url: "https://caronphone.com/images/logo_white.png",
      },
    },
  };

  const organizationSchema = [
    {
      "@context": "https://schema.org",
      "@type": "Corporation",
      name: "CarOnPhone",
      alternateName: "CarOnPhone",
      url: "https://caronphone.com/",
      logo: "https://caronphone.com/images/logo_white.png",
      sameAs: [
        "https://facebook.com/CarOnPhone",
        "https://instagram.com/caronphoneindia",
        "https://caronphone.com/",
        "https://linkedin.com/company/caronphone/",
      ],
    },
  ];

  return (
    <>
      {/* ✅ Inject Schema Markups */}
      <Script id="schema-webpage" type="application/ld+json">
        {JSON.stringify(webpageSchema)}
      </Script>

      <Script id="schema-organization" type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </Script>

      <section className="">
        <MainBanner
          bannerData={headBanners}
          carTypes={carTypes}
          brandModels={brandModels}
        />
      </section>

      <section className="container py-8 lg:py-12">
        <FeaturedLinks />
      </section>

      <section className="relative before:absolute before:top-0 before:inset-0 before:content-[''] before:h-1/2 before:bg-gradient-to-r	before:from-[#133351] before:to-[#0c0c0c] before:-z-10">
        <div className="container py-6 md:py-7 lg:py-8">
          <TrendingCars />
        </div>
      </section>

      <section className="container py-6">
        <AllBrandsSection brandModels={brandModels} />
      </section>

      <section className="my-10 xl:my-20">
        <ElectricCarsSection evBanners={evBanners} />
      </section>

      <section className="relative before:absolute before:top-0 before:inset-0 before:content-[''] before:h-1/2 before:bg-gradient-to-r	before:from-[#133351] before:to-[#0c0c0c] before:-z-10">
        <div className="container py-6 md:py-8 lg:py-10">
          <CarsByBudget />
        </div>
      </section>

      <section className="py-4 md:py-5 lg:py-6">
        <UpcomingCarsCarousel upComingBanners={upComingBanners} />
      </section>

      <section className="my-6 md:my-7 lg:my-8">
        <div className="container">
          <div className="py-6 px-3 md:py-10 md:px-5 lg:py-12 lg:px-7 bg-white shadow-xl rounded-3xl">
            <LatestAutomotiveNews blogs={blogs} />
          </div>
        </div>
      </section>
    </>
  );
}

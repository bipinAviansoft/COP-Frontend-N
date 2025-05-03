"use client";

// import "./car-style.css";
import CarModuleHeader from "@/components/car-module/car-module-header";
import Description from "@/components/car-module/description";
import KeySpecs from "@/components/car-module/key-specs";
import Specifications from "@/components/car-module/specifications";
import Variants from "@/components/car-module/variants";
import CarModuleComparisonContextProvider from "@/contexts/car-module-comparison-context";
import GalleryTabs from "./car-gallery-tabs";
import VariantColorCarousel from "./car-variant-color-carousel";
import ComparisonDrawer from "./comparison-drawer";
import FaqSection from "./faq-section";
import PriceAlert from "./price-alert";
import Pricing from "./pricing";
import RatingsAndReviews from "./ratings-and-reviews";
import SimilarVariantsSection from "./similar-variants-section";
import { useInView } from "react-intersection-observer";
import ScrollToMarginElement from "../ui/scroll-to-margin-element";
import CarHeaderData from "./car-header-data";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

import Image from "next/image";
import { useEffect, useState } from "react";
import CarColorImagesData from "./car-color-images-videos-data";
import CarColorImagesVideosData from "./car-color-images-videos-data";
import VariantsList from "./variants-list";
import Link from "next/link";
import { Checkbox } from "../ui/checkbox";
import CompareVariantsList from "./compare-variants-list";
import SimilarCarModel from "./similar-car-model";
import { formatCarPrice } from "@/lib/utils";
import { calculateEMI } from "@/lib/emi-calc";
import SafetyFeaturesList from "./safety-features-list";
import { useSelector } from "react-redux";
import Button from "../ui/button";
import DealersList from "./dealers-list";
import CustomizeEmiSection from "../emi-calculator-page/customize-emi-loan";
import ReviewList from "./review-list";
import LatestAutomotiveNews from "../homepage/latest-automotive-news";

export default function CarModuleInteractiveWrapper({
  brandSlug,
  modelSlug,
  variantSlug,
  variantsData,
  headerDetails,
  pricingData,
  variantColorsData,
  // keySpecsData,
  // descriptionData,
  modelDescriptionData,
  specificationData,
  similarModelsData,
  galleryData,
  similarVariantsData,
  // faqData,
  modelPage,
  variantsMileageData,
  faqFullData,
  dealersData,
  variantEmiData,
  reviewData,
  blogs,
}) {
  console.log("reviewData: ", reviewData);

  const { ref: overviewRef, inView: isOverviewInView } = useInView({
    threshold: 0.6,
  });
  const { ref: detailRef, inView: isDetailInView } = useInView({
    threshold: 0.6,
  });
  const { ref: galleryRef, inView: isGalleryInView } = useInView({
    threshold: 0.4,
  });
  const { ref: compareRef, inView: isCompareInView } = useInView({
    threshold: 0.6,
  });
  const { ref: faqRef, inView: isFaqInView } = useInView({
    threshold: 0.6,
  });

  const refsInView = {
    isOverviewInView,
    isDetailInView,
    isGalleryInView,
    isCompareInView,
    isFaqInView,
  };

  const { city: cityId, citiesList } = useSelector((state) => state.city);

  const selectedCity = citiesList?.filter((city) => city.id === cityId)[0];
  const selectedCityName = selectedCity?.city_name || "";

  const { fuel_types, variants } = variantsData;

  const exshowroomPrice = pricingData?.variants
    ? pricingData?.variants[0]?.ex_showroom_price
    : "N/A";
  const isPriceAlertSet = pricingData[0]
    ? Boolean(pricingData[0]["set_price_alert"])
    : false;

  const thingsLikes = modelDescriptionData?.thing_like
    ?.split("\n")
    ?.filter(Boolean);
  const thingsImprovements = modelDescriptionData?.thing_improve
    ?.split("\n")
    ?.filter(Boolean);

  const monthlyEmi = calculateEMI(exshowroomPrice);

  let selectedSlug = modelPage
    ? `${brandSlug}/${modelSlug}`
    : `${brandSlug}/${modelSlug}/${variantSlug}`;

  const similarModelsCars = similarModelsData?.models;

  const similarModelBodyType = similarModelsCars?.filter(
    (item) => item?.car_type === headerDetails?.ct_name
  );

  const similarModelBudgetType = [...similarModelsCars].sort(
    (a, b) => a.min_price - b.min_price
  );

  // Get unique mileage objects
  const uniquePowertrains = [];
  const seenPowertrains = new Set();

  variantsMileageData?.variants.forEach((variant) => {
    if (!seenPowertrains.has(variant.powertrain)) {
      seenPowertrains.add(variant.powertrain);
      uniquePowertrains.push(variant);
    }
  });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1200);
    };

    handleResize(); // Set on load
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <CarModuleComparisonContextProvider>
      <ComparisonDrawer
        variants={variantsData?.variants}
        selectedVariantSlug={`${brandSlug}/${modelSlug}/${variantSlug}`}
      />
      <div className="bg-[#F3F4F9] ">
        <CarModuleHeader
          brandSlug={brandSlug}
          modelSlug={modelSlug}
          variantSlug={variantSlug}
          modelPage={modelPage}
          reviewLink={reviewData?.totalRating > 0}
          reviewData={reviewData?.totalRating > 0}
          headerDetails={headerDetails}
        />
        {isMobile ? null : (
          <div className="hidden xl:block pt-[15px] md:pt-[30px]">
            <CarHeaderData
              headerDetails={headerDetails}
              selectedVariantSlug={`${selectedSlug}`}
              description={modelDescriptionData?.description}
              modelPage={modelPage}
              reviewData={reviewData}
            />
          </div>
        )}

        <div className="mt-[30px] md:mt-[35px]">
          <div className="container">
            <div className="flex flex-wrap gap-[20px]">
              <div className="w-full xl:w-[calc(75%-10px)] ">
                <CarColorImagesVideosData
                  variantColorsData={variantColorsData}
                  galleryData={galleryData}
                  page={true}
                />
                {isMobile ? (
                  <div className="block xl:hidden pt-[15px] md:pt-[30px] mx-[-15px] ">
                    <CarHeaderData
                      headerDetails={headerDetails}
                      selectedVariantSlug={`${selectedSlug}`}
                      description={modelDescriptionData?.description}
                      modelPage={modelPage}
                      reviewData={reviewData}
                    />
                  </div>
                ) : null}
              </div>
              <div className="w-full xl:w-[calc(25%-10px)]">
                <div>
                  <h2 className="text-[20px] font-[600] leading-[27px] text-[#000000] mb-[10px]">
                    Best Selling Variants
                  </h2>
                  <div className="">
                    <VariantsList
                      variants={variants}
                      selectedVariantSlug={`${brandSlug}/${modelSlug}/${variantSlug}`}
                      dataLimit={3}
                      modelType={headerDetails?.model_type}
                    />
                    <Link
                      href={`/${selectedSlug}/variants`}
                      className="text-[14px] leading-[19px] font-normal text-[#0177AA] underline capitalize "
                    >
                      View More Variants
                    </Link>
                  </div>
                  <div className="mt-[15px] py-[15px] px-[20px] bg-[#EBEDF0] rounded-[16px] ">
                    <p className="text-[14px] font-[600] text-[#565F64] flex items-center gap-[7px] mb-[7px] ">
                      EMI Rs. {monthlyEmi}
                      <i>
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M8 0.1875C3.69219 0.1875 0.1875 3.69219 0.1875 8C0.1875 12.3078 3.69219 15.8125 8 15.8125C12.3078 15.8125 15.8125 12.3078 15.8125 8C15.8125 3.69219 12.3078 0.1875 8 0.1875ZM8 3.39062C8.20087 3.39062 8.39723 3.45019 8.56425 3.56179C8.73127 3.67339 8.86145 3.83201 8.93832 4.01759C9.01519 4.20317 9.0353 4.40738 8.99611 4.60439C8.95692 4.8014 8.86019 4.98237 8.71815 5.12441C8.57612 5.26644 8.39515 5.36317 8.19814 5.40236C8.00113 5.44155 7.79692 5.42144 7.61134 5.34457C7.42576 5.26769 7.26714 5.13752 7.15554 4.9705C7.04394 4.80348 6.98438 4.60712 6.98438 4.40625C6.98438 4.13689 7.09138 3.87856 7.28184 3.68809C7.47231 3.49763 7.73064 3.39062 8 3.39062ZM10.5 12.2188H5.8125V10.9688H7.53125V7.53125H6.28125V6.28125H8.78125V10.9688H10.5V12.2188Z"
                            fill="#565F64"
                          ></path>
                        </svg>
                      </i>
                      <span>For 5 Years</span>
                    </p>
                    <Link
                      href={`/emi-calculator/${brandSlug}/${modelSlug}/${variantSlug}`}
                      className="text-[14px] leading-[19px] font-[500] text-[#0177AA] capitalize !underline "
                    >
                      Calculate EMI Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Things we like and dislike */}
        {thingsLikes?.length < 0 && thingsImprovements?.length < 0 ? (
          <div className="mt-[30px]">
            <div className="container">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-[15px] md:gap-[30px]">
                <div className="">
                  <div
                    className="text-[16px] md:text-[18px] font-[500] text-[#ffffff] rounded-[16px_16px_0_0] py-[6px] px-[30px] ml-[20px] md:ml-[30px] inline-flex items-center gap-[10px] "
                    style={{
                      background:
                        "linear-gradient(270deg, #1BBE80 -56.06%, #1D9188 74.46%)",
                    }}
                  >
                    <img
                      src="/images/things_like.png"
                      alt="img"
                      className="max-w-[20px] md:max-w-[100%]"
                    />
                    Things we like
                  </div>
                  <div className="h-[calc(100%-39px)] bg-white rounded-[16px] py-[20px] md:py-[35px] px-[20px] text-start ">
                    <ul className="pl-[20px] space-y-[15px]">
                      {thingsLikes.map((item, index) => (
                        <li
                          key={index}
                          className="list-disc text-[14px] font-[400] leading-[19px] text-[#000000]"
                        >
                          {item.replace(/^•\s*/, "")}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="">
                  <div
                    className="text-[16px] md:text-[18px] font-[500] text-[#ffffff] rounded-[16px_16px_0_0] py-[6px] px-[30px] ml-[20px] md:ml-[30px] inline-flex items-center gap-[10px] "
                    style={{
                      background:
                        "linear-gradient(89.84deg, #C92023 27.82%, #FA7E3E 126.25%)",
                    }}
                  >
                    <img
                      src="/images/things-dislike.png"
                      alt="img"
                      className="max-w-[20px] md:max-w-[100%]"
                    />
                    Can be better
                  </div>
                  <div className="h-[calc(100%-39px)] bg-white rounded-[16px] py-[20px] md:py-[35px] px-[20px] text-start ">
                    <ul className="pl-[20px] space-y-[15px]">
                      {thingsImprovements.map((item, index) => (
                        <li
                          key={index}
                          className="list-disc text-[14px] font-[400] leading-[19px] text-[#000000]"
                        >
                          {item.replace(/^•\s*/, "")}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {/* car spec & other design sec */}

        <div className="mt-[50px] md:mt-[30px]">
          <div className="container">
            <div className="flex flex-wrap gap-[20px]">
              <div className="w-full xl:w-[calc(75%-10px)] ">
                <div className="space-y-[50px] xl:space-y-[20px]">
                  {/* Performance and Handling */}
                  <div className="bg-white rounded-[16px] ">
                    <h2 className=" text-[18px] md:text-[24px] font-[600] leading-[28px] text-[#000000] py-[20px] md:py-[35px] px-[15px] md:px-[40px] m-0 ">
                      {headerDetails?.brand_name} {headerDetails?.model_name}{" "}
                      {modelPage ? "" : headerDetails?.variant_name}{" "}
                      Specifications
                    </h2>
                    <div>
                      <Tabs
                        defaultValue="specTab1"
                        className="w-full flex flex-wrap relative"
                      >
                        <TabsList className="pl-[15px] md:pl-[40px] py-0 !h-[auto] w-full flex items-end justify-start gap-[35px] pr-0 bg-transparent border-b-[1px] border-[#8080808C] scroll-bar-none overflow-x-auto md:overflow-x-visible rounded-none whitespace-nowrap">
                          {Object.keys(
                            specificationData?.engineTransFuel || {}
                          ).map((key, index) => {
                            return (
                              <>
                                <TabsTrigger
                                  key={index + new Date().getTime()}
                                  value={`specTab${index + 1}`}
                                  className="relative group text-[#24272C] flex gap-[6px] items-center justify-center data-[state=active]:text-[#0177AA] text-[16px] leading-[22px] font-[400] p-[5px] !shadow-none border-b-[1px] border-transparent data-[state=active]:border-[#0177AA] mb-[-1px] !rounded-none before:content-[''] before:absolute before:left-[50%] before:translate-x-[-50%] before:bottom-[-7px] before:w-0 before:h-0 before:border-l-[7px] before:border-l-[transparent] before:border-r-[7px] before:border-r-[transparent] before:border-t-[7px] before:border-t-[#0177AA] data-[state=active]:before:opacity-100 before:opacity-0"
                                >
                                  {key}
                                </TabsTrigger>
                              </>
                            );
                          })}
                        </TabsList>
                        <div className="py-[15px] md:py-[30px] px-[15px] md:px-[40px] w-full ">
                          {Object.keys(
                            specificationData?.engineTransFuel || {}
                          ).map((key, index) => {
                            const entries = Object.entries(
                              specificationData?.engineTransFuel[key].details
                            );

                            const midIndex = Math.ceil(entries.length / 2);
                            const col1 = entries.slice(0, midIndex);
                            const col2 = entries.slice(midIndex);

                            return (
                              <>
                                <TabsContent
                                  className="mb-[30px]"
                                  key={index + new Date().getTime()}
                                  value={`specTab${index + 1}`}
                                >
                                  <div className="w-full flex flex-wrap gap-y-[20px]">
                                    <div className="w-full lg:w-1/2">
                                      <ul className="space-y-[20px]">
                                        {col1.map((item, idx) => (
                                          <>
                                            <li
                                              key={idx}
                                              className="text-[14px] leading-[19px] font-[400] text-[#282C2F] flex flex-wrap items-center  "
                                            >
                                              <span className="w-1/2 pr-2">
                                                {item[1].features_name}
                                              </span>
                                              <strong className="w-1/2 pl-2 text-end md:text-start">
                                                {item[1].feature_value}
                                              </strong>
                                            </li>
                                          </>
                                        ))}
                                      </ul>
                                    </div>
                                    <div className="w-full lg:w-1/2">
                                      <ul className="space-y-[20px]">
                                        {col2.map((item, idx) => (
                                          <>
                                            <li
                                              key={idx}
                                              className="text-[14px] leading-[19px] font-[400] text-[#282C2F] flex flex-wrap items-center  "
                                            >
                                              <span className="w-1/2 pr-2">
                                                {item[1].features_name}
                                              </span>
                                              <strong className="w-1/2 pl-2 text-end md:text-start">
                                                {item[1].feature_value}
                                              </strong>
                                            </li>
                                          </>
                                        ))}
                                      </ul>
                                    </div>
                                  </div>
                                </TabsContent>
                              </>
                            );
                          })}
                          <Link
                            href={`/${selectedSlug}/specifications`}
                            className="inline-flex items-center gap-[10px] text-[14px] leading-[19px] font-normal text-[#0177AA] underline capitalize"
                          >
                            View Detailed Specifications
                            <svg
                              width="13"
                              height="11"
                              viewBox="0 0 13 11"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M12.4141 5.51254L7.70706 0.805545C7.61422 0.7127 7.504 0.639051 7.38269 0.588804C7.26138 0.538557 7.13136 0.512695 7.00006 0.512695C6.86876 0.512695 6.73874 0.538557 6.61744 0.588804C6.49613 0.639051 6.38591 0.7127 6.29306 0.805545C6.20022 0.898389 6.12657 1.00861 6.07632 1.12992C6.02607 1.25123 6.00021 1.38124 6.00021 1.51254C6.00021 1.64385 6.02607 1.77386 6.07632 1.89517C6.12657 2.01648 6.20022 2.1267 6.29306 2.21954L8.58606 4.51254L1.00006 4.51254C0.734846 4.51254 0.480491 4.6179 0.292955 4.80544C0.105419 4.99297 6.27355e-05 5.24733 6.2724e-05 5.51254C6.27124e-05 5.77776 0.105419 6.03211 0.292955 6.21965C0.480491 6.40719 0.734846 6.51254 1.00006 6.51254L8.58606 6.51254L6.29306 8.80554C6.19988 8.8982 6.12593 9.00836 6.07547 9.12969C6.025 9.25102 5.99903 9.38114 5.99903 9.51254C5.99903 9.64395 6.025 9.77406 6.07547 9.8954C6.12593 10.0167 6.19988 10.1269 6.29306 10.2195C6.48059 10.407 6.7349 10.5123 7.00006 10.5123C7.26523 10.5123 7.51953 10.407 7.70706 10.2195L12.4141 5.51254Z"
                                fill="#0177AA"
                              />
                            </svg>
                          </Link>
                        </div>
                      </Tabs>
                    </div>
                  </div>
                  {/* end */}

                  {/* Technology and Features */}
                  <div className="bg-white rounded-[16px] ">
                    <h2 className=" text-[18px] md:text-[24px] font-[600] leading-[28px] text-[#000000] py-[20px] md:py-[35px] px-[15px] md:px-[40px] m-0 ">
                      {headerDetails?.brand_name} {headerDetails?.model_name}{" "}
                      {modelPage ? "" : headerDetails?.variant_name} Features
                    </h2>
                    <div>
                      <Tabs
                        defaultValue="techFeatTab1"
                        className="w-full flex flex-wrap relative"
                      >
                        <TabsList className="pl-[15px] md:pl-[40px] py-0 !h-[auto] w-full flex items-end justify-start gap-[35px] pr-0 bg-transparent border-b-[1px] border-[#8080808C] scroll-bar-none overflow-x-auto md:overflow-x-visible rounded-none whitespace-nowrap">
                          {Object.keys(specificationData?.features || {}).map(
                            (key, index) => {
                              let title = key.replace(/_/g, " ");
                              return (
                                <>
                                  <TabsTrigger
                                    key={index + new Date().getTime()}
                                    value={`techFeatTab${index + 1}`}
                                    className="relative group text-[#24272C] flex gap-[6px] items-center justify-center data-[state=active]:text-[#0177AA] text-[16px] leading-[22px] font-[400] p-[5px] !shadow-none border-b-[1px] border-transparent data-[state=active]:border-[#0177AA] mb-[-1px] !rounded-none before:content-[''] before:absolute before:left-[50%] before:translate-x-[-50%] before:bottom-[-7px] before:w-0 before:h-0 before:border-l-[7px] before:border-l-[transparent] before:border-r-[7px] before:border-r-[transparent] before:border-t-[7px] before:border-t-[#0177AA] data-[state=active]:before:opacity-100 before:opacity-0"
                                  >
                                    {title}
                                  </TabsTrigger>
                                </>
                              );
                            }
                          )}
                        </TabsList>
                        <div className="py-[15px] md:py-[30px] px-[15px] md:px-[40px] w-full ">
                          {Object.keys(specificationData?.features || {}).map(
                            (key, index) => {
                              const entries = Object.entries(
                                specificationData?.features[key].details
                              );

                              const midIndex = Math.ceil(entries.length / 2);
                              const col1 = entries.slice(0, midIndex);
                              const col2 = entries.slice(midIndex);

                              return (
                                <>
                                  <TabsContent
                                    className="mb-[30px]"
                                    key={index + new Date().getTime()}
                                    value={`techFeatTab${index + 1}`}
                                  >
                                    <div className="w-full flex flex-wrap gap-y-[20px]">
                                      <div className="w-full lg:w-1/2">
                                        <ul className="space-y-[20px]">
                                          {col1.map((item, idx) => (
                                            <>
                                              <li
                                                key={idx}
                                                className="text-[14px] leading-[19px] font-[400] text-[#282C2F] flex flex-wrap items-center  "
                                              >
                                                <span className="w-1/2 pr-2">
                                                  {item[1].features_name}
                                                </span>
                                                <strong className="w-1/2 pl-2 text-end md:text-start">
                                                  {item[1].feature_value ==
                                                    "Yes" ||
                                                  item[1].feature_value ==
                                                    "No" ? (
                                                    <>
                                                      {item[1].feature_value ==
                                                      "Yes" ? (
                                                        <svg
                                                          width="14"
                                                          height="11"
                                                          viewBox="0 0 14 11"
                                                          fill="none"
                                                          xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                          <path
                                                            d="M4.70783 8.00879L11.7703 0.946289C11.937 0.779623 12.1314 0.696289 12.3537 0.696289C12.5759 0.696289 12.7703 0.779623 12.937 0.946289C13.1037 1.11296 13.187 1.31101 13.187 1.54046C13.187 1.7699 13.1037 1.96768 12.937 2.13379L5.29117 9.80046C5.1245 9.96712 4.93005 10.0505 4.70783 10.0505C4.48561 10.0505 4.29117 9.96712 4.1245 9.80046L0.541166 6.21712C0.374499 6.05046 0.294499 5.85268 0.301166 5.62379C0.307833 5.3949 0.394777 5.19684 0.561999 5.02962C0.729221 4.8624 0.927277 4.77907 1.15617 4.77962C1.38505 4.78018 1.58283 4.86351 1.7495 5.02962L4.70783 8.00879Z"
                                                            fill="#81B52F"
                                                          />
                                                        </svg>
                                                      ) : (
                                                        <svg
                                                          width="10"
                                                          height="11"
                                                          viewBox="0 0 10 11"
                                                          fill="none"
                                                          xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                          <path
                                                            d="M9.0625 1.9248L0.9375 10.0498M0.9375 1.9248L9.0625 10.0498"
                                                            stroke="#F21313"
                                                            strokeWidth="1.875"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                          />
                                                        </svg>
                                                      )}
                                                    </>
                                                  ) : (
                                                    item[1].feature_value
                                                  )}
                                                </strong>
                                              </li>
                                            </>
                                          ))}
                                        </ul>
                                      </div>
                                      <div className="w-full lg:w-1/2">
                                        <ul className="space-y-[20px]">
                                          {col2.map((item, idx) => (
                                            <>
                                              <li
                                                key={idx}
                                                className="text-[14px] leading-[19px] font-[400] text-[#282C2F] flex flex-wrap items-center  "
                                              >
                                                <span className="w-1/2 pr-2">
                                                  {item[1].features_name}
                                                </span>
                                                <strong className="w-1/2 pl-2 text-end md:text-start">
                                                  {item[1].feature_value ==
                                                    "Yes" ||
                                                  item[1].feature_value ==
                                                    "No" ? (
                                                    <>
                                                      {item[1].feature_value ==
                                                      "Yes" ? (
                                                        <svg
                                                          width="14"
                                                          height="11"
                                                          viewBox="0 0 14 11"
                                                          fill="none"
                                                          xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                          <path
                                                            d="M4.70783 8.00879L11.7703 0.946289C11.937 0.779623 12.1314 0.696289 12.3537 0.696289C12.5759 0.696289 12.7703 0.779623 12.937 0.946289C13.1037 1.11296 13.187 1.31101 13.187 1.54046C13.187 1.7699 13.1037 1.96768 12.937 2.13379L5.29117 9.80046C5.1245 9.96712 4.93005 10.0505 4.70783 10.0505C4.48561 10.0505 4.29117 9.96712 4.1245 9.80046L0.541166 6.21712C0.374499 6.05046 0.294499 5.85268 0.301166 5.62379C0.307833 5.3949 0.394777 5.19684 0.561999 5.02962C0.729221 4.8624 0.927277 4.77907 1.15617 4.77962C1.38505 4.78018 1.58283 4.86351 1.7495 5.02962L4.70783 8.00879Z"
                                                            fill="#81B52F"
                                                          />
                                                        </svg>
                                                      ) : (
                                                        <svg
                                                          width="10"
                                                          height="11"
                                                          viewBox="0 0 10 11"
                                                          fill="none"
                                                          xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                          <path
                                                            d="M9.0625 1.9248L0.9375 10.0498M0.9375 1.9248L9.0625 10.0498"
                                                            stroke="#F21313"
                                                            strokeWidth="1.875"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                          />
                                                        </svg>
                                                      )}
                                                    </>
                                                  ) : (
                                                    item[1].feature_value
                                                  )}
                                                </strong>
                                              </li>
                                            </>
                                          ))}
                                        </ul>
                                      </div>
                                    </div>
                                  </TabsContent>
                                </>
                              );
                            }
                          )}
                          <Link
                            href={`/${selectedSlug}/specifications`}
                            className="inline-flex items-center gap-[10px] text-[14px] leading-[19px] font-normal text-[#0177AA] underline capitalize"
                          >
                            View Detailed Features
                            <svg
                              width="13"
                              height="11"
                              viewBox="0 0 13 11"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M12.4141 5.51254L7.70706 0.805545C7.61422 0.7127 7.504 0.639051 7.38269 0.588804C7.26138 0.538557 7.13136 0.512695 7.00006 0.512695C6.86876 0.512695 6.73874 0.538557 6.61744 0.588804C6.49613 0.639051 6.38591 0.7127 6.29306 0.805545C6.20022 0.898389 6.12657 1.00861 6.07632 1.12992C6.02607 1.25123 6.00021 1.38124 6.00021 1.51254C6.00021 1.64385 6.02607 1.77386 6.07632 1.89517C6.12657 2.01648 6.20022 2.1267 6.29306 2.21954L8.58606 4.51254L1.00006 4.51254C0.734846 4.51254 0.480491 4.6179 0.292955 4.80544C0.105419 4.99297 6.27355e-05 5.24733 6.2724e-05 5.51254C6.27124e-05 5.77776 0.105419 6.03211 0.292955 6.21965C0.480491 6.40719 0.734846 6.51254 1.00006 6.51254L8.58606 6.51254L6.29306 8.80554C6.19988 8.8982 6.12593 9.00836 6.07547 9.12969C6.025 9.25102 5.99903 9.38114 5.99903 9.51254C5.99903 9.64395 6.025 9.77406 6.07547 9.8954C6.12593 10.0167 6.19988 10.1269 6.29306 10.2195C6.48059 10.407 6.7349 10.5123 7.00006 10.5123C7.26523 10.5123 7.51953 10.407 7.70706 10.2195L12.4141 5.51254Z"
                                fill="#0177AA"
                              />
                            </svg>
                          </Link>
                        </div>
                      </Tabs>
                    </div>
                  </div>
                  {/* end */}

                  {/* Model Variants */}
                  {variants?.length > 2 ? (
                    <>
                      <div className="bg-white rounded-[16px] ">
                        <h2 className=" text-[18px] md:text-[24px] font-[600] leading-[28px] text-[#000000] py-[20px] md:py-[35px] px-[15px] md:px-[40px] m-0 ">
                          {headerDetails?.brand_name}{" "}
                          {headerDetails?.model_name}{" "}
                          {modelPage ? "" : headerDetails?.variant_name}{" "}
                          Variants
                        </h2>
                        <div>
                          <Tabs
                            defaultValue="variantTab1"
                            className="w-full flex flex-wrap relative"
                          >
                            <TabsList className="pl-[15px] md:pl-[40px] py-0 !h-[auto] w-full flex items-end justify-start gap-[35px] pr-0 bg-transparent border-b-[1px] border-[#8080808C] scroll-bar-none overflow-x-auto md:overflow-x-visible rounded-none whitespace-nowrap">
                              <TabsTrigger
                                value="variantTab1"
                                className="relative group text-[#24272C] flex gap-[6px] items-center justify-center data-[state=active]:text-[#0177AA] text-[16px] leading-[22px] font-[400] p-[5px] !shadow-none border-b-[1px] border-transparent data-[state=active]:border-[#0177AA] mb-[-1px] !rounded-none before:content-[''] before:absolute before:left-[50%] before:translate-x-[-50%] before:bottom-[-7px] before:w-0 before:h-0 before:border-l-[7px] before:border-l-[transparent] before:border-r-[7px] before:border-r-[transparent] before:border-t-[7px] before:border-t-[#0177AA] data-[state=active]:before:opacity-100 before:opacity-0"
                              >
                                All
                              </TabsTrigger>
                              {fuel_types &&
                                fuel_types?.map((item, index) => {
                                  return (
                                    <>
                                      <TabsTrigger
                                        value={`variantTab${index + 2}`}
                                        className="relative group text-[#24272C] flex gap-[6px] items-center justify-center data-[state=active]:text-[#0177AA] text-[16px] leading-[22px] font-[400] p-[5px] !shadow-none border-b-[1px] border-transparent data-[state=active]:border-[#0177AA] mb-[-1px] !rounded-none before:content-[''] before:absolute before:left-[50%] before:translate-x-[-50%] before:bottom-[-7px] before:w-0 before:h-0 before:border-l-[7px] before:border-l-[transparent] before:border-r-[7px] before:border-r-[transparent] before:border-t-[7px] before:border-t-[#0177AA] data-[state=active]:before:opacity-100 before:opacity-0"
                                      >
                                        {item}
                                      </TabsTrigger>
                                    </>
                                  );
                                })}
                            </TabsList>
                            <div className="py-[15px] md:py-[30px] px-[15px] md:px-[40px] w-full">
                              <TabsContent
                                value="variantTab1"
                                className="mb-[30px]"
                              >
                                <div>
                                  <CompareVariantsList
                                    variants={variants}
                                    selectedVariantSlug={`${brandSlug}/${modelSlug}/${variantSlug}`}
                                    dataLimit={4}
                                    modelType={headerDetails?.model_type}
                                  />
                                </div>
                              </TabsContent>
                              {fuel_types &&
                                fuel_types?.map((item, index) => {
                                  const VariantsType = variants.filter(
                                    (variant) => variant.fuel_type === item
                                  );

                                  return (
                                    <>
                                      <TabsContent
                                        value={`variantTab${index + 2}`}
                                        className="mb-[30px]"
                                      >
                                        <div>
                                          <CompareVariantsList
                                            variants={VariantsType}
                                            selectedVariantSlug={`${brandSlug}/${modelSlug}/${variantSlug}`}
                                            dataLimit={4}
                                            modelType={
                                              headerDetails?.model_type
                                            }
                                          />
                                        </div>
                                      </TabsContent>
                                    </>
                                  );
                                })}
                              <Link
                                href={`/${selectedSlug}/variants`}
                                className="inline-flex items-center gap-[10px] text-[14px] leading-[19px] font-normal text-[#0177AA] underline capitalize"
                              >
                                View All Variants
                                <svg
                                  width="13"
                                  height="11"
                                  viewBox="0 0 13 11"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M12.4141 5.51254L7.70706 0.805545C7.61422 0.7127 7.504 0.639051 7.38269 0.588804C7.26138 0.538557 7.13136 0.512695 7.00006 0.512695C6.86876 0.512695 6.73874 0.538557 6.61744 0.588804C6.49613 0.639051 6.38591 0.7127 6.29306 0.805545C6.20022 0.898389 6.12657 1.00861 6.07632 1.12992C6.02607 1.25123 6.00021 1.38124 6.00021 1.51254C6.00021 1.64385 6.02607 1.77386 6.07632 1.89517C6.12657 2.01648 6.20022 2.1267 6.29306 2.21954L8.58606 4.51254L1.00006 4.51254C0.734846 4.51254 0.480491 4.6179 0.292955 4.80544C0.105419 4.99297 6.27355e-05 5.24733 6.2724e-05 5.51254C6.27124e-05 5.77776 0.105419 6.03211 0.292955 6.21965C0.480491 6.40719 0.734846 6.51254 1.00006 6.51254L8.58606 6.51254L6.29306 8.80554C6.19988 8.8982 6.12593 9.00836 6.07547 9.12969C6.025 9.25102 5.99903 9.38114 5.99903 9.51254C5.99903 9.64395 6.025 9.77406 6.07547 9.8954C6.12593 10.0167 6.19988 10.1269 6.29306 10.2195C6.48059 10.407 6.7349 10.5123 7.00006 10.5123C7.26523 10.5123 7.51953 10.407 7.70706 10.2195L12.4141 5.51254Z"
                                    fill="#0177AA"
                                  />
                                </svg>
                              </Link>
                            </div>
                          </Tabs>
                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                  {/* end */}

                  {/* Mileage */}
                  {uniquePowertrains?.length > 0 ? (
                    <>
                      <div className="bg-white rounded-[16px] ">
                        <h2 className=" text-[18px] md:text-[24px] font-[600] leading-[28px] text-[#000000] py-[20px] md:py-[35px] px-[15px] md:px-[40px] m-0 ">
                          {headerDetails?.brand_name}{" "}
                          {headerDetails?.model_name}{" "}
                          {modelPage ? "" : headerDetails?.variant_name} Mileage
                        </h2>
                        <div className="responsive-table w-full mb-[20px]">
                          <table className="table m-0 w-full">
                            <tbody>
                              <tr>
                                <th className="bg-[#D9D9D9] p-[10px] text-start text-[15px] md:text-[16px] font-semibold text-[#565F64] pl-[15px] md:first:pl-[40px]">
                                  Powertrain
                                </th>
                                <th className="bg-[#D9D9D9] p-[10px] text-start text-[15px] md:text-[16px] font-semibold text-[#565F64]">
                                  ARAI Mileage
                                </th>
                                <th className="bg-[#D9D9D9] p-[10px] text-start text-[15px] md:text-[16px] font-semibold text-[#565F64]">
                                  Real Life Mileage <span>Report</span>
                                </th>
                              </tr>
                              {uniquePowertrains?.map((item, index) => (
                                <tr key={`mileage-tr-${index}`}>
                                  <td className="pl-[15px] md:first:pl-[40px] p-[10px] text-[15px] md:text-[16px] font-normal text-[#565F64]">
                                    {item.powertrain}
                                  </td>
                                  <td className="p-[10px] text-[15px] md:text-[16px] font-normal text-[#565F64]">
                                    <strong className="font-medium text-[#24272C]">
                                      {item.araiMileage}
                                    </strong>
                                  </td>
                                  <td className="p-[10px] text-[15px] md:text-[16px] font-normal text-[#565F64]">
                                    {item.realLifeMileageReport}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                        <div className="pb-[15px] md:pb-[30px] px-[15px] md:px-[40px] w-full">
                          <Link
                            href={`/${selectedSlug}/mileage`}
                            className="inline-flex items-center gap-[10px] text-[14px] leading-[19px] font-normal text-[#0177AA] underline capitalize"
                          >
                            View Detailed Mileage
                            <svg
                              width="13"
                              height="11"
                              viewBox="0 0 13 11"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M12.4141 5.51254L7.70706 0.805545C7.61422 0.7127 7.504 0.639051 7.38269 0.588804C7.26138 0.538557 7.13136 0.512695 7.00006 0.512695C6.86876 0.512695 6.73874 0.538557 6.61744 0.588804C6.49613 0.639051 6.38591 0.7127 6.29306 0.805545C6.20022 0.898389 6.12657 1.00861 6.07632 1.12992C6.02607 1.25123 6.00021 1.38124 6.00021 1.51254C6.00021 1.64385 6.02607 1.77386 6.07632 1.89517C6.12657 2.01648 6.20022 2.1267 6.29306 2.21954L8.58606 4.51254L1.00006 4.51254C0.734846 4.51254 0.480491 4.6179 0.292955 4.80544C0.105419 4.99297 6.27355e-05 5.24733 6.2724e-05 5.51254C6.27124e-05 5.77776 0.105419 6.03211 0.292955 6.21965C0.480491 6.40719 0.734846 6.51254 1.00006 6.51254L8.58606 6.51254L6.29306 8.80554C6.19988 8.8982 6.12593 9.00836 6.07547 9.12969C6.025 9.25102 5.99903 9.38114 5.99903 9.51254C5.99903 9.64395 6.025 9.77406 6.07547 9.8954C6.12593 10.0167 6.19988 10.1269 6.29306 10.2195C6.48059 10.407 6.7349 10.5123 7.00006 10.5123C7.26523 10.5123 7.51953 10.407 7.70706 10.2195L12.4141 5.51254Z"
                                fill="#0177AA"
                              />
                            </svg>
                          </Link>
                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                  {/* end */}

                  {/* EMI Calculator */}
                  <div className="bg-white rounded-[16px] overflow-hidden">
                    <CustomizeEmiSection
                      brandSlug={brandSlug}
                      modelSlug={modelSlug}
                      variantSlug={variantSlug}
                      brandModelsData={false}
                      variantData={variantEmiData}
                      headerDetails={headerDetails}
                      modelPage={modelPage}
                    />
                  </div>
                  {/* end */}

                  {/* Comparision */}
                  {similarVariantsData?.similar_variants?.length > 2 && (
                    <div className="bg-white rounded-[16px] ">
                      <h2 className=" text-[18px] md:text-[24px] font-[600] leading-[28px] text-[#000000] py-[20px] md:py-[35px] px-[15px] md:px-[40px] m-0 ">
                        {headerDetails?.brand_name} {headerDetails?.model_name}{" "}
                        {modelPage ? "" : headerDetails?.variant_name}{" "}
                        Comparision
                      </h2>
                      <div className="pb-[15px] md:pb-[30px] px-[15px] md:px-[40px] w-full">
                        <SimilarVariantsSection
                          selectedVariant={headerDetails}
                          similarVariants={
                            similarVariantsData?.similar_variants
                          }
                        />
                      </div>
                    </div>
                  )}
                  {/* end */}

                  {/* warrenty Buying Guide */}
                  {specificationData?.warranty?.length > 0 ? (
                    <>
                      <div className="bg-white rounded-[16px] ">
                        <h2 className=" text-[18px] md:text-[24px] font-[600] leading-[28px] text-[#000000] py-[20px] md:py-[35px] px-[15px] md:px-[40px] m-0 ">
                          {headerDetails?.brand_name}{" "}
                          {headerDetails?.model_name}{" "}
                          {modelPage ? "" : headerDetails?.variant_name} Buying
                          Guide
                        </h2>
                        <div>
                          <Tabs
                            defaultValue="techFeatTab1"
                            className="w-full flex flex-wrap relative"
                          >
                            <TabsList className="pl-[15px] md:pl-[40px] py-0 !h-[auto] w-full flex items-end justify-start gap-[35px] pr-0 bg-transparent border-b-[1px] border-[#8080808C] scroll-bar-none overflow-x-auto md:overflow-x-visible rounded-none whitespace-nowrap">
                              {Object.keys(
                                specificationData?.warranty || {}
                              ).map((key, index) => {
                                let title = key.replace(/_/g, " ");
                                return (
                                  <>
                                    <TabsTrigger
                                      key={index + new Date().getTime()}
                                      value={`techFeatTab${index + 1}`}
                                      className="relative group text-[#24272C] flex gap-[6px] items-center justify-center data-[state=active]:text-[#0177AA] text-[16px] leading-[22px] font-[400] p-[5px] !shadow-none border-b-[1px] border-transparent data-[state=active]:border-[#0177AA] mb-[-1px] !rounded-none before:content-[''] before:absolute before:left-[50%] before:translate-x-[-50%] before:bottom-[-7px] before:w-0 before:h-0 before:border-l-[7px] before:border-l-[transparent] before:border-r-[7px] before:border-r-[transparent] before:border-t-[7px] before:border-t-[#0177AA] data-[state=active]:before:opacity-100 before:opacity-0"
                                    >
                                      {title}
                                    </TabsTrigger>
                                  </>
                                );
                              })}
                            </TabsList>
                            <div className="py-[15px] md:py-[30px] px-[15px] md:px-[40px] w-full ">
                              {Object.keys(
                                specificationData?.warranty || {}
                              ).map((key, index) => {
                                const entries = Object.entries(
                                  specificationData?.warranty[key].details
                                );

                                const midIndex = Math.ceil(entries.length / 2);
                                const col1 = entries.slice(0, midIndex);
                                const col2 = entries.slice(midIndex);

                                return (
                                  <>
                                    <TabsContent
                                      className="mb-[30px]"
                                      key={index + new Date().getTime()}
                                      value={`techFeatTab${index + 1}`}
                                    >
                                      <div className="w-full flex flex-wrap gap-y-[20px]">
                                        <div className="w-full lg:w-1/2">
                                          <ul className="space-y-[20px]">
                                            {col1.map((item, idx) => (
                                              <>
                                                <li
                                                  key={idx}
                                                  className="text-[14px] leading-[19px] font-[400] text-[#282C2F] flex flex-wrap items-center  "
                                                >
                                                  <span className="w-1/2 pr-2">
                                                    {item[1].features_name}
                                                  </span>
                                                  <strong className="w-1/2 pl-2 text-end md:text-start">
                                                    {item[1].feature_value}
                                                  </strong>
                                                </li>
                                              </>
                                            ))}
                                          </ul>
                                        </div>
                                        <div className="w-full lg:w-1/2">
                                          <ul className="space-y-[20px]">
                                            {col2.map((item, idx) => (
                                              <>
                                                <li
                                                  key={idx}
                                                  className="text-[14px] leading-[19px] font-[400] text-[#282C2F] flex flex-wrap items-center  "
                                                >
                                                  <span className="w-1/2 pr-2">
                                                    {item[1].features_name}
                                                  </span>
                                                  <strong className="w-1/2 pl-2 text-end md:text-start">
                                                    {item[1].feature_value}
                                                  </strong>
                                                </li>
                                              </>
                                            ))}
                                          </ul>
                                        </div>
                                      </div>
                                    </TabsContent>
                                  </>
                                );
                              })}
                              <Link
                                href={`/${selectedSlug}/specifications`}
                                className="inline-flex items-center gap-[10px] text-[14px] leading-[19px] font-normal text-[#0177AA] underline capitalize"
                              >
                                View Detailed Warranty
                                <svg
                                  width="13"
                                  height="11"
                                  viewBox="0 0 13 11"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M12.4141 5.51254L7.70706 0.805545C7.61422 0.7127 7.504 0.639051 7.38269 0.588804C7.26138 0.538557 7.13136 0.512695 7.00006 0.512695C6.86876 0.512695 6.73874 0.538557 6.61744 0.588804C6.49613 0.639051 6.38591 0.7127 6.29306 0.805545C6.20022 0.898389 6.12657 1.00861 6.07632 1.12992C6.02607 1.25123 6.00021 1.38124 6.00021 1.51254C6.00021 1.64385 6.02607 1.77386 6.07632 1.89517C6.12657 2.01648 6.20022 2.1267 6.29306 2.21954L8.58606 4.51254L1.00006 4.51254C0.734846 4.51254 0.480491 4.6179 0.292955 4.80544C0.105419 4.99297 6.27355e-05 5.24733 6.2724e-05 5.51254C6.27124e-05 5.77776 0.105419 6.03211 0.292955 6.21965C0.480491 6.40719 0.734846 6.51254 1.00006 6.51254L8.58606 6.51254L6.29306 8.80554C6.19988 8.8982 6.12593 9.00836 6.07547 9.12969C6.025 9.25102 5.99903 9.38114 5.99903 9.51254C5.99903 9.64395 6.025 9.77406 6.07547 9.8954C6.12593 10.0167 6.19988 10.1269 6.29306 10.2195C6.48059 10.407 6.7349 10.5123 7.00006 10.5123C7.26523 10.5123 7.51953 10.407 7.70706 10.2195L12.4141 5.51254Z"
                                    fill="#0177AA"
                                  />
                                </svg>
                              </Link>
                            </div>
                          </Tabs>
                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                  {/* end */}

                  {/* News */}
                  <div className="bg-white rounded-[16px] py-[15px] md:py-[30px] px-[15px] md:px-[40px] w-full">
                    <LatestAutomotiveNews
                      blogs={blogs}
                      title={`${headerDetails?.brand_name} ${
                        headerDetails?.model_name
                      } 
                                          ${
                                            modelPage
                                              ? ""
                                              : headerDetails?.variant_name
                                          }`}
                    />
                  </div>
                  {/* end */}

                  {/* Safety features */}
                  {/* <div className="bg-white rounded-[16px] ">
                    <h2 className=" text-[18px] md:text-[24px] font-[600] leading-[28px] text-[#000000] py-[20px] md:py-[35px] px-[15px] md:px-[40px] m-0 ">
                      {headerDetails?.brand_name} {headerDetails?.model_name}{" "}
                      {modelPage ? "" : headerDetails?.variant_name} Safety
                    </h2>
                    <div className="pb-[15px] md:pb-[30px] px-[15px] md:px-[40px] w-full">
                      <SafetyFeaturesList />
                      
                    </div>
                  </div> */}
                  {/* end */}

                  {/* Final thoughts */}
                  <div className="bg-[#D5E6EC] rounded-[16px] md:rounded-[24px] py-[20px] md:py-[35px] px-[15px] md:px-[30px]">
                    <div className="flex flex-wrap items-center">
                      <div className="w-full md:w-1/2">
                        <div className="flex items-start gap-[10px] md:gap-[25px] mt-[0] mx-[0] mb-[15px] md:mb-[35px]">
                          <img
                            src="/images/final-vector.png"
                            alt="img"
                            className="max-w-[100px] md:max-w-[100%] object-contain"
                          />
                          <div>
                            <h2 className="p-0 text-[18px] md:text-[20px] lg:text-[24px] font-[600] mt-[0] mx-[0] mb-[15px] md:mb-[20px]">
                              {headerDetails?.brand_name}{" "}
                              {headerDetails?.model_name}{" "}
                              {modelPage ? "" : headerDetails?.variant_name}
                              Final Thoughts
                            </h2>
                            <ul>
                              <li className="flex items-center gap-[10px] mb-[10px] md:mb-[15px]">
                                <img
                                  src="/images/checkIcon.png"
                                  alt="check icon"
                                />
                                Feature loaded
                              </li>
                              <li className="flex items-center gap-[10px] mb-[10px] md:mb-[15px]">
                                <img
                                  src="/images/checkIcon.png"
                                  alt="check icon"
                                />
                                Refined powertrain
                              </li>
                              <li className="flex items-center gap-[10px] mb-[10px] md:mb-[15px]">
                                <img
                                  src="/images/checkIcon.png"
                                  alt="check icon"
                                />
                                Rear seat space
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="">
                          <div className="mt-[15px] table py-[15px] px-[20px] bg-[#EBEDF0] border-[1px] border-[#8080808C] rounded-[16px] ">
                            <p className="text-[14px] font-[600] text-[#565F64] flex items-center gap-[7px] mb-[7px] ">
                              EMI Rs. {monthlyEmi}
                              <i>
                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M8 0.1875C3.69219 0.1875 0.1875 3.69219 0.1875 8C0.1875 12.3078 3.69219 15.8125 8 15.8125C12.3078 15.8125 15.8125 12.3078 15.8125 8C15.8125 3.69219 12.3078 0.1875 8 0.1875ZM8 3.39062C8.20087 3.39062 8.39723 3.45019 8.56425 3.56179C8.73127 3.67339 8.86145 3.83201 8.93832 4.01759C9.01519 4.20317 9.0353 4.40738 8.99611 4.60439C8.95692 4.8014 8.86019 4.98237 8.71815 5.12441C8.57612 5.26644 8.39515 5.36317 8.19814 5.40236C8.00113 5.44155 7.79692 5.42144 7.61134 5.34457C7.42576 5.26769 7.26714 5.13752 7.15554 4.9705C7.04394 4.80348 6.98438 4.60712 6.98438 4.40625C6.98438 4.13689 7.09138 3.87856 7.28184 3.68809C7.47231 3.49763 7.73064 3.39062 8 3.39062ZM10.5 12.2188H5.8125V10.9688H7.53125V7.53125H6.28125V6.28125H8.78125V10.9688H10.5V12.2188Z"
                                    fill="#565F64"
                                  ></path>
                                </svg>
                              </i>
                              <span>For 5 Years</span>
                            </p>
                            <Link
                              href={`/emi-calculator/${brandSlug}/${modelSlug}/${variantSlug}`}
                              className="text-[14px] leading-[19px] font-[500] text-[#0177AA] capitalize !underline "
                            >
                              Calculate EMI Now
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="w-full md:w-1/2">
                        <img
                          src={headerDetails?.variant_image}
                          alt={headerDetails?.variant_name}
                          className="w-full max-h-[200px] md:max-h-[300px] object-contain"
                        />
                      </div>
                    </div>
                  </div>
                  {/* end */}

                  {/* Dealers center */}
                  {dealersData?.data?.length > 0 ? (
                    <>
                      <div className="bg-white rounded-[16px] ">
                        <h2 className=" text-[18px] md:text-[24px] font-[600] leading-[28px] text-[#000000] py-[20px] md:py-[35px] px-[15px] md:px-[40px] m-0 ">
                          4 Authorized Service Centers in {selectedCityName}
                        </h2>
                        <DealersList dealersData={dealersData} dataLimit={4} />
                        <div className="px-[15px] md:px-[40px] pb-[15px] md:pb-[30px]">
                          <Link
                            href={`/${selectedSlug}/service-center`}
                            className="inline-flex items-center gap-[10px] text-[14px] leading-[19px] font-normal text-[#0177AA] underline capitalize"
                          >
                            Find other Service Centers
                            <svg
                              width="13"
                              height="11"
                              viewBox="0 0 13 11"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M12.4141 5.51254L7.70706 0.805545C7.61422 0.7127 7.504 0.639051 7.38269 0.588804C7.26138 0.538557 7.13136 0.512695 7.00006 0.512695C6.86876 0.512695 6.73874 0.538557 6.61744 0.588804C6.49613 0.639051 6.38591 0.7127 6.29306 0.805545C6.20022 0.898389 6.12657 1.00861 6.07632 1.12992C6.02607 1.25123 6.00021 1.38124 6.00021 1.51254C6.00021 1.64385 6.02607 1.77386 6.07632 1.89517C6.12657 2.01648 6.20022 2.1267 6.29306 2.21954L8.58606 4.51254L1.00006 4.51254C0.734846 4.51254 0.480491 4.6179 0.292955 4.80544C0.105419 4.99297 6.27355e-05 5.24733 6.2724e-05 5.51254C6.27124e-05 5.77776 0.105419 6.03211 0.292955 6.21965C0.480491 6.40719 0.734846 6.51254 1.00006 6.51254L8.58606 6.51254L6.29306 8.80554C6.19988 8.8982 6.12593 9.00836 6.07547 9.12969C6.025 9.25102 5.99903 9.38114 5.99903 9.51254C5.99903 9.64395 6.025 9.77406 6.07547 9.8954C6.12593 10.0167 6.19988 10.1269 6.29306 10.2195C6.48059 10.407 6.7349 10.5123 7.00006 10.5123C7.26523 10.5123 7.51953 10.407 7.70706 10.2195L12.4141 5.51254Z"
                                fill="#0177AA"
                              />
                            </svg>
                          </Link>
                        </div>
                      </div>
                    </>
                  ) : null}
                  {/* end */}

                  {/* Rating & Review  */}
                  {reviewData?.totalRating > 0 ? (
                    <>
                      <div className="bg-white rounded-[16px]">
                        <div className="py-[20px] md:py-[35px] px-[15px] md:px-[40px] border-b-[1px] border-[#8080808C] ">
                          <h2 className=" text-[18px] md:text-[24px] font-[600] leading-[28px] text-[#000000] mb-5 ">
                            {headerDetails?.brand_name}{" "}
                            {headerDetails?.model_name}{" "}
                            {modelPage ? "" : headerDetails?.variant_name} User
                            Reviews
                          </h2>
                          <div className=" flex flex-wrap items-center gap-2 text-base leading-6 font-normal text-gray-800 mb-2">
                            <strong className="text-[22px] md:text-[30px] lg:text-[48px] font-[700] text-[#282C2F]">
                              {reviewData?.averageRating}
                            </strong>
                            <svg
                              width="20"
                              height="19"
                              viewBox="0 0 20 19"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M3.825 19L5.45 11.975L0 7.25L7.2 6.625L10 0L12.8 6.625L20 7.25L14.55 11.975L16.175 19L10 15.275L3.825 19Z"
                                fill="#F58A07"
                              ></path>
                            </svg>
                            {reviewData?.totalRating} Reviews
                            <Link
                              href={`/${selectedSlug}/rating-review`}
                              className="table sm:inline-block text-[#0177AA] text-sm font-semibold border border-[#0177AA] rounded-lg px-2 py-1 md:ml-2"
                            >
                              Rate &amp; Get Exciting Offers
                            </Link>
                          </div>
                        </div>
                        <ReviewList reviewData={reviewData} dataLimit={3} />
                        <div className="px-[15px] md:px-[40px] pb-[15px] md:pb-[30px]">
                          <Link
                            href={`/${selectedSlug}/rating-review`}
                            className="inline-flex items-center gap-[10px] text-[14px] leading-[19px] font-normal text-[#0177AA] underline capitalize"
                          >
                            View all reviews
                            <svg
                              width="13"
                              height="11"
                              viewBox="0 0 13 11"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M12.4141 5.51254L7.70706 0.805545C7.61422 0.7127 7.504 0.639051 7.38269 0.588804C7.26138 0.538557 7.13136 0.512695 7.00006 0.512695C6.86876 0.512695 6.73874 0.538557 6.61744 0.588804C6.49613 0.639051 6.38591 0.7127 6.29306 0.805545C6.20022 0.898389 6.12657 1.00861 6.07632 1.12992C6.02607 1.25123 6.00021 1.38124 6.00021 1.51254C6.00021 1.64385 6.02607 1.77386 6.07632 1.89517C6.12657 2.01648 6.20022 2.1267 6.29306 2.21954L8.58606 4.51254L1.00006 4.51254C0.734846 4.51254 0.480491 4.6179 0.292955 4.80544C0.105419 4.99297 6.27355e-05 5.24733 6.2724e-05 5.51254C6.27124e-05 5.77776 0.105419 6.03211 0.292955 6.21965C0.480491 6.40719 0.734846 6.51254 1.00006 6.51254L8.58606 6.51254L6.29306 8.80554C6.19988 8.8982 6.12593 9.00836 6.07547 9.12969C6.025 9.25102 5.99903 9.38114 5.99903 9.51254C5.99903 9.64395 6.025 9.77406 6.07547 9.8954C6.12593 10.0167 6.19988 10.1269 6.29306 10.2195C6.48059 10.407 6.7349 10.5123 7.00006 10.5123C7.26523 10.5123 7.51953 10.407 7.70706 10.2195L12.4141 5.51254Z"
                                fill="#0177AA"
                              />
                            </svg>
                          </Link>
                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                  {/* end */}

                  {/* FAQ’s */}
                  {faqFullData?.faqs?.length > 0 ? (
                    <>
                      <div className="bg-white rounded-[16px] ">
                        <h2 className=" text-[18px] md:text-[24px] font-[600] leading-[28px] text-[#000000] py-[20px] md:py-[35px] px-[15px] md:px-[40px] m-0 ">
                          {headerDetails?.brand_name}{" "}
                          {headerDetails?.model_name}{" "}
                          {modelPage ? "" : headerDetails?.variant_name} FAQ’s
                        </h2>
                        <div>
                          <Tabs
                            defaultValue="faqTab1"
                            className="w-full flex flex-wrap relative"
                          >
                            <TabsList className="pl-[15px] md:pl-[40px] py-0 !h-[auto] w-full flex items-end justify-start gap-[35px] pr-0 bg-transparent border-b-[1px] border-[#8080808C] scroll-bar-none overflow-x-auto md:overflow-x-visible rounded-none whitespace-nowrap">
                              {faqFullData &&
                                faqFullData?.faqs?.map((item, index) => {
                                  return (
                                    <>
                                      <TabsTrigger
                                        key={`faq-tablink-${index}`}
                                        value={`faqTab${index + 1}`}
                                        className="relative group text-[#24272C] flex gap-[6px] items-center justify-center data-[state=active]:text-[#0177AA] text-[16px] leading-[22px] font-[400] p-[5px] !shadow-none border-b-[1px] border-transparent data-[state=active]:border-[#0177AA] mb-[-1px] !rounded-none before:content-[''] before:absolute before:left-[50%] before:translate-x-[-50%] before:bottom-[-7px] before:w-0 before:h-0 before:border-l-[7px] before:border-l-[transparent] before:border-r-[7px] before:border-r-[transparent] before:border-t-[7px] before:border-t-[#0177AA] data-[state=active]:before:opacity-100 before:opacity-0"
                                      >
                                        {item?.type}
                                      </TabsTrigger>
                                    </>
                                  );
                                })}
                            </TabsList>
                            <div className="py-[15px] md:py-[30px] px-[15px] md:px-[40px] w-full ">
                              {faqFullData &&
                                faqFullData?.faqs?.map((item, index) => {
                                  return (
                                    <>
                                      <TabsContent
                                        key={`faq-content-${index}`}
                                        value={`faqTab${index + 1}`}
                                      >
                                        <div className="">
                                          <ul>
                                            {item?.value?.map(
                                              (quaItem, idx) => {
                                                let cnt = quaItem?.ans;
                                                return (
                                                  <>
                                                    <li
                                                      key={`qua-${index}-${idx}`}
                                                      className="flex gap-[15px] items-start flex-wrap border-b-[1px] border-[#8080808C] pb-[20px] mb-[20px] last:border-none last:pb-0 last:mb-0"
                                                    >
                                                      <img
                                                        src="/images/q.png"
                                                        alt="img"
                                                        className="flex-[0_0_36px]
"
                                                      />
                                                      <div className="w-[calc(100%-61px)] relative">
                                                        <p className="text-[15px] sm:text-[16px] font-normal leading-[23px] text-[#282C2F] mt-[0] mx-[0] mb-[7px]">
                                                          {quaItem?.qus}
                                                        </p>
                                                        <div
                                                          className="text-[14px] font-[500] leading-[19px] text-[#000000] m-0"
                                                          dangerouslySetInnerHTML={{
                                                            __html: cnt,
                                                          }}
                                                        />
                                                      </div>
                                                    </li>
                                                  </>
                                                );
                                              }
                                            )}
                                          </ul>
                                        </div>
                                      </TabsContent>
                                    </>
                                  );
                                })}
                            </div>
                          </Tabs>
                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}

                  {/* end */}
                </div>
              </div>
              <div className="w-full xl:w-[calc(25%-10px)]">
                <div className="">
                  <SimilarCarModel
                    brandSlug={brandSlug}
                    similarModelsData={similarModelsData}
                    similarModelBodyType={similarModelBodyType}
                    similarModelBudgetType={similarModelBudgetType}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CarModuleComparisonContextProvider>
  );
}

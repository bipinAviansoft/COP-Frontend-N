"use client";
import Link from "next/link";
import CarHeaderData from "./car-header-data";
import CarModuleHeader from "./car-module-header";
import SimilarCarModel from "./similar-car-model";
import LatestAutomotiveNews from "../homepage/latest-automotive-news";

export default function MileagePageModule({
  brandSlug,
  modelSlug,
  variantSlug,
  headerDetails,
  modelDescriptionData,
  similarModelsData,
  modelPage,
  reviewData,
  variants,
  blogs,
}) {
  const selectedVariantSlug = modelPage
    ? `${brandSlug}/${modelSlug}`
    : `${brandSlug}/${modelSlug}/${variantSlug}`;

  const similarModelsCars = similarModelsData?.models;

  const similarModelBodyType = similarModelsCars?.filter(
    (item) => item?.car_type === headerDetails?.ct_name
  );

  const similarModelBudgetType = [...similarModelsCars].sort(
    (a, b) => a.min_price - b.min_price
  );

  return (
    <>
      <div className="bg-[#F3F4F9] ">
        <CarModuleHeader
          brandSlug={brandSlug}
          modelSlug={modelSlug}
          variantSlug={variantSlug}
          modelPage={modelPage}
          reviewData={reviewData?.totalRating > 0}
          headerDetails={headerDetails}
          subPage="Mileage"
        />
        <div className="pt-[15px] md:pt-[30px]">
          <CarHeaderData
            headerDetails={headerDetails}
            selectedVariantSlug={selectedVariantSlug}
            description={modelDescriptionData?.description}
            modelPage={modelPage}
            pageTitle="Mileage"
            reviewData={reviewData}
          />
        </div>
        {/* car spec & other design sec */}
        <div className="mt-[30px]">
          <div className="container">
            <div className="flex flex-wrap gap-[20px]">
              <div className="w-full xl:w-[calc(75%-10px)] ">
                <div className="space-y-[20px]">
                  <div className="bg-white rounded-[16px]">
                    <div className="py-[20px] md:py-[35px] px-[15px] md:px-[40px] border-b-[1px] border-[#8080808C] ">
                      <h2 className=" text-[18px] md:text-[24px] font-[600] leading-[28px] text-[#000000] mb-0 ">
                        {headerDetails?.brand_name} {headerDetails?.model_name}{" "}
                        {modelPage ? "" : headerDetails?.variant_name} Mileage
                      </h2>
                    </div>
                    <div className="py-[20px] md:py-[35px] px-[15px] md:px-[40px]">
                      <ul className="w-full">
                        <li className=" bg-transparent border-[none] pb-0 pt-0 m-0 md:flex-wrap hidden md:flex items-center justify-between px-[18px]">
                          <div className="w-1/2 max-w-full"></div>
                          <div className="w-1/4">
                            <div className="text-[16px] leading-[30px] font-semibold text-[#000000]">
                              ARAI Supported
                            </div>
                          </div>
                          <div className="w-1/4">
                            <div className="text-[16px] leading-[30px] font-semibold text-[#000000]">
                              User Supported
                            </div>
                          </div>
                        </li>
                        {(() => {
                          const maxValue = Math.max(
                            ...variants.map((v) =>
                              headerDetails?.model_type == 0
                                ? parseFloat(v?.feature_values?.mileage || 0)
                                : parseFloat(v?.feature_values?.range || 0)
                            )
                          );

                          return variants?.map((item, index) => {
                            const value =
                              headerDetails?.model_type == 0
                                ? parseFloat(item?.feature_values?.mileage || 0)
                                : parseFloat(item?.feature_values?.range || 0);

                            const isMax = value === maxValue;

                            return (
                              <li
                                key={`mileage-variant-${item?.slug || index}`}
                                className="flex-wrap flex items-center justify-between bg-[#E3E3E333] p-[15px] md:p-[18px] rounded-[8px] border-[1px] border-[solid] border-[#8080808C] mb-[10px] md:mb-[20px]"
                              >
                                <div className="w-[60%] md:w-1/2 max-w-full">
                                  <h3>
                                    <Link
                                      href={`/${item?.slug}`}
                                      className="text-[16px] md:text-[20px] leading-[24px] font-semibold text-[#000000] mt-[0] mx-[0] mb-[10px]"
                                    >
                                      {item?.variant_name}
                                    </Link>
                                  </h3>
                                  <div className="flex items-center gap-[7px] md:gap-[20px] mt-[3px] mx-[0] mb-[0]">
                                    <p className="inline-flex items-center gap-[5px] text-[14px] font-normal leading-[20px] text-[#565F64] m-0">
                                      <img
                                        src="/images/power-icon.png"
                                        alt="icon"
                                      />
                                      {headerDetails?.model_type == 0
                                        ? item?.feature_values?.displacement
                                        : item?.feature_values?.power_ev}
                                    </p>
                                    <p className="inline-flex items-center gap-[5px] text-[14px] font-normal leading-[20px] text-[#565F64] m-0">
                                      <img
                                        src="/images/milage-icon.png"
                                        alt="icon"
                                      />
                                      {
                                        item?.feature_values
                                          ?.type_of_transmission
                                      }
                                    </p>
                                  </div>
                                </div>
                                <div className="w-[40%] md:w-1/4">
                                  <div
                                    className={`text-[15px] sm:text-[18px] lg:text-[20px] leading-[30px] font-semibold tracking-[-0.02px] m-0 text-end md:text-start ${
                                      isMax ? "text-[green]" : "text-[#000000]"
                                    }`}
                                  >
                                    {headerDetails?.model_type == 0
                                      ? item?.feature_values?.mileage
                                      : item?.feature_values?.range}
                                  </div>
                                </div>
                                <div className="hidden md:block w-1/4 text-end md:text-start">
                                  -
                                </div>
                              </li>
                            );
                          });
                        })()}

                        {/* {variants &&
                          variants?.map((item, index) => {
                            return (
                              <li
                                key={`mileage-variant-${index}`}
                                className="flex-wrap flex items-center justify-between bg-[#E3E3E333] p-[15px] md:p-[18px] rounded-[8px] border-[1px] border-[solid] border-[#8080808C] mb-[10px] md:mb-[20px]"
                              >
                                <div className="w-[60%] md:w-1/2 max-w-full">
                                  <h3>
                                    <Link
                                      href={`/${item?.slug}`}
                                      className="text-[16px] md:text-[20px] leading-[24px] font-semibold text-[#000000] mt-[0] mx-[0] mb-[10px]"
                                    >
                                      {item?.variant_name}
                                    </Link>
                                  </h3>
                                  <div className="flex items-center gap-[7px] md:gap-[20px] mt-[3px] mx-[0] mb-[0]">
                                    <p className="inline-flex items-center gap-[5px] text-[14px] font-normal leading-[20px] text-[#565F64] m-0">
                                      <img
                                        src="/images/power-icon.png"
                                        alt="icon"
                                      />
                                      {headerDetails?.model_type == 0
                                        ? item?.feature_values?.displacement
                                        : item?.feature_values?.power_ev}
                                    </p>
                                    <p className="inline-flex items-center gap-[5px] text-[14px] font-normal leading-[20px] text-[#565F64] m-0">
                                      <img
                                        src="/images/milage-icon.png"
                                        alt="icon"
                                      />
                                      {
                                        item?.feature_values
                                          ?.type_of_transmission
                                      }
                                    </p>
                                  </div>
                                </div>
                                <div className="w-[40%] md:w-1/4">
                                  <div className="text-[15px] sm:text-[18px] lg:text-[20px] leading-[30px] font-semibold text-[#000000] tracking-[-0.02px] m-0 text-end md:text-start">
                                    {headerDetails?.model_type == 0
                                      ? item?.feature_values?.mileage
                                      : item?.feature_values?.range}
                                  </div>
                                </div>
                                <div className="hidden md:block w-1/4 text-end md:text-start">
                                  -
                                </div>
                              </li>
                            );
                          })} */}
                      </ul>
                    </div>
                  </div>
                  <div className="bg-white rounded-[16px] py-[15px] md:py-[30px] px-[15px] md:px-[40px] w-full">
                    <LatestAutomotiveNews
                      blogs={blogs}
                      title={`${headerDetails?.brand_name} ${
                        headerDetails?.model_name
                      } 
                        ${modelPage ? "" : headerDetails?.variant_name}`}
                    />
                  </div>
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
    </>
  );
}

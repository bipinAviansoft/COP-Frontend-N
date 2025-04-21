"use client";
import { useState, useEffect } from "react";
import CarModuleHeader from "./car-module-header";
import CarHeaderData from "./car-header-data";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import SimilarCarModel from "./similar-car-model";
import LatestAutomotiveNews from "../homepage/latest-automotive-news";

export default function UpcomingCarModule({
  headerData,
  modelDescriptionData,
  carBrand,
  carDetail,
  brandSlug,
  modelSlug,
  upcomingCarData,
  modelPage,
  upcoming_stage,
  similarModelsData,
  blogs,
}) {
  const imagePathFun = (path) => {
    let pathName = "";
    switch (path) {
      case "Battery Capacity":
        pathName = "/images/upcoming-specs/Battery.svg";
        break;
      case "Engine":
        pathName = "/images/upcoming-specs/Engine.png";
        break;

      case "Fuel":
        pathName = "/images/upcoming-specs/Fuel.png";
        break;

      case "Driving Range":
        pathName = "/images/upcoming-specs/Range.png";
        break;

      case "Power":
        pathName = "/images/upcoming-specs/Evpower.svg";
        break;

      case "Transmission":
        pathName = "/images/upcoming-specs/Transmission.png";
        break;

      case "Charging Time":
        pathName = "/images/upcoming-specs/Charging.svg";
        break;

      case "Mileage":
        pathName = "/images/upcoming-specs/Mileage.png";
        break;

      default:
        break;
    }

    return pathName;
  };

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1200);
    };

    handleResize(); // Set on load
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const similarModelsCars = similarModelsData?.models;

  const similarModelBodyType = similarModelsCars?.filter(
    (item) => item?.car_type === upcomingCarData?.body_type
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
          modelPage={true}
          upcoming_stage={true}
          headerDetails={headerData}
        />
        {isMobile ? null : (
          <div className="hidden xl:block pt-[15px] md:pt-[30px]">
            <CarHeaderData
              headerDetails={headerData}
              description={modelDescriptionData?.description}
              upcomingPage={true}
            />
          </div>
        )}

        <div className="mt-[20px] md:mt-[35px]">
          <div className="container">
            <div className="flex flex-wrap gap-[20px]">
              <div className="w-full xl:w-[calc(75%-10px)] ">
                <Tabs
                  defaultValue="tab1"
                  className="w-full flex flex-col-reverse md:flex-row relative"
                >
                  <TabsList className="relative z-[9] mt-[-30px] sm:mt-[-40px] md:mt-0 pl-[20px] md:px-0 bg-transparent h-auto w-full flex gap-[10px] flex md:flex-col justify-start md:w-[80px] md:pt-[100px] ">
                    <TabsTrigger
                      value="tab1"
                      className="group text-[#24272C] flex flex-col gap-[6px] items-center justify-center data-[state=active]:text-[#0177AA] text-[9px] min-w-[68px] md:text-[10.5px] font-[500] p-[10px] !shadow-[0_0_10px_rgba(0,0,0,0.1)] md:!shadow-none md:py-[15px] md:px-[10px] rounded-[16px] md:rounded-[16px_0_0_16px] md:w-full bg-white md:bg-transparent"
                    >
                      <svg
                        className="w-[18px] h-[18px] md:w-[auto] md:h-[auto]"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          className="group-data-[state=active]:fill-[#0177AA]"
                          d="M1.8925 17.875C1.38865 17.875 0.968281 17.7066 0.631406 17.3697C0.294531 17.0328 0.125729 16.6121 0.125 16.1075V2.1425C0.125 1.63865 0.293802 1.21828 0.631406 0.881406C0.96901 0.544531 1.38938 0.375729 1.8925 0.375H15.8586C16.3617 0.375 16.7821 0.543802 17.1197 0.881406C17.4573 1.21901 17.6257 1.63938 17.625 2.1425V16.1086C17.625 16.6117 17.4566 17.0321 17.1197 17.3697C16.7828 17.7073 16.3621 17.8757 15.8575 17.875H1.8925ZM3.95312 14.0469H13.9653L10.8733 9.92344L8.01312 13.5416L6.09906 11.2283L3.95312 14.0469Z"
                          fill="#24272C"
                        />
                      </svg>
                      Images
                    </TabsTrigger>
                    {/* <TabsTrigger
                      value="tab2"
                      className="group text-[#24272C] flex flex-col gap-[6px] items-center justify-center data-[state=active]:text-[#0177AA] text-[9px] min-w-[68px] md:text-[10.5px] font-[500] p-[10px] !shadow-[0_0_10px_rgba(0,0,0,0.1)] md:!shadow-none md:py-[15px] md:px-[10px] rounded-[16px] md:rounded-[16px_0_0_16px] md:w-full bg-white  md:bg-transparent"
                    >
                      <svg
                        className="w-[18px] h-[18px] md:w-[auto] md:h-[auto]"
                        width="23"
                        height="16"
                        viewBox="0 0 23 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          className="group-data-[state=active]:!fill-[#0177AA]"
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M3.46875 0.46875C2.59851 0.46875 1.76391 0.814452 1.14856 1.42981C0.533202 2.04516 0.1875 2.87976 0.1875 3.75V12.5C0.1875 13.3702 0.533202 14.2048 1.14856 14.8202C1.76391 15.4355 2.59851 15.7812 3.46875 15.7812H14.4062C15.2765 15.7812 16.1111 15.4355 16.7264 14.8202C17.3418 14.2048 17.6875 13.3702 17.6875 12.5V10.7653L20.1955 13.2733C20.3484 13.4262 20.5433 13.5303 20.7554 13.5725C20.9676 13.6147 21.1875 13.593 21.3873 13.5103C21.5871 13.4275 21.7579 13.2874 21.8781 13.1075C21.9983 12.9277 22.0625 12.7163 22.0625 12.5V3.75C22.0625 3.53371 21.9983 3.32229 21.8781 3.14247C21.7579 2.96264 21.5871 2.82249 21.3873 2.73973C21.1875 2.65696 20.9676 2.6353 20.7554 2.67749C20.5433 2.71967 20.3484 2.8238 20.1955 2.97672L17.6875 5.48469V3.75C17.6875 2.87976 17.3418 2.04516 16.7264 1.42981C16.1111 0.814452 15.2765 0.46875 14.4062 0.46875H3.46875Z"
                          fill="#24272C"
                        />
                      </svg>
                      Videos
                    </TabsTrigger> */}
                  </TabsList>
                  <div className="bg-white rounded-[16px] w-full md:w-[calc(100%-80px)] min-h-[220px] sm:min-h-[300px] md:min-h-[460px]">
                    <TabsContent value="tab1">
                      <div className="p-[15px] md:p-[30px]">
                        <div className="item">
                          <img
                            src={headerData?.model_image}
                            alt={headerData?.image_alt}
                            title={headerData?.image_alt}
                            className="rounded-[8px] h-[190px] md:h-[auto] object-cover w-full"
                          />
                        </div>
                      </div>
                    </TabsContent>
                  </div>
                </Tabs>
                {isMobile ? (
                  <div className="block xl:hidden pt-[15px] md:pt-[30px]">
                    <CarHeaderData
                      headerDetails={headerData}
                      description={modelDescriptionData?.description}
                      upcomingPage={true}
                    />
                  </div>
                ) : null}

                <div className="space-y-[20px] mt-[20px]">
                  {/* Performance and Handling */}
                  <div className="bg-white rounded-[16px] ">
                    <h2 className=" text-[18px] md:text-[24px] font-[600] leading-[28px] text-[#000000] py-[20px] md:py-[35px] px-[15px] md:px-[40px] m-0 ">
                      {headerData?.name} Overview
                    </h2>
                    <div className="pb-[15px] md:pb-[30px] px-[15px] md:px-[40px] w-full">
                      <div className="">
                        <ul className=" m-0 gap-[10px] md:gap-[20px] p-0 [list-style:none] flex flex-wrap md:flex-nowrap ">
                          {upcomingCarData?.upcoming_data?.map(
                            (item, index) => {
                              return Object.entries(item).map(
                                ([key, value]) => (
                                  <li
                                    key={index}
                                    className="flex flex-col items-center text-center w-[calc(50%-5px)] md:w-full whitespace-nowrap px-[15px] py-[30px] rounded-[15px] border-[1px] border-[solid] border-[#8080808C] bg-[#E3E3E333]"
                                  >
                                    <img
                                      src={imagePathFun(key)}
                                      className="w-[38px] h-[38px] object-contain mb-[8px] mx-auto"
                                      alt="Batter Capacity logo"
                                    />
                                    <p className="text-[13px] leading-[22px] text-[#656363] mb-[5px] capitalize font-[500]">
                                      {key}
                                    </p>
                                    <p className="text-[14px] leading-[22px] text-[#222222] font-[600]">
                                      {value}{" "}
                                      {key === "Battery Capacity" ? "kWh" : ""}{" "}
                                      {key === "Engine" ? "cc" : ""}{" "}
                                      {key === "Mileage" ? "kmpl" : ""}{" "}
                                      {key === "Driving Range" ? "km/C" : ""}{" "}
                                      {key === "Charging Time" ? "hrs" : ""}{" "}
                                      {key === "Power" ? "bhp" : ""}
                                    </p>
                                  </li>
                                )
                              );
                            }
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                  {/* end */}

                  <div className="bg-white rounded-[16px] py-[15px] md:py-[30px] px-[15px] md:px-[40px] w-full">
                    <LatestAutomotiveNews
                      blogs={blogs}
                      title={`${headerData?.name}`}
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

      {/* <div className="sticky z-[9] top-0 border border-[#d9d9d9] bg-[#ffffff] shadow-[0_5px_39px_0_rgba(0,0,0,.08)] py-[10px]">
        <div className="max-w-[1400px] mx-auto px-[15px]">
          <div className="flex items-center gap-[10px] md:gap-[20px]">
            <div className="w-auto max-w-[60px] md:max-w-[90px]">
              <img src={carBrand?.brand_logo} alt={brandSlug} />
            </div>
            <div>
              <h1 className="text-sm md:text-[22px] leading-[20px] md:leading-[30px] font-[700] md:mb-[5px]">
                {carDetail?.name}
              </h1>
              <p className="text-xs md:text-[16px] font-[400] leading-[24px]">
                Starting from ₹ {(carDetail?.min_price / 100000).toFixed(2)}{" "}
                Lakh*
              </p>
            </div>
          </div>
        </div>
      </div>
      <section className="">
        <img
          className="w-full h-[calc(100vh-250px)] min-h-[300px] object-cover "
          src={carDetail?.model_image}
          alt={carDetail?.image_alt}
          title={carDetail?.image_title}
        />
      </section>
      <div className="w-full max-w-[915px] mx-auto relative top-[-70px] md:top-[-100px]">
        <h3
          className="text-sm md:text-[20px] leading-[27px] mb-[-5px] ml-[20px] font-[600] inline-block py-[5px] px-[30px] bg-[#ffffff]"
          style={{ clipPath: "polygon(10% 0%,90% 0%,100% 100%,0% 100%)" }}
        >
          Overview
        </h3>
        <div className="border border-[#d2d2d5] bg-[#ffffff]">
          <ul className="p-[10px] flex flex-wrap gap-[10px]">
            {upcomingCarData.map((item, index) => {
              return Object.entries(item).map(([key, value]) => (
                <li
                  key={index}
                  className="flex-[0_0_calc(50%-5px)] sm:flex-[0_0_calc(33.33%-7px)] lg:flex-[1_0_0%] border border-[#d2d2d5] py-[15px] px-[5px] text-center"
                >
                  <img
                    src={imagePathFun(key)}
                    className="w-[38px] h-[38px] object-contain mb-[8px] mx-auto"
                    alt="Batter Capacity logo"
                  />
                  <p className="text-[13px] leading-[22px] text-[#656363] mb-[5px] capitalize font-[500]">
                    {key}
                  </p>
                  <p className="text-[14px] leading-[22px] text-[#222222] font-[600]">
                    {value} {key === "Battery Capacity" ? "kWh" : ""}{" "}
                    {key === "Engine" ? "cc" : ""}{" "}
                    {key === "Mileage" ? "kmpl" : ""}{" "}
                    {key === "Driving Range" ? "km/C" : ""}{" "}
                    {key === "Charging Time" ? "hrs" : ""}{" "}
                    {key === "Power" ? "bhp" : ""}
                  </p>
                </li>
              ));
            })}
          </ul>
        </div>
      </div> */}
    </>
  );
}

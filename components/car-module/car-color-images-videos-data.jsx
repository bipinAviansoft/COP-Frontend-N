"use client";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Slider from "react-slick";
import NextArrow from "../ui/NextArrow";
import PrevArrow from "../ui/PrevArrow";

export default function CarColorImagesVideosData({
  variantColorsData,
  galleryData,
  page,
  headerDetails,
  modelPage,
}) {
  const imageAltData = galleryData?.Exterior?.graphic_file_mob_alt?.split(",");

  var gallerySettings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <>
      {page && page ? (
        <>
          <Tabs
            defaultValue={`${variantColorsData ? "tab1" : "tab2"}`}
            className="w-full flex flex-col-reverse md:flex-row relative"
          >
            <TabsList className="relative z-[9] mt-[-30px] sm:mt-[-40px] md:mt-0 pl-[30px] md:px-0 bg-transparent h-auto w-full flex gap-[10px] flex md:flex-col justify-start md:w-[80px] md:pt-[100px] ">
              {variantColorsData ? (
                <TabsTrigger
                  value="tab1"
                  className="group text-[#24272C] flex flex-col gap-[6px] items-center justify-center data-[state=active]:text-[#0177AA] text-[9px] min-w-[68px] md:text-[10.5px] font-[500] p-[10px] !shadow-[0_0_10px_rgba(0,0,0,0.1)] md:!shadow-none md:py-[15px] md:px-[10px] rounded-[16px] md:rounded-[16px_0_0_16px] md:w-full data-[state=active]:bg-white bg-white  md:bg-transparent"
                >
                  <svg
                    className="w-[18px] h-[18px] md:w-[auto] md:h-[auto]"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      className="group-data-[state=active]:fill-[#0177AA] "
                      d="M16.1406 10.125C15.7055 10.125 15.2882 9.95215 14.9805 9.64447C14.6729 9.3368 14.5 8.9195 14.5 8.48438C14.5 8.04925 14.6729 7.63195 14.9805 7.32428C15.2882 7.0166 15.7055 6.84375 16.1406 6.84375C16.5757 6.84375 16.993 7.0166 17.3007 7.32428C17.6084 7.63195 17.7812 8.04925 17.7812 8.48438C17.7812 8.9195 17.6084 9.3368 17.3007 9.64447C16.993 9.95215 16.5757 10.125 16.1406 10.125ZM12.8594 5.75C12.4243 5.75 12.007 5.57715 11.6993 5.26947C11.3916 4.9618 11.2188 4.5445 11.2188 4.10938C11.2188 3.67425 11.3916 3.25695 11.6993 2.94928C12.007 2.6416 12.4243 2.46875 12.8594 2.46875C13.2945 2.46875 13.7118 2.6416 14.0195 2.94928C14.3271 3.25695 14.5 3.67425 14.5 4.10938C14.5 4.5445 14.3271 4.9618 14.0195 5.26947C13.7118 5.57715 13.2945 5.75 12.8594 5.75ZM7.39062 5.75C6.9555 5.75 6.5382 5.57715 6.23053 5.26947C5.92285 4.9618 5.75 4.5445 5.75 4.10938C5.75 3.67425 5.92285 3.25695 6.23053 2.94928C6.5382 2.6416 6.9555 2.46875 7.39062 2.46875C7.82575 2.46875 8.24305 2.6416 8.55072 2.94928C8.8584 3.25695 9.03125 3.67425 9.03125 4.10938C9.03125 4.5445 8.8584 4.9618 8.55072 5.26947C8.24305 5.57715 7.82575 5.75 7.39062 5.75ZM4.10938 10.125C3.67425 10.125 3.25695 9.95215 2.94928 9.64447C2.6416 9.3368 2.46875 8.9195 2.46875 8.48438C2.46875 8.04925 2.6416 7.63195 2.94928 7.32428C3.25695 7.0166 3.67425 6.84375 4.10938 6.84375C4.5445 6.84375 4.9618 7.0166 5.26947 7.32428C5.57715 7.63195 5.75 8.04925 5.75 8.48438C5.75 8.9195 5.57715 9.3368 5.26947 9.64447C4.9618 9.95215 4.5445 10.125 4.10938 10.125ZM10.125 0.28125C7.51428 0.28125 5.01048 1.31836 3.16442 3.16442C1.31836 5.01048 0.28125 7.51428 0.28125 10.125C0.28125 12.7357 1.31836 15.2395 3.16442 17.0856C5.01048 18.9316 7.51428 19.9687 10.125 19.9688C10.5601 19.9688 10.9774 19.7959 11.2851 19.4882C11.5928 19.1805 11.7656 18.7632 11.7656 18.3281C11.7656 17.9016 11.6016 17.5187 11.3391 17.2344C11.0875 16.9391 10.9234 16.5562 10.9234 16.1406C10.9234 15.7055 11.0963 15.2882 11.404 14.9805C11.7116 14.6729 12.1289 14.5 12.5641 14.5H14.5C15.9504 14.5 17.3414 13.9238 18.367 12.8982C19.3926 11.8727 19.9688 10.4817 19.9688 9.03125C19.9688 4.19687 15.5609 0.28125 10.125 0.28125Z"
                      fill="#24272C"
                    />
                  </svg>
                  Colours
                </TabsTrigger>
              ) : null}
              <TabsTrigger
                value="tab2"
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
                value="tab3"
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
              {variantColorsData ? (
                <TabsContent value="tab1">
                  <div className="">
                    <Tabs
                      defaultValue="colorTab0"
                      className="w-full flex md:gap-[20px] items-center flex-wrap relative"
                    >
                      <TabsList className="md:ml-[20px] mt-[-15px] sm:mt-0 scroll-bar-none space-y-[10px] md:space-y-[20px] w-[60px] md:w-[80px] h-full block max-h-[155px] md:max-h-[300px] overflow-y-auto py-[5px] px-0 bg-transparent overflow-x-hidden h-auto">
                        {variantColorsData?.map((item, index) => {
                          const {
                            id,
                            name,
                            color_name,
                            color_code,
                            dual_color_code,
                          } = item;

                          const style = {};
                          let colorStatus =
                            color_code === "#000000" ||
                            color_code === "#132840" ||
                            color_code === "#080808" ||
                            color_code == "#202020"
                              ? "white"
                              : "black";

                          if (!dual_color_code) {
                            style.backgroundColor = color_code;
                          } else {
                            colorStatus = "white";
                            style.backgroundImage = `linear-gradient(${color_code} 50%, ${dual_color_code} 50%)`;
                          }

                          return (
                            <>
                              <TabsTrigger
                                key={index + 2123}
                                value={`colorTab${index}`}
                                title={color_name}
                                className="group text-[#24272C] mx-auto flex flex-col gap-[6px] items-center justify-center data-[state=active]:text-[#0177AA] p-0 !shadow-none text-[10.5px] !border-none font-[500] "
                              >
                                <span
                                  className="w-[25px] md:w-[50px] h-[20px] md:h-[35px] flex items-center justify-center rounded-[5px] md:rounded-[8px] shadow-[0_0_5px_rgba(0,0,0,0.2)]"
                                  style={style}
                                >
                                  <svg
                                    className="opacity-0 group-data-[state=active]:opacity-100 w-[12px] md:w-[18px]"
                                    width="18"
                                    height="13"
                                    viewBox="0 0 18 13"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M17 1L6 12L1 7"
                                      stroke={colorStatus}
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    ></path>
                                  </svg>
                                </span>
                                <strong className="hidden text-[12px] font-[600] text-[#282C2F] ">
                                  {color_name}
                                </strong>
                              </TabsTrigger>
                            </>
                          );
                        })}
                      </TabsList>
                      <div className="bg-white rounded-[16px] w-[calc(100%-60px)] md:w-[calc(100%-120px)] flex flex-col items-center justify-center min-h-[220px] sm:min-h-[300px] md:min-h-[460px]">
                        {variantColorsData?.map((item, index) => {
                          const { id, image, image_mob, color_name } = item;

                          return (
                            <TabsContent
                              key={index + 656}
                              value={`colorTab${index}`}
                              className="relative"
                            >
                              <img
                                src={image_mob}
                                alt={color_name}
                                className="w-full relative object-cover h-[190px] md:h-auto object-cover object-center"
                              />
                            </TabsContent>
                          );
                        })}
                      </div>
                    </Tabs>
                  </div>
                </TabsContent>
              ) : null}
              <TabsContent value="tab2">
                <div className="p-[15px] md:p-[30px]">
                  <Slider {...gallerySettings}>
                    {galleryData &&
                      galleryData?.Exterior?.graphic_file_mob.map(
                        (item, index) => {
                          return (
                            <>
                              <div className="item">
                                <img
                                  key={index + 35265}
                                  src={item}
                                  alt={
                                    imageAltData && imageAltData.length > 0
                                      ? imageAltData[index]
                                      : "image"
                                  }
                                  className="rounded-[8px] h-[190px] md:h-[auto] max-h-[400px] w-full object-cover"
                                />
                              </div>
                            </>
                          );
                        }
                      )}
                  </Slider>
                </div>
              </TabsContent>
              {/* <TabsContent value="tab3">
                <p className="p-4">This is content for Tab 3.</p>
              </TabsContent> */}
            </div>
          </Tabs>
        </>
      ) : (
        <>
          <div className="mt-[30px]">
            <div className="container">
              <div className="space-y-[20px]">
                <div className="bg-white rounded-[16px] ">
                  <h2 className=" text-[18px] md:text-[24px] font-[600] leading-[28px] text-[#000000] py-[20px] md:py-[35px] px-[15px] md:px-[40px] m-0 ">
                    {headerDetails?.brand_name} {headerDetails?.model_name}{" "}
                    {modelPage ? "" : headerDetails?.variant_name} Images
                  </h2>
                  <div>
                    <Tabs
                      defaultValue="galleryTab1"
                      className="w-full flex flex-wrap relative"
                    >
                      <TabsList className="pl-[15px] md:pl-[40px] py-0 !h-[auto] w-full flex items-end justify-start gap-[35px] pr-0 bg-transparent border-b-[1px] border-[#8080808C] scroll-bar-none overflow-x-auto md:overflow-x-visible rounded-none whitespace-nowrap">
                        {Object.keys(galleryData || {}).map((key, index) => {
                          return (
                            <>
                              <TabsTrigger
                                key={index + new Date().getTime()}
                                value={`galleryTab${index + 1}`}
                                className="relative group text-[#24272C] flex gap-[6px] items-center justify-center data-[state=active]:text-[#0177AA] text-[16px] leading-[22px] font-[400] p-[5px] !shadow-none border-b-[1px] border-transparent data-[state=active]:border-[#0177AA] mb-[-1px] !rounded-none before:content-[''] before:absolute before:left-[50%] before:translate-x-[-50%] before:bottom-[-7px] before:w-0 before:h-0 before:border-l-[7px] before:border-l-[transparent] before:border-r-[7px] before:border-r-[transparent] before:border-t-[7px] before:border-t-[#0177AA] data-[state=active]:before:opacity-100 before:opacity-0"
                              >
                                {key}
                              </TabsTrigger>
                            </>
                          );
                        })}
                      </TabsList>
                      <div className="py-[15px] md:py-[30px] px-[15px] md:px-[40px] w-full ">
                        {Object.keys(galleryData || {}).map((key, index) => {
                          return (
                            <>
                              <TabsContent
                                className="mb-[30px]"
                                value={`galleryTab${index + 1}`}
                              >
                                <div className="w-full">
                                  <ul className="flex flex-wrap gap-[10px] md:gap-[20px] w-full">
                                    {galleryData[key]?.graphic_file_mob?.map(
                                      (imgItem, idx) => {
                                        return (
                                          <>
                                            <li
                                              key={`image-${index}-${idx}`}
                                              className={`${
                                                idx === 0
                                                  ? "w-full"
                                                  : " w-full md:w-[calc(50%-10px)]"
                                              } `}
                                            >
                                              <img
                                                src={imgItem}
                                                alt={
                                                  imageAltData &&
                                                  imageAltData.length > 0
                                                    ? imageAltData[idx]
                                                    : "image"
                                                }
                                                title={
                                                  imageAltData &&
                                                  imageAltData.length > 0
                                                    ? imageAltData[idx]
                                                    : "image"
                                                }
                                                loading="lazy"
                                                className={`w-full h-[260px] shadow-[0_0_5px_rgba(0,0,0,0.2)] object-cover rounded-[8px] ${
                                                  idx === 0
                                                    ? "h-[260px] md:h-[496px]"
                                                    : ""
                                                }`}
                                              />
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
                <div className="bg-white rounded-[16px] ">
                  <h2 className=" text-[18px] md:text-[24px] font-[600] leading-[28px] text-[#000000] py-[20px] md:py-[35px] px-[15px] md:px-[40px] m-0 ">
                    Colour Options for {headerDetails?.brand_name}{" "}
                    {headerDetails?.model_name}{" "}
                    {modelPage ? "" : headerDetails?.variant_name}
                  </h2>
                  <div className="pb-[15px] md:pb-[30px] px-[15px] md:px-[40px] w-full">
                    <ul className="[list-style:none] p-0 m-0 grid grid-cols-1 md:grid-cols-[auto_auto] lg:grid-cols-[auto_auto_auto] gap-x-[14px] gap-y-[20px]">
                      {variantColorsData &&
                        variantColorsData?.map((item, index) => {
                          return (
                            <>
                              <li className="text-center text-[16px] font-medium text-[#000000] leading-[25px]">
                                <div className="bg-[#fff] border-[1px] border-[solid] border-[#8080808C] rounded-[8px] mt-[0] mx-[0] mb-[10px]">
                                  <img
                                    src={item?.image}
                                    alt={`${item?.color_name} image`}
                                    title={`${item?.color_name} image`}
                                    className="h-[225px] object-cover rounded-[8px] max-w-full mx-auto"
                                  />
                                </div>
                                {item?.color_name}
                              </li>
                            </>
                          );
                        })}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

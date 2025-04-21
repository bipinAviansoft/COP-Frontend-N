"use client";
import { formatCarPrice } from "@/lib/utils";
import Link from "next/link";
import { useSelector } from "react-redux";

export default function CarHeaderData({
  headerDetails,
  selectedVariantSlug,
  description,
  modelPage,
  pageTitle,
  reviewData,
  upcomingPage,
}) {
  const { city: cityId, citiesList } = useSelector((state) => state.city);

  const selectedCity = citiesList?.filter((city) => city.id === cityId)[0];
  const selectedCityName = selectedCity?.city_name || "";

  const exShowroomPrice = upcomingPage
    ? headerDetails?.min_price
    : headerDetails?.ex_showroom_price;

  const formattedPrice = !isNaN(exShowroomPrice)
    ? formatCarPrice(exShowroomPrice)
    : exShowroomPrice;

  return (
    <>
      {upcomingPage ? (
        <div className={`container ${modelPage ? "px-[16px]" : ""}`}>
          <div className="flex flex-wrap gap-[20px]">
            <div className="xl:w-[calc(75%-10px)] w-full">
              <h1 className="text-[20px] md:text-[27px] lg:text-[36px] leading-[27px] md:leading-[32px] lg:leading-[42px] font-[600] text-[#000000] mb-[7px] md:mb-[15px]">
                {headerDetails?.name}
              </h1>
              <div className="block xl:hidden my-[15px]">
                <div className="">
                  <p className="text-[#565F64] text-[14px] font-[500] border border-[#565F64] rounded-lg px-2 py-1 inline-block mb-[15px]">
                    Expected Launched Date:{" "}
                    <span className="font-[600]">
                      {headerDetails?.launch_date}
                    </span>
                  </p>
                  <h2 className="text-[22px] md:text-[27px] text-[#0177aa] leading-[27px] lg:text-[32px] leading-[38px] font-[600] md:font-bold">
                    <span className="text-[22px] md:text-[24px]">
                      Starting from
                    </span>{" "}
                    <span className="font-[700]">
                      ₹ {formattedPrice?.price} {formattedPrice?.unit}*
                    </span>
                  </h2>
                </div>
              </div>
              {description && description ? (
                <div className="short_des">
                  <p className="text-sm leading-5 text-black font-normal">
                    {description}
                  </p>
                </div>
              ) : null}
            </div>
            <div className="xl:w-[calc(25%-10px)] w-full hidden xl:block">
              <div className="pt-[10px]">
                <p className="text-[#565F64] text-[14px] font-[500] border border-[#565F64] rounded-lg px-2 py-1 inline-block mb-[10px]">
                  Expected Launched Date:{" "}
                  <span className="font-[600] ">
                    {headerDetails?.launch_date}
                  </span>
                </p>
                <h2 className="text-[22px] md:text-[27px] text-[#0177aa] leading-[27px] lg:text-[32px] leading-[38px] font-bold mb-[7px]">
                  <span className="text-[20px] font-[600] block">
                    Starting from
                  </span>{" "}
                  ₹ {formattedPrice?.price} {formattedPrice?.unit}*
                </h2>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={`container ${modelPage ? "px-[16px]" : ""}`}>
          <div className="flex flex-wrap gap-[20px]">
            <div className="xl:w-[calc(75%-10px)] w-full">
              <h1 className="text-[22px] md:text-[27px] lg:text-[36px] leading-[27px] md:leading-[32px] lg:leading-[42px] font-[600] text-[#000000] mb-[7px] md:mb-[15px]">
                {`${headerDetails?.brand_name} `}
                {`${headerDetails?.model_name} `}
                {modelPage ? "" : headerDetails?.variant_name}{" "}
                {pageTitle ? pageTitle : ""}
              </h1>
              {reviewData?.totalRating > 0 ? (
                <>
                  <div className="review_wrap flex items-center gap-2 text-base leading-6 font-normal text-gray-800 mb-2">
                    <strong className="font-semibold text-gray-900">
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
                      href={`/${selectedVariantSlug}/rating-review`}
                      className="text-[#0177AA] text-sm font-semibold border border-[#0177AA] rounded-lg px-2 py-1 ml-2"
                    >
                      Rate &amp; Get Exciting Offers
                    </Link>
                  </div>
                </>
              ) : null}

              <div className="block xl:hidden">
                <div className="md:pt-[10px]">
                  <h2 className="text-[22px] md:text-[27px] text-[#0177aa] leading-[27px] lg:text-[32px] leading-[38px] font-bold">
                    Rs. {formattedPrice?.price} {formattedPrice?.unit}*
                  </h2>
                  <p className="text-[15px] md:text-[16px] text-base leading-6 text-gray-600 mb-[7px]">
                    Ex-showroom Price
                  </p>
                  <Link
                    href={`/${selectedVariantSlug}/price`}
                    className="text-sm font-normal text-[#0177AA] underline capitalize"
                  >
                    Onroad Price In {selectedCityName}
                  </Link>
                </div>
              </div>
              {description && description ? (
                <div className="short_des mt-[15px]">
                  <p className="text-sm leading-5 text-black font-normal">
                    {description}
                  </p>
                </div>
              ) : null}
            </div>
            <div className="xl:w-[calc(25%-10px)] w-full hidden xl:block">
              <div className="pt-[10px]">
                <h2 className="text-[32px] text-[#0177aa] leading-[38px] font-bold mb-[7px]">
                  Rs. {formattedPrice?.price} {formattedPrice?.unit}*
                </h2>
                <p className="text-base leading-6 text-gray-600 mb-[10px]">
                  Ex-showroom Price
                  {/* <button className="ml-[10px] inline-flex items-center gap-[5px] bg-transparent border-none text-[#0177AA] font-semibold">
                    Surat
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        opacity="0.3"
                        d="M3.33398 12.0537V12.667H3.94732L9.98732 6.627L9.37398 6.01367L3.33398 12.0537Z"
                        fill="#0177AA"
                      ></path>
                      <path
                        d="M13.8067 4.69333C13.8685 4.63166 13.9175 4.5584 13.951 4.47775C13.9844 4.3971 14.0016 4.31065 14.0016 4.22333C14.0016 4.13602 13.9844 4.04957 13.951 3.96892C13.9175 3.88827 13.8685 3.81501 13.8067 3.75333L12.2467 2.19333C12.1133 2.06 11.9467 2 11.7733 2C11.6 2 11.4333 2.06667 11.3067 2.19333L10.0867 3.41333L12.5867 5.91333L13.8067 4.69333ZM2 11.5V14H4.5L11.8733 6.62667L9.37333 4.12667L2 11.5ZM3.94667 12.6667H3.33333V12.0533L9.37333 6.01333L9.98667 6.62667L3.94667 12.6667Z"
                        fill="#0177AA"
                      ></path>
                    </svg>
                  </button> */}
                </p>
                <Link
                  href={`/${selectedVariantSlug}/price`}
                  className="text-sm font-normal text-[#0177AA] underline capitalize"
                >
                  Onroad Price In {selectedCityName}
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

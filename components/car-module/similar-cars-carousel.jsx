"use client";

import { cn, formatCarPrice } from "@/lib/utils";
/* import Slider from "react-slick"; */
import Button from "../ui/button";
import SimilarCarCard from "./similar-car-card";
/* import { useState } from "react"; */
import useEmblaCarousel from "embla-carousel-react";
import { usePrevNextButtons } from "@/hooks/use-prev-next-buttons";
import { CarModuleComparisonContext } from "@/contexts/car-module-comparison-context";
import { useContext } from "react";
import Slider from "react-slick";
import NextArrow from "../ui/NextArrow";
import PrevArrow from "../ui/PrevArrow";
import Link from "next/link";

export default function SimilarCarsCarousel({ variants, modelType }) {
  const { cars: carsSelectedForComparison } = useContext(
    CarModuleComparisonContext
  );
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
  });

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  var similarCarsSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };

  return (
    <>
      <Slider {...similarCarsSettings}>
        {variants.map((variant, index) => {
          const formattedPrice = !isNaN(variant?.ex_showroom_price)
            ? formatCarPrice(variant?.ex_showroom_price)
            : variant?.ex_showroom_price;

          return (
            <>
              <div className="bg-[#F4F3F3] even:bg-[#80bbd44d] rounded-[8px] border-[none] px-[10px] py-[15px] w-full sm:w-[calc(100%-15px)] ">
                <img
                  src={variant?.variant_image}
                  loading="lazy"
                  alt="Compare Car Model Image"
                  title="Compare Car Model Image"
                  className="max-w-full w-full mx-[auto] my-[0] min-h-[120px] object-contain"
                />
                <h3 className="text-[16px] leading-[24px] font-semibold text-[#000000] text-start line-clamp-2 min-h-[48px] ">
                  <Link href={`/${variant?.full_slug}`}>
                    {variant?.brand_name} {variant?.model_name}
                  </Link>
                </h3>

                <div className="text-[16px] text-[12px] font-semibold leading-[19px] text-[#000000] mt-[0] mx-[0] mb-[20px]">
                  ₹ {formattedPrice?.price} {formattedPrice?.unit}*
                </div>
                {modelType == 0 ? (
                  <div className="">
                    <ul className="text-[16px] p-0 m-0 [list-style:none]">
                      {variant?.feature_values?.Engine ? (
                        <li className="text-[15px] font-normal leading-[22px] text-[#565F64] mb-[10px]">
                          Engine
                          <span className="block text-[14px] font-normal text-[#000000] leading-[20px] bg-[#FFFFFF] rounded-[4px] px-[7px] py-[4px]">
                            {variant?.feature_values?.Engine}
                          </span>
                        </li>
                      ) : null}

                      {variant?.feature_values?.Displacement ? (
                        <li className="text-[15px] font-normal leading-[22px] text-[#565F64] mb-[10px]">
                          Displacement
                          <span className="block text-[14px] font-normal text-[#000000] leading-[20px] bg-[#FFFFFF] rounded-[4px] px-[7px] py-[4px]">
                            {variant?.feature_values?.Displacement}
                          </span>
                        </li>
                      ) : null}

                      {variant?.feature_values?.Fuel ? (
                        <li className="text-[15px] font-normal leading-[22px] text-[#565F64] mb-[10px]">
                          Fuel
                          <span className="block text-[14px] font-normal text-[#000000] leading-[20px] bg-[#FFFFFF] rounded-[4px] px-[7px] py-[4px]">
                            {" "}
                            {variant?.feature_values?.Fuel}
                          </span>
                        </li>
                      ) : null}

                      {variant?.feature_values?.Type_of_Fuel ? (
                        <li className="text-[15px] font-normal leading-[22px] text-[#565F64] mb-[10px]">
                          Fuel
                          <span className="block text-[14px] font-normal text-[#000000] leading-[20px] bg-[#FFFFFF] rounded-[4px] px-[7px] py-[4px]">
                            {" "}
                            {variant?.feature_values?.Type_of_Fuel}
                          </span>
                        </li>
                      ) : null}
                      {variant?.feature_values?.Transmission ? (
                        <li className="text-[15px] font-normal leading-[22px] text-[#565F64] mb-[10px]">
                          Transmission
                          <span className="block text-[14px] font-normal text-[#000000] leading-[20px] bg-[#FFFFFF] rounded-[4px] px-[7px] py-[4px]">
                            {" "}
                            {variant?.feature_values?.Transmission}
                          </span>
                        </li>
                      ) : null}
                      {variant?.feature_values?.Type_of_Transmission ? (
                        <li className="text-[15px] font-normal leading-[22px] text-[#565F64] mb-[10px]">
                          Transmission
                          <span className="block text-[14px] font-normal text-[#000000] leading-[20px] bg-[#FFFFFF] rounded-[4px] px-[7px] py-[4px]">
                            {" "}
                            {variant?.feature_values?.Type_of_Transmission}
                          </span>
                        </li>
                      ) : null}
                      <li className="text-[15px] font-normal leading-[22px] text-[#565F64] mb-[10px]">
                        Mileage
                        <span className="block text-[14px] font-normal text-[#000000] leading-[20px] bg-[#FFFFFF] rounded-[4px] px-[7px] py-[4px]">
                          {" "}
                          {variant?.feature_values?.Mileage}
                        </span>
                      </li>
                    </ul>
                  </div>
                ) : (
                  <div className="">
                    <ul className="text-[16px] p-0 m-0 [list-style:none]">
                      {variant?.feature_values?.Transmission ? (
                        <li className="text-[15px] font-normal leading-[22px] text-[#565F64] mb-[10px]">
                          Transmission
                          <span className="block text-[14px] font-normal text-[#000000] leading-[20px] bg-[#FFFFFF] rounded-[4px] px-[7px] py-[4px]">
                            {" "}
                            {variant?.feature_values?.Transmission}
                          </span>
                        </li>
                      ) : null}
                      {variant?.feature_values?.Type_of_Transmission ? (
                        <li className="text-[15px] font-normal leading-[22px] text-[#565F64] mb-[10px]">
                          Transmission
                          <span className="block text-[14px] font-normal text-[#000000] leading-[20px] bg-[#FFFFFF] rounded-[4px] px-[7px] py-[4px]">
                            {" "}
                            {variant?.feature_values?.Type_of_Transmission}
                          </span>
                        </li>
                      ) : null}
                      <li className="text-[15px] font-normal leading-[22px] text-[#565F64] mb-[10px]">
                        Battery Capacity
                        <span className="block text-[14px] font-normal text-[#000000] leading-[20px] bg-[#FFFFFF] rounded-[4px] px-[7px] py-[4px]">
                          {" "}
                          {variant?.feature_values?.Battery_Capacity}
                        </span>
                      </li>
                      {variant?.feature_values?.Power ? (
                        <li className="text-[15px] font-normal leading-[22px] text-[#565F64] mb-[10px]">
                          Power
                          <span className="block text-[14px] font-normal text-[#000000] leading-[20px] bg-[#FFFFFF] rounded-[4px] px-[7px] py-[4px]">
                            {" "}
                            {variant?.feature_values?.Power}
                          </span>
                        </li>
                      ) : null}
                      {variant?.feature_values?.Power_EV ? (
                        <li className="text-[15px] font-normal leading-[22px] text-[#565F64] mb-[10px]">
                          Power
                          <span className="block text-[14px] font-normal text-[#000000] leading-[20px] bg-[#FFFFFF] rounded-[4px] px-[7px] py-[4px]">
                            {" "}
                            {variant?.feature_values?.Power_EV}
                          </span>
                        </li>
                      ) : null}
                      {variant?.feature_values?.Driving_Range ? (
                        <li className="text-[15px] font-normal leading-[22px] text-[#565F64] mb-[10px]">
                          Driving Range
                          <span className="block text-[14px] font-normal text-[#000000] leading-[20px] bg-[#FFFFFF] rounded-[4px] px-[7px] py-[4px]">
                            {" "}
                            {variant?.feature_values?.Driving_Range}
                          </span>
                        </li>
                      ) : null}
                      {variant?.feature_values?.Range ? (
                        <li className="text-[15px] font-normal leading-[22px] text-[#565F64] mb-[10px]">
                          Driving Range
                          <span className="block text-[14px] font-normal text-[#000000] leading-[20px] bg-[#FFFFFF] rounded-[4px] px-[7px] py-[4px]">
                            {" "}
                            {variant?.feature_values?.Range}
                          </span>
                        </li>
                      ) : null}
                      <li className="text-[15px] font-normal leading-[22px] text-[#565F64] mb-[10px]">
                        Charging Time (AC)
                        <span className="block text-[14px] font-normal text-[#000000] leading-[20px] bg-[#FFFFFF] rounded-[4px] px-[7px] py-[4px]">
                          {" "}
                          {variant?.feature_values?.Charging_Time_AC}
                        </span>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </>
          );
        })}
      </Slider>

      {/* <section className="relative select-none">
      <div className="overflow-hidden cursor-grab" ref={emblaRef}>
        <div className="flex touch-pan-y touch-pinch-zoom -ml-3 lg:-ml-4">
          {variants.map((variant) => {
            const isSelectedForComparison = carsSelectedForComparison.filter(
              (car) => {
                return car.full_slug === variant.full_slug;
              }
            ).length;

            return (
              <div
                className="flex-[0_0_100%] lg:flex-[0_0_50%] xl:flex-[0_0_33.33%] min-w-0 pl-3 lg:pl-4"
                key={variant.id}
              >
                <SimilarCarCard
                  checkedForComparison={isSelectedForComparison}
                  variantData={variant}
                />
              </div>
            );
          })}
        </div>
      </div>

      <Button
        onClick={onPrevButtonClick}
        disabled={prevBtnDisabled}
        className={cn(
          "p-1 bg-stone-600 text-white rounded-full text-lg absolute top-1/2 -translate-y-1/2 z-20 left-0 -translate-x-1/2"
        )}
      >
        <i className="bx bxs-chevron-left"></i>
      </Button>
      <Button
        onClick={onNextButtonClick}
        disabled={nextBtnDisabled}
        className={cn(
          "p-1 bg-stone-600 text-white rounded-full text-lg absolute top-1/2 -translate-y-1/2 z-20 right-0 translate-x-1/2"
        )}
      >
        <i className="bx bxs-chevron-right"></i>
      </Button>
    </section> */}
    </>
  );
}

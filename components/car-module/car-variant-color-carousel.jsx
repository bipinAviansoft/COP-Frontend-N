"use client";

import useWishlist from "@/hooks/use-wishlist";
import Image from "next/image";
import { forwardRef, useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import Button from "../ui/button";
import ScrollToMarginElement from "../ui/scroll-to-margin-element";
import SharePopover from "../ui/share-popover";

const PrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute left-[-10px] top-1/2 transform -translate-y-1/2 z-10 bg-[#656363] flex items-center justify-center text-white rounded-full p-1 w-5 h-5 lg:w-6 lg:h-6"
  >
    <span className="bx bx-chevron-left text-base md:text-lg"></span>
  </button>
);

const NextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute right-[-10px] top-1/2 transform -translate-y-1/2 z-10 bg-[#656363] flex items-center justify-center text-white rounded-full p-1 w-5 h-5 lg:w-6 lg:h-6"
  >
    <span className="bx bx-chevron-right text-base md:text-lg"></span>
  </button>
);

const VariantColorCarousel = forwardRef(function (
  { variantColorsData, selectedVariantSlug },
  ref
) {
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);

  let sliderRef1 = useRef(null);
  let sliderRef2 = useRef(null);

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setNav1(sliderRef1);
    setNav2(sliderRef2);
  }, []);

  const { toggleWishlist, wishlistStore } = useWishlist();

  const isWishlisted =
    wishlistStore.findIndex((item) =>
      item.slug.startsWith(`/${selectedVariantSlug}`)
    ) >= 0;

  // Responsive settings for the thumbnail slider
  const thumbnailSliderSettings = {
    slidesToShow: Math.min(variantColorsData?.length, 5),
    swipeToSlide: true,
    focusOnSelect: true,
    variableWidth: true,
    infinite: variantColorsData?.length >= 5,
    centerMode: variantColorsData?.length >= 5,
  };

  if (variantColorsData?.length >= 5) {
    thumbnailSliderSettings.prevArrow = <PrevArrow />;
    thumbnailSliderSettings.nextArrow = <NextArrow />;
  }
  return (
    <>
      <ScrollToMarginElement id="overview" />
      <div ref={ref} className="bg-white rounded-md relative p-5">
        <div className="absolute right-4 top-4 z-20 flex md:flex-row flex-col-reverse items-center gap-2">
          <SharePopover
            triggerClassName="!bg-theme-black size-8 lg:size-10"
            locationLink={window.location.href}
          />
          <Button
            className="bg-black rounded-sm p-0 size-8 lg:size-10"
            onClick={() => toggleWishlist(selectedVariantSlug)}
          >
            {isWishlisted ? (
              <i className="bx bxs-heart text-lg lg:text-2xl text-rose-600 animate-beat"></i>
            ) : (
              <i className="bx bx-heart text-lg lg:text-2xl text-white cursor-pointer"></i>
            )}
          </Button>
        </div>

        {/* image slider */}
        <Slider
          asNavFor={nav2}
          ref={(slider) => (sliderRef1 = slider)}
          slidesToShow={1}
          arrows={false}
          fade={true}
          afterChange={(index) => setCurrentIndex(index)}
          className="w-[90%] md:max-w-[480px] lg:max-w-[600px] mx-auto"
        >
          {variantColorsData.map((item, index) => {
            const { id, image, image_mob, color_name } = item;

            return (
              <div key={id} className="relative mx-auto w-full aspect-3/2">
                <Image
                  src={image_mob}
                  alt={color_name}
                  fill
                  className="object-cover object-center"
                />
              </div>
            );
          })}
        </Slider>

        <div className="flex items-center flex-col md:flex-row justify-start py-2 md:relative">
          <div className="w-full max-w-full md:max-w-[200px] md:text-left text-center md:mb-0 mb-3">
            <h3 className="text-base lg:text-lg font-semibold text-black">
              Picked Color
            </h3>
            <p className="text-sm font-normal text-gray-600">
              {variantColorsData[currentIndex]["color_name"]}
            </p>
          </div>

          {/* color slider */}
          <Slider
            {...thumbnailSliderSettings}
            className="md:!absolute md:top-1/2 md:-translate-y-1/2 md:left-1/2 md:-translate-x-1/2 max-w-[300px] md:max-w-[350px] bg-[#fcf9f9] py-2 px-4"
            asNavFor={nav1}
            ref={(slider) => (sliderRef2 = slider)}
          >
            {variantColorsData.map((item, index) => {
              const { id, name, color_name, color_code, dual_color_code } =
                item;

              const style = {};

              if (!dual_color_code) {
                style.backgroundColor = color_code;
              } else {
                style.backgroundImage = `linear-gradient(${color_code} 50%, ${dual_color_code} 50%)`;
              }

              return (
                <div
                  key={id}
                  className={`relative !flex items-center justify-center p-[3px] rounded-full bg-white cursor-pointer group ${
                    currentIndex === index ? "bg-primary-gradient" : ""
                  }`}
                >
                  <div
                    className="!w-10 h-10 sm:!w-11 sm:h-11 lg:!w-12 lg:h-12 xl:!w-13 xl:h-13 2xl:!w-14 2xl:h-14 block border-[3px] border-[#efefef] rounded-full"
                    style={style}
                  ></div>
                  {/* <p className="absolute invisible group-hover:visible z-[999] bg-theme-black text-white text-[9px] w-fit line-clamp-2 px-2 py-1 rounded-md">
                  {color_name}
                </p> */}
                </div>
              );
            })}
          </Slider>
        </div>
      </div>
    </>
  );
});

VariantColorCarousel.displayName = "VariantColorCarousel";

export default VariantColorCarousel;

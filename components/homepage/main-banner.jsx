"use client";

import { useDotButton } from "@/hooks/use-dot-button";
import { usePrevNextButtons } from "@/hooks/use-prev-next-buttons";
import { cn } from "@/lib/utils";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import Link from "next/link";
import Button from "../ui/button";
import FindCar from "./find-car";
import CityProtectedLink from "../layout/city-protected-link";

export default function MainBanner({ bannerData, carTypes, brandModels }) {
  const [emblaRef, emblaApi] = useEmblaCarousel();

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const slides = bannerData?.map((banner, index) => {
    const {
      id,
      banner_heading,
      banner_description,
      image_alt,
      slug,
      banner_image,
      banner_image_mob,
      image_title,
    } = banner;

    return (
      <div key={id} className="relative flex-[0_0_100%]">
        <CityProtectedLink href={slug} className="block">
          <div className="relative w-full h-full md:hidden">
            <Image
              src={banner_image_mob}
              alt={image_alt}
              title={image_title}
              fill
              sizes="100vw"
              className="!static object-cover"
              priority={index === 0}
            />
          </div>
          <div className="relative w-full md:h-96 lg:h-[80dvh] hidden md:block ">
            <Image
              src={banner_image}
              title={image_title}
              alt={image_alt}
              fill
              sizes="100vw"
              className="absolute object-cover object-right"
              priority={index === 0}
            />
          </div>
          <div className="hidden md:block absolute w-full top-12 2xl:top-[20%] z-[2]">
            <div className="container">
              <div className="md:w-3/5 lg:w-1/2">
                <h3 className="text-white font-[700] mb-2 xl:mb-3 lg:leading-8 text-xl md:text-2xl xl:leading-7 2xl:text-3xl 2xl:leading-9 2xl:mb-4 tracking-wider uppercase ">
                  {banner_heading}
                </h3>
                <p className="text-white text-sm xl:text-base ">
                  {banner_description}
                </p>
              </div>
            </div>
          </div>
        </CityProtectedLink>
      </div>
    );
  });

  return (
    <div className="relative select-none">
      <div className="relative overflow-hidden cursor-grab" ref={emblaRef}>
        <div className="flex touch-pan-y touch-pinch-zoom">{slides}</div>

        {/* carousel dots */}
        <div className="flex absolute bottom-12 justify-center gap-x-1.5 lg:hidden left-1/2 -translate-x-1/2 bg-black/50 px-2.5 py-1.5 rounded-lg">
          {scrollSnaps.map((scroll, index) => {
            return (
              <Button
                key={index}
                onClick={() => onDotButtonClick(index)}
                className={cn("size-2 lg:size-3 rounded-full p-0 bg-white/30", {
                  "bg-white": index === selectedIndex,
                })}
              />
            );
          })}
        </div>
      </div>

      {/* carousel arrows */}
      <div className="absolute bottom-12 right-12 z-20 items-center gap-x-2 hidden lg:flex">
        <Button
          onClick={onPrevButtonClick}
          disabled={prevBtnDisabled}
          className="size-10 flex justify-center items-center text-2xl h-auto bg-black/40"
        >
          <i className="bx bx-left-arrow-alt"></i>
        </Button>
        <Button
          onClick={onNextButtonClick}
          disabled={nextBtnDisabled}
          className="size-10 flex justify-center items-center text-2xl h-auto bg-black/40"
        >
          <i className="bx bx-right-arrow-alt"></i>
        </Button>
      </div>

      <FindCar carTypes={carTypes} brandModels={brandModels} />
    </div>
  );
}

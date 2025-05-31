"use client";

import useEmblaCarousel from "embla-carousel-react";
import Button from "../ui/button";
import { usePrevNextButtons } from "@/hooks/use-prev-next-buttons";
import ElectricCarsCarousel from "./electric-cars-carousel";
import { useDotButton } from "@/hooks/use-dot-button";
import Image from "next/image";
import { cn, formatCarMinMaxPrice } from "@/lib/utils";
import Link from "next/link";

const ELECTRIC_CARS_FEATURES = [
  {
    imgUrl: "https://static.caronphone.com/public/Feature/8/8.svg",
    title: "Battery Capacity",
    imgAlt: "battery icon",
    prop: "battery_capacity",
    uom: "kWh",
  },
  {
    imgUrl: "https://static.caronphone.com/public/Feature/10/10.svg",
    title: "Power",
    imgAlt: "power icon",
    prop: "power",
    uom: "bhp",
  },
  {
    imgUrl: "https://static.caronphone.com/public/Feature/12/12.svg",
    title: "Range",
    imgAlt: "range icon",
    prop: "range",
    uom: "km/C",
  },
  {
    imgUrl: "https://static.caronphone.com/public/Feature/20/20.svg",
    title: "Charging Time (AC)",
    imgAlt: "charge icon",
    prop: "charging_time",
    uom: "hrs",
  },
];

function ElectricCarsSpecGrid(props) {
  return (
    <ul className="bg-white/15 p-2 md:p-4 grid gap-x-2 grid-cols-4 rounded-lg mb-4">
      {ELECTRIC_CARS_FEATURES.map((feature, index) => {
        return (
          <li key={index} className="flex flex-col items-center">
            <div className="relative w-6 h-6 mb-2">
              <Image
                src={feature.imgUrl}
                alt={feature.imgAlt}
                className="invert saturate-0 hue-rotate-[175deg]"
                fill
              />
            </div>
            <p className="text-[8px] md:text-[10px] lg:text-xs mb-1">
              {feature.title}
            </p>
            <p className="text-[10px] md:text-xs lg:text-sm font-semibold">
              {props[feature.prop]} {feature.uom}
            </p>
          </li>
        );
      })}
    </ul>
  );
}

/* NOTE --> Ref provided by useEmbla can be attached to only one element, in this components case we needed to make two refs for responsiveness, hence need to create the embla instance twice (May be this is not the best pracitce, but for now this is the only legit solution) */

export default function ElectricCarsSection({ evBanners }) {
  const [emblaRefSm, emblaApiSm] = useEmblaCarousel({ loop: true });
  const [emblaRefLg, emblaApiLg] = useEmblaCarousel();

  const {
    onPrevButtonClick,
    onNextButtonClick,
    prevBtnDisabled,
    nextBtnDisabled,
  } = usePrevNextButtons(emblaApiLg);

  const {
    selectedIndex: selectedIndexSm,
    scrollSnaps: scrollSnapsSm,
    onDotButtonClick: onDotButtonClickSm,
  } = useDotButton(emblaApiSm);

  const {
    selectedIndex: selectedIndexLg,
    scrollSnaps: scrollSnapsLg,
    onDotButtonClick: onDotButtonClickLg,
  } = useDotButton(emblaApiLg);

  const {
    id,
    name,
    slug,
    min_price,
    max_price,
    battery_capacity,
    power,
    range,
    charging_time,
  } = evBanners[selectedIndexSm || selectedIndexLg];

  const specs = { battery_capacity, power, range, charging_time };

  return (
    <>
      <div className="container relative">
        <h2 className="inline-block text-[26px] md:text-[35px] 2xl:text-[50px] uppercase text-black font-bold">
          Electric Cars
        </h2>
      </div>
      <div
        id="electric-car-container"
        className="bg-gradient-to-r to-[#00ccb1] from-[#01799e] text-white relative after:absolute after:w-1/3 md:after:w-1/2 after:content-[''] after:h-12 after:right-0 after:bg-gradient-to-r after:to-[#00ccb1] after:from-[#01799e] after:h-15 after:-translate-y-full after:top-0"
      >
        {/* header */}
        <div className="container flex gap-x-4 md:gap-x-8 md:justify-between items-center mb-0 lg:mb-6 md:order-1 pt-4 pb-2 lg:pt-8 lg:pb-4">
          <p className="text-sm leading-6 md:hidden">
            The next generation of mobility will revolutionize the way we get
            behind our wheels and accelerate to drive your dream car home ^
          </p>
          <p className="hidden md:block w-4/5 max-w-5xl text-sm lg:text-base">
            The next generation of mobility with electric cars, which will
            revolutionize the way we get behind our wheels. Create a more
            environmentally friendly future with the sustainable revolution and
            accelerate your desire to drive your dream car home ^
          </p>
          <div className="shrink-0 lg:flex lg:gap-x-2">
            <Link href={"/ev-car"}>
              <Button
                animated
                className="bg-white/15 uppercase h-auto text-xs md:text-sm lg:text-base"
              >
                View More
              </Button>
            </Link>

            <div className="hidden lg:flex items-center gap-x-2">
              <Button
                onClick={onPrevButtonClick}
                disabled={prevBtnDisabled}
                className={cn(
                  "size-10 flex justify-center items-center text-2xl h-auto bg-white/10"
                )}
              >
                <i className="bx bx-left-arrow-alt"></i>
              </Button>
              <Button
                onClick={onNextButtonClick}
                disabled={nextBtnDisabled}
                className={cn(
                  "size-10 flex justify-center items-center text-2xl h-auto bg-white/10"
                )}
              >
                <i className="bx bx-right-arrow-alt"></i>
              </Button>
            </div>
          </div>
        </div>
        <div className="container pt-4 pb-8 lg:flex">
          <div className="flex flex-col lg:w-1/2 lg:pr-8">
            {/* carousel --> sm */}
            <div className="inline-block md:order-4 lg:hidden">
              <ElectricCarsCarousel
                ref={emblaRefSm}
                cars={evBanners}
                selectedIndex={selectedIndexSm}
              />
            </div>

            {/* car meta data */}
            <div className="flex flex-col mb-4 md:order-2">
              <h3 className="text-xl md:text-[22px] lg:text-[28px] font-semibold mb-2 lg:mb-3">
                {name}
              </h3>
              <p className="text-lg md:text-xl mb-1 lg:font-semibold">
                ₹ {formatCarMinMaxPrice(min_price, max_price)}{" "}
                <span className="text-sm text-gray-lighter font-normal">
                  Ex-Showroom Price
                </span>
              </p>
            </div>

            {/* specs grid */}
            <div className="md:order-5 lg:order-3 md:w-3/4 md:mx-auto lg:w-full lg:mb-8">
              <ElectricCarsSpecGrid {...specs} />
            </div>
            <Link
              href={slug || "/ev-car"}
              className="table md:order-3 lg:order-5"
            >
              <Button
                animated
                className="border border-white bg-white/15 uppercase text-xs md:text-sm lg:text-base lg:h-auto tracking-wider px-4 lg:px-8 self-center md:self-start mb-4  h-auto"
              >
                Explore
              </Button>
            </Link>

            {/* carousel dots --> sm */}
            <div className="flex justify-center gap-x-1 lg:gap-x-1.5 lg:hidden md:order-6">
              {scrollSnapsSm.map((scroll, index) => {
                return (
                  <Button
                    key={index}
                    onClick={() => onDotButtonClickSm(index)}
                    className={cn(
                      "size-2 lg:size-3 rounded-full p-0 bg-white",
                      {
                        "bg-primary-darker": index === selectedIndexSm,
                      }
                    )}
                  />
                );
              })}
            </div>

            {/* carousel dots --> lg */}
            <div className="hidden lg:flex justify-center gap-x-1 lg:gap-x-1.5 md:order-6">
              {scrollSnapsLg.map((scroll, index) => {
                return (
                  <Button
                    key={index}
                    onClick={() => onDotButtonClickLg(index)}
                    className={cn(
                      "size-2 lg:size-3 rounded-full p-0 bg-white",
                      {
                        "bg-primary-darker": index === selectedIndexLg,
                      }
                    )}
                  />
                );
              })}
            </div>
          </div>

          {/* carousel --> lg */}
          <div className="hidden lg:inline-flex w-1/2">
            <ElectricCarsCarousel
              ref={emblaRefLg}
              cars={evBanners}
              selectedIndex={selectedIndexLg}
            />
          </div>
        </div>
      </div>
    </>
  );
}

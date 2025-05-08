"use client";

import { usePrevNextButtons } from "@/hooks/use-prev-next-buttons";
import ClassNames from "embla-carousel-class-names";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import Button from "../ui/button";
import Link from "next/link";

const ALL_BRANDS = [
  {
    imgUrl: "https://static.caronphone.com/public/brands/11/thumb/11.webp",
    imgAlt: "Hyundai Brand Logo",
    brandName: "Hynudai",
    slug: "/",
  },
  {
    imgUrl: "https://static.caronphone.com/public/brands/11/thumb/11.webp",
    imgAlt: "Hyundai Brand Logo",
    brandName: "Hynudai",
    slug: "/",
  },
  {
    imgUrl: "https://static.caronphone.com/public/brands/11/thumb/11.webp",
    imgAlt: "Hyundai Brand Logo",
    brandName: "Hynudai",
    slug: "/",
  },
  {
    imgUrl: "https://static.caronphone.com/public/brands/11/thumb/11.webp",
    imgAlt: "Hyundai Brand Logo",
    brandName: "Hynudai",
    slug: "/",
  },
  {
    imgUrl: "https://static.caronphone.com/public/brands/11/thumb/11.webp",
    imgAlt: "Hyundai Brand Logo",
    brandName: "Hynudai",
    slug: "/",
  },
  {
    imgUrl: "https://static.caronphone.com/public/brands/11/thumb/11.webp",
    imgAlt: "Hyundai Brand Logo",
    brandName: "Hynudai",
    slug: "/",
  },
  {
    imgUrl: "https://static.caronphone.com/public/brands/11/thumb/11.webp",
    imgAlt: "Hyundai Brand Logo",
    brandName: "Hynudai",
    slug: "/",
  },
  {
    imgUrl: "https://static.caronphone.com/public/brands/11/thumb/11.webp",
    imgAlt: "Hyundai Brand Logo",
    brandName: "Hynudai",
    slug: "/",
  },
  {
    imgUrl: "https://static.caronphone.com/public/brands/11/thumb/11.webp",
    imgAlt: "Hyundai Brand Logo",
    brandName: "Hynudai",
    slug: "/",
  },
  {
    imgUrl: "https://static.caronphone.com/public/brands/11/thumb/11.webp",
    imgAlt: "Hyundai Brand Logo",
    brandName: "Hynudai",
    slug: "/",
  },
  {
    imgUrl: "https://static.caronphone.com/public/brands/11/thumb/11.webp",
    imgAlt: "Hyundai Brand Logo",
    brandName: "Hynudai",
    slug: "/",
  },
  {
    imgUrl: "https://static.caronphone.com/public/brands/11/thumb/11.webp",
    imgAlt: "Hyundai Brand Logo",
    brandName: "Hynudai",
    slug: "/",
  },
  {
    imgUrl: "https://static.caronphone.com/public/brands/11/thumb/11.webp",
    imgAlt: "Hyundai Brand Logo",
    brandName: "Hynudai",
    slug: "/",
  },
  {
    imgUrl: "https://static.caronphone.com/public/brands/11/thumb/11.webp",
    imgAlt: "Hyundai Brand Logo",
    brandName: "Hynudai",
    slug: "/",
  },
  {
    imgUrl: "https://static.caronphone.com/public/brands/11/thumb/11.webp",
    imgAlt: "Hyundai Brand Logo",
    brandName: "Hynudai",
    slug: "/",
  },
  {
    imgUrl: "https://static.caronphone.com/public/brands/11/thumb/11.webp",
    imgAlt: "Hyundai Brand Logo",
    brandName: "Hynudai",
    slug: "/",
  },
  {
    imgUrl: "https://static.caronphone.com/public/brands/11/thumb/11.webp",
    imgAlt: "Hyundai Brand Logo",
    brandName: "Hynudai",
    slug: "/",
  },
  {
    imgUrl: "https://static.caronphone.com/public/brands/11/thumb/11.webp",
    imgAlt: "Hyundai Brand Logo",
    brandName: "Hynudai",
    slug: "/",
  },
];

export default function AllBrandsCarousel({ brandModels }) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      align: "center",
      loop: true,
    },
    [ClassNames()]
  );
  const {
    onPrevButtonClick,
    onNextButtonClick,
    prevBtnDisabled,
    nextBtnDisabled,
  } = usePrevNextButtons(emblaApi);
  return (
    <div className="flex items-center">
      <Button
        onClick={onPrevButtonClick}
        disabled={prevBtnDisabled}
        className="hidden md:flex size-10 justify-center items-center text-2xl bg-primary-gradient rounded-full shrink-0 mr-3"
      >
        <i className="bx bx-left-arrow-alt"></i>
      </Button>
      <div
        id="all-brands-carousel"
        ref={emblaRef}
        className="overflow-hidden mb-4 select-none"
      >
        <ul className="flex touch-pan-y touch-pinch-zoom -ml-1.5 md:-ml-2.5 lg:-ml-3.5 cursor-grab">
          {brandModels.map((brand, index) => {
            const { brand_name, brand_logo, slug } = brand;

            return (
              <li
                key={index}
                className="flex-[0_0_33%] sm:flex-[0_0_30%] lg:flex-[0_0_16.67%] lg: min-w-0 pl-1.5 md:pl-2.5 lg:pl-3.5 py-4 lg:py-6"
              >
                <Link href={slug} className="cursor-pointer block">
                  <div className="relative bg-white flex flex-col items-center border rounded-md p-2.5 md:p-3 lg:p-8 shadow-md">
                    <div className="relative w-14 md:w-24 lg:w-32 aspect-3/2 mb-2">
                      <Image
                        src={brand_logo}
                        alt={`logo of ${brand_name}`}
                        fill
                        sizes="(max-width: 768px) 56px, (max-width: 1024px) 96px, 128px"
                      />
                    </div>
                    <p className="text-xs md:text-sm lg:text-base font-medium text-center text-theme-black">
                      {brand_name}
                    </p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <Button
        onClick={onNextButtonClick}
        disabled={nextBtnDisabled}
        className="hidden md:flex size-10 justify-center items-center text-2xl bg-primary-gradient rounded-full shrink-0 ml-3"
      >
        <i className="bx bx-right-arrow-alt"></i>
      </Button>
    </div>
  );
}

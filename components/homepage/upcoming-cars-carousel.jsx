"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { usePrevNextButtons } from "@/hooks/use-prev-next-buttons";
import Image from "next/image";
import Button from "../ui/button";
import Link from "next/link";

export default function UpcomingCarsCarousel({ upComingBanners }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 4000 }),
  ]);

  const {
    onPrevButtonClick,
    onNextButtonClick,
    prevBtnDisabled,
    nextBtnDisabled,
  } = usePrevNextButtons(emblaApi);

  return (
    <>
      {/* header */}
      <div className="container flex justify-between items-center mb-4">
        <h2 className="text-xl lg:text-2xl uppercase text-primary-darker font-bold">
          Upcoming Cars
        </h2>
        <div className="flex items-center gap-x-2">
          <Link href="/upcoming-car">
            <Button
              animated
              className="uppercase text-xs md:text-sm lg:text-base tracking-wider h-auto bg-[#0177aa80]"
            >
              View More
            </Button>
          </Link>
          <div className="hidden md:flex items-center gap-x-2">
            <Button
              onClick={onPrevButtonClick}
              disabled={prevBtnDisabled}
              className="size-10 flex justify-center items-center text-2xl h-auto"
            >
              <i className="bx bx-left-arrow-alt"></i>
            </Button>
            <Button
              onClick={onNextButtonClick}
              disabled={nextBtnDisabled}
              className="size-10 flex justify-center items-center text-2xl h-auto"
            >
              <i className="bx bx-right-arrow-alt"></i>
            </Button>
          </div>
        </div>
      </div>

      {/* image carousel */}
      <div className="overflow-hidden w-full" ref={emblaRef}>
        <ul className="flex touch-pan-y touch-pinch-zoom -ml-1 lg:-ml-1.5">
          {upComingBanners.map((upcomingCarImg) => {
            const {
              id,
              banner_heading,
              banner_image,
              banner_image_mob,
              image_alt,
              slug,
            } = upcomingCarImg;

            return (
              <li key={id} className="flex-[0_0_100%] min-w-0 pl-1 lg:pl-1.5">
                <Link
                  href={slug}
                  className="block relative w-full aspect-15/8 md:aspect-20/7"
                >
                  <Image
                    className="md:hidden object-cover"
                    src={banner_image_mob}
                    alt={image_alt || `Banner sized image of ${banner_heading}`}
                    fill
                    sizes="100vw"
                  />
                  <Image
                    className="hidden md:block object-cover"
                    src={banner_image}
                    alt={image_alt || `Banner sized image of ${banner_heading}`}
                    fill
                    sizes="100vw"
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

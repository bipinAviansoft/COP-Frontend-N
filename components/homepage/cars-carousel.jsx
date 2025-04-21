"use client";

import { usePrevNextButtons } from "@/hooks/use-prev-next-buttons";
import { cn } from "@/lib/utils";
import useEmblaCarousel from "embla-carousel-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import Button from "../ui/button";
import CarCard from "../ui/car-card";
import useWishlist from "@/hooks/use-wishlist";

export default function CarsCarousel({
  data,
  options,
  evCarousel,
  showMoreButton = true,
  exploreMoreHref = "",
  type = "",
}) {
  const [cars, setCars] = useState([]);
  const { toggleWishlist, wishlistStore } = useWishlist();

  useEffect(() => {
    setCars(data);
  }, [data]);

  useEffect(() => {
    setCars((prevCars) =>
      prevCars.map((car) => {
        const isWishlisted = wishlistStore?.some((item) =>
          item.slug.startsWith(`/${car.slug}`)
        );
        car.isWishlisted = isWishlisted;

        return car;
      })
    );
  }, [wishlistStore]);

  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    /* Autoplay({ delay: 8000, stopOnInteraction: false }), */
  ]);

  const onNavButtonClick = useCallback((emblaApi) => {
    const autoplay = emblaApi?.plugins()?.autoplay;
    if (!autoplay) return;

    const resetOrStop =
      autoplay.options.stopOnInteraction === false
        ? autoplay.reset
        : autoplay.stop;

    resetOrStop();
  }, []);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi, onNavButtonClick);

  return (
    <section className="relative select-none">
      <div className="overflow-hidden cursor-grab" ref={emblaRef}>
        <div className="flex touch-pan-y touch-pinch-zoom -ml-3 lg:-ml-4">
          {cars.map((car) => {
            const { id, wishlist } = car;
            if (!car.isEV) {
              car.isEV = car?.cl_name === "EV Cars" || evCarousel;
            }
            car.isUpcoming = car?.cl_name === "Upcoming Cars";
            car.isNewlyLaunched = car?.cl_name === "New Launched Cars";
            car.isWishlisted =
              Boolean(wishlist) ||
              wishlistStore?.some((item) =>
                item.slug.startsWith(`/${car.slug}`)
              );

            return (
              <div
                className="flex-[0_0_50%] lg:flex-[0_0_33.334%] xl:flex-[0_0_25%] min-w-0 pl-3 lg:pl-4 py-2 lg:py-4"
                key={id}
              >
                <CarCard carDetails={car} toggleWishlist={toggleWishlist} />
              </div>
            );
          })}
        </div>
      </div>
      <div className="absolute -top-10 right-0 items-center gap-x-2 hidden lg:flex">
        {/* {showMoreButton && (
          <Link href={exploreMoreHref}>
            <Button
              className="uppercase bg-white/10 text-xs md:text-sm lg:text-base tracking-wider h-auto"
              animated
            >
              View More
            </Button>
          </Link>
        )} */}
        <Button
          onClick={onPrevButtonClick}
          disabled={prevBtnDisabled}
          className={cn(
            "size-10 flex justify-center items-center text-2xl h-auto bg-white/10",
            { "bg-ev-gradient": evCarousel }
          )}
        >
          <i className="bx bx-left-arrow-alt"></i>
        </Button>
        <Button
          onClick={onNextButtonClick}
          disabled={nextBtnDisabled}
          className={cn(
            "size-10 flex justify-center items-center text-2xl h-auto bg-white/10",
            { "bg-ev-gradient": evCarousel }
          )}
        >
          <i className="bx bx-right-arrow-alt"></i>
        </Button>
      </div>
    </section>
  );
}

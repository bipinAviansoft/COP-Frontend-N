"use client";

import { cn, formatCarMinMaxPrice } from "@/lib/utils";
import { Separator } from "@radix-ui/react-separator";
import Image from "next/image";
import { format } from "date-fns";
import Link from "next/link";
import Button from "./button";
import { useSelector } from "react-redux";
import CityProtectedLink from "../layout/city-protected-link";
import { useState } from "react";

export default function CarCard({ carDetails, toggleWishlist }) {
  const {
    min_price,
    max_price,
    name,
    slug,
    image_alt,
    image_title,
    model_image,
    feature_json,
    isEV,
    isUpcoming,
    launch_date,
    isWishlisted,
    isNewlyLaunched,
  } = carDetails;

  const handleWishlistClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    toggleWishlist(slug);
  };

  const [cardImage, setCardImage] = useState(model_image);

  const handleImageError = () => {
    setCardImage("/images/coming-Soon.jpg");
  };

  // Format the launch date outside of the JSX to avoid hydration errors
  const formattedLaunchDate = launch_date
    ? format(new Date(`${launch_date.split("T")[0]} 00:00:00`), "dd MMMM, yyyy")
    : "";

  return (
    <CityProtectedLink href={slug} className="group">
      <div
        className={cn(
          "h-full relative overflow-hidden border-1 rounded-lg flex flex-col shadow-md",
          { "p-1.5 lg:p-2.5 bg-white": isUpcoming }
        )}
      >
        {!isUpcoming && !isNewlyLaunched && (
          <Button
            className="p-0 bg-transparent text-xl lg:text-2xl absolute top-2 lg:top-4 right-2 lg:right-4 z-20 min-h-fit overflow-visible"
            onClick={handleWishlistClick}
          >
            {isWishlisted ? (
              <i className="bx bxs-heart text-rose-600 animate-beat"></i>
            ) : (
              <i className="bx bx-heart"></i>
            )}
          </Button>
        )}

        <div className="relative w-full aspect-3/2 xl:aspect-5/3 cursor-pointer overflow-hidden">
          <Image
            src={cardImage}
            onError={handleImageError}
            alt={image_alt}
            title={image_title}
            sizes="(max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
            className="object-cover group-hover:scale-105 transition-all duration-200"
            fill
          />
        </div>
        <div className="bg-white grow flex flex-col">
          <div className="grow p-3 lg:p-4 flex flex-col space-y-1 cursor-pointer">
            <h3 className="text-sm lg:text-base font-semibold text-theme-black line-clamp-1	">
              {name}
            </h3>
            <p className="text-sm lg:text-base font-semibold text-[#484848]">
              ₹ {formatCarMinMaxPrice(min_price, max_price)} *
            </p>
            <p className="text-xs text-gray-darker">Ex-showroom Price</p>
          </div>

          {!isUpcoming && !isNewlyLaunched ? (
            <div
              className={cn(
                "bg-primary-gradient text-white relative after:absolute after:left-1/2 after:inset-y-0 after:-translate-x-1/2 after:w-0.5 after:bg-white flex justify-center items-center",
                { "bg-ev-gradient": isEV }
              )}
            >
              {feature_json?.map((feature, index) => {
                const { features_image, feature_value } = feature;

                let icon =
                  index == 0
                    ? "https://static.caronphone.com/public/Feature/12/12.svg"
                    : "https://static.caronphone.com/public/Feature/10/10.svg";

                return (
                  <div
                    key={index}
                    className="w-1/2 flex justify-center items-center gap-x-2 p-2 lg:p-2.5"
                  >
                    <span className="relative size-4 lg:size-5 shrink-0">
                      <Image
                        src={icon}
                        alt="Engine or Battery Capacity Feature Image"
                        fill
                        className="invert saturate-0 hue-rotate-[175deg]"
                      />
                    </span>
                    <span className="text-[10px] md:text-xs lg:text-sm">
                      {index === 0
                        ? feature_value
                        : `${feature_value.split(" ")[0]} bhp`}
                    </span>
                  </div>
                );
              })}
            </div>
          ) : (
            <>
              <Separator className="h-[1px] bg-black/10" />
              <span className="text-[10px] md:text-xs lg:text-sm text-gray-darker inline-block px-3 lg:px-4 py-3">
                {isUpcoming ? "Expected Launch" : "Launched on"}{" "}
                {formattedLaunchDate}
              </span>
            </>
          )}
        </div>
      </div>
    </CityProtectedLink>
  );
}

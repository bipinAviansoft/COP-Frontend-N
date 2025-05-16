"use client";

import { formatCarMinMaxPrice } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import Button from "./button";
import { format } from "date-fns";
import { Separator } from "./separator";
import useWishlist from "@/hooks/use-wishlist";

export default function SearchResultCarCard({ carDetails, upcoming = false }) {
  const {
    min_price,
    max_price,
    name,
    slug,
    image_alt,
    image_title,
    model_image,
    variant_count,
    launch_date,
    wishlist,
  } = carDetails;

  const { wishlistStore, toggleWishlist } = useWishlist();

  const isWishlisted =
    Boolean(wishlist) ||
    wishlistStore?.some((item) => item.slug.startsWith(`/${slug}`));

  return (
    <div className="bg-white h-full relative overflow-hidden border-1 shadow-md rounded-lg flex flex-col p-1 md:p-2.5 group">
      <div className="relative w-full aspect-3/2 xl:aspect-5/3 cursor-pointer overflow-hidden rounded-md">
        <Button
          className="p-0 bg-transparent text-xl lg:text-2xl absolute top-2 lg:top-4 right-2 lg:right-4 z-20 min-h-fit overflow-visible"
          onClick={() => toggleWishlist(slug)}
        >
          {isWishlisted ? (
            <i className="bx bxs-heart text-rose-600 animate-beat"></i>
          ) : (
            <i className="bx bx-heart"></i>
          )}
        </Button>
        <Image
          className="z-10 object-cover group-hover:scale-105 duration-200"
          src={model_image}
          alt={image_alt || `${name}`}
          title={image_title || `${name}`}
          sizes="(max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
          fill
        />
      </div>
      <div className="grow flex flex-col px-0.5 md:px-1.5 lg:px-0 py-1">
        <div className="grow flex flex-col py-2">
          <h3>
            <Link
              href={slug}
              className="text-sm md:text-base lg:text-lg font-semibold text-theme-black line-clamp-1 mb-1"
            >
              {name}
            </Link>
          </h3>
          <p className="text-sm md:text-base lg:text-lg font-semibold text-[#484848]">
            ₹ {formatCarMinMaxPrice(min_price, max_price)} *
          </p>
          <p className="text-[10px] lg:text-xs text-gray-darker">
            {upcoming ? "Estimated price" : "Ex-showroom Price"}
          </p>
          {variant_count && (
            <p className="text-xs md:text-sm text-primary-lighter font-medium line-clamp-1 mt-0.5 md:mt-1.5">
              Variants matching your criteria ({variant_count})
            </p>
          )}
        </div>
        {!upcoming && (
          <Link href={slug} className="block mt-2">
            <Button variant="primary-gradient" className="w-full" animated>
              Explore More
            </Button>
          </Link>
        )}
        {launch_date && <Separator className="my-2" />}
        {launch_date && (
          <p className="text-xs text-gray-darker text-balance line-clamp-1">
            {upcoming ? "Expected Launch" : "Launched on"}{" "}
            {format(
              new Date(`${launch_date.split("T")[0]} 00:00:00`),
              "dd MMMM, yyyy"
            )}
          </p>
        )}
      </div>
    </div>
  );
}

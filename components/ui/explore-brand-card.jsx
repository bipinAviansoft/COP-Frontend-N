import useWishlist from "@/hooks/use-wishlist";
import Button from "./button";
import Link from "next/link";
import Image from "next/image";
import { formatCarMinMaxPrice, formatCarPrice } from "@/lib/utils";

export default function ExploreBrandCard({ model, singlePrice }) {
  const { toggleWishlist, wishlistStore } = useWishlist();
  const {
    name,
    slug,
    min_price,
    max_price,
    model_image,
    image_alt,
    image_title,
    seating_capacity,
    feature_value,
    wishlist,
    ex_showroom_price,
    variant_image,
  } = model;

  let formattedPrice;

  if (singlePrice) {
    const priceObj = formatCarPrice(ex_showroom_price);
    formattedPrice = `${priceObj.price} ${priceObj.unit}`;
  } else {
    formattedPrice = formatCarMinMaxPrice(min_price, max_price);
  }

  const isWishlisted =
    Boolean(wishlist) ||
    wishlistStore?.some((item) => item.slug.startsWith(`/${slug}`));

  return (
    <div
      key={slug}
      className="relative grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3 lg:gap-4 p-1.5 md:p-3 bg-white rounded-lg overflow-hidden items-center"
    >
      <Button
        className="absolute top-3 sm:top-4 right-3 sm:right-4 z-20 text-gray-400 cursor-pointer bg-transparent md:text-2xl"
        variant="icon"
        onClick={() => toggleWishlist(slug)}
      >
        {isWishlisted ? (
          <i className="bx bxs-heart text-rose-600 animate-beat"></i>
        ) : (
          <i className="bx bx-heart"></i>
        )}
      </Button>
      <Link
        href={`/${slug}`}
        className="block relative w-full aspect-[5/3] lg:h-[200px] xl:h-[250px] rounded-lg overflow-hidden"
      >
        <Image
          src={model_image || variant_image}
          alt={image_alt}
          title={image_title}
          fill
          className="object-cover object-center"
        />
      </Link>
      <div className="px-1 lg:px-0">
        <h2>
          <Link
            href={`/${slug}`}
            className="text-sm sm:text-base lg:text-xl font-semibold mb-1 lg:mb-2 xl:mb-3 text-black hover:text-gray-700 line-clamp-1"
          >
            {name}
          </Link>
        </h2>
        <div className="text-sm sm:text-base lg:text-xl font-semibold text-black mb-0.5 lg:mb-1">
          ₹ {formattedPrice} *
        </div>
        <p className="text-[10px] lg:text-xs text-gray-500 font-medium mb-2 lg:mb-3">
          {" "}
          Ex-showroom price{" "}
        </p>
        <div className="list-disc flex gap-1 mb-1.5 lg:mb-2.5 sm:my-2 text-xs lg:text-sm font-medium text-gray-500">
          <p>{feature_value}</p>
          <span>•</span>
          <p>{seating_capacity} seater</p>
        </div>
        <Link href={`/${slug}`}>
          <Button
            variant="primary-gradient"
            className="w-full md:w-auto"
            animated
          >
            View More
          </Button>
        </Link>
      </div>
    </div>
  );
}

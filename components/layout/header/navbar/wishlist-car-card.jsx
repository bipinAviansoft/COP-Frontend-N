import Button from "@/components/ui/button";
import { sendRequest } from "@/lib/fetch-client";
import { formatCarPrice } from "@/lib/utils";
import { setWishlist } from "@/store";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

export default function WishlistCarCard({ car, closeSheet }) {
  const {
    variant_image,
    name,
    slug,
    seating_capacity,
    feature_value,
    ex_showroom_price,
  } = car;

  const router = useRouter();

  const dispatch = useDispatch();

  const { wishlist } = useSelector((state) => state.auth);

  const formattedPrice = formatCarPrice(ex_showroom_price);

  const handleRemoveClick = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    const { result: wislistedItem } = await sendRequest(`wishlist${slug}`);
    if (typeof wislistedItem === "object") {
      dispatch(setWishlist([...wishlist, wislistedItem]));
    } else {
      dispatch(setWishlist(wishlist?.filter((item) => item.slug !== slug)));
    }
  };

  const handleCardClick = (e) => {
    e.preventDefault();
    closeSheet();
    router.push(slug);
  };

  return (
    <Link
      href={slug}
      className="relative flex items-center gap-x-4 border rounded-md py-4 px-1"
      onClick={handleCardClick}
    >
      <Button
        className="p-0 size-5 rounded-full absolute top-2 right-2 bg-gray-darker text-white hover:scale-125 transition-all delay-100"
        onClick={handleRemoveClick}
      >
        <i className="bx bx-x text-sm"></i>
      </Button>
      <div className="relative w-32 aspect-5/3 rounded-lg overflow-hidden shrink-0">
        <Image src={variant_image} alt={name} fill className="object-cover" />
      </div>
      <div className="flex flex-col items-start pr-8">
        <p className="font-semibold text-lg">{name}</p>
        <div className="list-disc flex gap-1 mb-1.5 lg:mb-2.5 sm:my-2 text-xs lg:text-sm font-medium text-gray-500">
          <p>{feature_value}</p>
          <span>•</span>
          <p>{seating_capacity} seater</p>
        </div>
        <p className="text-lg font-semibold">
          ₹ {formattedPrice.price} {formattedPrice.unit} *
        </p>
      </div>
    </Link>
  );
}

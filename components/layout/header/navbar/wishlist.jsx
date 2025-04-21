"use client";

import Button from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import WishlistCarCard from "./wishlist-car-card";
import Image from "next/image";
import emptyImg from "@/public/images/wishlist_blank.jpg";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { openAuthModal } from "@/store";

export default function Wishlist() {
  const { user, wishlist } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);

  const closeSheet = () => setIsOpen(false);

  const router = useRouter();

  const redirectToHome = (e) => {
    e.preventDefault();
    closeSheet();
    router.push("/");
  };

  const handleWishlistClick = () => dispatch(openAuthModal());

  if (!user?.mobile) {
    return (
      <Button
        className="relative flex flex-col items-center lg:flex-row gap-1.5 h-auto p-2.5 lg:px-4 lg:py-2 bg-primary-darker lg:bg-black/10 lg:hover:bg-white/10 font-normal text-white rounded-md"
        onClick={handleWishlistClick}
      >
        <i className="bx bx-heart text-xl"></i>
        <p className="text-xs lg:hidden">Wishlist</p>
        {wishlist && wishlist.length > 0 && (
          <span className="size-5 p-1 absolute top-0 right-0 translate-x-1/4 -translate-y-1/4 bg-rose-600 text-white rounded-full flex justify-center items-center text-xs">
            {wishlist.length}
          </span>
        )}
      </Button>
    );
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger className="relative flex flex-col items-center lg:flex-row gap-1.5 h-auto p-2.5 lg:px-4 lg:py-2 bg-primary-darker lg:bg-black/10 lg:hover:bg-white/10 font-normal text-white rounded-md">
        <i className="bx bx-heart text-xl"></i>
        <p className="text-xs lg:hidden">Wishlist</p>
        {wishlist && wishlist.length > 0 && (
          <span className="size-5 p-1 absolute top-0 right-0 translate-x-1/4 -translate-y-1/4 bg-rose-600 text-white rounded-full flex justify-center items-center text-xs">
            {wishlist.length}
          </span>
        )}
      </SheetTrigger>
      <SheetContent className="w-[90%] sm:max-w-md py-6 px-4 flex flex-col gap-y-0">
        <SheetHeader>
          <SheetTitle className="flex gap-x-4 items-center">
            <Button
              variant="icon"
              className="p-0"
              onClick={() => setIsOpen(false)}
            >
              <i className="bx bx-arrow-from-left text-2xl"></i>
            </Button>
            <span>Wishlist</span>
          </SheetTitle>
        </SheetHeader>
        <Separator className="my-4" />
        <div className="grow flex flex-col gap-y-4 overflow-y-auto">
          {wishlist?.map((car) => (
            <WishlistCarCard key={car.slug} car={car} closeSheet={closeSheet} />
          ))}
          {!wishlist ||
            (wishlist.length === 0 && (
              <div className="grow flex flex-col gap-y-2 justify-center items-center">
                <div className="w-3/4 aspect-square">
                  <Image
                    src={emptyImg}
                    alt="an image indicating wishlist is empty"
                    className="object-cover object-center"
                  />
                </div>
                <h4 className="text-center font-medium">
                  Customise your wishlist to accelerate your automotive
                  fantasies
                </h4>
                <Link href="/" onClick={redirectToHome}>
                  <Button>Go to Homepage</Button>
                </Link>
              </div>
            ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}

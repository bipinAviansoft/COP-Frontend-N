"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CarModuleComparisonContext } from "@/contexts/car-module-comparison-context";
import { useContext, useEffect, useState } from "react";
import Button from "../ui/button";
import { Separator } from "../ui/separator";
import DrawerCarCard from "./comparison-car-card";
import Link from "next/link";

export default function ComparisonDrawer({ variants, selectedVariantSlug }) {
  const { cars, toggleCar } = useContext(CarModuleComparisonContext);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const selectedVariant = variants?.filter(
      (variant) => variant.slug === selectedVariantSlug
    )[0];

    toggleCar(selectedVariant);
  }, []);

  const compareHref = cars.map((car) => car.full_slug).join("-and-");

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      {cars.length > 1 && (
        <SheetTrigger className="bg-[#F58A07] text-white fixed -rotate-90 z-40 top-1/2 -translate-y-1/2 -right-14 rounded-b-none lg:text-lg lg:-right-[68px] rounded-t-md">
          <p className="py-2 px-4">My Comparison</p>
        </SheetTrigger>
      )}
      <SheetContent className="w-[90%] py-6 px-4 flex flex-col sm:max-w-md gap-y-0">
        <SheetHeader>
          <SheetTitle className="flex gap-x-4 items-center">
            <Button
              variant="icon"
              className="p-0"
              onClick={() => setIsOpen(false)}
            >
              <i className="bx bx-arrow-from-left text-2xl"></i>
            </Button>
            <span>Models matching your criteria</span>
          </SheetTitle>
        </SheetHeader>
        <Separator className="my-4" />
        <div className="flex flex-col gap-y-4 mb-4">
          {cars?.map((car, index) => {
            const { full_slug } = car;
            return <DrawerCarCard key={full_slug} index={index} car={car} />;
          })}
        </div>
        {cars.length > 1 && (
          <Link href={`/compare/${compareHref}`} className="ml-auto">
            <Button
              animated
              variant="primary-gradient"
              className="flex items-center gap-x-4"
            >
              <i className="bx bx-transfer text-2xl"></i> Compare
            </Button>
          </Link>
        )}
      </SheetContent>
    </Sheet>
  );
}

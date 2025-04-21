"use client";

import { usePrevNextButtons } from "@/hooks/use-prev-next-buttons";
import ClassNames from "embla-carousel-class-names";
import useEmblaCarousel from "embla-carousel-react";
import Button from "../ui/button";
import { cn } from "@/lib/utils";
import { useDotButton } from "@/hooks/use-dot-button";
import Image from "next/image";
import DevBug from "../ui/dev-bug";

export default function VariantGalley({ variantsGalleryData }) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      align: "center",
      loop: true,
    },
    [ClassNames()]
  );

  const { onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(emblaApi);

  const { selectedIndex } = useDotButton(emblaApi);

  const { color_name, image_mob, image } = variantsGalleryData[selectedIndex];

  return (
    <div className="bg-white py-4 px-3 rounded-sm" id="variant-gallery">
      <DevBug>
        <p>
          With less colors carousels stops working! Possibly need to recreate
          whole carousel with Slick.
        </p>
      </DevBug>
      <div className="relative mx-auto w-[65%] aspect-3/2">
        <Image
          src={image_mob}
          alt={color_name}
          fill
          className="object-cover object-center"
        />
      </div>
      <div className="flex flex-col items-center mb-6">
        <p className="font-medium">Picked Color</p>
        <p className="text-sm text-gray-500">{color_name}</p>
      </div>
      <div className="flex justify-center items-center gap-x-4">
        <Button
          variant="icon"
          onClick={onPrevButtonClick}
          className="p-1 bg-gray-700 text-white rounded-full text-lg"
        >
          <i className="bx bxs-chevron-left"></i>
        </Button>
        <div className="relative grow shrink-0 select-none max-w-64">
          <div className="relative overflow-hidden cursor-grab" ref={emblaRef}>
            <div className="flex touch-pan-y touch-pinch-zoom -ml-3">
              {variantsGalleryData.map((item) => {
                const {
                  id,
                  name,
                  color_name,
                  color_code,
                  dual_color_code,
                  image,
                  image_mob,
                } = item;

                return (
                  <div key={item.id} className="flex-[0_0_25%] min-w-0 pl-3">
                    <div className="w-full aspect-square rounded-full flex flex-col overflow-hidden">
                      <div className="grow flex flex-col p-[3px] gradient-bg-container overflow-hidden">
                        <div className="grow flex flex-col rounded-full p-0.5 bg-white overflow-hidden">
                          <div
                            className={cn(
                              "grow overflow-hidden rounded-t-full",
                              { "rounded-b-full": !dual_color_code }
                            )}
                            style={{ backgroundColor: color_code }}
                          ></div>
                          {dual_color_code && (
                            <div
                              className="grow overflow-hidden rounded-b-full"
                              style={{ backgroundColor: dual_color_code }}
                            ></div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <Button
          variant="icon"
          onClick={onNextButtonClick}
          className="p-1 bg-gray-700 text-white rounded-full text-lg"
        >
          <i className="bx bxs-chevron-right"></i>
        </Button>
      </div>
    </div>
  );
}

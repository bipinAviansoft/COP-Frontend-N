import Image from "next/image";
import { forwardRef } from "react";

const ElectricCarsCarousel = forwardRef(function ElectricCarsCarousel(
  { cars },
  ref
) {
  return (
    <div ref={ref} className="overflow-hidden select-none w-full">
      <ul className="flex touch-pan-y touch-pinch-zoom cursor-grab -ml-2">
        {cars.map((car) => {
          const { id, banner_image_mob, banner_image, image_alt } = car;
          return (
            <li key={id} className="flex flex-col flex-[0_0_100%] pl-2">
              <div className="relative w-3/4 aspect-7/4 mx-auto md:hidden">
                <Image
                  src={banner_image_mob}
                  alt={image_alt}
                  fill
                  sizes="75vw"
                />
              </div>
              <div className="relative w-full aspect-7/4 mx-auto hidden md:block">
                <Image src={banner_image} alt={image_alt} fill sizes="50vw" />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
});

export default ElectricCarsCarousel;

import { formatCarPrice } from "@/lib/utils";
import Image from "next/image";
import { Checkbox } from "../ui/checkbox";
import { CarModuleComparisonContext } from "@/contexts/car-module-comparison-context";
import { useContext } from "react";

export default function ComparisonCarCard({ car, index }) {
  const { toggleCar } = useContext(CarModuleComparisonContext);

  const {
    variant_image,
    ex_showroom_price,
    brand_name,
    model_name,
    variant_name,
  } = car;

  const formattedPrice = formatCarPrice(ex_showroom_price);

  const handleSelect = () => {
    toggleCar(car);
  };

  return (
    <div className="relative flex items-center gap-x-4 border rounded-md py-4 px-1">
      {index !== 0 && (
        <Checkbox
          checked
          onCheckedChange={handleSelect}
          className="absolute top-2 left-2 size-5 z-30"
        />
      )}
      <div className="relative w-32 aspect-5/3 rounded-lg overflow-hidden shrink-0">
        <Image
          src={variant_image}
          alt={`${brand_name} ${model_name} ${variant_name}`}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex flex-col items-start gap-y-1 pr-4">
        <p className="font-semibold">{`${brand_name} ${model_name} ${variant_name}`}</p>
        <p className="text-gray-500 font-medium">
          ₹ {formattedPrice.price} {formattedPrice.unit}
        </p>
      </div>
    </div>
  );
}

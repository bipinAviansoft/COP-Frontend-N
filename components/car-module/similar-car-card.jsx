"use client";

import { Separator } from "../ui/separator";
import { cn } from "@/lib/utils";
import { Checkbox } from "../ui/checkbox";
import Image from "next/image";
import { useContext } from "react";
import { CarModuleComparisonContext } from "@/contexts/car-module-comparison-context";

const FeatureTable = ({ features }) => {

  return (
    <table className="w-full table-fixed text-xs md:text-sm lg:text-base border-separate border-spacing-1">
      <tbody>
        {features &&
          Object.keys(features)?.map((key) => {
            return (
              <tr key={key}>
                <td className="text-gray-600 w-1/2">{key}</td>
                <td className="text-theme-black font-semibold text-right">
                  {features[key]}
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};

const CarDescription = ({
  brand_name,
  model_name,
  variant_name,
  ex_showroom_price,
  isSelectedCar,
}) => {
  return (
    <div className="flex flex-col px-4">
      <p
        className={cn("font-semibold md:text-lg line-clamp-1", {
          "text-primary-lighter": isSelectedCar,
          "text-theme-black": !isSelectedCar,
        })}
      >
        {brand_name} {model_name}
      </p>
      <p className="text-sm font-medium text-gray-500 mb-2 line-clamp-1">
        {variant_name}
      </p>
      <p className="font-semibold md:text-lg">
        ₹ {parseInt(ex_showroom_price).toLocaleString("en-IN")}*{" "}
        <span className="font-medium text-gray-500 text-xs">Ex-showroom</span>
      </p>
    </div>
  );
};

export default function SimilarCarCard({
  variantData,
  checkedForComparison = false,
  isSelectedCar = false,
}) {
  const { cars, toggleCar } = useContext(CarModuleComparisonContext);
  
  const {
    variant_image,
    brand_name,
    model_name,
    variant_name,
    feature_values,
    ex_showroom_price,
  } = variantData;

  const handleSelect = () => {
    toggleCar(variantData);
  };

  return (
    <div
      className={cn("p-1", {
        "bg-gradient-to-b from-[#0187c0] to-[#1c5fe200]": isSelectedCar,
        "bg-gray-50": !isSelectedCar,
      })}
    >
      <div className={cn({ "bg-white": isSelectedCar })}>
        <div
          className={cn("flex flex-col relative md:p-0", {
            "pb-2 pt-6 flex-col-reverse md:flex-col": !isSelectedCar,
            "pt-2 pb-6 bg-gradient-to-b from-[#1c5fe200] to-[#0093d01a]":
              isSelectedCar,
          })}
        >
          {!isSelectedCar && (
            <Checkbox
              className="absolute top-4 right-4 size-6 z-20"
              checked={Boolean(checkedForComparison)}
              onCheckedChange={handleSelect}
              disabled={cars.length >= 4 && !checkedForComparison}
            />
          )}
          <div className="flex items-center md:flex-col">
            <div className="relative w-1/2 md:w-full aspect-[4/3] shrink-0">
              <Image
                src={variant_image}
                alt={`${brand_name} ${model_name} ${variant_name}`}
                fill
                className="object-cover object-center"
              />
            </div>
            <div className="hidden md:block self-start">
              <CarDescription
                brand_name={brand_name}
                model_name={model_name}
                variant_name={variant_name}
                ex_showroom_price={ex_showroom_price}
                isSelectedCar={isSelectedCar}
              />
            </div>
            <div className="md:hidden px-2 py-4 flex flex-col justify-center">
              <FeatureTable features={feature_values} />
            </div>
          </div>
          <Separator className="my-2" />
          <div className="hidden md:flex px-2 py-4 flex-col justify-center">
            <FeatureTable features={feature_values} />
          </div>
          <div className="md:hidden">
            <CarDescription
              brand_name={brand_name}
              model_name={model_name}
              variant_name={variant_name}
              ex_showroom_price={ex_showroom_price}
              isSelectedCar={isSelectedCar}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

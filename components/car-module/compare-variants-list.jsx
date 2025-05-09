import Link from "next/link";
import { Checkbox } from "../ui/checkbox";
import { formatCarPrice } from "@/lib/utils";
import { useContext } from "react";
import { CarModuleComparisonContext } from "@/contexts/car-module-comparison-context";

export default function CompareVariantsList({
  variants,
  selectedVariantSlug,
  dataLimit,
  modelType,
}) {
  const { cars: carsSelectedForComparison, toggleCar } = useContext(
    CarModuleComparisonContext
  );

  return (
    <>
      <ul className="space-y-[10px] md:space-y-[20px]">
        {variants
          .slice(0, dataLimit === "full" ? variants.length : dataLimit)
          .map((variant) => {
            const {
              brand_name,
              model_name,
              variant_name,
              ex_showroom_price,
              feature_values,
              fuel_type,
              slug,
            } = variant;

            const isSelectedForComparison = carsSelectedForComparison.filter(
              (car) => {
                return car.full_slug === variant.full_slug;
              }
            ).length;

            // const isCurrent = carsSelectedForComparison.filter((car) => {
            //   return car.slug === selectedVariantSlug;
            // }).length;

            const formattedPrice = !isNaN(ex_showroom_price)
              ? formatCarPrice(ex_showroom_price)
              : ex_showroom_price;

            return (
              <>
                <li
                  key={`vari-cam-list-${ex_showroom_price}`}
                  className="bg-[#E3E3E333] rounded-[8px] p-[18px] border-[1px] border-[#8080808C] flex items-start justify-between flex-wrap space-y-[15px] md:space-y-0"
                >
                  <div className="w-full md:w-[50%] ">
                    <h3 className="text-[18px] md:text-[20px] leading-[20px] md:leading-[24px] font-[600] text-[#000000] mb-[10px] ">
                      <Link className="text-[#000000]" href={`/${slug}`}>
                        {variant_name}
                      </Link>
                    </h3>
                    <p className="text-[14px] font-[400] leading-[20px] text-[#565F64] mb-0 ">
                      {modelType == 0
                        ? feature_values?.type_of_fuel
                        : "Battery"}{" "}
                      | {feature_values?.type_of_transmission}
                    </p>
                    <div className="flex items-center gap-[20px] mt-[3px] ">
                      <p className="text-[14px] font-[400] leading-[20px] text-[#565F64] inline-flex items-center gap-[5px] mb-0">
                        <img src="/images/power-icon.png" alt="icon" />
                        {modelType == 0
                          ? feature_values?.displacement
                          : feature_values?.power_ev}
                      </p>
                      <p className="text-[14px] font-[400] leading-[20px] text-[#565F64] inline-flex items-center gap-[5px] mb-0">
                        <img src="/images/milage-icon.png" alt="icon" />
                        {modelType == 0
                          ? feature_values?.mileage
                          : feature_values?.battery_capacity}
                      </p>
                    </div>
                  </div>
                  <div className="w-full md:w-[25%]">
                    <p className="text-[18px] md:text-[24px] leading-[30px] font-[600] text-[#000000] mb-0">
                      ₹ {formattedPrice?.price} {formattedPrice?.unit}*
                    </p>
                    <p className="text-[14px] font-[400] leading-[20px] text-[#565F64]">
                      Ex-showroom Price
                    </p>
                  </div>
                  <div className="w-full md:w-[25%] text-start md:text-right">
                    {selectedVariantSlug === slug ? null : (
                      <>
                        <div className="flex items-center flex-row-reverse md:flex-row justify-end gap-[7px] mb-1 md:mb-2">
                          <p className="mb-0 text-[16px] font-[400] text-[#000000] ">
                            Add to Compare
                          </p>
                          <Checkbox
                            checked={Boolean(isSelectedForComparison)}
                            className="size-4 md:size-6 z-20 rounded-none border-[2px] border-[#000000] "
                            onCheckedChange={() => toggleCar(variant)}
                            disabled={
                              carsSelectedForComparison.length >= 4 &&
                              !isSelectedForComparison
                            }
                          />
                        </div>
                      </>
                    )}

                    <Link
                      href={`/${slug}/price`}
                      className="text-[14px] leading-[19px] font-normal text-[#0177AA] underline capitalize "
                    >
                      View On Road Price
                    </Link>
                  </div>
                </li>
              </>
            );
          })}
      </ul>
    </>
  );
}

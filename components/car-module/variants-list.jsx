import { cn, formatCarPrice } from "@/lib/utils";
import Link from "next/link";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

export default function VariantsList({
  variants,
  selectedVariantSlug,
  dataLimit,
  modelType,
}) {
  return (
    <>
      <ul className="p-0 m-0 mb-[10px] flex flex-col gap-[7px]">
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

            const formattedPrice = !isNaN(ex_showroom_price)
              ? formatCarPrice(ex_showroom_price)
              : ex_showroom_price;

            return (
              <>
                <li key={new Date().getTime() + 123}>
                  <Link href={`/${slug}`} className="form-check relative ">
                    <input
                      className="peer absolute top-1/2 transform -translate-y-1/2 left-4 border-gray-400 checked:bg-[#0177AA] checked:border-[#0177AA] "
                      type="radio"
                      name="variant"
                      id={`variant${variant}`}
                      defaultChecked={slug === selectedVariantSlug}
                    />
                    {/* <RadioGroup
                      className="peer absolute top-1/2 transform -translate-y-1/2 left-4 border-gray-400 checked:bg-[#0177AA] checked:border-[#0177AA]"
                      defaultChecked={slug === selectedVariantSlug}
                    /> */}

                    <label
                      className="pointer-events-none flex items-center justify-between w-full bg-white rounded-[16px] p-[10px] pl-[45px] pr-[17px] border-2 border-transparent gap-[15px] shadow-sm transition-all peer-checked:border-[#0177AA]"
                      htmlFor={`variant${variant}`}
                    >
                      <div className="variant-info min-w-[85px] flex flex-col gap-[4px]">
                        <h3 className="text-[16px] md:text-[18px] leading-[23px] md:leading-[26px] font-semibold text-black m-0">
                          {variant_name}
                        </h3>
                        <p className="text-[14px] leading-[19px] text-[#565F64] m-0">
                          {modelType == 0
                            ? feature_values?.type_of_fuel
                            : "Battery"}{" "}
                          | {feature_values?.type_of_transmission}
                        </p>
                      </div>
                      <div className="variant-info min-w-[85px] flex flex-col gap-[10px]">
                        <p className="text-[12px] leading-[16px] flex items-center gap-[8px]">
                          <img src="/images/power-icon.png" alt="icon" />{" "}
                          {modelType == 0
                            ? feature_values?.displacement
                            : feature_values?.power_ev}
                        </p>
                        <p className="text-[12px] leading-[16px] flex items-center gap-[8px]">
                          {feature_values?.mileage ||
                          feature_values?.battery_capacity ? (
                            <img src="/images/milage-icon.png" alt="icon" />
                          ) : null}
                          {modelType == 0
                            ? feature_values?.mileage
                            : feature_values?.battery_capacity}
                        </p>
                      </div>
                    </label>
                  </Link>
                </li>
              </>
            );
          })}
      </ul>
    </>
  );
}

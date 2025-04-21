import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn, formatCarPrice } from "@/lib/utils";
import { filterFeatures } from "./compare-car-details";

export default function BasicDetailsAccordion({
  selectedVariants,
  basicData,
  hideSimilar,
}) {
  const colorsList = [];
  const priceList = [];
  selectedVariants.forEach((variant) => {
    colorsList.push(variant.colors);
    priceList.push(variant.ex_showroom_price);
  });

  return (
    <AccordionItem value="item-1">
      <AccordionTrigger
        className="bg-gray-darker text-base lg:text-lg xl:text-xl p-3 md:px-5 md:py-4 text-white font-medium"
        showArrow={true}
      >
        Basic Details
      </AccordionTrigger>
      <AccordionContent>
        <table className="table-fixed w-full">
          <tbody>
            <tr className="flex align-middle bg-[#eae8e8]">
              <td className="w-full px-1 py-3 lg:p-4 text-xs md:text-sm text-gray-600 md:text-black text-center md:text-left lg:text-base font-semibold border-r border-gray-400">
                Colors
              </td>
              {colorsList.map((colors, index) => {
                const hexColors = colors.split(",");
                return (
                  <td
                    key={index}
                    className={cn(
                      "w-full px-1 py-3 lg:p-4 text-xs md:text-sm lg:text-base font-semibold text-center",
                      index !== colorsList.length - 1
                        ? "border-r border-gray-400"
                        : ""
                    )}
                  >
                    <div className="flex items-center justify-center flex-wrap mr-[15px]">
                      {hexColors.map((color, index) => {
                        const [primaryColor, secondaryColor] = color.split("-");

                        const style = {};

                        if (secondaryColor !== "NULL") {
                          style.backgroundImage = `linear-gradient(${primaryColor} 50%, ${secondaryColor} 50%)`;
                        } else {
                          style.backgroundColor = primaryColor;
                        }

                        return (
                          <div
                            key={index}
                            className="w-7 lg:w-10 h-7 lg:h-10 rounded-full block -mr-4 lg:-mr-5 border-2 border-white"
                            style={style}
                          ></div>
                        );
                      })}
                    </div>
                  </td>
                );
              })}
            </tr>
            <tr className="flex align-middle bg-transparent">
              <td className="w-full px-1 py-3 lg:p-4 text-xs md:text-sm text-gray-600 md:text-black text-center md:text-left lg:text-base font-semibold border-r border-gray-400">
                Ex-showroom Price
              </td>
              {priceList.map((price, index) => {
                const formattedPrice = formatCarPrice(parseFloat(price));
                return (
                  <td
                    key={index}
                    className={cn(
                      "w-full px-1 py-3 lg:p-4 text-xs md:text-sm lg:text-base font-semibold text-center",
                      index !== priceList.length - 1
                        ? "border-r border-gray-400"
                        : ""
                    )}
                  >
                    ₹ {formattedPrice.price} {formattedPrice.unit}
                  </td>
                );
              })}
            </tr>
            {filterFeatures(basicData, hideSimilar).map((feature, index) => {
              const { features_name, feature_value } = feature;
              return (
                <tr
                  key={features_name}
                  className={cn(
                    "flex align-middle",
                    index % 2 === 0 ? "bg-[#eae8e8]" : "bg-transparent"
                  )}
                >
                  <td className="w-full px-1 py-3 lg:p-4 text-xs md:text-sm text-gray-600 md:text-black text-center md:text-left lg:text-base font-semibold border-r border-gray-400">
                    {features_name}
                  </td>
                  {feature_value.map((value, index) => (
                    <td
                      key={index}
                      className={cn(
                        "w-full px-1 py-3 lg:p-4 text-xs md:text-sm lg:text-base font-semibold text-center",
                        index !== feature_value.length - 1
                          ? "border-r border-gray-400"
                          : ""
                      )}
                    >
                      {value ? (
                        value === "Yes " || value === "No " ? (
                          value === "Yes " ? (
                            <i className="bx bx-check text-[22px] text-green-500"></i>
                          ) : (
                            <i className="bx bx-x text-[22px] text-destructive"></i>
                          )
                        ) : (
                          value
                        )
                      ) : (
                        <i className="bx bx-x text-[22px] text-destructive"></i>
                      )}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </AccordionContent>
    </AccordionItem>
  );
}

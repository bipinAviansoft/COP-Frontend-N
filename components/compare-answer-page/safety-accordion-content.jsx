import { cn } from "@/lib/utils";
import { filterFeatures } from "./compare-car-details";

export default function SafetyAccordionContent({ features, hideSimilar }) {
  return (
    <table className="table-fixed w-full">
      <tbody>
        {filterFeatures(features, hideSimilar).map((feature, index) => {
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
  );
}

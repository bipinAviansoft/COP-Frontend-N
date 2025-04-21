import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { filterFeatures } from "./compare-car-details";

export default function SpecsAccordion({ data, hideSimilar }) {
  return (
    <Accordion type="multiple" className="flex flex-col gap-y-2 mt-2" defaultValue={data.map((_, index) => `Subitem-${_.spec_id}`)}>
      {data.map((subSpec) => {
        const { spec_id, spec_name, spec_image, features_name: features } = subSpec;

        return (
          <AccordionItem key={spec_id} value={`Subitem-${spec_id}`}>
            <AccordionTrigger className="bg-white text-sm lg:text-base xl:text-lg p-3 md:px-5 md:py-4 text-black font-semibold" showArrow={true}>
              <div className="flex items-center gap-2">
                <div className="relative size-5 md:size-6 lg:size-7">
                  <Image src={spec_image} alt={spec_name} fill />
                </div>
                {spec_name}
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <table className="table-fixed w-full">
                <tbody>
                  {filterFeatures(features, hideSimilar).map((feature, index) => {
                    const { features_name, feature_value } = feature;
                    return (
                      <tr key={features_name} className={cn("flex align-middle", index % 2 === 0 ? "bg-[#eae8e8]" : "bg-transparent")}>
                        <td className="w-full px-1 py-3 lg:p-4 text-xs md:text-sm text-gray-600 md:text-black text-center md:text-left lg:text-base font-semibold border-r border-gray-400">
                          {features_name}
                        </td>
                        {feature_value.map((value, index) => (
                          <td
                            key={index}
                            className={cn("w-full px-1 py-3 lg:p-4 text-xs md:text-sm lg:text-base font-semibold text-center", index !== feature_value.length - 1 ? "border-r border-gray-400" : "")}
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
      })}
    </Accordion>
  );
}

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import BasicDetailsAccordion from "./basic-details-accordion";
import SafetyAccordionContent from "./safety-accordion-content";
import SpecsAccordion from "./specs-accordion";

export const filterFeatures = (data, hideSimilar) => {
  return data.reduce((acc, feature) => {
    const { feature_value } = feature;

    if (!hideSimilar) {
      acc.push(feature);
      return acc;
    }

    const allSame = feature_value.every((value) => value === feature_value[0]);

    if (allSame) {
      return acc;
    }

    acc.push(feature);
    return acc;
  }, []);
};

export default function CompareCarDetails({
  selectedVariants,
  basicData,
  specsData,
  hideSimilar,
}) {
  return (
    <Accordion
      type="multiple"
      className="space-y-2"
      defaultValue={["item-1", "item-2", "item-3", "item-4"]}
    >
      <BasicDetailsAccordion
        selectedVariants={selectedVariants}
        basicData={basicData}
        hideSimilar={hideSimilar}
      />

      {specsData.map((spec, index) => {
        const { sc_name, spec_data } = spec;

        return (
          <AccordionItem key={sc_name} value={`item-${index + 2}`}>
            <AccordionTrigger
              className="bg-gray-darker text-base lg:text-lg xl:text-xl p-3 md:px-5 md:py-4 text-white font-medium"
              showArrow={true}
            >
              {sc_name}
            </AccordionTrigger>
            <AccordionContent>
              {sc_name !== "Safety" ? (
                <SpecsAccordion data={spec_data} hideSimilar={hideSimilar} />
              ) : (
                <SafetyAccordionContent
                  features={spec_data[0]?.features_name}
                  hideSimilar={hideSimilar}
                />
              )}
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}

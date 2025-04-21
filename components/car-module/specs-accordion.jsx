import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import SpecsDetailsList from "./specs-details-list";

export default function SpecsAccoridon({ data }) {
  const l1s = Object.keys(data);

  return (
    <Accordion type="single" collapsible className="flex flex-col gap-y-2">
      {l1s.map((l1) => {
        const l1Data = data[l1];
        const { image, name } = l1Data;
        return (
          <AccordionItem key={l1} value={l1}>
            <AccordionTrigger
              className="border p-3 md:px-4 md:py-3 rounded-md"
              showArrow={true}
            >
              <div className="flex items-center gap-x-4 md:gap-x-6">
                <div className="relative size-5 md:size-8">
                  <Image src={image} alt={name} fill />
                </div>
                <span className="text-sm md:text-base">{l1}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <SpecsDetailsList bgUrl={image} specsDetails={l1Data} />
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import Image from "next/image";
import FaqSpecImg from "@/public/images/faq_Specs.svg";
import FaqAccordion from "../ui/faq-accordion";

export default function FaqsCategoryWiseAccordion({ faqs }) {
  return (
    <Accordion type="single" collapsible className="flex flex-col gap-y-2">
      {faqs.map((faqCategory, index) => {
        const { type, value } = faqCategory;
        return (
          <AccordionItem key={index} value={index + type}>
            <AccordionTrigger
              className={cn(
                "px-2 py-3 lg:px-4 lg:py-5 bg-white text-base font-medium",
                {
                  "data-[state=closed]:border-b-[1px]":
                    index !== faqs.length - 1,
                }
              )}
              showArrow={true}
            >
              <span className="flex items-center gap-x-4">
                <Image src={FaqSpecImg} alt="" className="w-6" />
                {type}
              </span>
            </AccordionTrigger>
            <AccordionContent className="text-theme-black bg-white text-base">
              <FaqAccordion faqData={value} />
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}

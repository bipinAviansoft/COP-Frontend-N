import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

export default function FaqAccordion({ faqData }) {
  return (
    <Accordion type="single" collapsible className="w-full bg-white p-4">
      {faqData.map((faq, index) => {
        const { qus, ans } = faq;
        return (
          <AccordionItem key={index} value={index + qus}>
            <AccordionTrigger
              className={cn(
                "px-2 py-3 lg:px-4 lg:py-5 data-[state=closed]:border-stone-100 bg-white text-base md:text-lg font-medium data-[state=open]:bg-stone-200 data-[state=closed]:bg-white data-[state=open]:text-primary-lighter data-[state=open]:border !text-left",
                {
                  "data-[state=closed]:border-b-[1px]":
                    index !== faqData.length - 1,
                }
              )}
              showArrow={true}
            >
              {qus}
            </AccordionTrigger>
            <AccordionContent className="p-2 pt-[1px] lg:p-4 lg:pt-0 bg-stone-200 text-theme-black text-sm md:text-base">
              <span dangerouslySetInnerHTML={{ __html: ans }}></span>
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}

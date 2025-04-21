"use client";

import { useState } from "react";
import Image from "next/image";
import FaqSpecImg from "@/public/images/faq_Specs.svg";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import FaqAccordion from "../ui/faq-accordion";
import FaqsCategoryWiseAccordion from "./faqs-category-wise-accordion";

export default function FaqDetails({ faqs }) {
  const [activeTab, setActiveTab] = useState(faqs[0]?.type);

  const faqData =
    faqs.find((faqCategory) => faqCategory.type === activeTab)?.value || [];

  return (
    <div className="flex items-start gap-4">
      <div className="md:hidden w-full">
        <FaqsCategoryWiseAccordion faqs={faqs} />
      </div>

      <div className="hidden md:flex lg:flex-col lg:gap-2 w-[250px]">
        {faqs.map((faqCategory) => {
          const { type } = faqCategory;

          return (
            <button
              key={type}
              onClick={() => setActiveTab(type)}
              className={`px-2 py-2 text-xs lg:text-base lg:px-3 lg:py-2 font-medium text-black bg-white border-[1px] rounded-md flex items-center gap-2 ${
                activeTab === type
                  ? "border-[#00b6fe] shadow-[0_0_6px_#00b6fe]"
                  : "border-white"
              }`}
            >
              <Image src={FaqSpecImg} alt="" className="w-6" />
              {type}
            </button>
          );
        })}
      </div>

      <div className="hidden md:block w-full">
        <FaqAccordion faqData={faqData} />
      </div>
    </div>
  );
}

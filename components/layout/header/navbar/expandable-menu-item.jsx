"use client";
import { useState } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

export default function ExpandableSubMenu({ title, subMenuItems }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger
          className="bg-black/5 px-2.5 py-3 text-[#282C2F] text-xs font-semibold flex items-center justify-between"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span>{title}</span>
          <i
            className={cn(
              "bx bx-chevron-right text-xl transition-all delay-50",
              {
                "-rotate-90": isOpen,
              }
            )}
          ></i>
        </AccordionTrigger>
        <AccordionContent>
          {subMenuItems && (
            <ul>
              {subMenuItems?.map((item) => {
                const { subMenuItem } = item;
                return (
                  <li
                    key={subMenuItem}
                    className="bg-black/5 px-2.5 py-3 text-primary-lighter text-xs font-semibold flex items-center justify-between pl-8"
                  >
                    {subMenuItem}
                    <i className="bx bx-chevron-right text-xl"></i>
                  </li>
                );
              })}
            </ul>
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

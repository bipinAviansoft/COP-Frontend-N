import Image from "next/image";
import InsuranceOne from "@/public/images/faq_img.png";
import Button from "../ui/button";
import FaqAccordion from "../ui/faq-accordion";
import Link from "next/link";

export default function FaqSection({
  faqData,
  brandSlug,
  modelSlug,
  variantSlug,
}) {
  return (
    <>
      <div className="flex items-center justify-between mb-5 md:flex-wrap flex-row gap-2">
        <div className="flex items-center gap-2">
          <Image src={InsuranceOne} alt="" className="w-12 lg:w-16 xl:w-20" />
          <h3 className="text-xl md:text-[22px] lg:text-[28px] font-semibold">
            {" "}
            Frequently Asked Questions
          </h3>
        </div>

        <Link href={`/faqs/${brandSlug}/${modelSlug}/${variantSlug}`}>
          <Button
            animated
            className="px-3 lg:px-5 py-2 text-xs lg:text-sm font-medium uppercase"
          >
            View all FAQ’s
          </Button>
        </Link>
      </div>
      <FaqAccordion faqData={faqData} />
    </>
  );
}

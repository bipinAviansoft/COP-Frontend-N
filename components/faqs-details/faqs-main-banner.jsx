import FaqImg from "@/public/images/faq_img.png";
import Image from "next/image";
import Button from "../ui/button";
import Link from "next/link";

export default function FaqMainBanner({ name, imgUrl, fullSlug }) {
  return (
    <div className="flex flex-col sm:flex-row">
      <div className="flex items-start gap-2 w-full sm:w-1/2 lg:w-7/12">
        <Image src={FaqImg} alt="" className="w-12 lg:w-16 xl:w-20" />
        <div className="mt-1 md:mt-2 lg:mt-5">
          <h1 className="text-xl md:text-[22px] lg:text-[28px] font-normal">
            {" "}
            Frequently Asked Questions
          </h1>
          <h2 className="text-xl md:text-[22px] lg:text-[28px] font-bold my-2 lg:my-4">
            {name}
          </h2>
          {/* <Link href={`/test-drive/${fullSlug}`}>
            <Button
              animated
              className="px-3 lg:px-5 py-2 text-xs lg:text-sm font-medium uppercase"
            >
              Book a test drive
            </Button>
          </Link> */}
        </div>
      </div>
      <div className="w-full sm:w-1/2 lg:w-5/12">
        <div className="w-full h-[200px] xl:w-9/12 lg:h-[230px] relative">
          <Image
            src={imgUrl}
            alt=""
            fill
            className="object-cover object-center"
          />
        </div>
      </div>
    </div>
  );
}

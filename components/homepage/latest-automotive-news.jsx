"use client";

import { useEffect, useState } from "react";
import { usePrevNextButtons } from "@/hooks/use-prev-next-buttons";
import Button from "../ui/button";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
import { formatDistanceToNowStrict } from "date-fns";

export default function LatestAutomotiveNews({ blogs, title }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start" }, [
    Autoplay({ delay: 7000 }),
  ]);

  const {
    onNextButtonClick,
    onPrevButtonClick,
    nextBtnDisabled,
    prevBtnDisabled,
  } = usePrevNextButtons(emblaApi);

  // State to store time text for each blog
  const [relativeTimes, setRelativeTimes] = useState([]);

  useEffect(() => {
    const times = blogs?.map((blog) =>
      formatDistanceToNowStrict(new Date(blog.post_date), { addSuffix: true })
    );
    setRelativeTimes(times);
  }, [blogs]);

  return (
    <>
      {/* header */}
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-[18px] md:text-[24px] font-[600] leading-[28px] text-[#000000] m-0">
          {title ? `${title} News & Updates` : "Latest Car News Section"}
        </h2>
        <div className="flex items-center gap-x-2">
          <div className="hidden md:flex items-center gap-x-2">
            <Button
              onClick={onPrevButtonClick}
              disabled={prevBtnDisabled}
              className="size-10 flex justify-center items-center text-2xl h-auto"
            >
              <i className="bx bx-left-arrow-alt"></i>
            </Button>
            <Button
              onClick={onNextButtonClick}
              disabled={nextBtnDisabled}
              className="size-10 flex justify-center items-center text-2xl h-auto"
            >
              <i className="bx bx-right-arrow-alt"></i>
            </Button>
          </div>
        </div>
      </div>

      {/* carousel */}
      <div ref={emblaRef} className="overflow-hidden select-none">
        <ul className="flex touch-pan-y touch-pinch-zoom cursor-grab -ml-4">
          {blogs?.map((news, index) => {
            const { ID, news_image, brand, post_title } = news;
            const { url, link } = news_image;
            // const { name: author, image: authorImgUrl } = brand["0"];

            return (
              <li
                key={ID}
                className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.33%] xl:flex-[0_0_25%] pl-4 py-3 flex flex-col"
              >
                <Link
                  href={link || "/"}
                  className="grow p-4 rounded-xl bg-[#fafafa] flex flex-col"
                >
                  <div className="flex items-center justify-between mb-2">
                    {brand?.length > 0 ? (
                      <div className="flex items-center gap-x-2">
                        <div className="w-8 h-8 relative">
                          <img
                            src={brand["0"]?.image}
                            alt={brand["0"]?.name}
                            className="max-w-[32px] object-contain"
                          />
                        </div>
                        <span className="text-sm font-medium">
                          {brand["0"]?.name}
                        </span>
                      </div>
                    ) : null}
                    <span className="text-xs text-gray-darker">
                      {relativeTimes[index] || ""}
                    </span>
                  </div>
                  <div className="relative w-full aspect-5/3 rounded-lg overflow-hidden mb-4">
                    <img
                      className="object-cover"
                      src={url}
                      alt={`Image provided by ${brand["0"]?.name} for this news`}
                    />
                  </div>
                  <h3 className="text-[16px] font-semibold line-clamp-2 mb-2">
                    {post_title}
                  </h3>
                  <Button className="bg-[#e8effc] text-primary-darker rounded-full text-sm h-auto self-start mt-auto">
                    Read More <i className="bx bx-chevron-right text-xl"></i>
                  </Button>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

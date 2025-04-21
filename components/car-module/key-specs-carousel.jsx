"use client";

import Slider from "react-slick";
import KeySpecsSlide from "./key-specs-slide";
import Button from "../ui/button";
import { cn } from "@/lib/utils";

const NavigationBtn = ({ direction, onClick }) => {
  return (
    <Button
      variant="icon"
      className={cn(
        "p-1 bg-stone-600 text-white rounded-full text-lg absolute top-1/2 -translate-y-1/2 z-20",
        {
          "left-0 -translate-x-1/2": direction === "left",
          "right-0 translate-x-1/2": direction === "right",
        }
      )}
      onClick={onClick}
    >
      {direction === "left" ? (
        <i className="bx bxs-chevron-left"></i>
      ) : (
        <i className="bx bxs-chevron-right"></i>
      )}
    </Button>
  );
};

export default function KeySpecsCarousel({ keySpecsData }) {
  const settings = {
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <NavigationBtn direction="left" />,
    nextArrow: <NavigationBtn direction="right" />,
  };

  return (
    <>
      <div className="md:hidden">
        <Slider {...settings}>
          {Object.keys(keySpecsData).map((key) => (
            <KeySpecsSlide
              key={key}
              title={key}
              data={keySpecsData[key]}
              limit={4}
            />
          ))}
        </Slider>
      </div>
      <div className="hidden md:block">
        <Slider {...settings}>
          {Object.keys(keySpecsData).map((key) => (
            <KeySpecsSlide
              key={key}
              title={key}
              data={keySpecsData[key]}
              limit={5}
            />
          ))}
        </Slider>
      </div>
    </>
  );
}

"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import ReactSimpleImageViewer from "react-simple-image-viewer";
import Slider from "react-slick";

const PrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute left-[-10px] top-1/2 transform -translate-y-1/2 z-10 bg-[#656363] flex items-center justify-center text-white rounded-full p-1 w-5 h-5 lg:w-6 lg:h-6"
  >
    <span className="bx bx-chevron-left text-base md:text-lg"></span>
  </button>
);

const NextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute right-[-10px] top-1/2 transform -translate-y-1/2 z-10 bg-[#656363] flex items-center justify-center text-white rounded-full p-1 w-5 h-5 lg:w-6 lg:h-6"
  >
    <span className="bx bx-chevron-right text-base md:text-lg"></span>
  </button>
);

export default function GalleryCarousel({ data }) {
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);

  const [activeIndex, setActiveIndex] = useState(0);

  const sliderRef1 = useRef(null);
  const sliderRef2 = useRef(null);

  useEffect(() => {
    setNav1(sliderRef1.current);
    setNav2(sliderRef2.current);
  }, []); // Sync sliders on tab change

  useEffect(() => {
    if (sliderRef1.current) sliderRef1.current.slickGoTo(0);
    if (sliderRef2.current) sliderRef2.current.slickGoTo(0);
  }, []); //

  const handleBeforeChange = (_, newIndex) => {
    setActiveIndex(newIndex);
  };

  const openImageViewer = () => {
    setIsViewerOpen(true);
  };

  const closeImageViewer = () => {
    setIsViewerOpen(false);
  };

  const {
    graphic_file,
    graphic_file_thumb,
    graphic_file_alt,
    graphic_file_mob,
  } = data;

  return (
    <div className="p-2 lg:p-4">
      {/* Main Slider */}
      <div className="md:hidden">
        <Slider
          asNavFor={nav2}
          ref={sliderRef1}
          slidesToShow={1}
          infinite={true}
          arrows={false}
          beforeChange={handleBeforeChange}
        >
          {graphic_file_mob.map((slide, index) => (
            <div
              key={index}
              className="relative w-full aspect-[11/4]"
              onClick={openImageViewer}
            >
              <Image
                src={slide}
                alt={graphic_file_alt?.split(",")[index]}
                className="object-cover object-center"
                fill
              />
            </div>
          ))}
        </Slider>
      </div>

      <div className="hidden md:block">
        <Slider
          asNavFor={nav2}
          ref={sliderRef1}
          slidesToShow={1}
          infinite={true}
          arrows={false}
          beforeChange={handleBeforeChange}
        >
          {graphic_file.map((slide, index) => (
            <div
              key={index}
              className="relative w-full aspect-[11/5]"
              onClick={openImageViewer}
            >
              <Image
                src={slide}
                alt={graphic_file_alt?.split(",")[index]}
                className="object-cover object-center"
                fill
              />
            </div>
          ))}
        </Slider>
      </div>

      {isViewerOpen && (
        <div
          onClick={closeImageViewer}
          className="fixed inset-0 z-50 flex justify-center items-center"
        >
          <button
            onClick={closeImageViewer}
            className="absolute top-7 right-4 p-0 w-8 h-8 bg-[#a8a8a8] text-black flex items-center overflow-hidden justify-center rounded-md z-50"
          >
            <i className="bx bx-exit-fullscreen text-2xl "></i>
          </button>
          <ReactSimpleImageViewer
            src={graphic_file}
            currentIndex={activeIndex}
            onClose={closeImageViewer}
            closeOnClickOutside={false}
            disableScroll
            backgroundStyle={{ zIndex: 999 }}
          />
        </div>
      )}

      {/* Thumbnail Slider */}
      <Slider
        className="mt-1"
        asNavFor={nav1}
        ref={sliderRef2}
        slidesToShow={4}
        swipeToSlide
        /* focusOnSelect */
        infinite
        arrows
        prevArrow={<PrevArrow />}
        nextArrow={<NextArrow />}
        responsive={[
          {
            breakpoint: 991,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
            },
          },
        ]}
      >
        {graphic_file_mob.map((slide, index) => (
          <div
            key={index}
            className={cn(
              "p-1.5",
              activeIndex === index ? "bg-primary-gradient p-1" : "bg-white"
            )}
          >
            <div className="cursor-pointer relative w-full aspect-[11/5]">
              <Image
                src={slide}
                alt={graphic_file_alt?.split(",")[index]}
                fill
                className="object-cover object-center"
              />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

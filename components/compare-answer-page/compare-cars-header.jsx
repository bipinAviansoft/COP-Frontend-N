"use client";

import Image from "next/image";
import Link from "next/link";
import AddCarIcon from "@/public/images/car_icon.svg";
import CompareCarImg from "@/public/images/compare-img.webp";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Button from "../ui/button";
import { useEffect, useState } from "react";

export default function CompareCarsHeader({
  selectedVariants,
  hideSimilar,
  toggleSimilarFeatures,
  openModal,
  removeCar,
  setIndexToReplace,
}) {
  const [showAddCarCard, setShowAddCarCard] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setShowAddCarCard(window.scrollY <= 40);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  });

  return (
    <div className="grid grid-cols-12 lg:grid-cols-[repeat(auto-fit,minmax(0,1fr))] xl:grid-cols-[repeat(auto-fit,minmax(0,1fr))] gap-2 xl:gap-4 p-3 md:p-4 bg-[#dbdfe2] rounded-md items-center sticky top-0 z-20">
      <div className="col-span-12 lg:col-span-1 relative h-full flex lg:justify-center flex-row justify-between lg:flex-col lg:gap-y-4 items-center lg:items-start">
        <Popover>
          <PopoverTrigger className="w-[30px] h-[30px] lg:w-[40px] lg:h-[40px] mr-3 flex items-center justify-center bg-[#74AFC9] rounded-lg p-1">
            <i className="bx bxs-share bx-flip-horizontal text-xl lg:text-2xl text-white"></i>
          </PopoverTrigger>
          <PopoverContent className="w-auto bg-transparent border-none shadow-none p-0 absolute left-[-10px] top-1 lg:left-10 lg:-top-11 z-30">
            <ul className="list-none flex gap-2 items-center lg:flex-row flex-col">
              <li className=" w-[25px] h-[25px] lg:w-[35px] lg:h-[35px] flex items-center justify-center cursor-pointer">
                <i className="text-lg lg:text-2xl !flex items-center justify-center bx bxl-whatsapp  bg-white w-full h-full rounded-full text-[#075e54] p-1 shadow-[0.5px_0.87px_4px_#2c2c2cba] "></i>
              </li>
              <li className="flex w-[25px] h-[25px] lg:w-[35px] lg:h-[35px] items-center justify-center cursor-pointer">
                <i className="text-lg lg:text-2xl !flex items-center justify-center bx bx-link-alt bx bxs-message-rounded-dots  bg-white w-full h-full rounded-full text-[#00b6fe] p-1 shadow-[0.5px_0.87px_4px_#2c2c2cba]"></i>
              </li>
              <li className=" w-[25px] h-[25px] lg:w-[35px] lg:h-[35px] flex items-center justify-center cursor-pointer">
                <i className="text-lg lg:text-2xl !flex items-center justify-center bx bx-link-alt bg-white w-full h-full rounded-full text-[#023452] p-1 shadow-[0.5px_0.87px_4px_#2c2c2cba]"></i>
              </li>
            </ul>
          </PopoverContent>
        </Popover>
        <div className="flex flex-row items-center gap-x-2 lg:flex-col lg:items-start lg:gap-y-4">
          <h1 className="text-base lg:text-xl xl:text-3xl font-semibold text-gray-800 ">
            Your <strong> Compare </strong>
          </h1>
          <div className="inline-flex items-center gap-x-3 bg-primary-darker px-2 py-2 rounded-md">
            <Checkbox
              id="terms"
              className="border-white !bg-transparent size-5"
              checked={hideSimilar}
              onCheckedChange={toggleSimilarFeatures}
            />
            <label
              htmlFor="terms"
              className="whitespace-nowrap text-xs xl:text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-white"
            >
              Hide Similar Features
            </label>
          </div>
        </div>
      </div>
      {selectedVariants.map((variant, index) => {
        const { brand_name, model_name, variant_name, variant_image, slug } =
          variant;

        const handleEditClick = () => {
          setIndexToReplace(index);
          openModal();
        };

        return (
          <div
            key={slug}
            className="col-span-6 md:col-span-3 lg:col-span-1 relative h-full"
          >
            <div className="block bg-white h-[65%] lg:h-[70%] w-full absolute left-0 bottom-0 -z-0 rounded-lg"></div>
            {selectedVariants.length > 2 && (
              <Button
                className="bg-gray-500 rounded-full size-6 flex items-center justify-center text-white absolute right-1 -top-1 z-[2] p-0"
                onClick={() => removeCar(variant.slug)}
              >
                <i className="bx bx-x text-sm lg:text-base"></i>
              </Button>
            )}
            <div className="min-h-[auto] lg:min-h-[160px] xl:min-h-[200px] p-1 flex items-center justify-center">
              <div className="rounded-md h-full w-full">
                <div className="flex items-center justify-center flex-col h-full">
                  <div className="relative w-full max-w-[140px] h-[80px] xl:max-w-[200px] xl:h-[100px]">
                    <Image
                      src={variant_image}
                      alt={`${brand_name} ${model_name} ${variant_name}`}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <Link
                    href=""
                    className="text-center bg-[#01a8eb30] p-2 rounded-md w-full lg:w-[95%] mb-0 lg:mb-1 relative mt-3 lg:mt-5"
                  >
                    <Button
                      className="bg-[#282c2f] rounded-full p-0 size-6 flex items-center justify-center text-white absolute top-0 right-1 -translate-y-1/2"
                      onClick={handleEditClick}
                    >
                      <i className="bx bx-pencil text-sm lg:text-base"></i>
                    </Button>
                    <h4 className="text-sm lg:text-base xl:text-lg font-semibold  text-black whitespace-nowrap overflow-hidden text-ellipsis line-clamp-1 indent-0">
                      {brand_name} {model_name}
                    </h4>
                    <p className="text-sm  font-normal text-gray-500 text-ellipsis line-clamp-1 whitespace-nowrap overflow-hidden">
                      {variant_name}
                    </p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        );
      })}
      {showAddCarCard &&
        selectedVariants.length >= 2 &&
        selectedVariants.length < 4 && (
          <div className="hidden md:block col-span-6 md:col-span-3 lg:col-span-1 relative cursor-pointer h-full">
            <div className="block bg-white h-[65%] lg:h-[70%] w-full absolute left-0 bottom-0 -z-0 rounded-lg"></div>

            <div className="relative min-h-[auto] lg:min-h-[200px] p-1 flex items-center justify-center">
              <div className="rounded-md h-full w-full">
                {/* car not selecred div */}
                <div
                  className="flex items-center justify-center flex-col h-full"
                  onClick={openModal}
                >
                  <Image src={AddCarIcon} alt="" className="w-[70px] mb-3" />
                  <h4 className="text-sm md:text-base font-medium text-gray-500 text-center">
                    Add Car to Compare
                  </h4>
                </div>
              </div>
            </div>
          </div>
        )}
    </div>
  );
}

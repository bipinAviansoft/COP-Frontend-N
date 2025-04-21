"use client";
import React, { useState } from "react";
import Image from "next/image";
import FromToImg from "@/public/images/from_to.svg";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Button from "../ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { sendFuelRequest } from "@/lib/fetch-client";
import { openAuthModal } from "@/store";
import AddressInputModule from "../fuel-calculator-page/address-input-module";

export default function TollCalculatorDrawer() {
  const [isOpen, setIsOpen] = useState(true);

  const [fromData, setFromData] = useState(null);
  const [toData, setToData] = useState(null);

  const dispatch = useDispatch();
  const { user, wishlist: wishlistStore } = useSelector((state) => state.auth);

  const handleSubmit = async () => {
    if (!fromData || !toData) {
      toast.error("Please fill both locations.");
      return;
    }

    const finalPayload = {
      ...fromData,
      ...toData,
    };

    if (user?.mobile) {
      try {
        const response = await sendFuelRequest(
          "toll-tax/toll-calculator",
          finalPayload
        );
        // Optionally update local state to display result
      } catch (err) {
        console.error(err);
        toast.error("Failed to calculate fuel data");
      }
    } else {
      dispatch(openAuthModal({ modelIdToAddToWishlist: "" }));
    }
  };

  return (
    <>
      <div className="relative overflow-hidden pb-0 p-4 pt-0 lg:p-0">
        {/* Trigger Button */}
        <div
          onClick={() => setIsOpen(true)}
          className="absolute top-[50px] -left-2 text-left bg-primary-lighter rounded-full w-10 h-10 items-center justify-center hidden lg:flex z-0 cursor-pointer"
        >
          <i className="bx bxs-right-arrow text-2xl text-white"></i>
        </div>

        {/* Drawer */}
        <div
          className={`relative top-0 left-0 p-5 sm:p-8 xl:p-12 max-w-full lg:max-w-[600px] w-full lg:w-[90%] h-auto lg:h-[calc(100vh-120px)] 2xl:h-[calc(100vh-90px)] flex flex-col bg-[#fafafa] transform transition-transform rounded-3xl lg:rounded-none ${
            isOpen ? "translate-x-0" : "-translate-x-[110%]"
          }`}
        >
          {/* Close Button */}
          <div
            onClick={() => setIsOpen(false)}
            className="absolute top-[50px] -right-[15px] bg-primary-lighter rounded-full w-10 h-10 items-center justify-center hidden lg:flex cursor-pointer"
          >
            <i className="bx bxs-right-arrow bx-flip-horizontal text-2xl text-white"></i>
          </div>

          {/* Drawer Header */}
          <div className="mb-5">
            <h2 className="text-2xl md:text-3xl xl:text-4xl font-bold mb-2">
              Toll Tax calculator
            </h2>
            <p className="text-sm lg:text-base text-gray-600">
              Get well prepared for your trips by calculating your accurate toll
              costs based on your selected route.
            </p>
          </div>

          {/* Drawer Content */}
          <div className="overflow-auto h-full flex flex-col">
            <div className="flex gap-3 lg:gap-5 items-start">
              <Image
                src={FromToImg}
                alt=""
                className="w-8 md:w-10 mt-1 md:mt-0"
              />
              <div className="w-full flex flex-col gap-3 sm:gap-4 lg:gap-5 ">
                <AddressInputModule
                  onFromChange={(data) => setFromData(data)}
                  onToChange={(data) => setToData(data)}
                />

                <Collapsible>
                  <CollapsibleTrigger className="text-primary-lighter text-sm lg:text-base font-medium ">
                    Optional fuel Details
                  </CollapsibleTrigger>
                  <CollapsibleContent className="grid items-center gap-3 sm:gap-4 lg:gap-5 mt-4">
                    <div className="flex w-[200px] whitespace-nowrap items-center gap-2 lg:gap-5">
                      <Input
                        type="text"
                        placeholder="Enter Mileage"
                        className="w-auto bg-white border-[1px] border-gray-200 h-[40px] sm:h-[45px] focus-visible:ring-0 focus-visible:ring-offset-0"
                      />
                      <Label
                        htmlFor="name"
                        className="text-xs md:text-sm lg:text-base font-normal"
                      >
                        kmpl
                      </Label>
                    </div>
                    <div className="grid w-[200px] items-center gap-2">
                      <Select>
                        <SelectTrigger className="w-auto bg-white focus:ring-0 focus:ring-offset-0 h-[40px] sm:h-[45px] border-[1px] border-gray-200">
                          <SelectValue placeholder="Select Fuel Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="Petrol">Petrol</SelectItem>
                            <SelectItem value="Diesel">Diesel</SelectItem>
                            <SelectItem value="CNG">CNG</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid w-[200px] items-center gap-2 mb-4">
                      <Input
                        type="number"
                        placeholder="Fuel Price"
                        value="94.3"
                        className="bg-white border-[1px] border-gray-200 h-[40px] sm:h-[45px] focus-visible:ring-0 focus-visible:ring-offset-0"
                      />
                    </div>
                  </CollapsibleContent>
                </Collapsible>

                <div className="-mt-4">
                  <Button
                    animated
                    variant="primary-gradient"
                    className="px-3 py-2 md:px-5 md:py-2 bg-primary-darker text-sm md:text-base font-medium"
                  >
                    Calculate Toll{" "}
                    <i className="bx bx-right-arrow-alt text-xl ml-1"></i>
                  </Button>
                  <p className="text-sm font-medium text-gray-600 mt-2">
                    Note: Toll Calculation Based on 2-Axle [Non-commercial]
                  </p>
                </div>
              </div>
            </div>

            {/* Fuel Calculator Result */}
            <div className="flex flex-col gap-5 mt-8 w-full md:w-[70%] m-auto">
              <div className="flex items-center justify-start w-full gap-3">
                <h6 className="text-sm font-medium text-gray-500 w-[150px] md:w-[200px]">
                  Distance in KM:
                </h6>
                <span className="text-sm font-medium bg-[#0177aa] text-white rounded-md py-1 px-1 w-[100px] text-center">
                  282 km
                </span>
              </div>
              <div className="flex items-center justify-start w-full gap-3">
                <h6 className="text-sm font-medium text-gray-500 w-[150px] md:w-[200px]">
                  Toll Cash Price:
                </h6>
                <div className="flex items-center gap-2">
                  <div className="text-sm font-medium bg-[#0177aa38] text-black rounded-md py-1 px-1 w-[100px] text-center">
                    ₹920
                  </div>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger className="flex items-center">
                        <i className="bx bx-info-circle text-gray-600 text-xl"></i>
                      </TooltipTrigger>
                      <TooltipContent className="bg-black text-white text-xs">
                        <p>Show All Tolls Cash Price Details</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
              <div className="flex items-center justify-start w-full gap-3">
                <h6 className="text-sm font-medium text-gray-500 w-[150px] md:w-[200px]">
                  Toll Tag Price:
                </h6>
                <div className="flex items-center gap-2">
                  <div className="text-sm font-medium bg-[#0177aa38] text-black rounded-md py-1 px-1 w-[100px] text-center">
                    ₹920
                  </div>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger className="flex items-center">
                        <i className="bx bx-info-circle text-gray-600 text-xl"></i>
                      </TooltipTrigger>
                      <TooltipContent className="bg-black text-white text-xs">
                        <p>Show All Tolls Cash Price Details</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
              <div className="flex items-center justify-start w-full gap-3">
                <h6 className="text-sm font-medium text-gray-500 w-[150px] md:w-[200px]">
                  Total Cost of travel:
                </h6>
                <div className="flex items-center gap-2">
                  <div className="text-sm font-medium bg-[#0177aa] text-white rounded-md py-1 px-1 w-[100px] text-center">
                    ₹920
                  </div>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger className="flex items-center">
                        <i className="bx bx-info-circle text-gray-600 text-xl"></i>
                      </TooltipTrigger>
                      <TooltipContent className="bg-black text-white text-xs">
                        <p>Show All Tolls Cash Price Details</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

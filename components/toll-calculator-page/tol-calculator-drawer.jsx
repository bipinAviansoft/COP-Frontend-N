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
import TollTaxDetails from "./toll-tax-details";
import HighwayTips from "./highway-tips";

export default function TollCalculatorDrawer() {
  const [isOpen, setIsOpen] = useState(true);

  const [fromData, setFromData] = useState(null);
  const [toData, setToData] = useState(null);

  const dispatch = useDispatch();
  const { user, wishlist: wishlistStore } = useSelector((state) => state.auth);

  const [googleResponse, setGoogleResponse] = useState(null);

  const [MileageVal, setMileageVal] = useState("");
  const [fuelTypePrice, setFuelTypePrice] = useState("");
  const [distance, setDistance] = useState(0);
  const [literVal, setLiterVal] = useState(0);
  const [distanceFuelPrice, setDistanceFuelPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const [tollTagPrice, setTollTagPrice] = useState(0);
  const [tollCashPrice, setTollCashPrice] = useState(0);

  // const handleSubmit = async () => {
  //   if (!fromData || !toData) {
  //     toast.error("Please fill both locations.");
  //     return;
  //   }

  //   const finalPayload = {
  //     ...fromData,
  //     ...toData,
  //   };

  //   if (user?.mobile) {
  //     try {
  //       setLoading(true);
  //       const response = await sendFuelRequest(
  //         "toll-tax/toll-calculator",
  //         finalPayload
  //       );
  //       setLoading(false);
  //     } catch (err) {
  //       console.error(err);
  //       toast.error("Failed to calculate fuel data");
  //     }
  //   } else {
  //     dispatch(openAuthModal({ modelIdToAddToWishlist: "" }));
  //   }
  // };

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
        setLoading(true);
        const response = await sendFuelRequest(
          "toll-tax/toll-calculator",
          finalPayload
        );
        setGoogleResponse(response?.apiRes[0]);

        setDistance(
          response?.apiRes[0]?.result?.data?.json?.routes[0]?.summary?.distance
            ?.metric
        );
        setTollTagPrice(
          response?.apiRes[0]?.result?.data?.json?.routes[0]?.costs?.tag
        );
        setTollCashPrice(
          response?.apiRes[0]?.result?.data?.json?.routes[0]?.costs?.cash
        );

        if (parseInt(MileageVal) > 0 && parseInt(fuelTypePrice) > 0) {
          const literResult = parseInt(distance) / parseInt(MileageVal);
          const totalFuelPrice =
            parseInt(fuelTypePrice) * parseInt(literResult);

          setLiterVal(literResult.toFixed(2));
          setDistanceFuelPrice(totalFuelPrice);
        }

        setLoading(false);
        // Optionally update local state to display result
      } catch (err) {
        console.error(err);
        toast.error("Failed to calculate fuel data");
        setLoading(false);
      }
    } else {
      dispatch(openAuthModal({ modelIdToAddToWishlist: "" }));
    }
  };

  return (
    <>
      <section className="fuel_cal_section relative lg:py-0 py-5 h-auto lg:h-[calc(100vh-110px)] overflow-hidden">
        <div className="flex flex-wrap ">
          <div className="w-full lg:w-[40%] relative  pb-0 p-4 pt-0 lg:p-0">
            {/* Trigger Button */}
            <div
              onClick={() => setIsOpen(true)}
              className="absolute top-[50px] -left-2 text-left bg-primary-lighter rounded-full w-10 h-10 items-center justify-center hidden lg:flex z-0 cursor-pointer"
            >
              <i className="bx bxs-right-arrow text-2xl text-white"></i>
            </div>

            {/* Drawer */}
            <div
              className={`relative top-0 left-0 p-5 sm:p-8 xl:p-12 max-w-full w-full z-[2] h-auto lg:h-[calc(100vh-120px)] 2xl:h-[calc(100vh-90px)] flex flex-col bg-[#fafafa] transform transition-transform rounded-3xl lg:rounded-none ${
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
                <h1 className="text-2xl md:text-3xl xl:text-4xl font-bold mb-2">
                  Toll Tax calculator
                </h1>
                <p className="text-sm lg:text-base text-gray-600">
                  Get well prepared for your trips by calculating your accurate
                  toll costs based on your selected route.
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
                            value={MileageVal}
                            onChange={(e) => setMileageVal(e.target.value)}
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
                            className="bg-white border-[1px] border-gray-200 h-[40px] sm:h-[45px] focus-visible:ring-0 focus-visible:ring-offset-0"
                            value={fuelTypePrice}
                            onChange={(e) => setFuelTypePrice(e.target.value)}
                          />
                        </div>
                      </CollapsibleContent>
                    </Collapsible>

                    <div className="-mt-4">
                      <Button
                        animated
                        variant="primary-gradient"
                        className="px-3 py-2 md:px-5 md:py-2 bg-primary-darker text-sm md:text-base font-medium"
                        onClick={handleSubmit}
                      >
                        Calculate Toll{" "}
                        {loading ? (
                          <div className="inline-block w-5 h-5 border-[.15em] border-[solid] border-[currentColor] [border-right-color:transparent] rounded-[50%] animate-[.75s_linear_infinite_spinner-border] ml-2"></div>
                        ) : (
                          <i className="bx bx-right-arrow-alt text-xl ml-1"></i>
                        )}
                      </Button>
                      <p className="text-sm font-medium text-gray-600 mt-2">
                        Note: Toll Calculation Based on 2-Axle [Non-commercial]
                      </p>
                    </div>
                  </div>
                </div>

                {/* Fuel Calculator Result */}
                <div className="flex flex-col gap-5 mt-8 w-full md:w-[70%] m-auto">
                  {distance > 0 ? (
                    <div className="flex items-center justify-start w-full gap-3">
                      <h6 className="text-sm font-medium text-gray-500 w-[150px] md:w-[200px]">
                        Distance in KM:
                      </h6>
                      <span className="text-sm font-medium bg-[#0177aa] text-white rounded-md py-1 px-1 w-[100px] text-center">
                        {distance}
                      </span>
                    </div>
                  ) : null}
                  {literVal > 0 ? (
                    <div className="flex items-center justify-start w-full gap-3">
                      <h6 className="text-sm font-medium text-gray-500 w-[150px] md:w-[200px]">
                        Fuel Consumption:
                      </h6>
                      <span className="text-sm font-medium bg-[#0177aa] text-white rounded-md py-1 px-1 w-[100px] text-center">
                        {literVal}
                      </span>
                    </div>
                  ) : null}
                  {distanceFuelPrice > 0 ? (
                    <div className="flex items-center justify-start w-full gap-3">
                      <h6 className="text-sm font-medium text-gray-500 w-[150px] md:w-[200px]">
                        Fuel Price:
                      </h6>
                      <span className="text-sm font-medium bg-[#0177aa] text-white rounded-md py-1 px-1 w-[100px] text-center">
                        {distanceFuelPrice}
                      </span>
                    </div>
                  ) : null}

                  {tollCashPrice > 0 ? (
                    <div className="flex items-center justify-start w-full gap-3">
                      <h6 className="text-sm font-medium text-gray-500 w-[150px] md:w-[200px]">
                        Toll Cash Price:
                      </h6>
                      <div className="flex items-center gap-2">
                        <div className="text-sm font-medium bg-[#0177aa38] text-black rounded-md py-1 px-1 w-[100px] text-center">
                          ₹ {tollCashPrice}
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
                  ) : null}

                  {tollTagPrice > 0 ? (
                    <div className="flex items-center justify-start w-full gap-3">
                      <h6 className="text-sm font-medium text-gray-500 w-[150px] md:w-[200px]">
                        Toll Tag Price:
                      </h6>
                      <div className="flex items-center gap-2">
                        <div className="text-sm font-medium bg-[#0177aa38] text-black rounded-md py-1 px-1 w-[100px] text-center">
                          ₹ {tollTagPrice}
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
                  ) : null}
                  {/* <div className="flex items-center justify-start w-full gap-3">
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
                  </div> */}
                </div>
              </div>
            </div>
          </div>
          <TollTaxDetails googleResponse={googleResponse || null} />
        </div>
      </section>
      <section className="py-10 lg:py-20 bg-[#e3eef3] mt-12 lg:mt-0">
        <div className="container relative">
          <HighwayTips />
        </div>
      </section>
    </>
  );
}

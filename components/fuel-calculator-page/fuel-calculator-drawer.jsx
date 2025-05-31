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
import AddressInputModule from "./address-input-module";
import { sendFuelRequest } from "@/lib/fetch-client";
import { useDispatch, useSelector } from "react-redux";
import { openAuthModal } from "@/store";
import { toast } from "react-toastify";
import FuelBanner from "./fuel-banner";

export default function FuelCalculatorDrawer() {
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
          "toll-tax/fuel-calculator",
          finalPayload
        );
        setGoogleResponse(response?.apiRes[0]);
        setDistance(
          response?.apiRes[0]?.result?.data?.json?.routes[0]?.summary?.distance
            ?.metric
        );
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

  const handleOnCalcSubmit = () => {
    if (!MileageVal || !fuelTypePrice) {
      toast.error("Please enter valid values.");
      return;
    }

    const literResult = parseInt(distance) / parseInt(MileageVal);
    const totalFuelPrice = parseInt(fuelTypePrice) * parseInt(literResult);

    setLiterVal(literResult.toFixed(2));
    setDistanceFuelPrice(totalFuelPrice);
  };

  return (
    <>
      <div className="flex flex-wrap ">
        <div className="w-full lg:w-[40%] relative z-[2] p-4 pt-0 lg:p-0">
          {/* Toggle & Drawer */}
          <div
            onClick={() => setIsOpen(true)}
            className="absolute top-[50px] -left-2 bg-primary-lighter rounded-full w-10 h-10 hidden lg:flex items-center justify-center z-0 cursor-pointer"
          >
            <i className="bx bxs-right-arrow text-2xl text-white"></i>
          </div>

          <div
            className={`relative top-0 left-0 p-5 sm:p-8 xl:p-12 max-w-full lg:max-w-[100%] w-full lg:w-[100%] bg-[#fafafa] transform transition-transform rounded-3xl lg:rounded-none ${
              isOpen ? "translate-x-0" : "-translate-x-[110%]"
            }`}
          >
            <div
              onClick={() => setIsOpen(false)}
              className="absolute top-[50px] -right-[15px] bg-primary-lighter rounded-full w-10 h-10 hidden lg:flex items-center justify-center cursor-pointer"
            >
              <i className="bx bxs-right-arrow bx-flip-horizontal text-2xl text-white"></i>
            </div>

            <div className="mb-5">
              <h1 className="text-2xl md:text-3xl xl:text-4xl font-bold mb-2">
                Fuel Calculator
              </h1>
              <p className="text-sm lg:text-base text-gray-600">
                Plan your travel effectively by estimating fuel costs.
              </p>
            </div>

            <div className="overflow-auto h-full flex flex-col">
              <div className="flex gap-3 lg:gap-5 items-start">
                <Image
                  src={FromToImg}
                  alt=""
                  className="w-8 md:w-10 mt-1 md:mt-0"
                />
                <div className="w-full flex flex-col gap-3 sm:gap-4 lg:gap-5">
                  <AddressInputModule
                    onFromChange={(data) => setFromData(data)}
                    onToChange={(data) => setToData(data)}
                  />
                  <div className="flex flex-wrap gap-[20px] items-center justify-between">
                    <div>
                      <Button
                        animated
                        variant="primary-gradient"
                        onClick={handleSubmit}
                        className="px-3 py-2 md:px-5 md:py-2 bg-primary-darker text-sm md:text-base font-normal"
                      >
                        Calculate Distance{" "}
                        {loading ? (
                          <div className="inline-block w-5 h-5 border-[.15em] border-[solid] border-[currentColor] [border-right-color:transparent] rounded-[50%] animate-[.75s_linear_infinite_spinner-border] ml-2"></div>
                        ) : (
                          <i className="bx bx-right-arrow-alt text-xl ml-1"></i>
                        )}
                      </Button>
                    </div>
                    {googleResponse ? (
                      <div className="flex w-max bg-primary-lighter text-xs md:text-sm py-1 px-2 text-white rounded-md">
                        Distance:{" "}
                        {
                          googleResponse?.result?.data?.json?.routes[0]?.summary
                            ?.distance?.metric
                        }
                      </div>
                    ) : null}
                  </div>

                  {/* Vehicle Info */}
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label className="text-sm lg:text-base font-normal">
                        Vehicle Mileage
                      </Label>
                      <Input
                        placeholder="Enter Mileage"
                        className="input-style"
                        value={MileageVal}
                        onChange={(e) => setMileageVal(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col justify-end">
                      <Input value="KM/L" className="input-style" readOnly />
                    </div>
                  </div>

                  {/* Fuel Info */}
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label className="text-sm lg:text-base font-normal">
                        Fuel Type
                      </Label>
                      <Select>
                        <SelectTrigger className="input-style">
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
                    <div>
                      <Label className="text-sm lg:text-base font-normal">
                        Fuel Price (₹)
                      </Label>
                      <Input
                        type="number"
                        placeholder="Enter Price"
                        className="input-style"
                        value={fuelTypePrice}
                        onChange={(e) => setFuelTypePrice(e.target.value)}
                      />
                    </div>
                  </div>
                  {fuelTypePrice == "" ? null : (
                    <div className="flex w-max text-xs md:text-sm bg-primary-lighter py-1 px-2 text-white rounded-md">
                      Current Price: {fuelTypePrice} ₹/L
                    </div>
                  )}

                  {/* Submit */}
                  <div>
                    <Button
                      onClick={handleOnCalcSubmit}
                      animated
                      disabled={distance == 0}
                      variant="primary-gradient"
                      className="px-3 py-2 md:px-5 md:py-2 bg-primary-darker text-sm md:text-base font-normal"
                    >
                      Calculate Fuel{" "}
                      <i className="bx bx-right-arrow-alt text-xl ml-1"></i>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Result */}
              {literVal > 0 && distanceFuelPrice > 0 ? (
                <div className="mt-8">
                  <h3 className="text-2xl xl:text-3xl font-semibold text-center text-primary-lighter">
                    Total Fuel Consumption
                  </h3>
                  <div className="text-center mt-3">
                    <Label className="text-base text-primary-lighter">
                      Volume
                    </Label>
                    <h4 className="text-xl font-semibold bg-[#0177aa50] rounded-md py-2 px-1">
                      {literVal} Liter
                    </h4>
                  </div>
                  <div className="text-center mt-3">
                    <Label className="text-base text-primary-lighter">
                      Price
                    </Label>
                    <h4 className="text-xl font-semibold bg-[#0177aa50] rounded-md py-2 px-1">
                      ₹ {distanceFuelPrice}
                    </h4>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
        {/* <FuelBanner googleResponse={googleResponse || null} /> */}
        <FuelBanner googleResponse={googleResponse || null} />
      </div>
    </>
  );
}

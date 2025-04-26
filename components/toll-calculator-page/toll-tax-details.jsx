"use client";
import FuelMap from "../fuel-calculator-page/fuel-map";
import Button from "../ui/button";

import Image from "next/image";
import BannerImg from "@/public/images/fuel-calculator.png";
import { useState } from "react";

export default function TollTaxDetails({ googleResponse }) {
  const route = googleResponse?.result?.data?.json?.summary?.route || null;

  const [open, setOpen] = useState(true);

  let origin;
  let destination;
  if (route && route.length >= 2) {
    origin = {
      lat: route?.[0]?.location?.lat,
      lng: route?.[0]?.location?.lng,
    };
    destination = {
      lat: route?.[route.length - 1]?.location?.lat,
      lng: route?.[route.length - 1]?.location?.lng,
    };
  }

  const closeOnClick = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="relative w-full lg:w-[60%] flex flex-col justify-center">
        {googleResponse ? (
          <>
            <div className="">
              <FuelMap origin={origin} destination={destination} />
            </div>
          </>
        ) : (
          <div className="w-full p-4 lg:p-3 xl:p-16 ">
            <div>
              <Image src={BannerImg} alt="" className="w-auto mb-4" />
              <h3 className="text-xl lg:text-2xl xl:text-3xl w-full text-primary-lighter font-bold mb-2">
                Know your toll costs{" "}
                <span className="text-black"> before you go! </span>
              </h3>
              <p className="text-sm lg:text-base font-normal text-gray-500">
                Wondering how much fuel you will require for your next trip?
                Find it out at convenience with our FUEL CALCULATOR just by
                entering few details to get an estimate of fuel consumption.
              </p>
            </div>
          </div>
        )}
        {googleResponse?.result?.data?.json?.routes[0]?.tolls?.length > 0 ? (
          <div
            className={`${
              open ? "" : "hidden"
            }  absolute top-0 left-0 w-full h-auto py-5`}
          >
            <div className=" bg-white shadow-md rounded-2xl max-h-[400px] w-[90%] mx-auto overflow-auto ">
              <div className="flex justify-end items-center mt-3 mb-3 mr-3 md:mt-7 md:mb-4 md:mr-5 gap-3">
                <Button className="bg-[#d2d2d547] text-gray-500">
                  Download PDF <i className="bx bx-down-arrow-alt text-2xl"></i>
                </Button>
                <button
                  onClick={closeOnClick}
                  className="bg-[#d2d2d547] text-gray-500 p-2 flex items-center justify-center rounded-md"
                >
                  <i className="bx bx-x text-2xl"></i>
                </button>
              </div>
              <table className="table-auto w-full">
                <thead>
                  <tr>
                    <th className="text-left px-3 py-2 xl:px-5 xl:py-3 font-semibold whitespace-nowrap lg:text-lg xl:text-2xl">
                      Toll on this Route
                    </th>
                    <th className="text-left px-3 py-2 xl:px-5 xl:py-3 font-semibold whitespace-nowrap lg:text-base xl:text-xl text-gray-600 ">
                      Tag Cost{" "}
                    </th>
                    <th className="text-left px-3 py-2 xl:px-5 xl:py-3 font-semibold whitespace-nowrap lg:text-base xl:text-xl text-gray-600 ">
                      Cash Cost
                    </th>
                    {/* <th className="text-left px-3 py-2 xl:px-5 xl:py-3 font-semibold whitespace-nowrap lg:text-base xl:text-xl text-gray-600 ">
                      Monthly
                    </th> */}
                  </tr>
                </thead>
                <tbody>
                  {googleResponse?.result?.data?.json?.routes[0]?.tolls?.map(
                    (item, index) => {
                      return (
                        <>
                          <tr key={`toll-key-${index}`}>
                            <td className="px-3 py-2 xl:px-5 xl:py-3 text-primary-lighter text-sm text-left lg:text-base xl:text-lg font-semibold flex flex-col gap-1">
                              {item?.name} Toll Plaza
                              <span className="text-xs lg:text-sm xl:text-base text-gray-500">
                                Exit: {item?.road}{" "}
                              </span>
                            </td>
                            <td className="px-3 py-2 xl:px-5 xl:py-3 lg:text-base xl:text-lg text-gray-500">
                              ₹ {item?.tagCost}
                            </td>
                            <td className="px-3 py-2 xl:px-5 xl:py-3 lg:text-base xl:text-lg text-gray-500">
                              ₹ {item?.cashCost}
                            </td>
                            {/* <td className="px-3 py-2 xl:px-5 xl:py-3 lg:text-base xl:text-lg text-gray-500">
                              ₹135
                            </td> */}
                          </tr>
                        </>
                      );
                    }
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}

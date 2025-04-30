"use client";
import Image from "next/image";
import BannerImg from "@/public/images/fuel-calculator.png";
import FuelMap from "./fuel-map";
import { memo } from "react";

function FuelBanner({ googleResponse }) {
  const route = googleResponse?.result?.data?.json?.summary?.route || null;

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

  return (
    <>
      {googleResponse ? (
        <>
          <div className=" w-full lg:w-[60%]">
            <FuelMap origin={origin} destination={destination} />
          </div>
        </>
      ) : (
        <div className="w-full lg:w-[60%] flex flex-col justify-center p-4 lg:p-3 xl:p-16 ">
          <div>
            <Image src={BannerImg} alt="" className="w-auto mb-4" />
            <h3 className="text-xl lg:text-2xl xl:text-3xl w-full text-primary-lighter font-bold mb-2">
              Know your fuel costs{" "}
              <span className="text-black"> before you go! </span>
            </h3>
            <p className="text-sm lg:text-base font-normal text-gray-500">
              Wondering how much fuel you will require for your next trip? Find
              it out at convenience with our FUEL CALCULATOR just by entering
              few details to get an estimate of fuel consumption.
            </p>
          </div>
        </div>
      )}
    </>
  );
}

function propsAreEqual(prevProps, nextProps) {
  return (
    JSON.stringify(prevProps.googleResponse) ===
    JSON.stringify(nextProps.googleResponse)
  );
}

export default memo(FuelBanner, propsAreEqual);

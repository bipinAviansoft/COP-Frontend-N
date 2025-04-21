"use client";
import Image from "next/image";
import BannerImg from "@/public/images/fuel-calculator.png";

export default function FuelBanner({ googleResponse }) {
  const route = googleResponse?.result?.data?.json?.summary?.route || null;

  let embedUrl = "";
  let APIkey = process.env.NEXT_PUBLIC_GOOGLE_SEARCH_PLACES_API;

  if (route && route.length >= 2) {
    const origin = `${route[0].location.lat},${route[0].location.lng}`;
    const destination = `${route[route.length - 1].location.lat},${
      route[route.length - 1].location.lng
    }`;
    const url = googleResponse?.result?.data?.json?.routes[0]?.summary?.url;

    const waypointString = url?.split("to:")?.slice(1)?.join("+"); // Get only the part after the first 'to:'

    // Map through each waypoint and create a valid coordinate pair (lat, lng)
    const waypoints = waypointString
      .split("+")
      .map((point) => point.split(","))
      .map(([lat, lng]) => ({ lat: parseFloat(lat), lng: parseFloat(lng) }));

    embedUrl = `https://www.google.com/maps/embed/v1/directions?key=${APIkey}&origin=${origin}&destination=${destination}&waypoints=${waypoints}`;
  }

  return (
    <>
      {googleResponse ? (
        <>
          <div className="">
            <iframe
              className="!w-full !h-full"
              src={embedUrl}
              width="600"
              height="450"
              allowfullscreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </>
      ) : (
        <div className="p-4 lg:p-3 xl:p-16 order-1 lg:order-2">
          <Image src={BannerImg} alt="" className="w-auto mb-4" />
          <h3 className="text-xl lg:text-2xl xl:text-3xl w-full text-primary-lighter font-bold mb-2">
            Know your fuel costs{" "}
            <span className="text-black"> before you go! </span>
          </h3>
          <p className="text-sm lg:text-base font-normal text-gray-500">
            Wondering how much fuel you will require for your next trip? Find it
            out at convenience with our FUEL CALCULATOR just by entering few
            details to get an estimate of fuel consumption.
          </p>
        </div>
      )}
    </>
  );
}

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import LeftDialImg from "@/public/images/Left-Dial.svg";
import RightDialImg from "@/public/images/Right-Dial.svg";
import RightFuelDialImg from "@/public/images/right-engine-icon.svg";
import { cn } from "@/lib/utils";

export default function WarningLightsSection({ data }) {
  const topData = [];
  const bottomData = [];
  let temperatureData;
  let fuelIndicatorData;

  data.map((item) => {
    switch (item.name.toLowerCase()) {
      case "battery charging":
      case "engine oil":
      case "airbag":
      case "power steering control":
      case "brake":
      case "ignition switch":
        item.color = "red";
        break;
      case "headlight range":
        item.color = "green";
        break;
      default:
        item.color = "yellow";
    }

    if (item.position == 1) {
      topData.push(item);
    } else if (item.position == 2) {
      if (item.name === "Engine Temperature Warning Light") {
        temperatureData = item;
      } else if (item.name === "Fuel Indicator Warning Light") {
        fuelIndicatorData = item;
      } else {
        bottomData.push(item);
      }
    }
  });

  const [showInitialScrollingIcons, setShowIntialScrollingIcons] =
    useState(true);

  useEffect(() => {
    const timerID = setTimeout(() => {
      setShowIntialScrollingIcons(false);
    }, 4000);

    return () => {
      clearTimeout(timerID);
    };
  }, []);

  const [activeTab, setActiveTab] = useState(topData[0]);

  const { heading, sub_heading, info } = activeTab ? activeTab : "";

  return (
    <div className="flex flex-wrap">
      <div className="flex w-full mb-5 lg:mb-10 2xl:mb-10">
        <div className="w-[90%]">
          <h1 className="text-xl lg:text-2xl xl:text-3xl font-bold text-white mb-1 lg:mb-3">
            Car Warning Lights Guide{" "}
          </h1>
          <p className="text-sm lg:text-lg font-medium text-gray-400">
            With caronphone get informed with warning light guides to be safe
            when driving
          </p>
        </div>
        {!showInitialScrollingIcons && (
          <div className="w-full">
            <div className="flex flex-wrap w-full gap-1 lg:gap-3 justify-center">
              {topData.map((tab) => {
                const { id, name, icon } = tab;

                return (
                  <div key={id} className="bg-[#ffffff1c] rounded-sm">
                    <button
                      onClick={() => setActiveTab(tab)}
                      className={`px-1 py-1 lg:px-2 lg:py-1 rounded-sm border-2 invert ${
                        activeTab?.id === id
                          ? "border-gray-500"
                          : "border-transparent text-white"
                      }`}
                    >
                      <div className="relative w-[30px] lg:w-[45px] 2xl:w-[60px] aspect-[77/52]">
                        <Image
                          src={icon}
                          alt={`${name} icon`}
                          fill
                          className="object-cover object-center warning-light-green"
                        />
                      </div>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
      {/* when first time loaded w-1/3 added & after remove and add w-1/4 classname add and remove */}
      <div
        className={cn(
          "px-3 flex flex-col items-center transition-all duration-500",
          showInitialScrollingIcons ? "w-1/3" : "w-1/4"
        )}
      >
        <div className="relative">
          <Image src={LeftDialImg} alt="" className="w-full" />
          <span className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 flex flex-col tabular-nums text-white text-5xl font-semibold mb-2 animate-[counter_4s_ease-out_forwards] [counter-set:_num_var(--num)] before:content-[counter(num)]">
            <span className="sr-only">40</span>
            <span className="self-end text-lg">RPM</span>
          </span>
        </div>
        <button
          onClick={() => setActiveTab(temperatureData)}
          className={`px-1 py-1 lg:px-2 lg:py-1 rounded-sm border-2 -mt-10 ${
            activeTab?.id === temperatureData?.id
              ? "border-gray-500"
              : "border-transparent text-white"
          }`}
        >
          {!showInitialScrollingIcons && (
            <div className="relative w-[60px] lg:w-[80px] 2xl:w-[120px] aspect-[61/26]">
              <Image
                src={temperatureData?.icon}
                alt={`${temperatureData?.name} icon`}
                fill
                className="object-cover object-center"
              />
            </div>
          )}
        </button>
      </div>
      {/* when first time loaded w-1/3 added & after remove and add w-2/4 classname add and remove */}
      {showInitialScrollingIcons ? (
        <div className="w-1/4 px-3 mx-auto">
          <div className="text-center relative mb-5">
            <h3 className="text-xl lg:text-2xl xl:text-3xl font-bold text-white pb-3 uppercase border-b-[1px] border-gray-500">
              Warning Lights{" "}
            </h3>
            <hr className="w-[150px] h-[5px] bg-primary-gradient absolute left-0 bottom-0 border-0 animate-run" />
          </div>
          <div className="h-[300px] overflow-hidden">
            <div className="px-0 lg:px-5 grid grid-cols-4 xl:grid-cols-3 gap-2 xl:gap-5 overflow-x-scroll place-items-center animate-scroll">
              {data.map((iconItem) => (
                <div
                  key={iconItem.id}
                  className="bg-white w-full aspect-[77/52] rounded-sm lg:rounded-md xl:rounded-lg relative"
                >
                  <Image
                    src={iconItem.icon}
                    alt={`${iconItem.name} icon`}
                    fill
                    className="object-cover object-center"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div key={activeTab?.id} className="w-2/4 px-3">
          {/* end div */}
          <div className="tabs-body w-full mb-4 lg:mb-6 xl:mb-12">
            <div className="tab-content">
              <div className="text-center relative mb-2 lg:mb-5">
                <h3 className="text-sm md:text-base xl:text-2xl font-bold text-white pb-2 lg:pb-4 uppercase border-b-[1px] border-gray-500">
                  {heading}
                </h3>
                <hr className="w-[150px] h-[2px] md:h-[5px] bg-primary-gradient absolute left-0 bottom-0 border-0 animate-run" />
              </div>
              <div className="w-[90%] lg:w-4/5 m-[10px_auto] lg:m-[30px_auto] max-h-[150px] lg:max-h-[230px] xl:max-h[250px] 2xl:max-h-[350px] overflow-y-auto">
                {sub_heading &&
                  sub_heading.map((subHeading, index) => (
                    <>
                      <h4 className="text-sm lg:text-base xl:text-lg font-medium text-white mb-3">
                        Your Vehicle&apos;s warning indicates:
                      </h4>
                      <ul className="list-disc pl-8 flex flex-col gap-1">
                        {info[index].map((infoText, infoIndex) => (
                          <li
                            key={infoIndex}
                            className="text-xs lg:text-sm text-white"
                          >
                            {infoText}
                          </li>
                        ))}
                      </ul>
                      {index === 0 && (
                        <hr className="w-full h-[1px] bg-white border-0 my-4" />
                      )}
                    </>
                  ))}
              </div>
            </div>
          </div>
          {!showInitialScrollingIcons && (
            <div className="w-full">
              <div className="flex flex-wrap w-full gap-1 lg:gap-3 justify-center">
                {bottomData.map((tab) => {
                  const { id, name, icon } = tab;
                  return (
                    <div key={id} className="bg-[#ffffff1c] rounded-sm">
                      <button
                        onClick={() => setActiveTab(tab)}
                        className={`px-1 py-1 lg:px-2 lg:py-1 rounded-sm border-2 invert ${
                          activeTab?.id === id
                            ? "border-gray-500"
                            : "border-transparent text-white"
                        }`}
                      >
                        <div className="relative w-[30px] lg:w-[45px] 2xl:w-[60px] aspect-[77/52] bg-white">
                          <Image
                            src={icon}
                            alt={`${name} icon`}
                            fill
                            className="object-cover object-center"
                          />
                        </div>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
      {/* when first time loaded w-1/3 added & after remove and add w-1/4 classname add and remove */}
      <div
        className={cn(
          "px-3 flex flex-col items-center transition-all duration-500 relative",
          showInitialScrollingIcons ? "w-1/3" : "w-1/4"
        )}
      >
        <Image src={RightDialImg} alt="" className="w-full" />
        <div
          className={cn(
            "absolute bg-red-600 w-2 h-1/5 top-[10%] left-1/2 -translate-x-1/2 origin-bottom animate-revUp",
            showInitialScrollingIcons ? "h-[30%] top-[20%]" : "h-1/5 top-[10%]"
          )}
        ></div>

        <div className="relative -mt-10">
          <Image
            src={RightFuelDialImg}
            alt=""
            className="w-[90px] lg:w-[120px] xl:w-auto"
          />
          {!showInitialScrollingIcons && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="flex flex-wrap w-full ">
                <div className="bg-[#ffffff1c] rounded-sm">
                  <button
                    onClick={() => setActiveTab(fuelIndicatorData)}
                    className={`px-1 py-1 lg:px-2 lg:py-1 rounded-sm border-2 invert ${
                      activeTab?.id === fuelIndicatorData?.id
                        ? "border-gray-500"
                        : "border-transparent text-white"
                    }`}
                  >
                    <div className="w-[30px] lg:w-[45px] 2xl:w-[60px] aspect-[77/52] relative">
                      <Image
                        src={fuelIndicatorData?.icon}
                        alt={`${fuelIndicatorData?.name} icon`}
                        fill
                        className="object-center object-cover"
                      />
                    </div>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

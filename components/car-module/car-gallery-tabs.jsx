"use client";
import { forwardRef, useEffect, useState } from "react";
import GalleryCarousel from "./gallery-carousel";
import ScrollToMarginElement from "../ui/scroll-to-margin-element";

const GalleryTabs = forwardRef(function ({ galleryData }, ref) {
  const { Exterior: exteriorData, Interior: interiorData, Video } = galleryData;

  const [activeTab, setActiveTab] = useState("exterior");

  return (
    <>
      <ScrollToMarginElement id="gallery" />
      <div id="gallery" ref={ref} className="bg-white ">
        <div className="p-2 lg:p-4 border-b-[1px] border-gray-200 flex justify-between items-center">
          <h3 className="text-lg lg:text-xl text-black font-semibold">
            Gallery
          </h3>
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab("exterior")}
              className={`px-2 py-2 text-xs lg:text-base lg:px-3 lg:py-2 font-medium border-[1px] rounded-md border-gray-200 ${
                activeTab === "exterior"
                  ? "bg-primary-gradient text-white"
                  : "bg-transparent text-gray-500"
              }`}
            >
              Exterior
            </button>
            <button
              onClick={() => setActiveTab("interior")}
              className={`px-2 py-2 text-xs lg:text-base lg:px-3 lg:py-2 border-[1px] rounded-md border-gray-200 ${
                activeTab === "interior"
                  ? "bg-primary-gradient text-white"
                  : "bg-transparent text-gray-500"
              }`}
            >
              Interior
            </button>
            <button
              onClick={() => setActiveTab("video")}
              className={`px-2 py-2 text-xs lg:text-base lg:px-3 lg:py-2 border-[1px] rounded-md border-gray-200 ${
                activeTab === "video"
                  ? "bg-primary-gradient text-white"
                  : "bg-transparent text-gray-500"
              }`}
            >
              Video
            </button>
          </div>
        </div>

        {activeTab === "exterior" && <GalleryCarousel data={exteriorData} />}
        {activeTab === "interior" && <GalleryCarousel data={interiorData} />}
        {activeTab === "video" && (
          <div className="p-2 lg:p-4">
            <div className="w-full aspect-video">
              <video
                className="w-full"
                id="galleryVideo"
                loop
                autoPlay
                preload="none"
              >
                <source src="/video/coming-soon-video.mp4" type="video/mp4" />
                Your browser does not support video
              </video>
            </div>
          </div>
        )}
      </div>
    </>
  );
});

GalleryTabs.displayName = "GalleryTabs";

export default GalleryTabs;

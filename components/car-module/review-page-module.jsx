"use client";
import React from "react";
import CarHeaderData from "./car-header-data";
import CarModuleHeader from "./car-module-header";
import SimilarCarModel from "./similar-car-model";

import Link from "next/link";
import ReviewList from "./review-list";
import LatestAutomotiveNews from "../homepage/latest-automotive-news";

export default function ReviewPageModule({
  brandSlug,
  modelSlug,
  variantSlug,
  headerDetails,
  modelDescriptionData,
  similarModelsData,
  modelPage,
  reviewData,
  blogs,
}) {
  const selectedVariantSlug = modelPage
    ? `${brandSlug}/${modelSlug}`
    : `${brandSlug}/${modelSlug}/${variantSlug}`;

  const similarModelsCars = similarModelsData?.models;

  const similarModelBodyType = similarModelsCars?.filter(
    (item) => item?.car_type === headerDetails?.ct_name
  );

  const similarModelBudgetType = [...similarModelsCars].sort(
    (a, b) => a.min_price - b.min_price
  );

  return (
    <div className="bg-[#F3F4F9] ">
      <CarModuleHeader
        brandSlug={brandSlug}
        modelSlug={modelSlug}
        variantSlug={variantSlug}
        modelPage={modelPage}
        headerDetails={headerDetails}
        reviewData={reviewData?.totalRating > 0}
        subPage="Review & Rating"
      />
      <div className="pt-[15px] md:pt-[30px]">
        <CarHeaderData
          headerDetails={headerDetails}
          selectedVariantSlug={selectedVariantSlug}
          description={modelDescriptionData?.description}
          modelPage={modelPage}
          pageTitle="Reviews"
          reviewData={reviewData}
        />
      </div>
      {/* car spec & other design sec */}
      <div className="mt-[30px]">
        <div className="container">
          <div className="flex flex-wrap gap-[20px]">
            <div className="w-full xl:w-[calc(75%-10px)] ">
              <div className="space-y-[20px]">
                <div className="bg-white rounded-[16px]">
                  <div className="py-[20px] md:py-[35px] px-[15px] md:px-[40px] border-b-[1px] border-[#8080808C] ">
                    <h2 className=" text-[18px] md:text-[24px] font-[600] leading-[28px] text-[#000000] mb-0 ">
                      {headerDetails?.brand_name} {headerDetails?.model_name}{" "}
                      {modelPage ? "" : headerDetails?.variant_name} User
                      Reviews
                    </h2>
                  </div>
                  <ReviewList reviewData={reviewData} dataLimit="full" />
                </div>
                {blogs?.length > 0 ? (
                  <div className="bg-white rounded-[16px] py-[15px] md:py-[30px] px-[15px] md:px-[40px] w-full">
                    <LatestAutomotiveNews
                      blogs={blogs}
                      title={`${headerDetails?.brand_name} ${
                        headerDetails?.model_name
                      } 
                                                          ${
                                                            modelPage
                                                              ? ""
                                                              : headerDetails?.variant_name
                                                          }`}
                    />
                  </div>
                ) : null}
              </div>
            </div>
            <div className="w-full xl:w-[calc(25%-10px)]">
              <div className="">
                <SimilarCarModel
                  brandSlug={brandSlug}
                  similarModelsData={similarModelsData}
                  similarModelBodyType={similarModelBodyType}
                  similarModelBudgetType={similarModelBudgetType}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

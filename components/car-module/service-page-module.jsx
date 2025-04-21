import CarHeaderData from "./car-header-data";
import CarModuleHeader from "./car-module-header";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import DealersList from "./dealers-list";
import LatestAutomotiveNews from "../homepage/latest-automotive-news";
import SimilarCarModel from "./similar-car-model";

export default function ServicePageModule({
  brandSlug,
  modelSlug,
  variantSlug,
  headerDetails,
  modelDescriptionData,
  similarModelsData,
  dealersData,
  modelPage,
  blogs,
  reviewData,
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
    <>
      <div className="bg-[#F3F4F9] ">
        <CarModuleHeader
          brandSlug={brandSlug}
          modelSlug={modelSlug}
          variantSlug={variantSlug}
          modelPage={modelPage}
          reviewData={reviewData?.totalRating > 0}
          headerDetails={headerDetails}
          subPage="Services"
        />
        <div className="pt-[15px] md:pt-[30px]">
          <CarHeaderData
            headerDetails={headerDetails}
            selectedVariantSlug={selectedVariantSlug}
            description={modelDescriptionData?.description}
            modelPage={modelPage}
            pageTitle={`Services Center`}
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
                    <div className="pt-[20px] md:pt-[35px] px-[15px] md:px-[40px] ">
                      <h2 className=" text-[18px] md:text-[24px] font-[600] leading-[28px] text-[#000000] mb-0 ">
                        {headerDetails?.brand_name} {headerDetails?.model_name}{" "}
                        {modelPage ? "" : headerDetails?.variant_name} Services
                        Center
                      </h2>
                    </div>
                    <div className="pt-[20px] md:pt-[30px]">
                      <DealersList dealersData={dealersData} dataLimit="full" />
                    </div>
                  </div>
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
    </>
  );
}

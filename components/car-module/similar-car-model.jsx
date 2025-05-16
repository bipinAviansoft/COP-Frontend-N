import { formatCarPrice } from "@/lib/utils";
import Link from "next/link";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";

export default function SimilarCarModel({
  brandSlug,
  similarModelsData,
  similarModelBodyType,
  similarModelBudgetType,
}) {
  return (
    <>
      <div className="space-y-[20px]">
        {similarModelsData?.models?.length > 0 ? (
          <div className="py-[25px] px-[17px] bg-white rounded-[16px] ">
            <h2 className="text-[20px] font-[600] leading-[27px] text-[#000000] mb-[10px]">
              More from {similarModelsData?.brand_name}
            </h2>
            <ul className="space-y-[20px]">
              {similarModelsData?.models?.slice(0, 8).map((item, index) => {
                let formattedMinPrice = !isNaN(item?.min_price)
                  ? formatCarPrice(item?.min_price)
                  : item?.min_price;

                let formattedMaxPrice = !isNaN(item?.max_price)
                  ? formatCarPrice(item?.max_price)
                  : item?.max_price;

                return (
                  <li key={`similar-model-${index}`}>
                    <Link
                      href={`/${brandSlug}/${item?.slug}`}
                      className="flex items-center gap-[12px]"
                    >
                      <img
                        className="w-[138px] flex-[0_0_138px] h-[85px] rounded-[8px] object-cover "
                        src={item?.image}
                        alt={item?.name}
                      />
                      <div>
                        <h3 className="text-[16px] leading-[22px] font-[600] text-[#282C2F] mb-[5px] ">
                          {item?.name}
                        </h3>
                        <p className="text-[14px] leading-[19px] text-[#565F64] ">
                          ₹ {formattedMinPrice?.price}-
                          {formattedMaxPrice?.price} {formattedMaxPrice?.unit}*
                        </p>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : null}

        {similarModelBodyType?.length > 0 ? (
          <div className="py-[25px] px-[17px] bg-white rounded-[16px] ">
            <h2 className="text-[20px] font-[600] leading-[27px] text-[#000000] mb-[10px]">
              Similar Cars
            </h2>
            <div>
              <Tabs
                defaultValue="variantTab1"
                className="w-full flex flex-wrap relative"
              >
                <TabsList className="pl-[15px] py-0 !h-[auto] w-full flex items-end justify-start gap-[35px] pr-0 bg-transparent border-b-[1px] border-[#8080808C] scroll-bar-none overflow-x-auto md:overflow-x-visible rounded-none whitespace-nowrap mb-[20px]">
                  <TabsTrigger
                    value="variantTab1"
                    className="relative group text-[#24272C] flex gap-[6px] items-center justify-center data-[state=active]:text-[#0177AA] text-[16px] leading-[22px] font-[400] p-[5px] !shadow-none border-b-[1px] border-transparent data-[state=active]:border-[#0177AA] mb-[-1px] !rounded-none before:content-[''] before:absolute before:left-[50%] before:translate-x-[-50%] before:bottom-[-7px] before:w-0 before:h-0 before:border-l-[7px] before:border-l-[transparent] before:border-r-[7px] before:border-r-[transparent] before:border-t-[7px] before:border-t-[#0177AA] data-[state=active]:before:opacity-100 before:opacity-0"
                  >
                    Body Type
                  </TabsTrigger>
                  <TabsTrigger
                    value="variantTab2"
                    className="relative group text-[#24272C] flex gap-[6px] items-center justify-center data-[state=active]:text-[#0177AA] text-[16px] leading-[22px] font-[400] p-[5px] !shadow-none border-b-[1px] border-transparent data-[state=active]:border-[#0177AA] mb-[-1px] !rounded-none before:content-[''] before:absolute before:left-[50%] before:translate-x-[-50%] before:bottom-[-7px] before:w-0 before:h-0 before:border-l-[7px] before:border-l-[transparent] before:border-r-[7px] before:border-r-[transparent] before:border-t-[7px] before:border-t-[#0177AA] data-[state=active]:before:opacity-100 before:opacity-0"
                  >
                    Sort by Budget
                  </TabsTrigger>
                </TabsList>
                <div className="w-full">
                  <TabsContent value="variantTab1">
                    <ul className="space-y-[20px]">
                      {similarModelBodyType?.slice(0, 8).map((item, index) => {
                        let formattedMinPrice = !isNaN(item?.min_price)
                          ? formatCarPrice(item?.min_price)
                          : item?.min_price;

                        let formattedMaxPrice = !isNaN(item?.max_price)
                          ? formatCarPrice(item?.max_price)
                          : item?.max_price;

                        return (
                          <li key={`similar-body-type-${index}`}>
                            <Link
                              href={`/${brandSlug}/${item?.slug}`}
                              className="flex items-center gap-[12px]"
                            >
                              <img
                                className="w-[138px] flex-[0_0_138px] h-[85px] rounded-[8px] object-cover "
                                src={item?.image}
                                alt={item?.name}
                              />
                              <div>
                                <h3 className="text-[16px] leading-[22px] font-[600] text-[#282C2F] mb-[5px] ">
                                  {item?.name}
                                </h3>
                                <p className="text-[14px] leading-[19px] text-[#565F64] ">
                                  ₹ {formattedMinPrice?.price}-
                                  {formattedMaxPrice?.price}{" "}
                                  {formattedMaxPrice?.unit}*
                                </p>
                              </div>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </TabsContent>
                  <TabsContent value="variantTab2">
                    <ul className="space-y-[20px]">
                      {similarModelBudgetType
                        ?.slice(0, 8)
                        .map((item, index) => {
                          let formattedMinPrice = !isNaN(item?.min_price)
                            ? formatCarPrice(item?.min_price)
                            : item?.min_price;

                          let formattedMaxPrice = !isNaN(item?.max_price)
                            ? formatCarPrice(item?.max_price)
                            : item?.max_price;

                          return (
                            <li key={`budget-type-${index}`}>
                              <Link
                                href={`/${brandSlug}/${item?.slug}`}
                                className="flex items-center gap-[12px]"
                              >
                                <img
                                  className="w-[138px] flex-[0_0_138px] h-[85px] rounded-[8px] object-cover "
                                  src={item?.image}
                                  alt={item?.name}
                                />
                                <div>
                                  <h3 className="text-[16px] leading-[22px] font-[600] text-[#282C2F] mb-[5px] ">
                                    {item?.name}
                                  </h3>
                                  <p className="text-[14px] leading-[19px] text-[#565F64] ">
                                    ₹ {formattedMinPrice?.price}-
                                    {formattedMaxPrice?.price}{" "}
                                    {formattedMaxPrice?.unit}*
                                  </p>
                                </div>
                              </Link>
                            </li>
                          );
                        })}
                    </ul>
                  </TabsContent>
                </div>
              </Tabs>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}

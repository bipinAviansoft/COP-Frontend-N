import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { cn, formatCarPrice } from "@/lib/utils";
import { calculateEMI } from "@/lib/emi-calc";

export default function PriceVariantsList({
  variants,
  selectedVariantSlug,
  dataLimit,
  modelType,
}) {
  return (
    <>
      <Accordion
        type="single"
        collapsible
        className="w-full bg-white space-y-[10px] md:space-y-[20px]"
      >
        {variants?.map((item, idx) => {
          const formattedPrice = !isNaN(item?.ex_showroom_price)
            ? formatCarPrice(item?.ex_showroom_price)
            : item?.ex_showroom_price;

          let monthlyEmi = calculateEMI(item?.ex_showroom_price);

          return (
            <AccordionItem
              key={`accordian-tab-${idx}`}
              value={`item-${idx}`}
              className="border-[1px] border-[solid] border-[#8080808C] bg-[#E3E3E333] rounded-[8px]"
            >
              <AccordionTrigger
                className={cn(
                  "group w-full text-[16px] md:text-[20px] leading-[26px] font-semibold text-[#000000] items-center gap-[8px] bg-transparent [box-shadow:none] p-[16px] border-none"
                )}
                showArrow={true}
              >
                <span className="w-1/2 text-start">{item?.variant_name}</span>
                <span className="mr-auto text-start ml-[10px] font-bold ml-[20px] w-full max-w-[200px] text-[#0177AA] group-data-[state=open]:hidden">
                  Rs. {formattedPrice?.price} {formattedPrice?.unit}
                </span>
              </AccordionTrigger>
              <AccordionContent className="p-[16px] bg-transparent text-theme-black text-sm md:text-base">
                <div className="w-full">
                  <ul className="space-y-[20px]">
                    <li className="text-[14px] leading-[19px] font-[400] text-[#282C2F] flex flex-wrap items-center  ">
                      <span className="w-1/2 pr-2">Ex-showroom Price</span>
                      <strong className="w-1/2 pl-2 text-end">
                        {new Intl.NumberFormat("en-IN").format(
                          item?.ex_showroom_price
                        )}
                      </strong>
                    </li>
                    <li className="text-[14px] leading-[19px] font-[400] text-[#282C2F] flex flex-wrap items-center  ">
                      <span className="w-1/2 pr-2">RTO</span>
                      <strong className="w-1/2 pl-2 text-end">
                        {new Intl.NumberFormat("en-IN").format(item?.RTO)}
                      </strong>
                    </li>
                    <li className="text-[14px] leading-[19px] font-[400] text-[#282C2F] flex flex-wrap items-center  ">
                      <span className="w-1/2 pr-2">Insurance</span>
                      <strong className="w-1/2 pl-2 text-end">
                        {new Intl.NumberFormat("en-IN").format(item?.Insurance)}
                      </strong>
                    </li>
                    {/* <li className="text-[14px] leading-[19px] font-[400] text-[#282C2F] flex flex-wrap items-center  ">
                      <span className="w-1/2 pr-2">Ex-showroom Price</span>
                      <strong className="w-1/2 pl-2 text-end">814990</strong>
                    </li> */}
                  </ul>
                  <div className="flex items-center flex-wrap justify-between bg-[#80BBD433] px-[10px] py-[7px] mx-[0] my-[10px]">
                    <p className="m-0 text-[14px] leading-[19px] font-normal text-[#282C2F]">
                      Total On-Road Price
                    </p>
                    <div>
                      <strong className="text-[14px] text-[#282C2F] font-semibold block">
                        ₹{" "}
                        {new Intl.NumberFormat("en-IN").format(
                          item?.on_road_price
                        )}
                      </strong>
                    </div>
                  </div>
                  <div>
                    <div className="mt-[15px] max-w-[340px] ml-auto py-[10px] md:py-[15px] px-[10px] md:px-[20px] bg-[#EBEDF0] rounded-[16px] ">
                      <p className="text-[14px] font-[600] text-[#565F64] flex items-center gap-[7px] mb-[7px] ">
                        EMI Rs. {monthlyEmi}
                        <i>
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M8 0.1875C3.69219 0.1875 0.1875 3.69219 0.1875 8C0.1875 12.3078 3.69219 15.8125 8 15.8125C12.3078 15.8125 15.8125 12.3078 15.8125 8C15.8125 3.69219 12.3078 0.1875 8 0.1875ZM8 3.39062C8.20087 3.39062 8.39723 3.45019 8.56425 3.56179C8.73127 3.67339 8.86145 3.83201 8.93832 4.01759C9.01519 4.20317 9.0353 4.40738 8.99611 4.60439C8.95692 4.8014 8.86019 4.98237 8.71815 5.12441C8.57612 5.26644 8.39515 5.36317 8.19814 5.40236C8.00113 5.44155 7.79692 5.42144 7.61134 5.34457C7.42576 5.26769 7.26714 5.13752 7.15554 4.9705C7.04394 4.80348 6.98438 4.60712 6.98438 4.40625C6.98438 4.13689 7.09138 3.87856 7.28184 3.68809C7.47231 3.49763 7.73064 3.39062 8 3.39062ZM10.5 12.2188H5.8125V10.9688H7.53125V7.53125H6.28125V6.28125H8.78125V10.9688H10.5V12.2188Z"
                              fill="#565F64"
                            ></path>
                          </svg>
                        </i>
                        <span>For 5 Years</span>
                      </p>
                      <Link
                        href={`/emi-calculator/${selectedVariantSlug}`}
                        className="text-[14px] leading-[19px] font-[500] text-[#0177AA] capitalize !underline "
                      >
                        Calculate EMI Now
                      </Link>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </>
  );
}

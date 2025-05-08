import Link from "next/link";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import Button from "../ui/button";

export default function DealersList({ dealersData, dataLimit }) {
  return (
    <>
      <div>
        <Tabs
          defaultValue="dealerTab1"
          className="w-full flex flex-wrap relative"
        >
          <TabsList className="pl-[15px] md:pl-[40px] py-0 !h-[auto] w-full flex items-end justify-start gap-[35px] pr-0 bg-transparent border-b-[1px] border-[#8080808C] scroll-bar-none overflow-x-auto md:overflow-x-visible rounded-none whitespace-nowrap">
            <TabsTrigger
              value="dealerTab1"
              className="relative group text-[#24272C] flex gap-[6px] items-center justify-center data-[state=active]:text-[#0177AA] text-[16px] leading-[22px] font-[400] p-[5px] !shadow-none border-b-[1px] border-transparent data-[state=active]:border-[#0177AA] mb-[-1px] !rounded-none before:content-[''] before:absolute before:left-[50%] before:translate-x-[-50%] before:bottom-[-7px] before:w-0 before:h-0 before:border-l-[7px] before:border-l-[transparent] before:border-r-[7px] before:border-r-[transparent] before:border-t-[7px] before:border-t-[#0177AA] data-[state=active]:before:opacity-100 before:opacity-0"
            >
              Dealers
            </TabsTrigger>
          </TabsList>
          <div className="py-[15px] md:py-[30px] px-[15px] md:px-[40px] w-full">
            <TabsContent value="dealerTab1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-[10px] md:gap-[20px] ">
                {dealersData?.data
                  ?.slice(
                    0,
                    dataLimit === "full" ? dealersData?.data?.length : dataLimit
                  )
                  .map((item, index) => {
                    return (
                      <>
                        <div
                          key={`dealer-in-tab-${index}`}
                          className="bg-[#E3E3E333] border-[1px] border-[solid] border-[#8080808C] rounded-[16px] p-[18px]"
                        >
                          {item?.company_name == "-" ? null : (
                            <h3 className="text-[16px] font-semibold leading-[24px] text-[#000000] mt-[0] mx-[0] mb-[15px]">
                              {item?.company_name}
                            </h3>
                          )}
                          <ul className="space-y-[10px] mb-[20px]">
                            <li className="text-[14px] leading-[19px] font-normal text-[#565F64] flex gap-[20px]">
                              <svg
                                className="flex-[0_0_23px]"
                                width="23"
                                height="23"
                                viewBox="0 0 23 23"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M11.1458 2.55748L2.55748 11.1458L11.1458 19.7342L19.7342 11.1458L11.1458 2.55748ZM11.8614 0.409634L21.882 10.4302C22.0718 10.62 22.1784 10.8774 22.1784 11.1458C22.1784 11.4142 22.0718 11.6716 21.882 11.8614L11.8614 21.882C11.6716 22.0718 11.4142 22.1784 11.1458 22.1784C10.8774 22.1784 10.62 22.0718 10.4302 21.882L0.409634 11.8614C0.219879 11.6716 0.113281 11.4142 0.113281 11.1458C0.113281 10.8774 0.219879 10.62 0.409634 10.4302L10.4302 0.409634C10.62 0.219879 10.8774 0.113281 11.1458 0.113281C11.4142 0.113281 11.6716 0.219879 11.8614 0.409634ZM12.158 9.12147V6.59102L15.7006 10.1337L12.158 13.6763V11.1458H9.12147V14.1824H7.09711V10.1337C7.09711 9.86521 7.20375 9.60776 7.39357 9.41794C7.58339 9.22812 7.84085 9.12147 8.10929 9.12147H12.158Z"
                                  fill="#565F64"
                                ></path>
                              </svg>
                              {item?.address}
                            </li>
                            <li className="text-[14px] leading-[19px] font-normal text-[#565F64] flex gap-[20px]">
                              <svg
                                className="flex-[0_0_20px]"
                                width="20"
                                height="19"
                                viewBox="0 0 20 19"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M17.9592 18.9634C15.8505 18.9634 13.7671 18.5039 11.709 17.5848C9.65088 16.6657 7.77835 15.3624 6.09138 13.6748C4.40441 11.9871 3.1014 10.1146 2.18234 8.05715C1.26328 5.99972 0.803409 3.91632 0.802734 1.80693C0.802734 1.50328 0.903952 1.25023 1.10639 1.04779C1.30882 0.845359 1.56187 0.744141 1.86552 0.744141H5.96486C6.20103 0.744141 6.4119 0.82444 6.59747 0.98504C6.78304 1.14564 6.89269 1.33525 6.92643 1.55389L7.58435 5.09652C7.61808 5.36643 7.60965 5.59417 7.55904 5.77974C7.50843 5.96531 7.41565 6.12557 7.28069 6.26053L4.82615 8.74037C5.16355 9.36455 5.56403 9.96747 6.02761 10.5491C6.49119 11.1308 7.00167 11.6919 7.55904 12.2324C8.082 12.7554 8.63027 13.2405 9.20384 13.6879C9.7774 14.1353 10.3847 14.5442 11.0258 14.9147L13.4044 12.536C13.5562 12.3842 13.7546 12.2705 13.9995 12.1949C14.2445 12.1194 14.4847 12.0981 14.7202 12.1312L18.2122 12.8397C18.4484 12.9072 18.6424 13.0297 18.7942 13.2071C18.9461 13.3846 19.022 13.5826 19.022 13.8013V17.9006C19.022 18.2043 18.9208 18.4573 18.7183 18.6597C18.5159 18.8622 18.2629 18.9634 17.9592 18.9634Z"
                                  fill="#34C759"
                                ></path>
                              </svg>
                              {item?.phone_no}
                            </li>
                          </ul>

                          <Link
                            href={`${item?.map_location}`}
                            className="inline-block grow shrink-0"
                          >
                            <Button
                              animated
                              className="w-full gap-[10px] bg-primary-lighter text-white uppercase font-[500] md:font-semibold tracking-wide"
                            >
                              <svg
                                width="15"
                                height="15"
                                viewBox="0 0 15 15"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M14.3022 0.0407802C14.3941 0.00119196 14.4958 -0.00990055 14.5941 0.00893787C14.6924 0.0277763 14.7828 0.0756786 14.8536 0.146447C14.9243 0.217215 14.9722 0.307592 14.9911 0.405885C15.0099 0.504177 14.9988 0.605861 14.9592 0.69778L8.95922 14.6978C8.91928 14.791 8.85194 14.8699 8.76613 14.9239C8.68032 14.978 8.5801 15.0047 8.47877 15.0004C8.37744 14.9962 8.27979 14.9613 8.19879 14.9002C8.11778 14.8392 8.05725 14.755 8.02522 14.6588L6.10422 8.89578L0.34122 6.97578C0.244678 6.94394 0.160132 6.88343 0.0988569 6.80232C0.0375814 6.72121 0.00248623 6.62334 -0.00174999 6.52177C-0.00598621 6.4202 0.0208368 6.31976 0.0751448 6.23382C0.129453 6.14789 0.208665 6.08055 0.30222 6.04078L14.3022 0.0407802Z"
                                  fill="white"
                                ></path>
                              </svg>
                              Get Location
                            </Button>
                          </Link>
                        </div>
                      </>
                    );
                  })}
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </>
  );
}

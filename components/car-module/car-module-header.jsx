"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CarModuleHeader({
  brandSlug,
  modelSlug,
  variantSlug,
  modelPage,
  headerDetails,
  upcoming_stage,
  reviewLink,
  subPage,
  reviewData,
}) {
  const path = usePathname();

  let selectedSlug = modelPage
    ? `/${brandSlug}/${modelSlug}`
    : `/${brandSlug}/${modelSlug}/${variantSlug}`;

  return (
    <>
      <div className="bg-white shadow-md sticky top-0 z-40 scroll-bar-none overflow-x-auto">
        <div className="container flex flex-col lg:flex-row lg:justify-between ">
          <div className="text-sm md:text-base font-medium lg:font-semibold text-center text-gray-500 lg:self-end">
            <ul className="  flex items-center gap-x-[30px] lg:gap-x-[40px] ">
              <li>
                <Link
                  className={`text-[15px] md:text-[16px] leading-[140%] font-[400] text-[#565F64] py-[12px] md:py-[20px] inline-block whitespace-nowrap border-b-[2px] ${
                    path == selectedSlug
                      ? "!text-[#0177aa] border-[#0177aa]"
                      : "text-[#565F64] border-[transparent]"
                  } `}
                  href={`${selectedSlug}`}
                >
                  Overview
                </Link>
              </li>
              {upcoming_stage ? null : (
                <>
                  <li>
                    <Link
                      className={`text-[15px] md:text-[16px] leading-[140%] font-[400] text-[#565F64] py-[12px] md:py-[20px] inline-block whitespace-nowrap border-b-[2px] ${
                        path == `${selectedSlug}/specifications`
                          ? "!text-[#0177aa] border-[#0177aa]"
                          : "text-[#565F64] border-[transparent]"
                      } `}
                      href={`${selectedSlug}/specifications`}
                    >
                      Specs
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={`text-[15px] md:text-[16px] leading-[140%] font-[400] text-[#565F64] py-[12px] md:py-[20px] inline-block whitespace-nowrap border-b-[2px] ${
                        path == `${selectedSlug}/variants`
                          ? "!text-[#0177aa] border-[#0177aa]"
                          : "text-[#565F64] border-[transparent]"
                      } `}
                      href={`${selectedSlug}/variants`}
                    >
                      Variants
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={`text-[15px] md:text-[16px] leading-[140%] font-[400] text-[#565F64] py-[12px] md:py-[20px] inline-block whitespace-nowrap border-b-[2px] ${
                        path == `${selectedSlug}/price`
                          ? "!text-[#0177aa] border-[#0177aa]"
                          : "text-[#565F64] border-[transparent]"
                      } `}
                      href={`${selectedSlug}/price`}
                    >
                      Price
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={`text-[15px] md:text-[16px] leading-[140%] font-[400] text-[#565F64] py-[12px] md:py-[20px] inline-block whitespace-nowrap border-b-[2px] ${
                        path == `${selectedSlug}/images`
                          ? "!text-[#0177aa] border-[#0177aa]"
                          : "text-[#565F64] border-[transparent]"
                      } `}
                      href={`${selectedSlug}/images`}
                    >
                      Images
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={`text-[15px] md:text-[16px] leading-[140%] font-[400] text-[#565F64] py-[12px] md:py-[20px] inline-block whitespace-nowrap border-b-[2px] ${
                        path ==
                        `/emi-calculator/${brandSlug}/${modelSlug}/${variantSlug}`
                          ? "!text-[#0177aa] border-[#0177aa]"
                          : "text-[#565F64] border-[transparent]"
                      } `}
                      href={`/emi-calculator/${brandSlug}/${modelSlug}/${variantSlug}`}
                    >
                      EMI Calculator
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={`text-[15px] md:text-[16px] leading-[140%] font-[400] text-[#565F64] py-[12px] md:py-[20px] inline-block whitespace-nowrap border-b-[2px] ${
                        path == `${selectedSlug}/mileage`
                          ? "!text-[#0177aa] border-[#0177aa]"
                          : "text-[#565F64] border-[transparent]"
                      } `}
                      href={`${selectedSlug}/mileage`}
                    >
                      Mileage
                    </Link>
                  </li>
                  {reviewLink || reviewData ? (
                    <>
                      <li className="pr-3 lg:pr-0">
                        <Link
                          className={`text-[15px] md:text-[16px] leading-[140%] font-[400] text-[#565F64] py-[12px] md:py-[20px] inline-block whitespace-nowrap border-b-[2px] ${
                            path == `${selectedSlug}/rating-review`
                              ? "!text-[#0177aa] border-[#0177aa]"
                              : "text-[#565F64] border-[transparent]"
                          } `}
                          href={`${selectedSlug}/rating-review`}
                        >
                          Reviews
                        </Link>
                      </li>
                    </>
                  ) : null}
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="breadcrumb hidden md:inline-flex flex-nowrap">
          <Link href={"/"}>CarOnPhone</Link>
          <Link href={`/${brandSlug}`}>{headerDetails?.brand_name} Cars</Link>

          {modelPage ? (
            <>
              {subPage ? (
                <>
                  <Link href={`/${brandSlug}/${modelSlug}`}>
                    {headerDetails?.model_name}
                  </Link>
                  <span>
                    <Link href={`${path}`}>{subPage}</Link>
                  </span>
                </>
              ) : (
                <>
                  <span>
                    <Link href={`/${brandSlug}/${modelSlug}`}>
                      {headerDetails?.model_name}
                    </Link>
                  </span>
                </>
              )}
            </>
          ) : (
            <Link href={`/${brandSlug}/${modelSlug}`}>
              {headerDetails?.model_name}
            </Link>
          )}

          {modelPage ? null : (
            <>
              {subPage ? (
                <>
                  <Link href={`/${brandSlug}/${modelSlug}/${variantSlug}`}>
                    {headerDetails?.variant_name}
                  </Link>
                  <span>
                    <Link href={`${path}`}>{subPage}</Link>
                  </span>
                </>
              ) : (
                <>
                  <span>
                    <Link href={`/${brandSlug}/${modelSlug}/${variantSlug}`}>
                      {headerDetails?.variant_name}
                    </Link>
                  </span>
                </>
              )}
            </>
          )}
        </div>

        <div className="mob-breadcrumb flex md:hidden">
          <Link href={"/"}>CarOnPhone</Link>
          <Link href={`/${brandSlug}`}>{headerDetails?.brand_name} Cars</Link>

          {modelPage ? (
            <span>
              <Link href={`/${brandSlug}/${modelSlug}`}>
                {headerDetails?.model_name}
              </Link>
            </span>
          ) : (
            <Link href={`/${brandSlug}/${modelSlug}`}>
              {headerDetails?.model_name}
            </Link>
          )}

          {modelPage ? null : (
            <span>
              <Link href={`/${brandSlug}/${modelSlug}/${variantSlug}`}>
                {headerDetails?.variant_name}
              </Link>
            </span>
          )}
        </div>
      </div>
    </>
  );
}

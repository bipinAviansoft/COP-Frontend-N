import Slider from "react-slick";
import NextArrow from "../ui/NextArrow";
import PrevArrow from "../ui/PrevArrow";

export default function SafetyFeaturesList() {
  var safetySliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <Slider {...safetySliderSettings}>
        {[1, 2, 3].map((item, idx) => {
          return (
            <>
              <div
                key={`safety-list-${idx}`}
                className="w-full sm:w-[calc(100%-10px)] odd:mr-auto even:ml-auto"
              >
                <img
                  src="/images/sefty.png"
                  alt="img"
                  className="w-full h-auto sm:h-[268px] object-cover rounded-[16px] border-[1px] border-[#8080808C] "
                />
                <div className="pt-[15px] pl-0 md:pl-[30px] pt-[15px] pb-[0] flex gap-[10px]">
                  <svg
                    className="flex-[0_0_18px]"
                    width="18"
                    height="20"
                    viewBox="0 0 18 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.298 0.126819C8.69262 -0.0208285 9.12379 -0.040077 9.53 0.0718194L9.702 0.126819L16.702 2.75182C17.0569 2.88491 17.3667 3.11612 17.5953 3.41852C17.8239 3.72092 17.9618 4.08205 17.993 4.45982L18 4.62482V9.98782C18 11.6082 17.5624 13.1986 16.7336 14.591C15.9048 15.9834 14.7154 17.1262 13.291 17.8988L13.025 18.0378L9.671 19.7148C9.48632 19.807 9.28461 19.8601 9.07847 19.8708C8.87233 19.8815 8.66621 19.8495 8.473 19.7768L8.329 19.7148L4.975 18.0378C3.52561 17.3131 2.29878 16.2105 1.424 14.8464C0.549233 13.4824 0.0589805 11.9074 0.00500011 10.2878L0 9.98782V4.62482C5.81505e-06 4.24595 0.107627 3.87487 0.310334 3.55479C0.513041 3.23471 0.802495 2.97879 1.145 2.81682L1.298 2.75182L8.298 0.126819ZM9 1.99982L2 4.62482V9.98782C2.00003 11.2428 2.33745 12.4747 2.97696 13.5546C3.61646 14.6345 4.53451 15.5225 5.635 16.1258L5.87 16.2488L9 17.8138L12.13 16.2488C13.2527 15.6876 14.2039 14.8347 14.8839 13.7797C15.5638 12.7246 15.9476 11.5061 15.995 10.2518L16 9.98782V4.62482L9 1.99982ZM12.433 6.56082C12.613 6.38147 12.8544 6.27735 13.1084 6.26959C13.3623 6.26184 13.6097 6.35103 13.8003 6.51907C13.9908 6.6871 14.1103 6.92137 14.1344 7.17429C14.1585 7.42722 14.0854 7.67983 13.93 7.88082L13.847 7.97482L8.613 13.2098C8.42235 13.4004 8.16832 13.5144 7.89917 13.5301C7.63002 13.5458 7.36449 13.462 7.153 13.2948L7.057 13.2098L4.653 10.8058C4.47175 10.6263 4.36597 10.3842 4.35732 10.1293C4.34867 9.87429 4.4378 9.62565 4.60647 9.43424C4.77513 9.24282 5.01058 9.12312 5.26462 9.09962C5.51866 9.07611 5.77208 9.1506 5.973 9.30782L6.067 9.39082L7.835 11.1588L12.433 6.56082Z"
                      fill="black"
                    ></path>
                  </svg>
                  <div className="">
                    <h3 className="text-[16px] md:text-[20px] leading-[24px] text-[#000000] font-semibold mt-[0] mx-[0] mb-[5px]">
                      6 Airbags as Standard
                    </h3>
                    <p className="text-[14px] md:text-[16px] leading-[19px] md:leading-[22px] font-normal text-[#565F64] m-0">
                      Guarding you with six points of defense, always.
                    </p>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </Slider>
    </>
  );
}

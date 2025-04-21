"use client";

import useCompareCar from "@/hooks/use-compare-car";
import { useSelector } from "react-redux";

export default function CompareCarsName() {
  const selectedCars = useSelector((state) => state.compareCars.cars);

  return (
    <>
      <h1 className="text-[20px] leading-[30px] font-[600] text-[#013351] mb-4">
        {selectedCars &&
          selectedCars?.map((item, index) => {
            return (
              <span key={index + 232}>
                {index != 0 ? (
                  <span className="text-[#00b6fe]"> v/s </span>
                ) : (
                  ""
                )}
                {item.brand_name} {item.model_name}
              </span>
            );
          })}
      </h1>
    </>
  );
}

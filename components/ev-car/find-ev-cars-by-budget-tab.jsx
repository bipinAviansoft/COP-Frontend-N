"use client";

import { Slider } from "@/components/ui/slider";
import { EvCarContext } from "@/contexts/ev-car-context";
import { formatCarPrice } from "@/lib/utils";
import { useContext, useState } from "react";
import Button from "../ui/button";

const CUSTOM_STEPS = [
  200000, 300000, 400000, 500000, 600000, 700000, 800000, 900000, 1000000,
  1500000, 2000000, 2500000, 3000000, 3500000, 4000000, 4500000, 5000000,
  6000000, 7000000, 8000000, 9000000, 10000000, 20000000, 30000000, 40000000,
  50000000, 100000000, 200000000,
];

export default function FindEvCarsByBudgetTab() {
  const [values, setValues] = useState([
    CUSTOM_STEPS[0],
    CUSTOM_STEPS[CUSTOM_STEPS.length - 1],
  ]);

  const { updatePrice } = useContext(EvCarContext);

  const handleSearchClick = () => {
    updatePrice({ min: values[0], max: values[1] });
  };

  const handleValueChange = (newValues) => {
    const [minIndex, maxIndex] = newValues;
    let newMinValue = CUSTOM_STEPS[minIndex];
    let newMaxValue = CUSTOM_STEPS[maxIndex];

    // Ensure min doesn't exceed max
    if (newMinValue > newMaxValue) {
      newMinValue = newMaxValue;
    }

    // Ensure max doesn't go below min
    if (newMaxValue < newMinValue) {
      newMaxValue = newMinValue;
    }

    setValues([newMinValue, newMaxValue]);
  };

  const formattedMinValue = formatCarPrice(values[0], 0);
  const formattedMaxValue = formatCarPrice(values[1], 0);

  return (
    <>
      <div className="md:hidden text-primary-darker text-sm font-semibold flex justify-between gap-x-4 mb-3">
        <p>₹ 2 Lakh</p>
        <p>₹ 20 Cr</p>
      </div>
      <div className="flex justify-between gap-x-4 mb-6">
        <p className="hidden md:block shrink-0 text-primary-darker font-semibold ">
          ₹ 2 Lakh
        </p>
        <Slider
          min={0}
          max={CUSTOM_STEPS.length - 1}
          step={1}
          value={[
            CUSTOM_STEPS.indexOf(values[0]),
            CUSTOM_STEPS.indexOf(values[1]),
          ]}
          onValueChange={(newValues) => handleValueChange(newValues)}
          rangeClassName="bg-ev-gradient"
        />
        <p className="hidden md:block shrink-0 text-primary-darker font-semibold ">
          ₹ 20 Cr
        </p>
      </div>
      <div className="flex gap-x-3">
        <div className="grow flex gap-x-3">
          <p className="grow shrink-0 flex justify-between items-center bg-[#F2F6F7] py-2 px-4 rounded-md">
            <span>{formattedMinValue.price}</span>
            <span className="text-sm text-gray-600">
              {formattedMinValue.unit}
            </span>
          </p>
          <p className="grow shrink-0 flex justify-between items-center bg-[#F2F6F7] py-2 px-4 rounded-md">
            <span>{formattedMaxValue.price}</span>
            <span className="text-sm text-gray-600">
              {formattedMaxValue.unit}
            </span>
          </p>
        </div>
        <Button
          className="md:hidden rounded-full w-10 h-10 aspect-square p-1 shrink-0"
          size="lg"
          variant="ev-gradient"
          onClick={handleSearchClick}
        >
          <i className="bx bx-right-arrow-alt text-white text-2xl"></i>
        </Button>
        <Button
          animated
          className="hidden md:block shrink-0 uppercase px-10 py-3"
          variant="ev-gradient"
          onClick={handleSearchClick}
        >
          Search
        </Button>
      </div>
    </>
  );
}

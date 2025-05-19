"use client";

import { Slider } from "@/components/ui/slider";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import Button from "../ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

const CUSTOM_STEPS = [
  200000, 300000, 400000, 500000, 600000, 700000, 800000, 900000, 1000000,
  1500000, 2000000, 2500000, 3000000, 3500000, 4000000, 4500000, 5000000,
  6000000, 7000000, 8000000, 9000000, 10000000, 20000000, 30000000, 40000000,
  50000000, 100000000, 200000000,
];

function findNearestNumber(input) {
  return CUSTOM_STEPS.sort(
    (a, b) => Math.abs(a - input) - Math.abs(b - input)
  )[0];
}

export default function FindCarsByBudgetTab({ ev }) {
  const [values, setValues] = useState([
    CUSTOM_STEPS[0],
    CUSTOM_STEPS[CUSTOM_STEPS.length - 1],
  ]);

  const onChangeMinValue = (e) => {
    const value = parseInt(e.target.value);
    const newMinValue = findNearestNumber(value);

    setValues((prev) => [newMinValue, prev[1]]);
  };

  const onChangeMaxValue = (e) => {
    const value = parseInt(e.target.value);
    const newMaxValue = findNearestNumber(value);

    setValues((prev) => [prev[0], newMaxValue]);
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
          rangeClassName={cn("bg-primary-gradient", { "bg-ev-gradient": ev })}
        />
        <p className="hidden md:block shrink-0 text-primary-darker font-semibold ">
          ₹ 20 Cr
        </p>
      </div>
      <div className="flex gap-x-3">
        <Input
          value={values[0].toLocaleString("en-IN")}
          className="bg-[#F2F6F7]"
          readOnly
        />
        <Input
          value={values[1].toLocaleString("en-IN")}
          className="bg-[#F2F6F7]"
          readOnly
        />
        <Button
          className={cn(
            "lg:hidden rounded-full w-10 h-10 aspect-square p-1 shrink-0",
            { "bg-ev-gradient": ev }
          )}
          size="lg"
        >
          <Link
            href={`advanced-search?minPrice=${values[0]}&maxPrice=${values[1]}`}
          >
            <i className="bx bx-right-arrow-alt text-white text-2xl"></i>
          </Link>
        </Button>
        <Button
          animated
          className="hidden lg:flex items-center justify-center shrink-0 uppercase px-10 "
          asChild
        >
          <Link
            href={`advanced-search?minPrice=${values[0]}&maxPrice=${values[1]}`}
          >
            Search
          </Link>
        </Button>
      </div>
    </>
  );
}

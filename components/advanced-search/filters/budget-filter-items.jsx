"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Slider } from "@/components/ui/slider";
import { useEffect, useRef, useState } from "react";
import { formatCarPrice } from "@/lib/utils";

const CUSTOM_STEPS = [
  200000, 300000, 400000, 500000, 600000, 700000, 800000, 900000, 1000000,
  1500000, 2000000, 2500000, 3000000, 3500000, 4000000, 4500000, 5000000,
  6000000, 7000000, 8000000, 9000000, 10000000, 20000000, 30000000, 40000000,
  50000000, 100000000, 200000000,
];

export default function BudgetFilterItems({ items, selectedItems }) {
  const { minPrice, maxPrice } = selectedItems;
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const timerRef = useRef();

  const [values, setValues] = useState([
    minPrice || CUSTOM_STEPS[0],
    maxPrice || CUSTOM_STEPS[CUSTOM_STEPS.length - 1],
  ]);

  useEffect(() => {
    setValues([
      minPrice || CUSTOM_STEPS[0],
      maxPrice || CUSTOM_STEPS[CUSTOM_STEPS.length - 1],
    ]);
  }, [minPrice, maxPrice]);

  const updatePriceParams = (newMinValue, newMaxValue) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      const params = new URLSearchParams(searchParams);

      params.set("page", 1);
      params.set("minPrice", newMinValue);
      params.set("maxPrice", newMaxValue);

      replace(`${pathname}?${params.toString()}`);
    }, 750);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  };

  const handleValueChange = (newValues) => {
    let [minIndex, maxIndex] = newValues;

    let newMinValue = CUSTOM_STEPS[minIndex];
    let newMaxValue = CUSTOM_STEPS[maxIndex];

    setValues([newMinValue, newMaxValue]);
    updatePriceParams(newMinValue, newMaxValue);
  };

  const onCheckChange = (checked, range) => {
    const { min, max } = range;
    const params = new URLSearchParams(searchParams);

    params.set("page", 1);

    if (checked) {
      params.set("minPrice", min);
      params.set("maxPrice", max);
    } else {
      params.delete("minPrice");
      params.delete("maxPrice");
    }

    replace(`${pathname}?${params.toString()}`);
  };

  const rangeMinValue = formatCarPrice(values[0]);
  const rangeMaxValue = formatCarPrice(values[1]);

  return (
    <div className="px-6 py-4">
      <div className="mb-2 py-2">
        <Slider
          minStepsBetweenThumbs={1}
          min={0}
          max={CUSTOM_STEPS.length - 1}
          step={1}
          value={[
            CUSTOM_STEPS.indexOf(values[0]),
            CUSTOM_STEPS.indexOf(values[1]),
          ]}
          onValueChange={(newValues) => handleValueChange(newValues)}
          rangeClassName="bg-primary-gradient"
        />
      </div>
      <div className="text-primary-darker text-sm font-semibold flex justify-between gap-x-4 mb-3">
        <p>
          ₹ {parseInt(rangeMinValue.price)} {rangeMinValue.unit}
        </p>
        <p>
          ₹ {parseInt(rangeMaxValue.price)} {rangeMaxValue.unit}
        </p>
      </div>
      <span className="inline-block text-gray-darker text-sm md:text-base font-medium mb-2">
        Or select from the range below
      </span>
      <ul className="flex flex-col gap-y-3 max-h-52 overflow-y-auto">
        {items.map((item) => {
          const { price_range, count, min, max } = item;

          return (
            <li key={price_range} className="flex items-center space-x-4">
              <Checkbox
                id={price_range}
                className="size-5"
                value={price_range}
                checked={min === minPrice && max === maxPrice}
                onCheckedChange={(checked) =>
                  onCheckChange(checked, { min, max })
                }
              />
              <Label
                htmlFor={price_range}
                className="text-sm md:text-base pr-4"
              >
                {price_range}{" "}
                <span className="text-xs md:text-sm">({count})</span>
              </Label>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

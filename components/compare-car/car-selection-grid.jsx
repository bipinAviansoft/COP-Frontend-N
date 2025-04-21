"use client";

import useCompareCar from "@/hooks/use-compare-car";
import Link from "next/link";
import { useEffect, useState } from "react";
import CarSelectionModal from "../layout/modals/car-selection-modal";
import Button from "../ui/button";
import CarSelectionCard from "./car-selection-card";
import { useDispatch } from "react-redux";
import {
  addCompareCar,
} from "../../store/slices/compare-cars-slice";

export default function CarSelectionGrid({ brandModelsData }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { selectedCars, indexToReplace, setIndexToReplace, addCar, removeCar } =
    useCompareCar();

  const onSelectVariant = (variant, replaceIndex) => {
    addCar(variant, replaceIndex);
    setIsModalOpen(false);
  };

  let compareHref = "compare";

  const dispatch = useDispatch();

  const handleAddCar = () => {
    dispatch(addCompareCar(selectedCars));
  };

  useEffect(() => {
    handleAddCar();
  }, [selectedCars]);

  if (selectedCars.length > 1) {
    compareHref +=
      "/" + selectedCars.map((car) => car?.full_slug).join("-and-");
  }

  return (
    <div className="flex flex-col gap-y-4">
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {Array.from({ length: 4 }, (_, index) => (
          <CarSelectionCard
            key={index}
            carDetails={selectedCars[index]}
            isNext={index === selectedCars.length}
            openModal={setIsModalOpen}
            onRemoveCar={removeCar}
            setIndexToReplace={() => setIndexToReplace(index)}
          />
        ))}
      </div>
      {selectedCars.length > 1 && (
        <Link href={compareHref} className="self-center">
          <Button
            animated
            variant="primary-gradient"
            className="text-base px-8 uppercase"
          >
            Compare
          </Button>
        </Link>
      )}
      <CarSelectionModal
        brandModelsData={brandModelsData}
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        selectedCars={selectedCars}
        onSelectVariant={onSelectVariant}
        indexToReplace={indexToReplace}
      />
    </div>
  );
}

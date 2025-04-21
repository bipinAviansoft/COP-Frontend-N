"use client";

import CompareCarDetails from "@/components/compare-answer-page/compare-car-details";
import CompareCarsHeader from "@/components/compare-answer-page/compare-cars-header";
import { useEffect, useState } from "react";
import CarSelectionModal from "../layout/modals/car-selection-modal";
import { usePathname, useRouter } from "next/navigation";
import useCompareCar from "@/hooks/use-compare-car";

import { useDispatch } from "react-redux";
import { addCompareCar } from "../../store/slices/compare-cars-slice";

export default function CompareCarInteractiveWrapper({
  variantsSlug,
  data,
  brandModelsData,
}) {
  const pathname = usePathname();
  const { replace } = useRouter();
  const [hideSimilar, setHideSimilar] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    selectedCars,
    setSelectedCars,
    indexToReplace,
    setIndexToReplace,
    addCar,
    removeCar,
  } = useCompareCar();

  useEffect(() => {
    if (data?.variants?.length > 0) {
      setSelectedCars(data.variants);
    }
  }, [data]);

  const dispatch = useDispatch();

  const handleAddCar = () => {
    dispatch(addCompareCar(selectedCars));
  };

  useEffect(() => {
    handleAddCar();
  }, [selectedCars]);

  useEffect(() => {
    const updatedPathname = selectedCars
      .map((car) => car.full_slug)
      .join("-and-");
    if (pathname !== updatedPathname) {
      replace(updatedPathname);
    }
  }, [isModalOpen, selectedCars]);

  const toggleSimilarFeatures = () => setHideSimilar((prev) => !prev);

  const onSelectVariant = (variant, replaceIndex) => {
    /* const updatedPathname = selectedCars
      .reduce((acc, car, index) => {
        if (index !== replaceIndex) {
          return [...acc, car.full_slug];
        } else {
          return [...acc, variant.full_slug];
        }
      }, [])
      .join("-and-");
    if (pathname !== updatedPathname) {
      replace(updatedPathname);
    } */
    addCar(variant, replaceIndex);
    setIsModalOpen(false);
  };

  return (
    <>
      <CarSelectionModal
        brandModelsData={brandModelsData}
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        selectedCars={data?.variants}
        onSelectVariant={onSelectVariant}
        indexToReplace={indexToReplace}
      />
      <CompareCarsHeader
        selectedVariants={data?.variants}
        hideSimilar={hideSimilar}
        toggleSimilarFeatures={toggleSimilarFeatures}
        openModal={() => setIsModalOpen(true)}
        removeCar={removeCar}
        setIndexToReplace={setIndexToReplace}
      />
      <CompareCarDetails
        selectedVariants={data?.variants}
        specsData={data?.specs}
        basicData={data?.basicDetail}
        hideSimilar={hideSimilar}
      />
    </>
  );
}

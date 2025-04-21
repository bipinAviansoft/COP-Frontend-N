"use client";

import { useState } from "react";

const useCompareCar = () => {
  const [selectedCars, setSelectedCars] = useState([]);
  const [indexToReplace, setIndexToReplace] = useState(null);

  const addCar = (car, replaceIndex) => {
    if (replaceIndex !== null && replaceIndex !== undefined) {
      setSelectedCars((prevCars) =>
        prevCars.map((_, index) => (index === replaceIndex ? car : _))
      );
      setIndexToReplace(null);
    } else {
      setSelectedCars((prevCars) => [...prevCars, car]);
    }
  };

  const removeCar = (slug) => {
    setSelectedCars((prevCars) => {
      return prevCars.filter((car) => {
        return car.slug !== slug;
      });
    });
  };

  return {
    selectedCars,
    setSelectedCars,
    indexToReplace,
    setIndexToReplace,
    addCar,
    removeCar,
  };
};

export default useCompareCar;

"use client";

import { createContext, useState } from "react";

export const CarModuleComparisonContext = createContext({
  cars: [],
  toggleCar: () => {},
});

export default function CarModuleComparisonContextProvider({ children }) {
  const [cars, setCars] = useState([]);

  const toggleCar = (car) => {
    const existingCarIndex = cars.findIndex(
      (prevCar) => prevCar.full_slug === car.full_slug
    );

    if (existingCarIndex >= 0) {
      const filteredCars = cars?.filter((prevCar) => prevCar.id !== car.id);
      setCars(filteredCars);
    } else {
      setCars([...cars, car]);
    }
  };

  return (
    <CarModuleComparisonContext.Provider value={{ cars, toggleCar }}>
      {children}
    </CarModuleComparisonContext.Provider>
  );
}

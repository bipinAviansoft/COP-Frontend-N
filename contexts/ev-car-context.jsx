"use client";

import { createContext, useState } from "react";

const initialContextValue = {
  price: null,
  brand: null,
  updatePrice: () => {},
  updateBrand: () => {},
};

export const EvCarContext = createContext(initialContextValue);

export default function EvCarContextProvider({ children }) {
  const [price, setPrice] = useState(null);
  const [brand, setBrand] = useState(null);

  const updatePrice = (value) => {
    setPrice(value);
    setBrand(null);
  };

  const updateBrand = (value) => {
    setBrand(value);
    setPrice(null);
  };

  const value = {
    price,
    updatePrice,
    brand,
    updateBrand,
  };

  return (
    <EvCarContext.Provider value={value}>{children}</EvCarContext.Provider>
  );
}

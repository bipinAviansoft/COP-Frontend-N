"use client";

const { createContext, useState, useContext } = require("react");

export const BookTestDriveContext = createContext({
  brand: "",
  model: "",
  fuelType: "",
  transmissionType: "",
  validationErrors: {},
  setValidationErrors: () => {},
  onChangeBrand: () => {},
  onChangeModel: () => {},
  setFuelType: () => {},
  setTransmissionType: () => {},
});

export const useBookTestDriveCtx = () => {
  return useContext(BookTestDriveContext);
};

export default function BookTestDriveContextProvider({ children }) {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [transmissionType, setTransmissionType] = useState("");
  const [validationErrors, setValidationErrors] = useState("");

  const onChangeBrand = (brand) => {
    setBrand(brand);
    setModel("");
    setFuelType("");
    setTransmissionType("");
    setValidationErrors((prev) => ({ ...prev, brand: "" }));
  };

  const onChangeModel = (model) => {
    setModel(model);
    setFuelType("");
    setTransmissionType("");
    setValidationErrors((prev) => ({ ...prev, model: "" }));
  };

  const value = {
    brand,
    model,
    fuelType,
    setFuelType,
    transmissionType,
    setTransmissionType,
    onChangeBrand,
    onChangeModel,
    validationErrors,
    setValidationErrors,
  };

  return (
    <BookTestDriveContext.Provider value={value}>
      {children}
    </BookTestDriveContext.Provider>
  );
}

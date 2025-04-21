import { configureStore } from "@reduxjs/toolkit";
import cityReducer from "./slices/city-slice";
import authReducer from "./slices/auth-slice";
import compareCarsReducer from "./slices/compare-cars-slice";

import {
  addCompareCar,
  removeCompareCar,
  clearCompareCars,
} from "./slices/compare-cars-slice";

import {
  setCity,
  setCities,
  openCityModal,
  closeCityModal,
} from "./slices/city-slice";
import {
  openAuthModal,
  closeAuthModal,
  updateStage,
  loginUserWithoutRequestingInfo,
  loginUserWithRequestingInfo,
  setBasicDetails,
  setWishlist,
  logout,
} from "./slices/auth-slice";

const initializeStore = () => {
  return configureStore({
    reducer: {
      city: cityReducer,
      auth: authReducer,
      compareCars: compareCarsReducer,
    },
  });
};

export {
  setCity,
  setCities,
  openCityModal,
  closeCityModal,
  openAuthModal,
  closeAuthModal,
  updateStage,
  loginUserWithoutRequestingInfo,
  loginUserWithRequestingInfo,
  setBasicDetails,
  setWishlist,
  logout,
  addCompareCar,
  removeCompareCar,
  clearCompareCars,
};
export default initializeStore;

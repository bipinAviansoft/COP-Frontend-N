import { createSlice } from "@reduxjs/toolkit";

// const storedCity =
//   typeof window !== "undefined" ? localStorage.getItem("selectedCity") : "";

const INITIAL_STATE = {
  isModalOpen: false,
  citiesList: [],
  city: "",
  redirectTo: "",
  refresh: false,
  allowCloseWithoutSelection: false,
};

const citySlice = createSlice({
  name: "city",
  initialState: INITIAL_STATE,
  reducers: {
    setCity: (state, action) => {
      state.city = action.payload;
      state.isModalOpen = false;
    },
    setCities: (state, action) => {
      state.citiesList = action.payload;
    },
    openCityModal: (state, action) => {
      return {
        ...state,
        isModalOpen: true,
        ...action.payload,
      };
    },
    closeCityModal: (state) => {
      state.isModalOpen = false;
      state.redirectTo = "";
      state.refresh = false;
    },
  },
});

export const { setCity, setCities, openCityModal, closeCityModal } =
  citySlice.actions;

export default citySlice.reducer;

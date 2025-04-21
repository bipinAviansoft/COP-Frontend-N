import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cars: [],
};

const compareCarsSlice = createSlice({
  name: "compareCars",
  initialState,
  reducers: {
    addCompareCar: (state, action) => {
      state.cars = action.payload;
    },
    removeCompareCar: (state, action) => {
      state.cars = state.cars.filter((car) => car.id !== action.payload);
    },
    clearCompareCars: (state) => {
      state.cars = [];
    },
  },
});

export const { addCompareCar, removeCompareCar, clearCompareCars } =
  compareCarsSlice.actions;
export default compareCarsSlice.reducer;

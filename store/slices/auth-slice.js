import { authStages } from "@/data/constants";
import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  isModalOpen: false,
  stage: authStages.GET_MOBILE_NO,
  user: null,
  refresh: false,
  redirectTo: "",
  mobile: "",
  modelIdToAddToWishlist: null,
  wishlist: [],
  allowEdit: true,
  getBasicDetails: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: INITIAL_STATE,
  reducers: {
    openAuthModal: (state, action) => {
      return {
        ...state,
        isModalOpen: true,
        ...action.payload,
      };
    },
    closeAuthModal: (state) => {
      return {
        ...INITIAL_STATE,
        user: state.user,
      };
    },
    updateStage: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    loginUserWithoutRequestingInfo: (state, action) => {
      return {
        ...INITIAL_STATE,
        user: action.payload,
      };
    },
    loginUserWithRequestingInfo: (state, action) => {
      return {
        ...INITIAL_STATE,
        user: action.payload,
        getBasicDetails: true,
      };
    },
    setBasicDetails: (state, action) => {
      return {
        ...state,
        user: action.payload,
        getBasicDetails: false,
      };
    },
    setWishlist: (state, action) => {
      return {
        ...state,
        wishlist: action.payload,
      };
    },
    logout: () => {
      return {
        ...INITIAL_STATE,
      };
    },
  },
});

export default authSlice.reducer;
export const {
  openAuthModal,
  closeAuthModal,
  updateStage,
  loginUserWithoutRequestingInfo,
  loginUserWithRequestingInfo,
  setBasicDetails,
  setWishlist,
  logout,
} = authSlice.actions;

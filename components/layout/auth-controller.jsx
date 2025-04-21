"use client";

import {
  loginUserWithoutRequestingInfo,
  loginUserWithRequestingInfo,
  logout,
  setWishlist,
} from "@/store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function AuthController({ accountData, wishlistData }) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (accountData) {
      const { basicDetails } = accountData;

      const user = {
        mobile: basicDetails?.contact_no?.substring(3, 13),
        name: basicDetails?.name,
        avatar: basicDetails?.profile_pic,
      };

      if (user?.name) {
        dispatch(loginUserWithoutRequestingInfo(user));
      } else {
        dispatch(loginUserWithRequestingInfo(user));
      }
    } else {
      dispatch(logout());
    }

    if (wishlistData) {
      dispatch(setWishlist(wishlistData));
    }
  }, [accountData, wishlistData]);

  return null;
}

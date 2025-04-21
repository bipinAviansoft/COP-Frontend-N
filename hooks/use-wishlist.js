"use client";

import { sendRequest } from "@/lib/fetch-client";
import { openAuthModal, setWishlist } from "@/store";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
 
const useWishlist = () => {
  const dispatch = useDispatch();
  const { user, wishlist: wishlistStore } = useSelector((state) => state.auth);

  const wishlistAnItem = useCallback(
    async (slug) => {
      /* setCars((prevCars) =>
        prevCars.map((car) => {
          return car.slug === slug ? { ...car, wishlist: Number(!car.wishlist) } : car;
        })
      ); */

      try {
        const { result: wislistedItem } = await sendRequest(`wishlist/${slug}`);
        if (typeof wislistedItem === "object") {
          dispatch(setWishlist([...wishlistStore, wislistedItem]));
        } else {
          dispatch(
            setWishlist(
              wishlistStore?.filter((item) => !item.slug.startsWith(`/${slug}`))
            )
          );
        }
      } catch (err) {
        /* setCars((prevCars) =>
          prevCars.map((car) => {
            return car.slug === slug
              ? { ...car, wishlist: Number(!car.wishlist) }
              : car;
          })
        ); */
      }
    },
    [wishlistStore]
  );

  const toggleWishlist = useCallback(
    (slug) => {
      if (user?.mobile) {
        wishlistAnItem(slug);
      } else {
        dispatch(openAuthModal({ modelIdToAddToWishlist: slug }));
      }
    },
    [user, wishlistAnItem]
  );

  return { toggleWishlist, wishlistStore };
};

export default useWishlist;

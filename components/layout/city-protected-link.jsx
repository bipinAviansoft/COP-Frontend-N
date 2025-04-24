"use client";

import { openCityModal } from "@/store";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";

export default function CityProtectedLink({ href, children, ...props }) {
  const dispatch = useDispatch();

  const { city } = useSelector((state) => state.city);

  const handleClick = (e) => {
    if (!city) {
      dispatch(
        openCityModal({
          redirectTo: href,
        })
      );
      e.preventDefault();
    }
  };

  return (
    <Link href={href} className="relative" onClick={handleClick} {...props}>
      {children}
    </Link>
  );
}

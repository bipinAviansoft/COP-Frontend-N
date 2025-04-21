"use client";

import { cn } from "@/lib/utils";
import HeaderActionBar from "./header-action-bar";
import DesktopNavbar from "./navbar/desktop-navbar";
import { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { openCityModal, setCity } from "@/store";
import { usePathname } from "next/navigation";

const nonStickyRoutes = ["/compare/"];

export default function Header() {
  const pathname = usePathname();
  const dispatch = useDispatch();

  const headerRef = useRef();

  const [isSticky, setIsSticky] = useState(false);

  const isCarModulePage = /^\/([^/]+-cars)\/([^/]+)(\/([^/]+))?$/.test(
    pathname
  );

  const isNonStickyRoute = nonStickyRoutes.some((route) =>
    pathname.startsWith(route)
  );

  useEffect(() => {
    const handleScroll = () =>
      setIsSticky(window.scrollY > 80 && !isNonStickyRoute && !isCarModulePage);
    window.addEventListener("scroll", handleScroll);

    const cityId = Cookies.get("city");

    if (cityId) dispatch(setCity(cityId));

    return () => window.removeEventListener("scroll", handleScroll);
  }, [dispatch, pathname]);

  useEffect(() => {
    const cityId = Cookies.get("city");

    if (!cityId) {
      dispatch(openCityModal({ refresh: true }));
    }
  }, []);

  return (
    <header
      ref={headerRef}
      className={cn(
        "top-0 z-50 transition-shadow delay-75 duration-100 shadow-lg",
        {
          sticky: isSticky,
        }
      )}
    >
      <HeaderActionBar /> {/* common for all breakpoints  */}
      <DesktopNavbar />
    </header>
  );
}

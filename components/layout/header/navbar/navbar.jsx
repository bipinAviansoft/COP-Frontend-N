"use client";

import navbarData from "@/data/navbar.json";
import Link from "next/link";
import ExpandableSubMenu from "./expandable-menu-item";
import { cn } from "@/lib/utils";
import CityProtectedLink from "../../city-protected-link";
import { useSelector } from "react-redux";
import useAllowTestDrive from "@/hooks/use-allow-test-drive";

const { menuItems, accountLinks } = navbarData;

export default function Navbar() {
  const { user } = useSelector((state) => state.auth);
  const allowTestDrive = useAllowTestDrive();

  return (
    <nav>
      <ul className="flex flex-col lg:flex-row lg:gap-x-8 gap-y-3">
        {user?.mobile && (
          <li className="lg:hidden">
            <ExpandableSubMenu
              title="Account Settings"
              subMenuItems={accountLinks}
            />
          </li>
        )}

        {menuItems.map((item) => {
          const { menuItem, path, subMenuItems, mobileOnly, desktopOnly } =
            item;
          return (
            <li
              key={menuItem}
              className={cn("cursor-pointer group lg:relative", {
                "lg:hidden": mobileOnly,
                "hidden lg:block": desktopOnly,
              })}
            >
              <p className="hidden lg:flex items-center gap-2 py-2">
                <Link href={path || "/"} className="text-sm font-semibold">
                  {menuItem}
                </Link>
                {subMenuItems?.length > 0 && (
                  <i className="bx bxs-chevron-down group-hover:-rotate-180 transition-all delay-100 duration-200"></i>
                )}
              </p>
              {subMenuItems?.length && (
                <ul className="lg:invisible lg:group-hover:visible lg:opacity-0 lg:absolute lg:top-full lg:z-50 lg:group-hover:opacity-100 lg:min-w-64 lg:shadow-xl lg:border lg:border-gray-lighter transition-all duration-300 lg:rounded-lg lg:overflow-hidden">
                  {subMenuItems &&
                    subMenuItems
                      .filter((subItem) =>
                        subItem.subMenuItem === "Book A Test Drive"
                          ? allowTestDrive
                          : true
                      )
                      .map((subItem) => {
                        const { subMenuItem, path, cityProtected, newFlag } =
                          subItem;
                        return (
                          <li
                            key={subMenuItem}
                            className="bg-black/5 lg:bg-white hover:bg-primary-gradient text-xs font-semibold cursor-pointer  text-[#282C2F] hover:text-white"
                          >
                            {cityProtected ? (
                              <CityProtectedLink
                                className="flex items-center justify-between px-2.5 py-1 lg:px-4 lg:py-2.5"
                                href={path || ""}
                              >
                                <span className="lg:text-sm">
                                  {subMenuItem}
                                </span>
                                {newFlag && (
                                  <span className="bg-orange-500 text-white">
                                    New
                                  </span>
                                )}
                                <i className="bx bx-chevron-right text-xl lg:!hidden"></i>
                              </CityProtectedLink>
                            ) : (
                              <Link
                                className="flex items-center justify-between px-2.5 py-1 lg:px-4 lg:py-2.5"
                                href={path || ""}
                              >
                                <span className="lg:text-sm">
                                  {subMenuItem}
                                </span>
                                {newFlag && (
                                  <span className="bg-orange-500 text-white px-2 py-0.5 rounded-full font-light">
                                    New
                                  </span>
                                )}
                                <i className="bx bx-chevron-right text-xl lg:!hidden"></i>
                              </Link>
                            )}
                          </li>
                        );
                      })}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

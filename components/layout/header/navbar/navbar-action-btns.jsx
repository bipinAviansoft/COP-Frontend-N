import Button from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { sendRequest } from "@/lib/fetch-client";
import { openCityModal, openAuthModal, logout } from "@/store";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import Wishlist from "./wishlist";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function NavbarActionBtns() {
  const dispatch = useDispatch();
  const router = useRouter();

  const { city: cityId, citiesList } = useSelector((state) => state.city);
  const { user } = useSelector((state) => state.auth);

  const selectedCity = citiesList?.filter((city) => city.id === cityId)[0];
  const selectedCityName = selectedCity?.city_name || "";

  const handleCityClick = () =>
    dispatch(
      openCityModal({ refresh: true, allowCloseWithoutSelection: true })
    );

  const handleLoginClick = () => dispatch(openAuthModal({ refresh: true }));

  const handleLogoutClick = async () => {
    try {
      await sendRequest("log-out");
      dispatch(logout());
      router.refresh();
    } catch (e) {
      console.error(e.message);
    }
  };

  return (
    <div className="flex gap-2.5 lg:gap-4">
      <Button
        className="flex-col lg:flex-row gap-1.5 px-4 py-2.5 lg:px-4 lg:py-2  lg:bg-black/10 lg:hover:bg-white/10 font-normal"
        onClick={handleCityClick}
      >
        <i className="bx bxs-map text-xl"></i>
        <p className="text-xs lg:hidden">{selectedCityName || "Location"}</p>
        <p className="hidden lg:block font-normal">
          {selectedCityName || "Select City"}
        </p>
      </Button>
      <Wishlist />
      {user?.mobile ? (
        <>
          <Button className="relative flex-col lg:flex-row gap-1.5 px-4 py-2 lg:bg-black/10 lg:hover:bg-white/10 font-normal overflow-visible">
            <i className="bx bx-bell text-xl"></i>
            <p className="text-xs lg:hidden">Notification</p>
          </Button>
          <TooltipProvider>
            <Tooltip delayDuration={100}>
              <TooltipTrigger
                asChild
                className="bg-black/10 hover:bg-white/10 font-normal flex gap-1.5"
              >
                <Button className="flex gap-2 over max-w-36 px-4 py-2">
                  {user?.avatar ? (
                    <div className="size-7 rounded-full relative overflow-hidden">
                      <Image
                        src={user.avatar}
                        alt={`${user.name}'s avatar`}
                        fill
                        className="object-cover object-center"
                      />
                    </div>
                  ) : (
                    <i className="bx bxs-user-circle text-xl"></i>
                  )}
                  <span className="inline-block max-w-16 overflow-hidden text-ellipsis whitespace-nowrap">
                    {user.name ||
                      `${"X".repeat(6)}${user.mobile.substring(6, 10)}`}
                  </span>
                </Button>
              </TooltipTrigger>
              <TooltipContent
                className="flex flex-col p-0 border-gray-lighter"
                align="end"
                sideOffset={8}
              >
                <Link
                  href="/myaccount/profile"
                  className="px-4 py-2 bg-transparent text-theme-black hover:bg-primary-gradient hover:text-white text-left min-w-40 font-medium"
                >
                  My Account
                </Link>
                <Button
                  className="px-4 py-2 bg-transparent text-theme-black hover:bg-primary-gradient hover:text-white justify-start rounded-none"
                  onClick={handleLogoutClick}
                >
                  Logout
                </Button>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </>
      ) : (
        <Button
          className="hidden lg:flex gap-1.5 px-4 py-2 bg-black/10 hover:bg-white/10 font-normal"
          onClick={handleLoginClick}
        >
          <i className="bx bxs-user-circle text-xl"></i>
          <p className="">Login</p>
        </Button>
      )}
    </div>
  );
}

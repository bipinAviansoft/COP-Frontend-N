import Button from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import anonymousAvatar from "@/public/images/non_profile_image.webp";
import Image from "next/image";
import Navbar from "./navbar";
import NavbarActionBtns from "./navbar-action-btns";
import { useSelector } from "react-redux";

export default function MobileNavbar() {
  const { user } = useSelector((state) => state.auth);

  return (
    <Sheet>
      <SheetTrigger>
        <i className="bx bx-menu text-white text-2xl bg-white/5 p-1 rounded w-10 h-10 !flex justify-center items-center"></i>
      </SheetTrigger>
      <SheetContent side="left" className="w-[75%] p-0 overflow-y-auto">
        <div className="bg-primary-gradient flex items-center gap-x-4 p-4">
          <Image
            src={anonymousAvatar}
            alt="anonymous avatar"
            width={50}
            height={50}
            className="rounded-full border-2 border-white"
          />
          <p className="text-xl font-medium text-white">Login</p>
        </div>
        <div className="px-4 py-3">
          <NavbarActionBtns />
        </div>
        <div className="px-4 py-2">
          <Navbar />
          {user?.mobile && (
            <>
              <Button className="bg-black/5 px-2.5 py-3 text-xs font-semibold text-red-500 flex items-center gap-2 rounded-none w-full justify-start h-auto mt-3">
                <i className="bx bx-log-out text-2xl"></i>
                <span>Logout</span>
              </Button>
              <Button className="bg-black/5 px-2.5 py-3 text-xs font-semibold text-red-500 flex items-center gap-2 rounded-none w-full justify-start h-auto">
                <i className="bx bx-error-circle text-2xl"></i>
                <span>Delete Account</span>
              </Button>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

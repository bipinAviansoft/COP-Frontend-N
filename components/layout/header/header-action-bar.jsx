import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import logoWhite from "@/public/images/logo_white.png";
import Image from "next/image";
import Link from "next/link";
import NavbarActionBtns from "./navbar/navbar-action-btns";
import MobileNavbar from "./navbar/mobile-navbar";
import SearchBar from "./searchbar/searchbar";

export default function HeaderActionBar() {
  return (
    <div className="bg-primary-gradient">
      <div className="container py-2.5 lg:py-3.5 flex items-center justify-between">
        {/* mobile navabar & toggler */}
        <span className="lg:hidden">
          <MobileNavbar />
        </span>

        {/* logo */}
        <span className="xl:flex-1">
          <Link href="/" className="block relative w-40 lg:w-52 aspect-4/1">
            <Image
              src={logoWhite}
              alt="CarOnPhone: Drive Dreams Home"
              title="CarOnPhone"
              fill
              priority
              sizes="(max-width: 768px) 160px, 208px"
            />
          </Link>
        </span>

        {/* desktop searchbar */}
        <div className="hidden lg:block xl:flex-1 lg:min-w-72">
          <SearchBar />
        </div>

        {/* mobile searchbar */}
        <span className="lg:hidden">
          <Dialog>
            <DialogTrigger asChild>
              <i className="bx bx-search text-white text-xl lg:text-2xl bg-white/5 p-1 rounded w-10 h-10 text-center !flex justify-center items-center cursor-pointer"></i>
            </DialogTrigger>
            <DialogContent
              className="top-8 p-0 w-[90%] mx-auto"
              hideCloseButton
            >
              <SearchBar />
            </DialogContent>
          </Dialog>
        </span>

        {/* desktop action items */}
        <div className="hidden lg:flex justify-end xl:flex-1">
          <NavbarActionBtns />
        </div>
      </div>
    </div>
  );
}

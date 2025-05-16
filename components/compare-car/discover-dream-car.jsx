import Link from "next/link";
import Button from "../ui/button";

export default function DiscoverDreamCarSection() {
  return (
    <>
      <div className="flex gap-y-5 relative z-10 ">
        <div className="w-10/12 sm:w-1/2 xl:w-1/3 px-3">
          <h2 className="text-2xl xl:text-3xl 2xl:text-4xl font-bold text-white">
            Overwhelmed with Car Choices
          </h2>
          <Link href="/advanced-search">
            <Button className="px-4 md:px-5 xl:px-11 py-2 mt-4 bg-white text-black text-xs md:text-sm lg:text-base font-semibold uppercase whitespace-nowrap ">
              Discover your Dream Car
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}

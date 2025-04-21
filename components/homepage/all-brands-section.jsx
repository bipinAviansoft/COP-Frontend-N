import Link from "next/link";
import Button from "../ui/button";
import DevBug from "../ui/dev-bug";
import AllBrandsCarousel from "./all-brands-carousel";

export default function AllBrandsSection({ brandModels }) {
  return (
    <div className="flex flex-col">
      <span className="inline-block mb-4">
        <h2
          className="text-primary-darker text-xl text-center
       lg:text-xl xl:text-2xl font-bold mb-3 lg:mb-4"
        >
          All Brands
        </h2>
        <p className="md:hidden text-gray-darker text-sm text-center mb-4 mx-auto">
          An extensive showcase of India&apos;s popular car brands that are
          continuing to expand the boundaries of technology in India.
        </p>
        <p className="hidden md:block text-gray-darker text-base text-center w-2/3 mb-4 mx-auto">
          Behold the core characteristics of the most reliable car brand in
          India. An extensive showcase of India&apos;s popular car brands,
          including well-established brands with an array of models and also
          advanced newcomers that are continuing to expand the boundaries of
          technology in India.
        </p>
      </span>

      <AllBrandsCarousel brandModels={brandModels} />
      <Button
        animated
        className="uppercase text-xs md:text-sm lg:text-base tracking-wider h-auto self-center"
      >
        <Link href="/all-brand">View All</Link>
      </Button>
    </div>
  );
}

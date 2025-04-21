import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default function ExploreAllBrandsList({ selectedBrandSlug, brands }) {
  return (
    <div className="hidden lg:gap-3 lg:grid-cols-3 lg:grid">
      {brands?.map((brand) => {
        const { brand_name, brand_logo, slug } = brand;

        return (
          <Link
            key={slug}
            href={slug}
            className={cn(
              "border-[1px] flex flex-col items-center justify-center text-center bg-white rounded-lg p-3 gap-y-3",
              {
                "border-[#00B6FE] shadow-[0_0_7px_#00B6FE]":
                  slug === `/${selectedBrandSlug}`,
              }
            )}
          >
            <div className="relative w-20 xl:w-24 aspect-[10/7]">
              <Image
                src={brand_logo}
                alt={`logo of ${brand_name}`}
                fill
                className="object-cover"
              />
            </div>
            <h5 className="font-semibold">{brand_name}</h5>
          </Link>
        );
      })}
    </div>
  );
}

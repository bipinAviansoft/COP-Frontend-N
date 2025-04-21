import Image from "next/image";
import CityProtectedLink from "../layout/city-protected-link";

export default function BrandsList({ brands }) {
  return (
    <div className="grid grid-cols-3 gap-3 md:grid-cols-4 lg:grid-cols-5 lg:gap-4 xl:grid-cols-5 2xl:grid-cols-6">
      {brands.map((brand) => {
        const { brand_id, brand_name, brand_logo, slug } = brand;
        return (
          <CityProtectedLink
            key={brand_id}
            href={slug}
            className="flex flex-col align-middle justify-center text-center bg-white rounded-lg py-2 px-2 gap-2 md:gap-2.5 lg:py-9 lg:px-2 lg:gap-3 sm:gap-4 sm:py-5"
          >
            <div className="relative w-20 md:w-24 lg:w-32 aspect-[10/7] mx-auto">
              <Image
                src={brand_logo}
                alt={`logo of ${brand_name}`}
                fill
                className="object-cover object-center"
              />
            </div>
            <h5 className="text-sm font-medium md:text-xl ">{brand_name}</h5>
          </CityProtectedLink>
        );
      })}
    </div>
  );
}

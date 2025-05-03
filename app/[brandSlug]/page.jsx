import CarVariantSection from "@/components/explore-brands/car-variants";
import ExploreAllBrandsList from "@/components/explore-brands/explore-all-brands";
import CarModuleComparisonContextProvider from "@/contexts/car-module-comparison-context";
import { fetchData } from "@/lib/fetch";
import Image from "next/image";

export default async function Page({ params }) {
  const { brandSlug } = params;

  try {
    const [brands, brandAndmodelsData] = await Promise.all([
      fetchData("/brands?carTypes=true"),
      fetchData(`/brands/${brandSlug}`, true),
    ]);

    // Adjust comparison depending on your slug structure
    const selectedBrand = brands.find(
      (brand) =>
        brand.slug === brandSlug ||
        brand.slug === `/${brandSlug}` || // if API returns slug with a leading slash
        brand.slug.replace("/", "") === brandSlug
    );

    // Handle missing brand
    if (!selectedBrand) {
      console.error("Brand not found for slug:", brandSlug);
      return new Error("Brand not found for slug:", brandSlug); // safely show 404 page
    }

    const { brand_banner, brand_name } = selectedBrand;

    return (
      <CarModuleComparisonContextProvider>
        <div className="bg-[#f6f2f2]">
          <div className="relative w-full aspect-4/1 lg:aspect-[96/21]">
            <Image
              src={brand_banner}
              alt={`banner image for ${brand_name}`}
              fill
              className="object-cover object-center"
            />
          </div>

          <section className="container py-6 md:py-7 lg:py-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              <div className="lg:col-span-8">
                <CarVariantSection
                  selectedBrandSlug={brandSlug}
                  selectedBrand={selectedBrand}
                  brands={brands}
                  modelsData={brandAndmodelsData}
                />
              </div>
              <div className="lg:col-span-4">
                <ExploreAllBrandsList
                  selectedBrandSlug={brandSlug}
                  brands={brands}
                />
              </div>
            </div>
          </section>
        </div>
      </CarModuleComparisonContextProvider>
    );
  } catch (error) {
    console.error("Error rendering brand page:", error);
    return new Error(`API Failed!`); // or render a fallback component if needed
  }
}

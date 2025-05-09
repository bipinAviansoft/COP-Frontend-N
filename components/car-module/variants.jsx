import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import VariantsList from "./variants-list";

export default function Variants({ variantsData, selectedVariantSlug }) {
  const { fuel_types, variants } = variantsData;
  const isEV = fuel_types.length === 0 || !fuel_types;

  return (
    <>
      <h3 className="font-semibold mb-2 lg:text-lg">List of Variants</h3>
      {isEV ? (
        <div className="h-60 overflow-y-auto">
          <VariantsList
            variants={variants}
            selectedVariantSlug={selectedVariantSlug}
          />
        </div>
      ) : (
        <Tabs defaultValue="all">
          <TabsList className="p-0 bg-transparent justify-start gap-x-2 lg:mb-3">
            <TabsTrigger
              className="data-[state=active]:bg-theme-black data-[state=active]:text-white bg-[#f6f2f2] text-theme-black uppercase font-semibold text-sm lg:text-base rounded-full"
              value="all"
            >
              All
            </TabsTrigger>
            {fuel_types.map((fuelType) => (
              <TabsTrigger
                value={fuelType}
                key={fuelType}
                className="data-[state=active]:bg-theme-black data-[state=active]:text-white bg-[#f6f2f2] text-theme-black uppercase font-semibold text-sm lg:text-base rounded-full"
              >
                {fuelType}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value="all" className="max-h-64 overflow-y-auto">
            <VariantsList
              variants={variants}
              selectedVariantSlug={selectedVariantSlug}
            />
          </TabsContent>
          {fuel_types.map((type) => {
            const filteredVariants = variants.filter(
              (variant) => variant.fuel_type === type
            );

            return (
              <TabsContent
                key={type}
                value={type}
                className="max-h-64 overflow-y-auto"
              >
                <VariantsList
                  variants={filteredVariants}
                  selectedVariantSlug={selectedVariantSlug}
                />
              </TabsContent>
            );
          })}
        </Tabs>
      )}
    </>
  );
}

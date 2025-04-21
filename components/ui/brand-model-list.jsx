import { useState } from "react";
import Button from "./button";
import InputWithIcon from "./input-with-icon";

const cache = new Map();

const filterModelsData = (data, searchTerm) => {
  if (cache.has(searchTerm)) {
    return cache.get(searchTerm);
  }

  const filteredData = [];

  data.forEach((brand) => {
    if (brand?.brand_name.toLowerCase().includes(searchTerm.toLowerCase())) {
      filteredData.push({ ...brand });
    } else {
      const { models } = brand;
      const filteredModels = models.filter((model) =>
        model.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

      if (filteredModels.length > 0) {
        filteredData.push({ ...brand, models: filteredModels });
      }
    }
  });

  cache.set(searchTerm, filteredData);

  return filteredData;
};

export default function BrandModelList({
  brandModelsData,
  onSelectModel,
  selectedCars,
}) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData =
    brandModelsData?.length > 0 && searchTerm
      ? filterModelsData(brandModelsData, searchTerm)
      : brandModelsData;

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target?.value);
  };

  return (
    <>
      <InputWithIcon
        iconClass="bx bx-search text-2xl"
        placeholder="Search Model"
        className="mb-4"
        value={searchTerm}
        onChange={handleSearchTermChange}
      />
      <ul className="h-72 overflow-y-auto space-y-2">
        {filteredData.map((brand) => {
          const { brand_id, brand_name, models, slug: brandSlug } = brand;
          return (
            <li key={brand_id} className="space-y-2">
              <p className="font-semibold">{brand_name}</p>
              <ul className="border-l">
                {models.map((model) => {
                  const { name, slug: modelSlug } = model;

                  return (
                    <li key={modelSlug}>
                      <Button
                        className="w-full pl-4 py-1 text-sm text-gray-darker hover:bg-primary-gradient hover:text-white justify-start bg-transparent rounded-none"
                        onClick={() =>
                          onSelectModel({
                            brandName: brand_name,
                            brandSlug,
                            modelName: name,
                            modelSlug,
                          })
                        }
                      >
                        {name}
                      </Button>
                    </li>
                  );
                })}
              </ul>
            </li>
          );
        })}
      </ul>
    </>
  );
}

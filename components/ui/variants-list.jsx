import { fetchDataClient } from "@/lib/fetch-client";
import { useQuery } from "@tanstack/react-query";
import InputWithIcon from "./input-with-icon";
import Button from "./button";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function VariantsList({
  selectedModel,
  onSelectVariant,
  selectedCars,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const { isLoading, data, error } = useQuery({
    queryKey: [
      "variants",
      { brand: selectedModel?.brandSlug, model: selectedModel?.modelSlug },
    ],
    queryFn: () =>
      fetchDataClient(
        `brands${selectedModel?.brandSlug}/${selectedModel?.modelSlug}`
      ),
    enabled: Boolean(selectedModel?.brandSlug && selectedModel?.modelSlug),
  });

  return (
    <>
      <InputWithIcon
        iconClass="bx bx-search text-2xl"
        placeholder="Search variant"
        className="mb-4"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="h-72 flex justify-center items-center">
        {isLoading && (
          <i className="bx bx-loader-alt text-2xl animate-spin"></i>
        )}
        {error && (
          <p className="text-sm text-destructive">
            {error.message || "Something went wrong!"}
          </p>
        )}
        {data && (
          <ul className="h-72 overflow-y-auto space-y-2 border-l w-full">
            {data?.variants
              ?.filter((variant) =>
                variant.variant_name
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase())
              )
              .map((variant) => {
                const { variant_name, slug } = variant;
                const isDisabled =
                  selectedCars?.filter((car) => car.slug === slug).length > 0;

                return (
                  <li key={slug}>
                    <Button
                      className={cn(
                        "w-full pl-4 py-1 text-sm text-gray-darker hover:bg-primary-gradient hover:text-white justify-start bg-transparent rounded-none",
                        { "cursor-not-allowed": isDisabled }
                      )}
                      onClick={() => onSelectVariant(variant)}
                      disabled={isDisabled}
                    >
                      {variant_name}
                    </Button>
                  </li>
                );
              })}
          </ul>
        )}
      </div>
    </>
  );
}

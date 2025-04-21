"use client";

import { useEffect, useState } from "react";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useBookTestDriveCtx } from "@/contexts/book-test-drive-context";
import Image from "next/image";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fetchDataClient } from "@/lib/fetch-client";
import { useQuery } from "@tanstack/react-query";
import useAllowTestDrive from "@/hooks/use-allow-test-drive";
import NotAllowedAlert from "./not-allowed-alert";

export default function VehicleSelectionForm({
  brandModels,
  brandSlug,
  modelSlug,
}) {
  const {
    brand,
    model,
    fuelType,
    transmissionType,
    validationErrors,
    setFuelType,
    setTransmissionType,
    onChangeBrand,
    onChangeModel,
  } = useBookTestDriveCtx();

  const [showNotAllowedModal, setShowNotAllowedModal] = useState(false);

  const allowTestDrive = useAllowTestDrive();

  useEffect(() => {
    if (!allowTestDrive) setShowNotAllowedModal(true);
  }, [allowTestDrive]);

  const filteredModels =
    brandModels.filter((brandItem) => {
      return brandItem.slug === brand.slug;
    })[0]?.models || [];

  const { data: preferencesData, error } = useQuery({
    queryKey: ["preferences", { brand: brand.slug, model: model.slug }],
    queryFn: () =>
      fetchDataClient(`test-drive/preferences${brand.slug}/${model.slug}`),
    enabled: Boolean(brand.slug && model.slug),
  });

  useEffect(() => {
    if (
      preferencesData &&
      preferencesData?.fuel &&
      preferencesData?.transmission
    ) {
      setFuelType(preferencesData?.fuel?.[0]);
      setTransmissionType(preferencesData?.transmission?.[0]);
    }
  }, [preferencesData]);

  useEffect(() => {
    if (brandSlug && modelSlug) {
      const brand = brandModels.find(
        (brandObj) => brandObj.slug === `/${brandSlug}`
      );
      const model = brand.models?.find(
        (modelObj) => modelObj.slug === modelSlug
      );

      onChangeBrand(brand);
      onChangeModel(model);
    }
  }, [brandSlug, modelSlug]);

  const handleFuelValueChange = (fuel) => {
    setFuelType(fuel);
  };

  const handleTransimissionValueChange = (transmission) => {
    setTransmissionType(transmission);
  };

  return (
    <>
      <NotAllowedAlert
        isOpen={showNotAllowedModal}
        onOpenChange={setShowNotAllowedModal}
      />
      <div className="flex flex-col">
        <h4 className="text-sm lg:text-base font-semibold mb-4">
          Vehicle Details
        </h4>
        <div className="flex gap-x-2 mb-6">
          <div className="flex-[0_0_50%] max-w-60">
            <Select
              value={brand}
              onValueChange={onChangeBrand}
              disabled={brandSlug}
            >
              <SelectTrigger className="max-w-60">
                <SelectValue placeholder="Select Brand" />
              </SelectTrigger>
              <SelectContent>
                {brandModels.map((brand) => {
                  const { brand_id, brand_name, slug } = brand;
                  return (
                    <SelectItem key={brand_id} value={brand}>
                      {brand_name}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
            <span className="text-sm text-destructive font-medium">
              {validationErrors?.brand}
            </span>
          </div>
          <div className="flex-[0_0_50%] max-w-60">
            <Select
              value={model}
              onValueChange={onChangeModel}
              disabled={!brand || modelSlug}
            >
              <SelectTrigger className="max-w-60">
                <SelectValue placeholder="Select Model" />
              </SelectTrigger>
              <SelectContent>
                {filteredModels.map((model) => {
                  const { id, name, slug } = model;
                  return (
                    <SelectItem key={id} value={model}>
                      {name}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
            <span className="text-sm text-destructive font-medium">
              {validationErrors?.model}
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-y-4 md:flex-row md:items-center gap-x-4 mb-5">
          {preferencesData?.fuel?.length > 0 && (
            <div className="flex gap-x-4 items-center">
              <p className="text-sm text-gray-darker font-medium">
                Fuel Preference:{" "}
              </p>
              <ToggleGroup
                className="justify-start gap-x-2.5"
                type="single"
                value={fuelType || preferencesData.fuel[0]}
                onValueChange={handleFuelValueChange}
              >
                {preferencesData.fuel.map((type) => (
                  <ToggleGroupItem
                    className="text-xs md:text-sm rounded-lg p-2 h-auto bg-gray-400 text-white data-[state=on]:bg-primary-lighter data-[state=on]:text-white hover:bg-gray-600 hover:text-white"
                    key={type}
                    value={type}
                  >
                    {type}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </div>
          )}
          {preferencesData?.transmission?.length > 0 && (
            <div className="flex gap-x-4 items-center">
              <p className="text-sm text-gray-darker font-medium">
                Transmission:
              </p>
              <ToggleGroup
                className="justify-start gap-x-2.5"
                type="single"
                value={transmissionType || preferencesData.transmission[0]}
                onValueChange={handleTransimissionValueChange}
              >
                {preferencesData.transmission.map((type) => (
                  <ToggleGroupItem
                    className="text-xs md:text-sm rounded-lg p-2 h-auto bg-gray-400 text-white data-[state=on]:bg-primary-lighter data-[state=on]:text-white hover:bg-gray-600 hover:text-white font-normal"
                    key={type}
                    value={type}
                  >
                    {type}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </div>
          )}
        </div>
        {preferencesData?.variant_image ? (
          <div className="relative w-full md:max-w-md lg:max-w-xl mx-auto aspect-5/4 md:aspect-5/3">
            <Image
              src={preferencesData.variant_image}
              alt={`image of ${preferencesData.brand_name} ${preferencesData.model_name}`}
              title={`image of ${preferencesData.brand_name} ${preferencesData.model_name}`}
              fill
              className="object-cover object-center"
            />
          </div>
        ) : (
          <div className="relative w-full max-w-72 md:max-w-sm lg:max-w-md mx-auto aspect-square">
            <Image
              src="/images/book_test_drive_img.svg"
              alt="an image indicating no car has been selected"
              fill
              className="object-contain"
            />
          </div>
        )}
      </div>
    </>
  );
}

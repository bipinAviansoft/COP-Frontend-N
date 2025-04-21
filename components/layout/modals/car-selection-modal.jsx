"use client";

import BrandModelList from "@/components/ui/brand-model-list";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VariantsList from "@/components/ui/variants-list";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function CarSelectionModal({
  isOpen,
  onOpenChange,
  brandModelsData,
  onSelectVariant,
  selectedCars,
  indexToReplace,
}) {
  const [selectedModel, setSelectedModel] = useState(null);
  const [activeTab, setActiveTab] = useState("model");

  useEffect(() => {
    if (indexToReplace !== null && indexToReplace !== undefined) {
      const variant = selectedCars[indexToReplace];
      const [brandSlug, modelSlug] = variant.slug.split("/");
      const modelData = {
        brandName: variant.brand_name,
        brandSlug: `/${brandSlug}`,
        modelName: variant.model_name,
        modelSlug,
      };

      setSelectedModel(modelData);
    }
  }, [indexToReplace]);

  useEffect(() => {
    if (selectedModel) {
      setActiveTab("variant");
    }
  }, [selectedModel]);

  const handleSelectVariant = (variant) => {
    setSelectedModel(null);
    setActiveTab("model");
    onSelectVariant(variant, indexToReplace);
  };

  const onCloseModal = () => {
    setSelectedModel(null);
    setActiveTab("model");
    onOpenChange();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onCloseModal}>
      <DialogContent
        hideCloseButton={false}
        className="w-[90%] md:max-w-sm lg:max-w-md rounded-lg max-h-[70dvh] overflow-hidden"
      >
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-4"
        >
          <TabsList className="justify-start w-full p-0 bg-transparent">
            <TabsTrigger
              value="model"
              className={cn(
                "h-full font-semibold data-[state=active]:text-primary-lighter border-b-2 data-[state=active]:border-primary-lighter rounded-none"
              )}
            >
              Brand/Model
            </TabsTrigger>
            <TabsTrigger
              value="variant"
              className={cn(
                "h-full font-semibold data-[state=active]:text-primary-lighter border-b-2 data-[state=active]:border-primary-lighter rounded-none"
              )}
              disabled={!selectedModel}
            >
              Variant
            </TabsTrigger>
          </TabsList>
          <TabsContent value="model">
            <BrandModelList
              brandModelsData={brandModelsData}
              onSelectModel={setSelectedModel}
              selectedCars={selectedCars}
            />
          </TabsContent>
          <TabsContent value="variant">
            <VariantsList
              selectedModel={selectedModel}
              selectedCars={selectedCars}
              onSelectVariant={handleSelectVariant}
            />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import Button from "../ui/button";
import { Label } from "../ui/label";
import Link from "next/link";

export default function FindCarByBrandTab({ brandModels }) {
  const [brandSlug, setBrandSlug] = useState("");
  const [modelSlug, setModelSlug] = useState("");

  const filteredModels = brandModels?.filter(
    (brandData) => brandData.slug === brandSlug
  )[0]?.models;

  let href = "";

  if (brandSlug) {
    href += brandSlug;
  }

  if (modelSlug) {
    href += `/${modelSlug}`;
  }

  if (!brandSlug && !modelSlug) {
    href = "advanced-search";
  }

  return (
    <div className="w-full flex items-center gap-x-4 py-0 md:py-3">
      <div className="grow flex flex-col sm:flex-row sm:gap-x-5 gap-y-3">
        <div className="grow flex flex-col gap-y-2">
          <Label className="hidden md:block">Brand</Label>
          <Select value={brandSlug} onValueChange={setBrandSlug}>
            <SelectTrigger>
              <SelectValue placeholder="Select Brand" />
            </SelectTrigger>
            <SelectContent>
              {brandModels.map((brandData) => {
                const { brand_name, slug } = brandData;
                return (
                  <SelectItem key={slug} value={slug}>
                    {brand_name}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>
        <div className="grow flex flex-col gap-y-2">
          <Label className="hidden md:block">Model</Label>
          <Select
            value={modelSlug}
            onValueChange={setModelSlug}
            disabled={!brandSlug}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Model" />
            </SelectTrigger>
            <SelectContent>
              {filteredModels?.map((modelData) => {
                const { name, slug } = modelData;
                return (
                  <SelectItem key={slug} value={slug}>
                    {name}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>
      </div>
      <Button
        className="md:hidden rounded-full w-10 h-10 aspect-square p-1 shrink-0"
        size="lg"
      >
        <Link href={href}>
          <i className="bx bx-right-arrow-alt text-white text-2xl"></i>
        </Link>
      </Button>
      <Button
        animated
        className="hidden md:block shrink-0 uppercase px-10 py-3 mt-auto"
        asChild
      >
        <Link href={href}>Search</Link>
      </Button>
    </div>
  );
}

"use client";
import { useEffect, useRef } from "react";
import { Input } from "../ui/input";
import { Loader } from "@googlemaps/js-api-loader";

export default function AddressInputModule({ onFromChange, onToChange }) {
  const fromRef = useRef(null);
  const toRef = useRef(null);

  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.GOOGLE_SEARCH_PLACES_API,
      libraries: ["places"],
    });

    loader.load().then(() => {
      initAutocomplete(fromRef.current, onFromChange, "from");
      initAutocomplete(toRef.current, onToChange, "to");
    });
  }, []);

  const initAutocomplete = (inputField, onChange, type) => {
    if (!window.google) return;

    const autocomplete = new window.google.maps.places.Autocomplete(
      inputField,
      {
        types: ["(cities)"],
        componentRestrictions: { country: "in" },
      }
    );

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      const location = place.geometry?.location;
      const components = place.address_components || [];

      const getComponent = (type) =>
        components.find((c) => c.types.includes(type))?.long_name || null;

      const getShort = (type) =>
        components.find((c) => c.types.includes(type))?.short_name || null;

      const city =
        getComponent("locality") || getComponent("administrative_area_level_2");
      const state = getComponent("administrative_area_level_1");
      const stateCode = getShort("administrative_area_level_1");
      const country = getShort("country");

      const payload = {
        [`${type}_address`]: place.formatted_address,
        [`${type}_latitude`]: location?.lat().toString(),
        [`${type}_longitude`]: location?.lng().toString(),
        [`${type}_city_name`]: city,
        [`${type}_state_name`]: state,
        [`${type}_state_code`]: stateCode || "null",
        [`${type}_country`]: country,
        [`${type}_uri`]: city,
      };

      onChange(payload); // Send data to parent
    });
  };

  return (
    <>
      <div className="grid w-full items-center gap-2">
        <Input
          type="text"
          placeholder="Starting Point"
          className="bg-white border border-gray-200 h-[40px] sm:h-[45px] focus-visible:ring-0 focus-visible:ring-offset-0"
          ref={fromRef}
        />
      </div>
      <div className="grid w-full items-center gap-2">
        <Input
          type="text"
          placeholder="End Point"
          className="bg-white border border-gray-200 h-[40px] sm:h-[45px] focus-visible:ring-0 focus-visible:ring-offset-0"
          ref={toRef}
        />
      </div>
    </>
  );
}

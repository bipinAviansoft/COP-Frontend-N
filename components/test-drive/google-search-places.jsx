// components/text-drive/google-search-places.jsx

"use client";

import React, { useState, useRef, useEffect } from "react";

const LocationSearchMap = ({
  selectedLocation,
  changeOnHandleLocation,
  selectedAddress,
  changeOnHandleAddress,
}) => {
  const [searchInput, setSearchInput] = useState("");
  const mapRef = useRef(null);
  const autoCompleteRef = useRef(null);

  useEffect(() => {
    if (!window.google) return;

    autoCompleteRef.current = new window.google.maps.places.Autocomplete(
      document.getElementById("location-input")
    );

    autoCompleteRef.current.addListener("place_changed", handlePlaceSelect);

    const map = new window.google.maps.Map(mapRef.current, {
      center: { lat: 0, lng: 0 },
      zoom: 2,
    });

    changeOnHandleLocation(null); // Reset map on initialization
  }, []);

  const handlePlaceSelect = () => {
    const place = autoCompleteRef.current.getPlace();
    if (place && place.geometry) {
      const { lat, lng } = place.geometry.location;
      const location = { lat: lat(), lng: lng() };
      const address = place.formatted_address || "";

      changeOnHandleLocation(location);
      changeOnHandleAddress(address);

      updateMap(location);
    }
  };

  const updateMap = (location) => {
    const map = new window.google.maps.Map(mapRef.current, {
      center: location,
      zoom: 15,
    });

    new window.google.maps.Marker({
      position: location,
      map,
    });
  };

  return (
    <div className="space-y-3">
      <input
        id="location-input"
        type="text"
        placeholder="Search for a location"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        className="h-[50px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
      />
      <div
        ref={mapRef}
        className="w-full h-[500px] rounded-md border border-input"
      ></div>

      {selectedAddress && selectedLocation && (
        <div
          style={{
            marginTop: "20px",
            padding: "10px",
            border: "1px solid #ccc",
          }}
        >
          <p>
            <strong>Address:</strong> {selectedAddress}
          </p>
          <p>
            <strong>Location:</strong> {selectedLocation.lat},{" "}
            {selectedLocation.lng}
          </p>
        </div>
      )}
    </div>
  );
};

export default LocationSearchMap;

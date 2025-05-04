"use client";

import { useEffect, useState } from "react";
import { GoogleMap, DirectionsRenderer } from "@react-google-maps/api";

import { loadGoogleMaps } from "@/lib/google-loader";

const containerStyle = {
  width: "100%",
  height: "586px",
};

export default function FuelMap({ origin, destination }) {
  const [directions, setDirections] = useState(null);

  useEffect(() => {
    if (origin && destination) {
      loadGoogleMaps().then(() => {
        const directionsService = new window.google.maps.DirectionsService();

        directionsService.route(
          {
            origin,
            destination,
            travelMode: window.google.maps.TravelMode.DRIVING,
          },
          (result, status) => {
            if (status === "OK") {
              setDirections(result);
            } else {
              console.error("Directions request failed:", result);
            }
          }
        );
      });
    }
  }, [origin, destination]);

  return (
    <div style={containerStyle}>
      <GoogleMap center={origin} zoom={10} mapContainerStyle={containerStyle}>
        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>
    </div>
  );
}

import { Loader } from "@googlemaps/js-api-loader";

const loader = new Loader({
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_SEARCH_PLACES_API,
  libraries: ["places"],
});

export const loadGoogleMaps = () => loader.load();

import { buildXml } from "@/lib/buildxml";
import { fetchData } from "@/lib/fetch";

export async function GET() {
  const baseUrl = process.env.NEXT_SITE_URL || "https://localhost:3000";
  const pages = [
    "about-us",
    "advanced-search",
    "all-brand",
    "b2b-inquiry",
    "car-insurance",
    "car-loan",
    "compare",
    "dealership",
    "disclaimer",
    "electric-car-charging-station",
    "emi-calculator",
    "ev-car",
    "fuel-calculator",
    "fuel-station",
    "newly-launched-cars",
    "privacy-policy",
    "terms-and-conditions",
    "test-drive",
    "toll-calculator",
    "upcoming-car",
    "warning-lights",
  ];

  const urls = pages.map((page) => `${baseUrl}/${page}`);

  const xml = buildXml(urls);

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}

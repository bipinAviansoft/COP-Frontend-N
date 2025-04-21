"use client";

import Link from "next/link";
import { useState } from "react";
import CityProtectedLink from "../../city-protected-link";

export default function TrendingSearches({ onSelection }) {
  const [trendingSearches, setTrendingSearches] = useState([
    {
      id: "ac40f979-9c43-11ef-93bb-etgdgdfgdfg",
      slug: "tata-cars",
      name: "Tata",
    },
    {
      id: "ac40f979-9c43-11ef-93bb-b3451142a87",
      slug: "maruti-suzuki-cars",
      name: "Maruti Suzuki",
    },
    {
      id: "ac40f979-9c43-11ef-93bb-bc241rtya87",
      slug: "toyota-cars",
      name: "Toyota",
    },
    {
      id: "ac40f979-9c43-11ef-93bb-gtertert",
      slug: "hyundai-cars",
      name: "Hyundai",
    },
  ]);

  return (
    <div>
      <p className="text-gray-400 text-sm mb-2">Trending Searches</p>
      <ul>
        {trendingSearches.map((tredingItem) => {
          const { slug, name } = tredingItem;
          return (
            <li
              key={slug}
              className=" text-gray-darker text-sm p-1.5 hover:bg-gray-100 rounded"
            >
              <CityProtectedLink
                href={`/${slug}`}
                className="flex items-center gap-x-2"
                onClick={() => onSelection(tredingItem)}
              >
                <i className="bx bx-trending-up"></i>
                <span>{name}</span>
              </CityProtectedLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

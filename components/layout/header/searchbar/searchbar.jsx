"use client";

import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useEffect, useRef, useState } from "react";
import RecentSelections from "./recent-selections";
import TrendingSearches from "./trending-searches";
import SearchResults from "./search-results";

const fetchSearchResults = async (term) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/search?search=${term}`
  );

  if (!response.ok) {
    const error = await response.json();
    const { message } = error;
    throw new Error(message || `Search API Failed!`); 
  }

  const data = await response.json();
  return data;
};

export default function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [recentSelections, setRecentSelections] = useState([]);
  const timerRef = useRef();
  const resultsRef = useRef();
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [searchTerm]);

  const { isLoading, data: results } = useQuery({
    queryKey: ["search", { term: debouncedSearchTerm }],
    queryFn: () => fetchSearchResults(debouncedSearchTerm),
    enabled: debouncedSearchTerm.length >= 2,
  });

  useEffect(() => {
    const recentSelectionsCookie = Cookies.get("recentSelections");

    if (recentSelectionsCookie) {
      setRecentSelections(JSON.parse(recentSelectionsCookie));
    }
  }, []);

  const handleSelection = (searchItem) => {
    setIsOpen(false);
    setInRecentSelections(searchItem);
    setSearchTerm("");
  };

  const setInRecentSelections = (searchItem) => {
    const { slug } = searchItem;

    const existingRecentSelection = recentSelections.find(
      (recentItem) => recentItem.slug === slug
    );

    if (!existingRecentSelection) {
      setRecentSelections((prev) => {
        if (prev.length <= 3) {
          return [...prev, searchItem];
        }

        /* create a copy of prev, remove first, add last */
        const copy = [...prev];
        copy.shift();
        copy.push(searchItem);

        return copy;
      });

      const recentSelectionsCookie = Cookies.get("recentSelections");
      if (recentSelectionsCookie) {
        const exisitingCookieData = JSON.parse(recentSelectionsCookie);

        if (exisitingCookieData.length <= 3) {
          Cookies.set(
            "recentSelections",
            JSON.stringify([searchItem, ...exisitingCookieData])
          );
        } else {
          exisitingCookieData.shift();
          exisitingCookieData.push(searchItem);
          Cookies.set("recentSelections", JSON.stringify(exisitingCookieData));
        }
      } else {
        Cookies.set("recentSelections", JSON.stringify([searchItem]));
      }
    }

    if (resultsRef.current) {
      resultsRef.current.blur();
    }
  };

  return (
    <div className="lg:relative group">
      <Input
        ref={resultsRef}
        placeholder="Search Cars"
        className="focus:outline-none "
        aria-describedby="search-results"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={() => setIsOpen(true)}
      />
      <i className="bx bx-search text-white lg:text-gray-darker text-2xl bg-white/5 p-1 rounded absolute top-1/2 -translate-y-1/2 right-2"></i>
      {isOpen && (
        <div
          id="search-results"
          role="region"
          aria-live="polite"
          className="absolute top-[110%] inset-x-0 min-h-40 max-h-80 bg-white shadow-xl z-30 rounded-md hidden group-focus-within:flex flex-col gap-y-2 p-4 overflow-y-auto"
        >
          {results && (
            <SearchResults results={results} onSelection={handleSelection} />
          )}
          <RecentSelections
            recentSelections={recentSelections}
            onSelection={handleSelection}
          />
          <TrendingSearches onSelection={handleSelection} />
        </div>
      )}
    </div>
  );
}

import { clsx } from "clsx";
import { useSelector } from "react-redux";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatCarPrice(price, decimalCount = 2) {
  if (price >= 1e7) {
    let priceWithFraction = (price / 1e7).toString();
    const [ints, decimals] = priceWithFraction.split(".");
    return {
      price:
        parseInt(decimals) > 0
          ? ints + "." + decimals.substring(0, 2)
          : decimalCount > 0
          ? `${ints}.${"0".repeat(decimalCount)}`
          : ints,
      unit: "Cr",
    };
  } else {
    let priceWithFraction = (price / 1e5).toString();
    const [ints, decimals] = priceWithFraction.split(".");
    return {
      price:
        parseInt(decimals) > 0
          ? ints + "." + decimals.substring(0, 2)
          : decimalCount > 0
          ? `${ints}.${"0".repeat(decimalCount)}`
          : ints,
      unit: "Lakh",
    };
  }
}

export function formatCarMinMaxPrice(min, max, decimalCount) {
  const formattedMin = formatCarPrice(min, decimalCount);
  const formattedMax = formatCarPrice(max, decimalCount);

  if (min === max) {
    return `${formattedMin.price} ${formattedMin.unit}`;
  } else if (formattedMin.unit === formattedMax.unit) {
    return `${formattedMin.price}-${formattedMax.price} ${formattedMin.unit}`;
  } else {
    return `${formattedMin.price} ${formattedMin.unit}-${formattedMax.price} ${formattedMax.unit}`;
  }
}

export const generatePagination = (currentPage, totalPages) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
};

export const convertSecondsToMin = (totalSeconds) => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(seconds).padStart(2, "0");

  return `${formattedMinutes}:${formattedSeconds}`;
};

export const scrollToSection = (elementRef) => {
  elementRef.current?.scrollIntoView({ behavior: "smooth" });
};

"use client";

import { generatePagination } from "@/lib/utils";
import clsx from "clsx";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import Button from "./button";

export default function Pagination({ totalPages, currentPage, setPage }) {
  const allPages = generatePagination(currentPage, totalPages);

  return (
    <>
      <div className="flex justify-center">
        <PaginationArrow
          direction="left"
          isDisabled={currentPage <= 1}
          setPage={setPage}
        />

        <div className="flex -space-x-px">
          {allPages.map((page, index) => {
            let position;

            if (index === 0) position = "first";
            if (index === allPages.length - 1) position = "last";
            if (allPages.length === 1) position = "single";
            if (page === "...") position = "middle";

            return (
              <PaginationNumber
                key={page}
                page={page}
                position={position}
                isActive={currentPage === page}
                setPage={setPage}
              />
            );
          })}
        </div>

        <PaginationArrow
          direction="right"
          isDisabled={currentPage >= totalPages}
          setPage={setPage}
        />
      </div>
    </>
  );
}

function PaginationNumber({ page, isActive, position, setPage }) {
  const className = clsx(
    "flex size-8 lg:size-10 items-center justify-center text-sm lg:text-base border bg-white p-0 text-theme-black rounded-none",
    {
      "rounded-l-md": position === "first" || position === "single",
      "rounded-r-md": position === "last" || position === "single",
      "z-10 !bg-primary-lighter text-white": isActive,
      "hover:bg-gray-100": !isActive && position !== "middle",
      "text-gray-300": position === "middle",
    }
  );

  return isActive || position === "middle" ? (
    <div className={className}>{page}</div>
  ) : (
    <Button className={className} onClick={() => setPage(Number(page))}>
      {page}
    </Button>
  );
}

function PaginationArrow({ direction, isDisabled, setPage }) {
  const className = clsx(
    "flex size-8 lg:size-10 items-center justify-center rounded-md border bg-white p-0 text-theme-black",
    {
      "pointer-events-none !text-gray-300 cursor-not-allowed": isDisabled,
      "hover:bg-gray-100": !isDisabled,
      "mr-2 md:mr-4": direction === "left",
      "ml-2 md:ml-4": direction === "right",
    }
  );

  const icon =
    direction === "left" ? (
      <i className="bx bx-left-arrow-alt text-xl"></i>
    ) : (
      <i className="bx bx-right-arrow-alt text-xl"></i>
    );

  return (
    <Button
      className={className}
      onClick={() =>
        setPage((prev) => {
          if (direction === "left") return prev - 1;
          return prev + 1;
        })
      }
      disabled={isDisabled}
    >
      {icon}
    </Button>
  );
}

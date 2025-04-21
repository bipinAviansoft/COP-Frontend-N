import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import ExploreBrandCard from "../ui/explore-brand-card";
import { fetchModelsData } from "./car-variants";

export default function ExploreBrandsCards({
  initialModels = [],
  selectedBrandSlug,
  initialPage,
  carType,
  enabled = false,
}) {
  const { ref, inView } = useInView();

  const { isLoading, isFetchingNextPage, data, fetchNextPage } =
    useInfiniteQuery({
      queryKey: ["models", { carType, selectedBrandSlug }],
      queryFn: ({ pageParam }) =>
        fetchModelsData(
          selectedBrandSlug,
          carType === "all" ? "" : carType,
          pageParam
        ),
      enabled,
      initialPageParam: initialPage,
      getNextPageParam: (lastpage) =>
        lastpage.totalPages <= parseInt(lastpage.currentPage)
          ? null
          : parseInt(lastpage.currentPage) + 1,
    });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  let models = [...initialModels];

  data?.pages?.map((page) => {
    models = models.concat(page.data);
  });

  return (
    <div className="grid grid-cols-2 md:grid-cols-1 gap-3 lg:gap-4">
      {models?.map((model, index) => {
        return <ExploreBrandCard key={index} model={model} />;
      })}

      <div ref={ref} className="min-h-2 w-full ">
        {(isLoading || isFetchingNextPage) && (
          <div className="flex justify-center items-center p-16">
            <i className="bx bx-loader-alt animate-spin text-4xl"></i>
          </div>
        )}
      </div>
    </div>
  );
}

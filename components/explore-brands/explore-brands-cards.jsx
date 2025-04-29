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

  console.log("initialModels: ", initialModels);

  let models = [...initialModels];

  console.log("initialModels after: ", models);
  console.log("data?.pages kkkkk:", data?.pages);

  if (data?.pages[0]?.data) models = models.concat(data?.pages[0]?.data);

  // data?.pages?.map((page) => {
  //   console.log("page?.data:", page?.data);
  //   if (page?.data !== undefined) {
  //     models = models.concat(page?.data);
  //   }
  // });

  console.log("models data: ", models);

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

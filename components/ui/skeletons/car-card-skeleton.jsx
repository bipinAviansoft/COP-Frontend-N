import { Skeleton } from "@/components/ui/skeleton";

export default function CarCardSkeleton() {
  return (
    <div className="border-1 shadow-md rounded-lg flex flex-col overflow-hidden">
      <Skeleton className="relative w-full aspect-3/2 xl:aspect-5/3 rounded-none" />
      <div className="bg-white grow p-3 lg:p-4 flex flex-col space-y-1.5 cursor-pointer">
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-5 w-[100px] md:w-[200px]" />
        <Skeleton className="h-5 w-[50px] md:w-[150px]" />
      </div>
      <div className="bg-white flex justify-around gap-[1px]">
        <div className="w-1/2 flex justify-center items-center gap-x-2 p-2 lg:p-3">
          <Skeleton className="h-4 w-12 rounded-none" />
        </div>
        <div className="w-1/2 flex justify-center items-center gap-x-2 p-2 lg:p-3">
          <Skeleton className="h-4 w-12 rounded-none" />
        </div>
      </div>
    </div>
  );
}

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import SearchFilters from "./search-filters";
import Button from "../ui/button";

export default function SearchFiltersMobile({
  filters,
  baseEndpoint,
  pageType,
}) {
  return (
    <Dialog>
      <DialogTrigger className="bg-white w-36 flex justify-center items-center gap-x-3 text-gray-700 grow text-sm md:text-base rounded-none border-l-[0.5px] border-gray-700 py-2">
        <i className="bx bx-filter-alt text-2xl"></i> Filter
      </DialogTrigger>
      <DialogContent
        className="w-[90%] md:max-w-lg lg:max-w-2xl rounded-lg max-h-[90dvh] overflow-y-auto flex flex-col p-0 gap-0"
        hideCloseButton
      >
        <DialogHeader>
          <DialogTitle className="p-4 flex items-center justify-between">
            Filter{" "}
            <Button className="bg-primary-lighter py-2 px-3">
              Clear All Filters
            </Button>
          </DialogTitle>
          <span className="hidden">
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </span>
        </DialogHeader>
        <SearchFilters
          baseEndpoint={baseEndpoint}
          pageType={pageType}
          filters={filters}
        />
        <div className="py-2 self-center">
          <DialogClose asChild>
            <Button>Apply</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/* <Button className="bg-white flex items-center gap-x-3 text-gray-700 flex-[0_0_50%] text-base rounded-none border-l-[0.5px] border-gray-700">
        <i className="bx bx-filter-alt text-2xl"></i> Filter
      </Button> */

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import CarTypeFilter from "./filters/car-type-filter";
import Filter from "./filters/filter";
import BudgetFilter from "./filters/budget-filter";
import { filterPageConstants } from "@/data/constants.js";
import LaunchMonthFilters from "./filters/launch-month-filters";

export default function SearchFilters({
  filters,
  baseEndpoint,
  pageType = "adv-search",
}) {
  return (
    <div className="rounded-xl overflow-y-auto lg:overflow-hidden">
      {pageType === filterPageConstants.NEWLY_LAUNCHED_CARS && (
        <Accordion
          type="single"
          collapsible
          defaultValue="launchMonth"
          className="bg-white rounded-none overflow-hidden text-[#565F64] overflow-y-auto"
        >
          <AccordionItem value="launchMonth">
            <AccordionTrigger
              className="px-4 py-3 lg:p-4 border-t border-b text-sm md:text-base"
              showArrow
            >
              Launch Month
            </AccordionTrigger>
            <AccordionContent>
              <LaunchMonthFilters
                baseEndPoint="/newly-launched-cars"
                filters={filters}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}

      {pageType !== filterPageConstants.UPCOMING_CARS && (
        <Accordion
          type="single"
          defaultValue="budget"
          collapsible
          className="bg-white rounded-none overflow-hidden text-[#565F64] overflow-y-auto"
        >
          <AccordionItem value="budget">
            <AccordionTrigger
              className="px-4 py-3 lg:p-4 border-t border-b text-sm md:text-base"
              showArrow
            >
              By Budget
            </AccordionTrigger>
            <AccordionContent>
              <BudgetFilter baseEndpoint={baseEndpoint} filters={filters} />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}

      <Accordion
        type="single"
        defaultValue="brand"
        collapsible
        className="bg-white rounded-none overflow-hidden text-[#565F64] overflow-y-auto"
      >
        <AccordionItem value="brand">
          <AccordionTrigger
            className="px-4 py-3 lg:p-4 border-t border-b text-sm md:text-base"
            showArrow
          >
            By Brand
          </AccordionTrigger>
          <AccordionContent>
            <Filter
              endpoint={`${baseEndpoint}/brands`}
              queryKey="brands"
              filters={filters}
              searchFilter
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {pageType === filterPageConstants.UPCOMING_CARS && (
        <Accordion
          type="single"
          defaultValue="brand"
          collapsible
          className="bg-white rounded-none overflow-hidden text-[#565F64] overflow-y-auto"
        >
          <AccordionItem value="brand">
            <AccordionTrigger
              className="px-4 py-3 lg:p-4 border-t border-b text-sm md:text-base"
              showArrow
            >
              By Budget
            </AccordionTrigger>
            <AccordionContent>
              <Filter
                endpoint={`${baseEndpoint}/budget`}
                queryKey="budget"
                filters={filters}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}

      <Accordion
        type="single"
        defaultValue="bodyType"
        collapsible
        className="bg-white rounded-none overflow-hidden text-[#565F64] overflow-y-auto"
      >
        <AccordionItem value="bodyType">
          <AccordionTrigger
            className="px-4 py-3 lg:p-4 border-t border-b text-sm md:text-base"
            showArrow
          >
            By Body Type
          </AccordionTrigger>
          <AccordionContent className="pb-0">
            <CarTypeFilter baseEndpoint={baseEndpoint} filters={filters} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {pageType === filterPageConstants.ADV_SEARCH && (
        <Accordion
          type="single"
          defaultValue="fuelType"
          collapsible
          className="bg-white rounded-none overflow-hidden text-[#565F64] overflow-y-auto"
        >
          <AccordionItem value="fuelType">
            <AccordionTrigger
              className="px-4 py-3 lg:p-4 border-t border-b text-sm md:text-base"
              showArrow
            >
              Fuel Type
            </AccordionTrigger>
            <AccordionContent>
              <Filter
                queryKey="fuelTypes"
                endpoint={`${baseEndpoint}/fuel-types`}
                filters={filters}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}

      {pageType === filterPageConstants.ADV_SEARCH && (
        <Accordion
          type="single"
          collapsible
          className="bg-white rounded-none overflow-hidden text-[#565F64] overflow-y-auto"
        >
          <AccordionItem value="engineCapacity">
            <AccordionTrigger
              className="px-4 py-3 lg:p-4 border-t border-b text-sm md:text-base"
              showArrow
            >
              Engine capacity(cc)
            </AccordionTrigger>
            <AccordionContent>
              <Filter
                endpoint={`${baseEndpoint}/engine`}
                queryKey="engine"
                filters={filters}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}

      {pageType === filterPageConstants.ADV_SEARCH && (
        <Accordion
          type="single"
          collapsible
          className="bg-white rounded-none overflow-hidden text-[#565F64] overflow-y-auto"
        >
          <AccordionItem value="transimission">
            <AccordionTrigger
              className="px-4 py-3 lg:p-4 border-t border-b text-sm md:text-base"
              showArrow
            >
              Transmission Type
            </AccordionTrigger>
            <AccordionContent>
              <Filter
                endpoint={`${baseEndpoint}/transmission`}
                queryKey="transmission"
                filters={filters}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}

      {pageType === filterPageConstants.ADV_SEARCH && (
        <Accordion
          type="single"
          collapsible
          className="bg-white rounded-none overflow-hidden text-[#565F64] overflow-y-auto"
        >
          <AccordionItem value="driveTrain">
            <AccordionTrigger
              className="px-4 py-3 lg:p-4 border-t border-b text-sm md:text-base"
              showArrow
            >
              Drive-train Type
            </AccordionTrigger>
            <AccordionContent>
              <Filter
                queryKey="driveTrain"
                endpoint={`${baseEndpoint}/drive-train`}
                filters={filters}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}

      {pageType === filterPageConstants.ADV_SEARCH && (
        <Accordion
          type="single"
          collapsible
          className="bg-white rounded-none overflow-hidden text-[#565F64] overflow-y-auto"
        >
          <AccordionItem value="safetyFeatures">
            <AccordionTrigger
              className="px-4 py-3 lg:p-4 border-t border-b text-sm md:text-base"
              showArrow
            >
              Safety Features
            </AccordionTrigger>
            <AccordionContent>
              <Filter
                endpoint={`${baseEndpoint}/safety`}
                queryKey="safety"
                filters={filters}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}

      {pageType === filterPageConstants.ADV_SEARCH && (
        <Accordion
          type="single"
          collapsible
          className="bg-white rounded-none overflow-hidden text-[#565F64] overflow-y-auto"
        >
          <AccordionItem value="features">
            <AccordionTrigger
              className="px-4 py-3 lg:p-4 border-t border-b text-sm md:text-base"
              showArrow
            >
              Features
            </AccordionTrigger>
            <AccordionContent>
              <h3 className="px-6 mt-4 font-semibold text-theme-black text-base">
                Interior:{" "}
              </h3>
              <Filter
                endpoint={`${baseEndpoint}/interior`}
                queryKey="interior"
                filters={filters}
              />
              <h3 className="px-6 mt-4 font-semibold text-theme-black text-base">
                Exterior:
              </h3>
              <Filter
                endpoint={`${baseEndpoint}/exterior`}
                queryKey="exterior"
                filters={filters}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}
    </div>
  );
}

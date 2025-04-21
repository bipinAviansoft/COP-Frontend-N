import UpcomingCarMonthsSelection from "./upcoming-car-months-selection";

export default function UpcomingCarMonthsSelectionBox({
  options,
  selectedOption = "3",
}) {
  return (
    <div className="p-4 md:px-10 md:py-8 bg-white rounded-xl md:w-1/3">
      <h6 className="hidden md:block font-semibold mb-2">
        Select Launch Month
      </h6>
      <div className="flex flex-col gap-y-4 md:flex-row md:gap-x-4">
        <UpcomingCarMonthsSelection
          options={options}
          selectedOption={selectedOption}
          searchOnClick
        />
      </div>
    </div>
  );
}

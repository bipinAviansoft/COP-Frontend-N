import { Progress } from "../ui/progress";
import { Separator } from "../ui/separator";

export default function Ratings({ avgRating, total, ratingCount }) {
  return (
    <div className="flex items-center md:items-start md:justify-between gap-x-8 lg:flex-col">
      <div className="flex flex-col md:flex-row gap-y-2 md:gap-x-3 shrink-0">
        <div className="flex items-center gap-x-2">
          <i className="bx bxs-star text-primary-lighter text-2xl md:text-3xl lg:text-4xl"></i>
          <span className="text-3xl font-bold text-primary-darker md:text-4xl lg:text-5xl">
            {avgRating}
          </span>
        </div>
        <div>
          <p className="text-stone-500 text-sm  md:text-base">Based on</p>
          <p className="text-stone-700 text-sm  md:text-base font-semibold lg:font-bold">
            {total} User ratings
          </p>
        </div>
      </div>
      <Separator className="hidden lg:block my-4 h-[1px] bg-gray-400" />
      <ul className="grow md:grow-0 md:w-1/2 md:space-y-2 lg:w-full">
        {Object.entries(ratingCount).map(([key, value], index) => {
          return (
            <li
              key={index}
              className="flex items-center gap-x-2 md:gap-x-3 lg:gap-x-4"
            >
              <Progress
                className="bg-stone-300 h-1.5 w-3/5"
                indicatorClassName="bg-primary-lighter"
                value={(value / total) * 100}
              />
              <span className="shrink-0 text-sm text-theme-black font-semibold md:text-base">
                {key}
              </span>
              <span className="shrink-0 text-xs text-stone-500 font-medium md:text-sm">
                {value} Rating{value > 1 ? "s" : ""}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

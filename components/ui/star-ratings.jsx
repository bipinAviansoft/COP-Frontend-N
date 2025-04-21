import { cn } from "@/lib/utils";
import Button from "./button";

export default function StarRatings({ readOnly, rating, setRating }) {
  const handleClick = (value) => {
    if (!readOnly) {
      setRating(value);
    }
  };

  return (
    <div className="flex items-center gap-x-2">
      <span>
        {Array.from({ length: 5 }, (_, index) => {
          return (
            <Button
              key={index}
              className="p-0 bg-transparent"
              onClick={() => handleClick(index + 1)}
            >
              <i
                className={cn(
                  "bx bxs-star md:text-base lg:text-xl",
                  { "md:text-lg lg:text-3xl": !readOnly },
                  index + 1 <= rating ? "text-[#fea500]" : "text-stone-700"
                )}
              ></i>
            </Button>
          );
        })}
      </span>
      {readOnly && (
        <span className="text-xs text-stone-500 font-medium md:text-sm">
          {rating}.0 Ratings
        </span>
      )}
    </div>
  );
}

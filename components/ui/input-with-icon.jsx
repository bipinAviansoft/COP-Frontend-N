import { cn } from "@/lib/utils";
import { Input } from "./input";
import { forwardRef } from "react";

const InputWithIcon = forwardRef(function InputWithIcon(
  { iconClass, className, ...props },
  ref
) {
  return (
    <div className="relative grow">
      <i
        className={cn("absolute top-1/2 -translate-y-1/2 left-3", iconClass)}
      />
      <Input {...props} ref={ref} className={cn("pl-10", className)} />
    </div>
  );
});

export default InputWithIcon;

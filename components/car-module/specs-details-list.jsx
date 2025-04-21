import { cn } from "@/lib/utils";
import Image from "next/image";

export default function SpecsDetailsList({ specsDetails }) {
  const { name, image, details } = specsDetails;
  return (
    <ul className="relative">
      <div className="absolute w-36 h-3/4 opacity-5 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
        <Image src={image} alt={name} fill />
      </div>
      {details.map((item, index) => {
        const { features_name, feature_value } = item;
        const bgClass = index % 2 === 0 ? "bg-gray-100" : "bg-gray-50";
        return (
          <li
            key={index}
            className={cn(
              "px-3 py-4 font-semibold flex justify-between items-center text-sm",
              bgClass
            )}
          >
            <p className="flex-[0_0_60%] text-left">{features_name}</p>
            <p className="flex-[0_0_40%] text-right">{feature_value}</p>
          </li>
        );
      })}
    </ul>
  );
}

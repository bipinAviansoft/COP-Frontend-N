import Link from "next/link";
import Button from "../ui/button";
import useAllowTestDrive from "@/hooks/use-allow-test-drive";

export default function Pricing({
  pricing,
  brand,
  model,
  selectedVariantSlug,
}) {
  const allowTestDrive = useAllowTestDrive();

  if (pricing) {
    const keyValueList = Object.entries(pricing);

    return (
      <div className="space-y-3">
        <ul>
          {keyValueList
            .slice(2, keyValueList.length - 1)
            .map(([label, price], index) => {
              return (
                <li
                  key={index}
                  className="flex justify-between items-center py-1.5 text-gray-600 font-semibold text-sm"
                >
                  <span>{label}</span>
                  <span>₹ {price.toLocaleString("en-IN")}</span>
                </li>
              );
            })}
        </ul>
        <div className="flex items-center gap-x-4">
          <Link
            href={`/emi-calculator/${selectedVariantSlug}`}
            className="inline-block grow shrink-0"
          >
            <Button
              animated
              className="w-full bg-[#b9d5e060] text-sky-700 uppercase font-semibold tracking-wide"
            >
              Check EMI
            </Button>
          </Link>
          {allowTestDrive && (
            <Link
              href={`/test-drive/${brand}/${model}`}
              className="inline-block grow shrink-0"
            >
              <Button
                animated
                className="w-full bg-primary-lighter text-white uppercase font-semibold tracking-wide"
              >
                Book A Test Drive
              </Button>
            </Link>
          )}
        </div>
      </div>
    );
  }
}

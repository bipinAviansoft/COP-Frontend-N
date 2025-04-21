import Image from "next/image";

export default function KeySpecsSlide({ title, data, limit }) {
  return (
    <div className="rounded-md overflow-hidden xl:flex xl:items-center xl:justify-around xl:px-4">
      <h4 className="bg-stone-300 text-stone-600 lg:bg-white lg:text-black md:text-lg font-semibold px-3 py-2 lg:px-4 lg:py-3 xl:shrink-0">
        {title}
      </h4>
      {/* <ul className="grid grid-cols-4 md:grid-cols-5 gap-x-2 p-3"> */}
      <ul className="grow flex justify-around items-center gap-x-2 p-3">
        {data.slice(0, limit).map((spec) => {
          const { features_name, features_image, feature_value } = spec;

          return (
            <li
              key={features_name}
              className="flex flex-col items-center p-1.5"
            >
              <div className="relative size-6 lg:size-7 shrink-0 mb-3">
                <Image src={features_image} alt={features_name} fill />
              </div>
              <h5 className="text-xs lg:text-sm text-center mb-1">
                {features_name}
              </h5>
              {feature_value && (
                <p className="text-xs lg:text-sm font-semibold text-center">
                  {features_name === "Power"
                    ? feature_value.split(" ").slice(0, 2).join(" ")
                    : feature_value}
                </p>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

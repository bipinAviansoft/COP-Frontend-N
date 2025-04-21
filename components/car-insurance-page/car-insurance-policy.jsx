import Image from "next/image";

const DATA = [
  {
    title: "Stand-Alone Third-Party Car Insurance Policy",
    description:
      "This policy offers essential protection, covering damages caused to third parties by your car. It's the ideal choice for those who want to fulfil legal requirements without additional coverage.",
    imageUrl: "/images/car-insurance-option-1.png",
  },
  {
    title: "Stand Alone Own Damage Car Insurance Policy",
    description:
      "Providing coverage exclusively for damages to your vehicle, this policy is perfect if you need to safeguard your car against unforeseen accidents, theft, or natural calamities.",
    imageUrl: "/images/car-insurance-option-2.png",
  },
  {
    title: "Comprehensive Car Insurance Policy",
    description:
      "A comprehensive policy combines both third-party liability and own damage coverage, ensuring you're fully protected in any situation, from accidents to theft and even natural disasters. It's the all-inclusive choice for complete peace of mind on the road.",
    imageUrl: "/images/car-insurance-option-3.png",
  },
];

export default function CarInsurancePolicySection() {
  return (
    <>
      <div className="text-center">
        <h3 className="text-xl lg:text-2xl xl:text-3xl font-semibold text-primary-lighter">
          Car Insurance Policy Options
        </h3>
        <p className="text-sm lg:text-base text-gray-700 mt-2 w-full lg:w-[40%] mx-auto">
          Broad range of car insurance policy, and car insurance renewal options
          to match the specific needs
        </p>
      </div>

      <div className="flex justify-around items-stretch flex-wrap mt-9 md:gap-y-8 gap-y-5">
        {DATA.map((item, index) => {
          const { title, description, imageUrl } = item;

          return (
            <div key={index} className="w-full lg:w-1/2 xl:w-1/4 flex flex-col">
              <div className="grow bg-primary-gradient rounded-lg gap-3 flex ml-10 md:ml-14 xl:ml-0 relative">
                <div className="-left-10 absolute w-24 aspect-[93/112]">
                  <Image src={imageUrl} alt="" fill />
                </div>
                <div className="w-full pr-10 pl-16 py-8">
                  <h3 className="text-lg lg:text-xl font-semibold mb-5 text-white">
                    {title}
                  </h3>
                  <p className="text-sm text-white">{description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

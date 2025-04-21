const DATA = [
  {
    title: "Online Policy Purchase",
    description:
      "Buy your car insurance hassle-free from the comfort of your home.",
  },
  {
    title: "Customised Coverage with Add-Ons",
    description:
      "Customise your policy to fit your unique needs with our range of add-on options.",
  },
  {
    title: "Effortless Claims",
    description:
      "Our streamlined claims process ensures a stress-free experience during challenging times.",
  },
  {
    title: "Extensive Garage Network",
    description:
      "We have you covered wherever you are with our wide-reaching network of partner garages.",
  },
  {
    title: "Comprehensive Security",
    description:
      "Drive with confidence, knowing your four-wheeled companion is fully protected.",
  },
  {
    title: "High Claim Settlement Ratio",
    description:
      "Rest easy knowing that the majority of our claims get settled promptly.",
  },
  {
    title: "Financial Protection",
    description:
      "Our Car insurance shields you from hefty repair bills after accidents. 'Drive worry-free with your financial safety net.'",
  },
  {
    title: "Legal Compliance",
    description:
      "It's a legal requirement. 'Stay on the right side of the law while on the road.'",
  },
];

export default function CarInsuranceBenifitsSection() {
  return (
    <>
      <h3 className="text-xl lg:text-2xl xl:text-3xl font-bold text-primary-lighter text-center">
        {" "}
        Benefits of Car Insurance
      </h3>

      <div className="flex flex-wrap gap-y-5 mt-6 lg:mt-12">
        {DATA.map((item, index) => {
          const { title, description } = item;

          return (
            <div key={index} className="w-full sm:w-1/2 xl:w-1/4 px-3">
              <div className="bg-white px-4 py-5 rounded-md h-full flex items-start gap-1 lg:gap-2">
                <div className="text-base md:text-lg lg:text-xl font-semibold text-black">
                  {index + 1}.
                </div>
                <div>
                  <h4 className="text-base md:text-lg font-semibold text-black mb-1">
                    {title}
                  </h4>
                  <p className="text-sm lg:text-base text-gray-500 Buy your car insurance hassle-free from the comfort of your home.">
                    {description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

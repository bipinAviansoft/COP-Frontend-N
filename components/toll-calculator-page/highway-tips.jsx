import Image from "next/image";
import PlanYourStepImg from "@/public/images/Plan-your-stops-prior.svg";

export default function HighwayTips() {
  return (
    <>
      <div className="text-base font-bold text-primary-lighter bg-[#e3eef3] px-[30px] py-[10px] absolute top-[-75px] lg:top-[-115px] right-0 rounded-t-[20px] cursor-pointer">
        Highway Tips
      </div>
      <h3 className="text-2xl lg:text-3xl font-bold mb-2">Highway Insights:</h3>
      <h4 className="text-lg text-primary-lighter font-medium">
        {" "}
        Enhance Your Driving Experience
      </h4>

      <div className="flex flex-wrap gap-y-5 mt-4 lg:mt-7 -mx-3">
        <div className="w-full sm:w-1/2 xl:w-1/4 px-3">
          <div className="bg-white py-4 px-4 lg:px-4 lg:py-5 rounded-md h-full flex flex-col items-start gap-1 lg:gap-2">
            <div className="flex gap-3 items-center">
              <Image src={PlanYourStepImg} alt="" className="w-8 md:w-10 " />
              <h4 className="text-base xl:text-lg font-semibold text-black">
                Plan your stops prior
              </h4>
            </div>
            <ul className="list-disc pl-7 flex flex-col gap-1">
              <li className="text-sm font-normal text-gray-500">
                Map out fuel stops on the way.
              </li>
              <li className="text-sm font-normal text-gray-500">
                Incorporate designated rest areas for breaks.
              </li>
              <li className="text-sm font-normal text-gray-500">
                Keep contact numbers saved for roadside support.
              </li>
            </ul>
          </div>
        </div>
        <div className="w-full sm:w-1/2 xl:w-1/4 px-3">
          <div className="bg-white py-4 px-4 lg:px-4 lg:py-5 rounded-md h-full flex flex-col items-start gap-1 lg:gap-2">
            <div className="flex gap-3 items-center">
              <Image src={PlanYourStepImg} alt="" className="w-8 md:w-10 " />
              <h4 className="text-base xl:text-lg font-semibold text-black">
                Drive carefully on the road
              </h4>
            </div>
            <ul className="list-disc pl-7 flex flex-col gap-1">
              <li className="text-sm font-normal text-gray-500">
                Use the speed limits set for each section.
              </li>
              <li className="text-sm font-normal text-gray-500">
                Do not engage aggressive drivers.
              </li>
              <li className="text-sm font-normal text-gray-500">
                Indicate your intentions before changing lanes or turning.
              </li>
            </ul>
          </div>
        </div>
        <div className="w-full sm:w-1/2 xl:w-1/4 px-3">
          <div className="bg-white py-4 px-4 lg:px-4 lg:py-5 rounded-md h-full flex flex-col items-start gap-1 lg:gap-2">
            <div className="flex gap-3 items-center">
              <Image src={PlanYourStepImg} alt="" className="w-8 md:w-10 " />
              <h4 className="text-base xl:text-lg font-semibold text-black">
                Tips for safe night driving
              </h4>
            </div>
            <ul className="list-disc pl-7 flex flex-col gap-1">
              <li className="text-sm font-normal text-gray-500">
                Use high beams on empty roads and low beams in traffic.
              </li>
              <li className="text-sm font-normal text-gray-500">
                Drive slower in darkness due to decreased visibility to avoid
                accidents.
              </li>
              <li className="text-sm font-normal text-gray-500">
                Before driving at night make sure you take enough rest first.
              </li>
            </ul>
          </div>
        </div>
        <div className="w-full sm:w-1/2 xl:w-1/4 px-3">
          <div className="bg-white py-4 px-4 lg:px-4 lg:py-5 rounded-md h-full flex flex-col items-start gap-1 lg:gap-2">
            <div className="flex gap-3 items-center">
              <Image src={PlanYourStepImg} alt="" className="w-8 md:w-10 " />
              <h4 className="text-base xl:text-lg font-semibold text-black">
                Make sure the vehicle readiness is up-to-date
              </h4>
            </div>
            <ul className="list-disc pl-7 flex flex-col gap-1">
              <li className="text-sm font-normal text-gray-500">
                Check the inflation on your tires to make sure they are not
                below the recommended level.
              </li>
              <li className="text-sm font-normal text-gray-500">
                Ascertain the presence of the desired levels of oil, coolant,
                and brake fluids.
              </li>
              <li className="text-sm font-normal text-gray-500">
                Make sure that the lights are all working well before going out
                at night or early in the morning.
              </li>
              <li className="text-sm font-normal text-gray-500">
                Have with you a car toolbox that contains such things as
                spanners, screwdrivers, and all these others (such as pliers),
                new tires when necessary, as well as a first aid box.
              </li>
              <li className="text-sm font-normal text-gray-500">
                For a quick start, ensure that the battery is charged.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

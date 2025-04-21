import Image from "next/image";
import AbousUsImg from "@/public/images/about-us-img.png";
import CopImg from "@/public/images/logo.png";

export default function AboutUsSection() {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
        <div className="lg:col-span-8 pr-0 lg:pr-12 relative">
          <Image src={CopImg} alt="" className="w-3/4 md:w-2/4 absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 -z-10 opacity-[0.2]" />
          <p className="text-sm lg:text-base font-normal text-gray-500 mb-3 lg:mb-5">
            Welcome to CarOnPhone, your ultimate destination for an exceptional car-buying experience. Our mission is to provide you with a personalised, seamless journey towards owning your dream
            car. As avid car enthusiasts, we understand the thrill of finding the perfect car that suits your lifestyle.
          </p>
          <p className="text-sm lg:text-base font-normal text-gray-500 mb-3 lg:mb-5">
            Our platform offers an extensive collection of top car brands and models, catering to various preferences and budgets. We pride ourselves on delivering accurate and transparent
            information, allowing you to make well-informed decisions with confidence.
          </p>
          <p className="text-sm lg:text-base font-normal text-gray-500 mb-3 lg:mb-5">
            Our dedicated team is committed to assisting you throughout the process, from exploring options to securing the best financing solutions. We believe that every car purchase should be
            exciting and stress-free. Our commitment to exceptional service extends beyond the online platform, as we are here to guide you every step of the way.
          </p>
          <p className="text-sm lg:text-base font-normal text-gray-500 mb-3 lg:mb-5">
            Join us on the journey of driving your dream car home^ with CarOnPhone. Experience the joy of car ownership like never before as we redefine the way you buy cars.
          </p>
        </div>
        <div className="lg:col-span-4">
          <Image src={AbousUsImg} alt="" className="w-full " priority />
        </div>
      </div>
    </>
  );
}

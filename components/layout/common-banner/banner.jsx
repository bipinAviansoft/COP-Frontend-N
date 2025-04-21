import Image from "next/image";

export default function CommonBanner({ bannerImgUrl, heading, description }) {
  return (
    <section className="relative w-full h-[150px] md:h-[160px] lg:h-[200px]">
      <div className="absolute w-full h-[150px] md:h-[160px] lg:h-[200px] -z-10">
        <Image
          src={bannerImgUrl}
          alt="banner"
          className="object-cover object-center"
          fill
        />
      </div>
      <div className="container h-full align-middle">
        <div className="w-full lg:w-3/4 flex flex-col h-full justify-center">
          <h1 className="font-semibold text-white text-xl lg:text-2xl mb-2 lg:mb-4">
            {heading}
          </h1>
          <p className="text-sm text-gray-400 lg:text-base lg:w-1/2">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}

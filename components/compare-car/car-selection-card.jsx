import { cn } from "@/lib/utils";
import AddCarIcon from "@/public/images/car_icon.svg";
import Image from "next/image";
import Button from "../ui/button";

export default function CarSelectionCard({
  carDetails,
  isNext,
  openModal,
  onRemoveCar,
  setIndexToReplace,
}) {
  const {
    slug,
    variant_image,
    brand_name: brandName,
    model_name: modelName,
    variant_name: variantName,
  } = carDetails || {};

  return (
    <div
      className={cn(
        "relative flex flex-col",
        carDetails || isNext ? "opacity-100 " : "opacity-40",
        carDetails
      )}
    >
      {carDetails && (
        <Button
          className="rounded-full p-0 w-6 h-6 flex items-center overflow-hidden justify-center text-white absolute top-0 right-0 -translate-y-1/3 translate-x-1/3"
          onClick={() => onRemoveCar(slug)}
        >
          <i className="bx bx-x text-lg"></i>
        </Button>
      )}
      <div className="min-h-52 lg:min-h-60 grow flex flex-col justify-center items-center gap-2 rounded-md border border-gray-500 p-1">
        {!carDetails ? (
          <div
            className={cn("flex flex-col justify-center items-center gap-y-2", {
              "cursor-pointer": isNext,
            })}
            onClick={isNext ? () => openModal(true) : () => {}}
          >
            <Image src={AddCarIcon} alt="" className="w-[80px]" />
            <h4 className="text-base lg:text-lg font-semibold text-gray-500">
              Add Car to Compare
            </h4>
          </div>
        ) : (
          <div
            className="w-full flex flex-col items-center gap-5"
            onClick={() => {
              setIndexToReplace();
              openModal(true);
            }}
          >
            <div className="relative w-full max-w-[210px] h-[120px]">
              <Image
                src={variant_image}
                alt=""
                className="object-cover object-center"
                fill
              />
            </div>
            <div className="text-center">
              <h4 className="text-base md:text-lg font-semibold text-black">
                {brandName} {modelName}
              </h4>
              <p className="text-sm font-normal text-gray-500">{variantName}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

import SimilarCarCard from "./similar-car-card";
import SimilarCarsCarousel from "./similar-cars-carousel";

export default function SimilarVariantsSection({
  selectedVariant,
  similarVariants,
  modelType,
}) {
  return (
    <>
      <SimilarCarsCarousel variants={similarVariants} modelType={modelType} />
    </>
  );
}

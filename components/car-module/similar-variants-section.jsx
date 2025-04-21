import SimilarCarCard from "./similar-car-card";
import SimilarCarsCarousel from "./similar-cars-carousel";

export default function SimilarVariantsSection({
  selectedVariant,
  similarVariants,
}) {
  return (
    <>
      <SimilarCarsCarousel variants={similarVariants} />
    </>
  );
}

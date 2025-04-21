import CarCardSkeleton from "./car-card-skeleton";

export default function CarsList({ number }) {
  return (
    <div className="grid grid-cols-4 gap-x-4 pt-6">
      {Array.from({ length: number }, (_, index) => (
        <CarCardSkeleton key={index} />
      ))}
    </div>
  );
}

export default function NoCarsFound() {
  return (
    <div className="min-h-40 flex flex-col justify-center items-center gap-y-1">
      <h4 className="font-semibold text-xl">No cars found!</h4>
      <p className="text-gray-500">Please remove or try different filters</p>
    </div>
  );
}

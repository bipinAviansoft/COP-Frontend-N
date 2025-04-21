import KeySpecsCarousel from "./key-specs-carousel";

export default function KeySpecs({ keySpecsData }) {
  const { "Key Specs": keySpecs, "Key Safety": keySafety } = keySpecsData;

  return (
    <div className="bg-white rounded-md">
      {keySpecs && keySafety && (
        <KeySpecsCarousel keySpecsData={keySpecsData} />
      )}
    </div>
  );
}

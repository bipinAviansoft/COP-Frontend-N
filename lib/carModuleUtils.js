import { fetchData } from "./fetch";

export async function resolveVariantData(brandSlug, modelSlug) {
  const variantsData = await fetchData(
    `/brands/${brandSlug}/${modelSlug}`,
    true
  );
  const baseVariantSlug = variantsData?.variants?.[0]?.slug;
  return baseVariantSlug?.split("/")[2]; // Extracts the variantSlug from the URL structure.
}

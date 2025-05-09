export const dynamic = "force-dynamic";
import { buildXml } from "@/lib/buildxml";
import { fetchData } from "@/lib/fetch";

export async function GET() {
  const baseUrl = process.env.NEXT_SITE_URL || "https://localhost:3000";
  const variants = await fetchData("/sitemap?variant=true");

  const urls = variants?.variants?.map(
    (variant) => `${baseUrl}${variant.slug}`
  );

  const xml = buildXml(urls);

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}

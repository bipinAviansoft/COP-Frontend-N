import { buildXml } from "@/lib/buildxml";
import { fetchData } from "@/lib/fetch";

export async function GET() {
  const baseUrl = process.env.NEXT_SITE_URL || "https://localhost:3000";
  const models = await fetchData("/sitemap?model=true");

  const urls = models?.models?.map((model) => `${baseUrl}${model.slug}`);

  const xml = buildXml(urls);

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}

import { buildXml } from "@/lib/buildxml";
import { fetchData } from "@/lib/fetch";

export async function GET() {
  const baseUrl = process.env.NEXT_SITE_URL || "https://localhost:3000";
  const models = await fetchData("/sitemap?model=true");
  const variants = await fetchData("/sitemap?variant=true");

  let urls = [];

  if (models?.models) {
    urls = urls.concat(
      models.models.map((model) => `${baseUrl}/faqs${model.slug}`)
    );
  }

  if (variants?.variants) {
    urls = urls.concat(
      variants.variants.map((variant) => `${baseUrl}/faqs${variant.slug}`)
    );
  }

  const xml = buildXml(urls);

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}

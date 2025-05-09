export const dynamic = "force-dynamic";
export async function GET() {
  const baseUrl = process.env.NEXT_SITE_URL || "https://localhost:3000";

  const urls = [
    `${baseUrl}/sitemaps/brands-sitemap.xml`,
    `${baseUrl}/sitemaps/models-sitemap.xml`,
    `${baseUrl}/sitemaps/variants-sitemap.xml`,
    `${baseUrl}/sitemaps/pages-sitemap.xml`,
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
  <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls
      .map(
        (url) => `
      <sitemap>
        <loc>${url}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
      </sitemap>
    `
      )
      .join("")}
  </sitemapindex>`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}

export async function GET() {
  const baseUrl = process.env.NEXT_SITE_URL || "https://localhost:3000";

  const urls = [
    `${baseUrl}/sitemaps/brands-sitemap.xml`,
    `${baseUrl}/sitemaps/models-sitemap.xml`,
    `${baseUrl}/sitemaps/variants-sitemap.xml`,
    `${baseUrl}/sitemaps/pages-sitemap.xml`,
    `${baseUrl}/news/sitemap_index.xml`, // https://caronphone.com/news/sitemap_index.xml
    `${baseUrl}/blog/sitemap_index.xml`, // https://caronphone.com/blog/sitemap_index.xml
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

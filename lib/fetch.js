import { cookies } from "next/headers";

export const fetchData = async (endpoint) => {
  try {
    const cookieStore = cookies();
    const city = cookieStore.get("city")?.value || "";
    const jwt = cookieStore.get("jwt")?.value || "";

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}${endpoint}`,
      {
        headers: {
          Cookie: `jwt=${jwt};city=${city}`,
        },
      }
    );

    if (!response.ok) return null;

    const data = await response.json();

    if (
      typeof data === "object" &&
      !Array.isArray(data) &&
      Object.keys(data).length === 0
    ) {
      return null;
    }

    return data;
  } catch (error) {
    console.error(`fetchData error: ${endpoint}`, error);
    return null;
  }
};

export const fetchBlogs = async (brand) => {
  try {
    let response;

    if (brand) {
      response = await fetch(process.env.WP_BRAND_API_NEWS, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ brand_name: brand }),
      });
    } else {
      response = await fetch(process.env.WP_BLOGS_API_URL);
    }

    if (!response.ok) return [];

    const data = await response.json();

    if (
      typeof data === "object" &&
      !Array.isArray(data) &&
      Object.keys(data).length === 0
    ) {
      return null;
    }

    return data;
  } catch (error) {
    console.error("fetchBlogs error:", error);
    return [];
  }
};

export const queryModels = async (endpoint, page, sortByPrice, filters) => {
  try {
    const cookieStore = cookies();
    const city = cookieStore.get("city")?.value || "";
    const jwt = cookieStore.get("jwt")?.value || "";

    const params = {
      page,
      ...filters,
      limit: 12,
      minPrice: filters?.minPrice || 200000,
      maxPrice: filters?.maxPrice || 200000000,
    };

    if (sortByPrice) params.sort = sortByPrice;
    if (endpoint.startsWith("/newly-launched-cars") && !params.launchMonth) {
      params.launchMonth = 3;
    }

    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_BACKEND_API_URL
      }${endpoint}?${new URLSearchParams(params)}`,
      {
        headers: { Cookie: `jwt=${jwt};city=${city}` },
      }
    );

    if (!response.ok) return null;

    const data = await response.json();
    if (
      typeof data === "object" &&
      !Array.isArray(data) &&
      Object.keys(data).length === 0
    ) {
      return null;
    }
    return data;
  } catch (error) {
    console.error("queryModels error:", error);
    return null;
  }
};

export const fetchFilters = async (filterEndPoint, filters) => {
  try {
    const city = cookies().get("city")?.value || "";

    const queryParams = new URLSearchParams({
      ...filters,
      minPrice: filters?.minPrice || 200000,
      maxPrice: filters?.maxPrice || 200000000,
    });

    if (
      filterEndPoint.startsWith("/newly-launched-cars") &&
      !queryParams.get("launchMonth")
    ) {
      queryParams.set("launchMonth", 3);
    }

    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_BACKEND_API_URL
      }${filterEndPoint}?${queryParams.toString()}`,
      {
        headers: { Cookie: `city=${city}` },
      }
    );

    if (!response.ok) return null;

    const data = await response.json();
    if (
      typeof data === "object" &&
      !Array.isArray(data) &&
      Object.keys(data).length === 0
    ) {
      return null;
    }
    return data;
  } catch (error) {
    console.error("fetchFilters error:", error);
    return null;
  }
};

export const fetchMetaData = async (bodyData, pageImg) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/seo/meta-data`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData),
      }
    );

    const data = await response.json();

    const meta = data?.reduce((acc, item) => {
      if (item.meta_tag_name && item.tag_content) {
        acc[item.meta_tag_name] = item.tag_content;
      }
      return acc;
    }, {});

    return {
      title: meta.title || "",
      description: meta.description || "",
      keywords: meta.keywords || "",
      openGraph: {
        title: meta["og:title"] || meta.title || "",
        description: meta["og:description"] || meta.description || "",
        url: meta["og:url"] || "https://caronphone.com/",
        siteName: meta["og:site_name"] || "CarOnPhone",
        images: [
          {
            url:
              pageImg ||
              "https://static.caronphone.com/public/brands/31/585/585.webp",
            width: 1200,
            height: 630,
          },
        ],
        type: meta["og:type"] || "website",
      },
      twitter: {
        card: "summary_large_image",
        title: meta["twitter:title"] || meta.title || "",
        description: meta["twitter:description"] || meta.description || "",
        image:
          pageImg ||
          "https://static.caronphone.com/public/brands/31/585/585.webp",
      },
    };
  } catch (error) {
    console.error("fetchMetaData error:", error);
    return {
      title: "CarOnPhone - Explore and Buy New Cars in India",
      description:
        "Explore the latest car models of all brands, reviews, and news on CarOnPhone.",
      keywords: "",
    };
  }
};

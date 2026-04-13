import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/features"],
        disallow: ["/admin/", "/api/", "/checkout/"],
      },
    ],
    sitemap: "https://www.pasmthatfi-pay.com/sitemap.xml",
    host: "https://www.pasmthatfi-pay.com",
  };
}

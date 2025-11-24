const isProduction = process.env.STAGE === "production";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

/**
 * Dynamic robots.txt generator.
 *
 * This follows the Robots Exclusion Standard and includes a sitemap.
 * Blocks all crawlers in non-production environments.
 *
 * @returns {Object} - The robots.txt configuration object.
 */
export default function robots() {
    return isProduction
        ? {
              rules: [
                  {
                      userAgent: "*",
                      allow: "/",
                      disallow: [
                          "/api/",
                          "/test/",
                          "/legal/",
                          "/legal/privacy-policy",
                          "/legal/cookie-policy",
                          "/sitemap.xml",
                      ],
                  },
                  {
                      userAgent: "Cookiebot",
                      allow: "/",
                      disallow: ["/reviews"],
                  },
              ],
              sitemap: `${baseUrl}/sitemap.xml`,
          }
        : {
              rules: {
                  userAgent: "*",
                  disallow: "/",
              },
          };
}

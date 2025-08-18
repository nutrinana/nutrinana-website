/**
 * Dynamic robots.txt generator for Nutrinana.
 * This follows the Robots Exclusion Standard and includes a sitemap.
 * Blocks all crawlers in non-production environments.
 *
 * @returns {Object} - The robots.txt configuration object.
 */
const isProduction = process.env.STAGE === "production";

export default function robots() {
    return isProduction
        ? {
              rules: {
                  userAgent: "*",
                  allow: "/",
                  disallow: "/private/",
              },
              //sitemap: 'https://nutrinana.co.uk/sitemap.xml',
          }
        : {
              rules: {
                  userAgent: "*",
                  disallow: "/",
              },
          };
}

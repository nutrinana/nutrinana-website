/**
 * List Pimento Products
 *
 * This script lists all products in Pimento to find your product ID.
 *
 * Usage:
 *   node scripts/listPimentoProducts.js
 *
 * Required Environment Variables:
 *   PIMENTO_CLIENT_ID     - Your Pimento API client ID
 *   PIMENTO_CLIENT_SECRET - Your Pimento API client secret
 *   PIMENTO_BASE_URL      - Optional, defaults to https://api.getpimento.com/v1
 */

require("dotenv").config({ path: require("path").join(__dirname, "..", ".env.local") });

const PIMENTO_BASE_URL = process.env.PIMENTO_BASE_URL || "https://api.getpimento.com/v1";
const PIMENTO_CLIENT_ID = process.env.PIMENTO_CLIENT_ID;
const PIMENTO_CLIENT_SECRET = process.env.PIMENTO_CLIENT_SECRET;

async function getAuthToken() {
    const response = await fetch(`${PIMENTO_BASE_URL}/auth/token`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            client_id: PIMENTO_CLIENT_ID,
            client_secret: PIMENTO_CLIENT_SECRET,
        }),
    });

    if (!response.ok) {
        const text = await response.text();
        throw new Error(`Failed to get auth token: ${response.status} ${text}`);
    }

    const data = await response.json();

    return data.access_token;
}

async function listProducts(token) {
    const response = await fetch(`${PIMENTO_BASE_URL}/products/list`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            pagination: { limit: 100 },
        }),
    });

    if (!response.ok) {
        const text = await response.text();
        throw new Error(`Failed to list products: ${response.status} ${text}`);
    }

    return await response.json();
}

async function main() {
    console.log("\n" + "=".repeat(80));
    console.log("  PIMENTO PRODUCT LIST");
    console.log("=".repeat(80) + "\n");

    if (!PIMENTO_CLIENT_ID || !PIMENTO_CLIENT_SECRET) {
        console.error("❌ Error: Missing PIMENTO_CLIENT_ID or PIMENTO_CLIENT_SECRET");
        process.exit(1);
    }

    console.log("🔐 Authenticating with Pimento...");
    const token = await getAuthToken();
    console.log("✅ Authenticated successfully\n");

    console.log("📦 Fetching products...\n");
    const data = await listProducts(token);

    if (!data.products?.length) {
        console.log("⚠️  No products found.");
        console.log("\nFull response:");
        console.log(JSON.stringify(data, null, 2));

        return;
    }

    console.log(`Found ${data.products.length} product(s):\n`);
    data.products.forEach((p) => {
        console.log(`   • ${p.name}`);
        console.log(`     ID:  ${p.id}`);
        console.log(`     SKU: ${p.sku}`);
        console.log(`     Variant: ${p.variant || "N/A"}`);
        console.log();
    });

    console.log("=".repeat(80));
    console.log("\n📝 Add your product ID to .env.local:\n");
    console.log("   PIMENTO_PRODUCT_ID=<id from above>\n");
}

main().catch((err) => {
    console.error("\n❌ Error:", err.message);
    process.exit(1);
});

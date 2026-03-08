/**
 * Register Pimento Webhooks
 *
 * This script registers webhooks with the Pimento API to receive real-time
 * notifications about order and delivery events.
 *
 * Usage:
 *   npm run register-webhook
 *
 * Or directly:
 *   node scripts/registerPimentoWebhook.js
 *
 * Required Environment Variables:
 *   PIMENTO_CLIENT_ID     - Your Pimento API client ID
 *   PIMENTO_CLIENT_SECRET - Your Pimento API client secret
 *   PIMENTO_WEBHOOK_URL   - Your webhook endpoint URL (e.g., https://yourdomain.com/api/pimento/webhook)
 *   PIMENTO_BASE_URL      - Optional, defaults to https://api.getpimento.com/v1
 *
 * After running, add the printed PIMENTO_WEBHOOK_SECRET to your .env.local file.
 */

// Load environment variables from .env.local
require("dotenv").config({ path: require("path").join(__dirname, "..", ".env.local") });

const PIMENTO_BASE_URL = process.env.PIMENTO_BASE_URL || "https://api.getpimento.com/v1";
const PIMENTO_CLIENT_ID = process.env.PIMENTO_CLIENT_ID;
const PIMENTO_CLIENT_SECRET = process.env.PIMENTO_CLIENT_SECRET;
const WEBHOOK_URL = process.env.PIMENTO_WEBHOOK_URL;

/**
 * Get authentication token from Pimento API.
 */
async function getAuthToken() {
    const response = await fetch(`${PIMENTO_BASE_URL}/auth/token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
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

/**
 * Register a webhook for a specific event type.
 */
async function registerWebhook(token, eventType) {
    const response = await fetch(`${PIMENTO_BASE_URL}/webhooks`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            name: `Nutrinana ${eventType}`,
            url: WEBHOOK_URL,
            event_type: eventType,
        }),
    });

    if (!response.ok) {
        const text = await response.text();
        throw new Error(`Failed to register webhook: ${response.status} ${text}`);
    }

    return await response.json();
}

/**
 * List all existing webhooks.
 */
async function listWebhooks(token) {
    const response = await fetch(`${PIMENTO_BASE_URL}/webhooks/list`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            pagination: {
                limit: 100,
            },
        }),
    });

    if (!response.ok) {
        const text = await response.text();
        throw new Error(`Failed to list webhooks: ${response.status} ${text}`);
    }

    return await response.json();
}

/**
 * Main execution function.
 */
async function main() {
    console.log("\n" + "=".repeat(80));
    console.log("  PIMENTO WEBHOOK REGISTRATION");
    console.log("=".repeat(80) + "\n");

    // Validate environment variables
    if (!PIMENTO_CLIENT_ID || !PIMENTO_CLIENT_SECRET) {
        console.error("❌ Error: Missing required environment variables");
        console.error("\nPlease set:");
        console.error("  - PIMENTO_CLIENT_ID");
        console.error("  - PIMENTO_CLIENT_SECRET\n");
        process.exit(1);
    }

    if (!WEBHOOK_URL) {
        console.error("❌ Error: Missing PIMENTO_WEBHOOK_URL environment variable");
        console.error("\nPlease set:");
        console.error("  PIMENTO_WEBHOOK_URL=https://yourdomain.com/api/pimento/webhook\n");
        process.exit(1);
    }

    console.log(`📍 Webhook URL: ${WEBHOOK_URL}`);
    console.log(`🌐 API Base URL: ${PIMENTO_BASE_URL}\n`);

    // Authenticate
    console.log("🔐 Authenticating with Pimento...");
    const token = await getAuthToken();
    console.log("✅ Authenticated successfully\n");

    // Check existing webhooks
    console.log("📋 Checking existing webhooks...");
    const existing = await listWebhooks(token);
    const existingCount = existing.webhooks?.length || 0;
    console.log(`   Found ${existingCount} existing webhook${existingCount !== 1 ? "s" : ""}\n`);

    // Event types to register
    const eventTypes = [
        "EVENT_TYPE_ORDER_CREATED",
        "EVENT_TYPE_ORDER_UPDATED",
        "EVENT_TYPE_DELIVERY_CREATED",
        "EVENT_TYPE_DELIVERY_UPDATED",
    ];

    console.log("🔔 Registering webhooks...\n");

    const webhooks = [];
    for (const eventType of eventTypes) {
        // Check if webhook already exists
        const existingWebhook = existing.webhooks?.find(
            (w) => w.url === WEBHOOK_URL && w.event_type === eventType
        );

        if (existingWebhook) {
            console.log(`   ✓ ${eventType}`);
            console.log(`     Already registered (ID: ${existingWebhook.id})\n`);
            webhooks.push(existingWebhook);
        } else {
            console.log(`   + ${eventType}`);
            const webhook = await registerWebhook(token, eventType);
            console.log(`     ✅ Registered (ID: ${webhook.id})\n`);
            webhooks.push(webhook);
        }
    }

    // All webhooks should have the same secret
    const secret = webhooks[0]?.secret;

    if (!secret) {
        console.error("❌ Error: No webhook secret returned from Pimento");
        process.exit(1);
    }

    // Print results
    console.log("\n" + "=".repeat(80));
    console.log("  ✅ WEBHOOK REGISTRATION COMPLETE");
    console.log("=".repeat(80) + "\n");

    console.log("📝 Add this to your .env.local file:\n");
    console.log(`PIMENTO_WEBHOOK_SECRET=${secret}\n`);

    console.log("=".repeat(80) + "\n");
    console.log("🎯 Registered webhooks:\n");
    webhooks.forEach((w) => {
        console.log(`   • ${w.event_type}`);
        console.log(`     ID: ${w.id}`);
        console.log(`     URL: ${w.url}\n`);
    });

    console.log("✨ Next steps:\n");
    console.log("   1. Add PIMENTO_WEBHOOK_SECRET to your .env.local");
    console.log("   2. Restart your development server");
    console.log("   3. Test the webhook endpoint\n");
}

// Run the script
main().catch((err) => {
    console.error("\n❌ Error:", err.message);
    console.error("\nPlease check:");
    console.error("  • Your Pimento credentials are correct");
    console.error("  • Your webhook URL is publicly accessible");
    console.error("  • You have internet connectivity\n");
    process.exit(1);
});

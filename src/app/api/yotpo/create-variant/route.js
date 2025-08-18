/**
 * API route to create a Yotpo product variant.
 *
 * This endpoint authenticates with Yotpo, then attempts to create a variant
 * (e.g., Mixed Fruits & Coconut) under an existing product using the Yotpo Core API.
 *
 * @returns {Response} JSON response containing the variant creation result.
 * @route GET /api/yotpo/create-variant
 */
export async function GET() {
    // Retrieve Yotpo credentials from environment variables
    const storeId = process.env.YOTPO_STORE_ID;
    const secret = process.env.YOTPO_API_SECRET;

    // Step 1: Get access token from Yotpo
    const tokenRes = await fetch(`https://api.yotpo.com/core/v3/stores/${storeId}/access_tokens`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ secret }),
    });

    if (!tokenRes.ok) {
        const err = await tokenRes.text();

        return new Response(JSON.stringify({ message: "Failed to generate access token", err }), {
            status: 500,
        });
    }

    const { access_token } = await tokenRes.json();

    // ID of the main product to attach this variant to
    const productId = "859099037";
    const endpoint = `https://api.yotpo.com/core/v3/stores/${storeId}/products/${productId}/variants`;

    // Define the variant to be created
    const variant = {
        external_id: "activated-granola-mfc",
        name: "Mixed Fruits & Coconut",
        description: "A delicious and nutritious blend of mixed fruits and coconut.",
        url: "https://www.nutrinana.co.uk/activated-granola",
        image_url: "https://www.nutrinana.co.uk/products/mixed-fruits/granola1.jpg",
        price: 8.5,
        currency: "GBP",
        sku: "NUTR-GRAN-MFC-500G",
        options: [{ name: "flavour", value: "mixed fruits & coconut" }],
    };

    try {
        // Step 2: Send request to Yotpo to create the variant
        const res = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Yotpo-Token": access_token,
            },
            body: JSON.stringify({ variant }),
        });

        if (!res.ok) {
            // Attempt to log raw error response for debugging
            let raw;
            try {
                raw = await res.text();
            } catch (e) {
                raw = "Could not parse error response";
            }
            console.error("Variant creation failed:", raw);

            return new Response(JSON.stringify({ message: "Variant creation failed", raw }), {
                status: 500,
            });
        }

        // Return success response with created data
        const data = await res.json();

        return new Response(JSON.stringify({ message: "Variant created successfully", data }), {
            status: 200,
        });
    } catch (error) {
        // Catch any unexpected errors
        console.error("Error during variant creation:", error);

        return new Response(
            JSON.stringify({ message: "Unexpected error occurred", error: error?.message }),
            {
                status: 500,
            }
        );
    }
}

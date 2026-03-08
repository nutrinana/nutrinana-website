import { readProduct } from "@/lib/pimento/pimentoClient";

/**
 * Route handler for checking product availability.
 * This route checks the availability of a product by its ID and returns a JSON response indicating whether the product is available and how many units are sellable.
 *
 * @route GET /api/pimento/products/availability
 *
 * @returns {Promise<Response>} A JSON response indicating product availability and units sellable.
 */
export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const pimentoProductId = searchParams.get("pimentoProductId");

    if (!pimentoProductId) {
        return Response.json({ available: true, units_sellable: null });
    }

    try {
        const product = await readProduct(pimentoProductId);
        const sellable = product.inventory?.units_stocked_sellable ?? 0;

        return Response.json(
            { available: sellable > 0, units_sellable: sellable },
            { headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=60" } }
        );
    } catch (err) {
        console.error("Pimento availability check failed:", err);

        return Response.json({ available: true, units_sellable: null });
    }
}

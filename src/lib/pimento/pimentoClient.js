const DEFAULT_BASE_URL = "https://api.getpimento.com/v1";

const BASE_URL = process.env.PIMENTO_BASE_URL || DEFAULT_BASE_URL;
const CLIENT_ID = process.env.PIMENTO_CLIENT_ID;
const CLIENT_SECRET = process.env.PIMENTO_CLIENT_SECRET;

let cachedToken = null;
let cachedTokenExpiresAtMs = 0;

/**
 * Function to fetch a new OAuth token from Pimento.
 *
 * @util pimentoClient
 *
 * @returns {Promise<string>} The fetched access token.
 *
 * @throws {Error} If env vars are missing or request fails.
 *
 */
async function fetchToken() {
    if (!CLIENT_ID || !CLIENT_SECRET) {
        throw new Error("Missing Pimento env vars: PIMENTO_CLIENT_ID and/or PIMENTO_CLIENT_SECRET");
    }

    const res = await fetch(`${BASE_URL}/auth/token`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
        }),
        cache: "no-store",
    });

    if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`Pimento token request failed (${res.status}): ${text}`);
    }

    const data = await res.json();

    if (!data?.access_token) {
        throw new Error("Pimento token response missing access_token");
    }

    const expiresInSec = typeof data.expires_in === "number" ? data.expires_in : 86400;

    cachedToken = data.access_token;
    cachedTokenExpiresAtMs = Date.now() + expiresInSec * 1000 - 5 * 60 * 1000;

    return cachedToken;
}

/**
 * Get a valid OAuth token, using cache if possible.
 *
 * @util pimentoClient
 *
 * @returns {Promise<string>} The access token.
 *
 * @throws {Error} If token fetch fails.
 *
 */
async function getToken() {
    if (cachedToken && Date.now() < cachedTokenExpiresAtMs) {
        return cachedToken;
    }

    return fetchToken();
}

/**
 * Safely read response text, returning empty string on failure.
 *
 * @util pimentoClient
 *
 * @param {Response} res - The fetch Response object.
 *
 * @returns {Promise<string>} The response text or empty string.
 */
async function safeReadText(res) {
    try {
        return await res.text();
    } catch {
        return "";
    }
}

/**
 * Perform a fetch to the Pimento API with proper headers and error handling.
 *
 * @util pimentoClient
 *
 * @param {string} path - The API endpoint path.
 * @param {object} [options={}] - Fetch options.
 *
 * @returns {Promise<any>} The parsed JSON response or null.
 *
 * @throws {Error} If the fetch fails or returns a non-OK status.
 *
 */
async function pimentoFetch(path, options = {}) {
    const token = await getToken();

    const res = await fetch(`${BASE_URL}${path}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...(options.headers || {}),
            Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
    });

    if (!res.ok) {
        const text = await safeReadText(res);
        throw new Error(`Pimento API error ${res.status} ${path}: ${text}`);
    }

    const contentType = res.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
        return res.json();
    }

    return null;
}

/**
 * Create an order in Pimento.
 *
 * @util pimentoClient
 *
 * @param {object} orderRequestBody - The request body for creating the order.
 *
 * @returns {Promise<any>} The created order response.
 */
export async function createOrder(orderRequestBody) {
    return pimentoFetch("/orders", {
        method: "POST",
        body: JSON.stringify(orderRequestBody),
    });
}

/**
 * Create a product in Pimento.
 *
 * @util pimentoClient
 *
 * @param {object} productRequestBody - The request body for creating the product.
 *
 * @returns {Promise<any>} The created product response.
 */
export async function createProduct(productRequestBody) {
    return pimentoFetch("/products", {
        method: "POST",
        body: JSON.stringify(productRequestBody),
    });
}

/**
 * Read an order by ID.
 *
 * @util pimentoClient
 *
 * @param {string} orderId - The ID of the order to read.
 * @param {object} [options={}] - Options for the request.
 * @param {boolean} [options.includeTracking=false] - Whether to include tracking info.
 *
 * @returns {Promise<any>} The order data.
 */
export async function readOrder(orderId, { includeTracking = false } = {}) {
    const qs = includeTracking ? "?include_tracking=true" : "";

    return pimentoFetch(`/orders/${encodeURIComponent(orderId)}${qs}`, {
        method: "GET",
    });
}

/**
 * Read a product by ID.
 *
 * @util pimentoClient
 *
 * @param {string} productId - The ID of the product to read.
 * @param {object} [options={}] - Options for the request.
 * @param {boolean} [options.includeInventory=true] - Whether to include inventory info.
 *
 * @returns {Promise<any>} The product data.
 */
export async function readProduct(productId, { includeInventory = true } = {}) {
    const qs = includeInventory ? "?include_inventory=true" : "";

    return pimentoFetch(`/products/${encodeURIComponent(productId)}${qs}`, {
        method: "GET",
    });
}

/**
 * List orders with optional filters/pagination (POST /orders/list).
 *
 * @util pimentoClient
 *
 * @param {object} listOrdersRequestBody - The request body as per v1ListOrdersRequest.
 *
 * @returns {Promise<any>} The list of orders.
 */
export async function listOrders(listOrdersRequestBody) {
    return pimentoFetch("/orders/list", {
        method: "POST",
        body: JSON.stringify(listOrdersRequestBody),
    });
}

/**
 * List products with optional filters/pagination (POST /products/list).
 *
 * @util pimentoClient
 *
 * @param {object} listProductsRequestBody - The request body as per v1ListProductsRequest.
 *
 * @returns {Promise<any>} The list of products.
 */
export async function listProducts(listProductsRequestBody) {
    return pimentoFetch("/products/list", {
        method: "POST",
        body: JSON.stringify(listProductsRequestBody),
    });
}

/**
 * Upload a PDF attachment to an order.
 *
 * @util pimentoClient
 *
 * @param {string} orderId - The ID of the order.
 * @param {string} fileDataBase64 - The base64-encoded PDF file data.
 *
 * @returns {Promise<any>} The response from the attachment upload.
 */
export async function uploadOrderAttachment(orderId, fileDataBase64) {
    return pimentoFetch(`/orders/${encodeURIComponent(orderId)}/attachments`, {
        method: "POST",
        body: JSON.stringify({
            content_type: "application/pdf",
            file_data: fileDataBase64,
        }),
    });
}

export const pimentoClient = {
    createOrder,
    createProduct,
    readOrder,
    readProduct,
    listOrders,
    listProducts,
    uploadOrderAttachment,
};

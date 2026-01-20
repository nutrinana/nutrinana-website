/**
 * Product definitions
 *
 * Each product includes:
 * - productId: Unique identifier for the product
 * - sku: Stock Keeping Unit
 * - name: Product name
 * - stripePriceIdOneOff: Stripe price ID for one-time purchases
 * - stripePriceIdSubscription: Stripe price ID for subscriptions
 * - displayPriceGBP: Display price in GBP
 * - vatRate: VAT rate applicable to the product
 *
 * @util product
 *
 * @returns {Object} The product definitions and utility functions.
 */
export const PRODUCTS = {
    "activated-granola-mfc": {
        productId: "NUTR-GRAN-MFC-500G",
        sku: "NUTR-GRAN-MFC-500G",
        name: "Nutrinana's Activated Granola - Mixed Fruits & Coconut",
        size: "500g",
        stripePriceIdOneOff: process.env.STRIPE_PRICE_ID_ONE_OFF || "",
        stripePriceIdSubscription: process.env.STRIPE_PRICE_ID_SUBSCRIPTION || "",
        displayPriceGBP: 8.5,
        vatRate: 0.2,
    },
    "activated-granola-chh": {
        productId: "NUTR-GRAN-CHH-500G",
        sku: "NUTR-GRAN-CHH-500G",
        name: "Nutrinana's Activated Granola - Chocolate & Hazelnut",
        size: "500g",
        stripePriceIdOneOff: process.env.STRIPE_PRICE_ID_ONE_OFF || "",
        stripePriceIdSubscription: process.env.STRIPE_PRICE_ID_SUBSCRIPTION || "",
        displayPriceGBP: 8.5,
        vatRate: 0.2,
    },
};

/**
 * Get a product by its ID or key.
 *
 * @util getProduct
 *
 * @param {string} idOrKey - The product ID or key to look up.
 *
 * @returns {Object|null} The product object if found, otherwise null.
 */
export const getProduct = (idOrKey) => {
    if (!idOrKey) {
        return undefined;
    }

    const key = String(idOrKey);

    // Direct lookup by PRODUCTS key (e.g. "activated-granola-mfc")
    if (Object.prototype.hasOwnProperty.call(PRODUCTS, key)) {
        return PRODUCTS[key];
    }

    // Lookup by productId or sku inside product objects
    return Object.values(PRODUCTS).find((product) => {
        return product.productId === key || product.sku === key;
    });
};

/**
 * List all products.
 *
 * @util listProducts
 *
 * @returns {Array} An array of all product objects.
 */
export const listProducts = () => Object.values(PRODUCTS);

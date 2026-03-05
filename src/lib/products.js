/**
 * Product definitions
 *
 * Each product includes:
 * - productId: Unique identifier for the product
 * - sku: Stock Keeping Unit
 * - name: Product name
 * - stripeLookupKeyBase: Base for Stripe lookup keys (used server-side)
 *   e.g. `${stripeLookupKeyBase}_one_off`, `${stripeLookupKeyBase}_monthly`
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
        pimentoProductId: process.env.NEXT_PUBLIC_PIMENTO_PRODUCT_ID_MFC,
        size: "500g",
        stripeLookupKeyBase: "granola_mfc_500g",
        displayPriceGBP: Number(process.env.NEXT_PUBLIC_PRODUCT_PRICE_GBP ?? 10.99),
        vatRate: 0.2,
    },
    "activated-granola-chh": {
        productId: "NUTR-GRAN-CHH-500G",
        sku: "NUTR-GRAN-CHH-500G",
        name: "Nutrinana's Activated Granola - Chocolate & Hazelnut",
        pimentoProductId: process.env.NEXT_PUBLIC_PIMENTO_PRODUCT_ID_CHH,
        size: "500g",
        stripeLookupKeyBase: "granola_chh_500g",
        displayPriceGBP: Number(process.env.NEXT_PUBLIC_PRODUCT_PRICE_GBP ?? 10.99),
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

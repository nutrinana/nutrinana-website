export const PRODUCTS = {
    "activated-granola": {
        sku: "NUTR-GRAN-MFC-500G",
        name: "Nutrinana's Activated Granola - Mixed Fruits & Coconut",
        stripePriceIdOneOff: process.env.STRIPE_PRICE_ID_ONE_OFF || "",
        stripePriceIdSubscription: process.env.STRIPE_PRICE_ID_SUBSCRIPTION || "",
        displayPriceGBP: 8.5,
        vatRate: 0.2,
    },
};

export const getProduct = (id) => PRODUCTS[id];
export const listProducts = () => Object.values(PRODUCTS);

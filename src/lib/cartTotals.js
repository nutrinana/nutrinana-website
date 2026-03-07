/**
 * Calculates subtotal in GBP from cart items.
 *
 * @util subtotal
 *
 * @param {Array<{productId: string, qty: number}>} items - Cart items
 * @param {Function} getProduct - Function to retrieve product details by productId
 *
 * @returns {number} The subtotal amount in GBP.
 */
export function calcSubtotalGBP(items, getProduct) {
    if (!Array.isArray(items) || typeof getProduct !== "function") {
        return 0;
    }

    return items.reduce((total, { productId, qty }) => {
        const product = getProduct(productId);
        const unit = Number(product?.displayPriceGBP);
        const quantity = Number(qty);

        if (!Number.isFinite(unit) || !Number.isFinite(quantity) || quantity <= 0) {
            return total;
        }

        return total + unit * quantity;
    }, 0);
}

/**
 * Calculates total unit count (sum of quantities).
 *
 * @util itemCount
 *
 * @param {Array<{qty: number}>} items - Cart items
 *
 * @returns {number} The total item count.
 */
export function calcItemCount(items) {
    if (!Array.isArray(items)) {
        return 0;
    }

    return items.reduce((count, { qty }) => {
        const quantity = Number(qty);
        if (!Number.isFinite(quantity) || quantity <= 0) {
            return count;
        }

        return count + quantity;
    }, 0);
}

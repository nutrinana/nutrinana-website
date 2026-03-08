import { toast } from "sonner";

export const MAX_QTY = 10;
export const BULK_THRESHOLD = 6;

/**
 * Shows a bulk pricing toast notification if the quantity meets or exceeds the bulk threshold.
 *
 * @util
 *
 * @param {number} qty - The quantity to check against the bulk threshold.
 */
export function showBulkToast(qty) {
    if (qty >= BULK_THRESHOLD) {
        toast.info("Need more than 10 bags? Contact us for bulk pricing.", {
            action: {
                label: "Contact Us",
                onClick: () => (window.location.href = "/help"),
            },
        });
    }
}

/**
 * Shows a max quantity reached toast notification.
 *
 * @util
 *
 * @param {number} qty - The quantity that has reached the maximum limit.
 */
export function showMaxQtyToast() {
    toast.warning(
        "You've reached the maximum of 10 bags. Need more? Contact us for bulk pricing.",
        {
            action: {
                label: "Contact Us",
                onClick: () => (window.location.href = "/help"),
            },
        }
    );
}

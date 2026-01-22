import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

/**
 * PurchaseTypeSelector component
 *
 * A radio group allowing users to select between a one-off purchase or a monthly subscription.
 *
 * @component
 *
 * @param {string} value - The currently selected purchase type ("one_off" or "monthly").
 * @param {function} onValueChange - Callback function to handle changes in the selected purchase type.
 *
 * @returns {JSX.Element} - The rendered PurchaseTypeSelector component.
 */
export default function PurchaseTypeSelector({ value, onValueChange }) {
    return (
        <div className="mb-4 rounded-xl border p-4">
            <p className="mb-3 text-sm font-medium text-black">Purchase type</p>

            <RadioGroup value={value} onValueChange={onValueChange} className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                    <RadioGroupItem id="purchase-one-off" value="one_off" />
                    <Label htmlFor="purchase-one-off" className="cursor-pointer text-sm">
                        One-off purchase
                    </Label>
                </div>

                <div className="flex items-center gap-3">
                    <RadioGroupItem id="purchase-monthly" value="monthly" />
                    <Label htmlFor="purchase-monthly" className="cursor-pointer text-sm">
                        Subscribe monthly
                    </Label>
                </div>
            </RadioGroup>

            <p className="mt-3 text-xs text-gray-600">
                You can manage your subscription later via Stripe&apos;s customer portal.
            </p>
        </div>
    );
}

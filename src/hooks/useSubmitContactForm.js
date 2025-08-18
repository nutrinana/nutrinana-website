import { toast } from "sonner";

/**
 * This hook handles the submission of the contact form.
 *
 * It sends the form data to the server and provides feedback to the user via toast notifications.
 *
 * @hook
 *
 * @param {object} form - The form instance from `react-hook-form`.
 *
 * @returns {function} - The submission handler function.
 */
export function useSubmitContactForm(form) {
    return async function onSubmit(values) {
        try {
            // Send form data to the server
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });

            if (res.ok) {
                // Show success toast and reset the form
                toast.success("Request sent successfully! You should receive an email shortly.");
                form.reset();
            } else {
                // Show error toast if the request fails
                toast.error("Failed to send request. Please try again later.");
            }
        } catch (err) {
            // Show error toast for unexpected errors
            toast.error("An unexpected error occurred.");
        }
    };
}

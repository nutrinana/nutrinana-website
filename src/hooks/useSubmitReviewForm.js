import { toast } from "sonner";

/**
 * Custom hook to handle the submission of a review form.
 *
 * This hook takes a form object and a product ID,
 * and provides a function to handle the form submission.
 *
 * @param {Object} form - The form object containing methods for handling form state and submission.
 * @param {string} productId - The unique identifier for the product being reviewed.
 *
 * @returns {Object} An object containing the handleSubmit function to be used in the form submission.
 */
export function useSubmitReviewForm(form, productId) {
    const onSubmit = async (data) => {
        try {
            // Validate the form data
            const res = await fetch("/api/yotpo/submit-review", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    sku: "activated-granola",
                    product_title: data.product_title || "Nutrinana's Activated Granola",
                    product_url:
                        data.product_url || "https://www.nutrinana.co.uk/activated-granola",
                    display_name: data.name,
                    email: data.email,
                    review_content: data.comments,
                    review_title: data.title,
                    review_score: Number(data.rating),
                }),
            });

            // Parse the response JSON and check for errors
            const json = await res.json();
            if (!res.ok) throw new Error(json.message || "Something went wrong");

            if (res.ok) {
                // Show success toast and reset the form
                toast.success("Thank you for your review! You should receive an email shortly.");
                form.reset();
            } else {
                // Show error toast if the request fails
                toast.error("Failed to send request. Please try again later.");
            }
        } catch (err) {
            // Log the error and show an error toast
            console.error(err);
            toast.error("There was a problem submitting your review. Please try again.");
        }
    };

    // Return the handleSubmit function that wraps the form's submit method
    return { handleSubmit: form.handleSubmit(onSubmit) };
}

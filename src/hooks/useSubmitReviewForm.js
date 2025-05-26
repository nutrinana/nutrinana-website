import { useState } from 'react';
import { toast } from 'sonner';

export function useSubmitReviewForm(form, productId) {
    const [rating, setRating] = useState(0);

    const onSubmit = async (data) => {
        try {
            const res = await fetch("/api/yotpo/submit-review", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    sku: 'NUTR-GRAN',
                    product_title: data.product_title || "Nutrinana's Activated Granola",
                    product_url: data.product_url || "https://www.nutrinana.co.uk/activated-granola",
                    display_name: data.name,
                    email: data.email,
                    review_content: data.comments,
                    review_title: data.title,
                    review_score: rating,
                }),
            });

            const json = await res.json();
            if (!res.ok) throw new Error(json.message || "Something went wrong");

            if (res.ok) {
                // Show success toast and reset the form
                toast.success("Thank you for your review! You should receive an email shortly.");
                form.reset();
                setRating(0);
            } else {
                // Show error toast if the request fails
                toast.error("Failed to send request. Please try again later.");
            }
            

        } catch (err) {
            console.error(err);
            toast.error("There was a problem submitting your review. Please try again.");
        }
    };

    return { handleSubmit: form.handleSubmit(onSubmit), rating, setRating };
}
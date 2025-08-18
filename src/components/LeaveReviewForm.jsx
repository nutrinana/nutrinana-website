"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User, Mail } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import StarRating from "@/components/StarRating";
import { reviewFormSchema } from "@/lib/validation/reviewFormSchema";
import { useSubmitReviewForm } from "@/hooks/useSubmitReviewForm";

/**
 * LeaveReviewForm component for submitting product reviews.
 *
 * @param {Object} props - The properties for the LeaveReviewForm component.
 * @param {string} props.productId - The unique identifier for the product being reviewed.
 *
 * @returns {JSX.Element} The rendered LeaveReviewForm component.
 */
export default function LeaveReviewForm({ productId }) {
    // Initialize the form with validation schema and default values
    const form = useForm({
        resolver: zodResolver(reviewFormSchema),
        defaultValues: {
            name: "",
            email: "",
            title: "",
            comments: "",
            rating: 0,
        },
    });

    // Custom hook to handle form submission and rating state
    const { handleSubmit } = useSubmitReviewForm(form, productId);

    return (
        <Form {...form}>
            <form onSubmit={handleSubmit} className="mx-auto w-full max-w-6xl space-y-4">
                <div className="flex flex-wrap gap-4">
                    {/* Star Rating Field */}
                    <div className="flex flex-wrap items-center gap-4">
                        <FormField
                            control={form.control}
                            name="rating"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <StarRating
                                            value={field.value}
                                            onChange={field.onChange}
                                            size={50}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    {/* Name Field */}
                    <div className="min-w-[200px] flex-1">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="relative mt-3">
                                        <User className="absolute top-1/2 left-2 -translate-y-1/2 transform pt-1 pb-1 text-gray-500" />
                                        <FormControl>
                                            <Input
                                                placeholder="Your Name"
                                                {...field}
                                                className="pl-10"
                                            />
                                        </FormControl>
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                {/* Email Field */}
                <div className="flex flex-wrap gap-4">
                    <div className="min-w-[200px] flex-1">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="relative">
                                        <Mail className="absolute top-1/2 left-2 -translate-y-1/2 transform pt-1 pb-1 text-gray-500" />
                                        <FormControl>
                                            <Input
                                                placeholder="you@example.com"
                                                {...field}
                                                className="pl-10"
                                            />
                                        </FormControl>
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                {/* Title */}
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    placeholder="Review Title"
                                    {...field}
                                    className="rounded-md p-4"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Comments */}
                <FormField
                    control={form.control}
                    name="comments"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Textarea
                                    placeholder="Your review..."
                                    {...field}
                                    className="rounded-md p-4"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Submit Button and Additional Text */}
                <div className="relative mt-4 mb-12">
                    {/* Additional text with email link */}
                    <div className="absolute top-0 left-0 text-left text-sm text-[var(--color-raisin)] md:text-lg">
                        <p>Your email will not be published.</p>
                    </div>
                    {/* Submit button */}
                    <Button
                        type="submit"
                        variant="greenOutlined"
                        className="absolute top-0 right-0 mt-0 px-8"
                    >
                        Submit Review
                    </Button>
                </div>
            </form>
        </Form>
    );
}

"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User, Mail } from "lucide-react";
import StarRating from "@/components/StarRating";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { reviewFormSchema } from "@/lib/validation/reviewFormSchema"; // Create this Zod schema similarly to your contact schema

export default function LeaveReviewForm({ productId }) {
    const [rating, setRating] = useState(0);

    const form = useForm({
        resolver: zodResolver(reviewFormSchema),
        defaultValues: {
            name: "",
            email: "",
            title: "",
            comments: "",
        },
    });

    const onSubmit = async (data) => {
        try {
            const res = await fetch("/api/yotpo/submit-review", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                ...data,
                rating,
                productId, // Pass external_id
                }),
            });

            const json = await res.json();
            if (!res.ok) throw new Error(json.message || "Something went wrong");
            alert("Thank you for your review!");
            form.reset();
            setRating(0);

        } catch (err) {
            console.error(err);
            alert("There was a problem submitting your review. Please try again.");
        }   
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-w-6xl mx-auto w-full">
                <div className="flex flex-wrap gap-4">
                    <div className="flex flex-wrap gap-4 items-center">
                        <StarRating value={rating} onChange={setRating} size={50} />
                    </div>
                    <div className="flex-1 min-w-[200px]">
                        <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                            <div className="relative mt-3">
                                <User className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500 pt-1 pb-1" />
                                <FormControl>
                                <Input placeholder="Your Name" {...field} className="pl-10" />
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
                    <div className="flex-1 min-w-[200px]">
                        <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                            <div className="relative">
                                <Mail className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500 pt-1 pb-1" />
                                <FormControl>
                                <Input placeholder="you@example.com" {...field} className="pl-10" />
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
                            <Input placeholder="Review Title" {...field} className="p-4 rounded-md" />
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
                            <Textarea placeholder="Your review..." {...field} className="p-4 rounded-md" />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Submit Button and Additional Text */}
                <div className="relative mt-4 mb-12">
                    {/* Additional text with email link */}
                    <div className="absolute top-0 left-0 text-left text-lg text-[var(--color-raisin)]">
                        <p>
                            Your email will not be published.
                        </p>
                    </div>
                    {/* Submit button */}
                    <Button type="submit" variant="greenOutlined" className="absolute top-0 right-0 mt-0 px-8">
                        Submit Review
                    </Button>
                </div> 
            </form>
        </Form>
    );
}
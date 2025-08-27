"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { User, Mail } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useSubmitContactForm } from "@/hooks/useSubmitContactForm";
import { contactFormSchema } from "@/lib/validation/contactFormSchema";

/**
 * This component renders a contact form with fields for name, email, title, and comments.
 *
 * It uses `react-hook-form` for form handling and validation with Zod schema.
 * On successful submission, the form sends data to the server and displays a toast notification.
 *
 * @component
 *
 * @returns {JSX.Element} - The rendered ContactForm component.
 */
export function ContactForm() {
    // Initialize the form with default values and Zod schema validation
    const form = useForm({
        resolver: zodResolver(contactFormSchema),
        defaultValues: {
            name: "",
            email: "",
            title: "",
            comments: "",
        },
    });

    // Submit handler for the form
    const onSubmit = useSubmitContactForm(form);

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="mx-auto w-full max-w-6xl space-y-4"
            >
                {/* Name and Email Fields Side by Side */}
                <div className="flex flex-wrap gap-4">
                    {/* Name Field */}
                    <div className="min-w-[200px] flex-1">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="relative">
                                        {/* User icon for the name field */}
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

                    {/* Email Field */}
                    <div className="min-w-[200px] flex-1">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="relative">
                                        {/* Mail icon for the email field */}
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

                {/* Title Field */}
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input placeholder="Subject Title" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Comments Field */}
                <FormField
                    control={form.control}
                    name="comments"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Textarea placeholder="Your comments..." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Submit Button and Additional Text */}
                <div className="relative mt-4 mb-12">
                    {/* Additional text with email link */}
                    <div className="text-raisin absolute top-0 left-0 text-left text-lg">
                        <p>
                            Or... <br />
                            email{" "}
                            <Link
                                href="mailto:help@nutrinana.co.uk"
                                className="text-green hover:text-raisin underline"
                            >
                                help@nutrinana.co.uk
                            </Link>
                        </p>
                        <p className="text-xs text-gray-500">
                            Please start the subject line with &quot;Customer Enquiry&quot; to help
                            us respond as soon as possible!
                        </p>
                    </div>

                    {/* Submit button */}
                    <Button
                        type="submit"
                        variant="grey"
                        className="absolute top-0 right-0 mt-0 px-8"
                    >
                        Submit
                    </Button>
                </div>
            </form>
        </Form>
    );
}

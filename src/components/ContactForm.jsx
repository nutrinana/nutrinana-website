"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CiUser, CiMail } from "react-icons/ci";


// Define the schema for the form
const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please type a valid email address." }),
  title: z.string().min(2, { message: "Please type at least 2 characters for the title." }),
  comments: z.string().min(10, { message: "Please type at least 10 characters for your comments." }),
});

export function ContactForm() {
  // Initialize the form
  const form = useForm({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      title: "",
      comments: "",
    },
  });

  // Submit handler
  function onSubmit(values) {
    console.log(values); // Handle form submission
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Name and Email Fields Side by Side */}
        <div className="flex flex-wrap gap-4">
          {/* Name Field */}
          <div className="flex-1 min-w-[200px]">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                <div className="flex items-center" >
                  <CiUser className="text-gray-500 mr-2" />
                  <FormControl>
                    <Input placeholder="Your Name" {...field} />  
                  </FormControl>
                </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Email Field */}
          <div className="flex-1 min-w-[200px]">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center">
                    <CiMail className="text-gray-500 mr-2" />
                    <FormControl>
                      <Input placeholder="you@example.com" {...field} />
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
              {/* <FormLabel>Title</FormLabel> */}
              <FormControl>
                <Input placeholder="Subject Title" {...field} />
              </FormControl>
              {/* <FormDescription className="text-xs">Provide a brief title for your message.</FormDescription> */}
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
              {/* <FormLabel>Comments</FormLabel> */}
              <FormControl>
                <Textarea placeholder="Your comments..." {...field} />
              </FormControl>
              {/* <FormDescription className="text-xs">Write your message or feedback here.</FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button and Additional Text */}
        <div className="relative mt-4 mb-12">
          {/* Additional Text */}
          <div className="absolute top-0 left-0 text-left text-lg text-[var(--color-raisin)]">
            <p>
              Or... <br />
              email <a href="mailto:help@nutrinana.co.uk" className="text-[var(--color-green)] underline hover:text-[var(--color-raisin)]">help@nutrinana.co.uk</a>
            </p>
            <p className="text-xs text-gray-500">
              Please start the subject line with "Customer Enquiry" to help us respond as soon as possible!
            </p>
          </div>

          {/* Submit Button */}
          <Button type="submit" variant="grey" className=" absolute top-0 right-0 mt-0 px-8">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );

  async function onSubmit(values) {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
  
      if (res.ok) {
        // alert("Message sent successfully!");
        toast.success("Request sent successfully!");
        form.reset(); // clear form
      } else {
        // alert("Failed to send message. Please try again later.");
        toast.error("Failed to send request. Please try again later.");
      }
    } catch (err) {
      // alert("An unexpected error occurred.");
      toast.error("An unexpected error occurred.");
    }
  }  

}
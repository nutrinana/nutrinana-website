/**
 * Contact Form Validation Schema
 * 
 * This schema validates the fields of the contact form using Zod.
 * It ensures that all fields meet the required criteria before submission.
 */

import { z } from "zod";

export const contactFormSchema = z.object({
  // Name must be at least 2 characters and contain only letters, spaces, hyphens, or apostrophes
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters." })
    .regex(/^[A-Za-z\s-']+$/, { message: "Name must not contain numbers or special characters." }),

  // Email must be a valid email address
  email: z.string().email({ message: "Please type a valid email address." }),

  // Title must be at least 2 characters
  title: z.string().min(2, { message: "Please type at least 2 characters for the title." }),

  // Comments must be at least 10 characters
  comments: z.string().min(10, { message: "Please type at least 10 characters for your comments." }),
});

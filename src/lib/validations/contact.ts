import { z } from "zod";

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must not exceed 100 characters")
    .trim(),
  email: z
    .string()
    .email("Please enter a valid email address")
    .toLowerCase()
    .trim(),
  company: z
    .string()
    .min(2, "Company name must be at least 2 characters")
    .max(100, "Company name must not exceed 100 characters")
    .trim(),
  role: z.enum(["developer", "business", "other"], {
    message: "Please select a role",
  }),
  message: z
    .string()
    .max(1000, "Message must not exceed 1000 characters")
    .optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

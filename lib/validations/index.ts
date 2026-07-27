import { z } from "zod";

const phoneRegex = /^[+]?[\d\s()-]{8,20}$/;

export const contactEnquirySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your full name")
    .max(100, "Name is too long"),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address")
    .max(160, "Email is too long"),
  phone: z
    .string()
    .trim()
    .min(8, "Please enter a valid phone number")
    .max(20, "Phone number is too long")
    .regex(phoneRegex, "Please enter a valid phone number"),
  company: z
    .string()
    .trim()
    .max(120, "Company name is too long")
    .optional()
    .default(""),
  message: z
    .string()
    .trim()
    .min(10, "Please share a few more project details")
    .max(4000, "Message is too long"),
  /** Honeypot — bots fill this; API short-circuits when non-empty */
  website: z.string().max(200).optional().default(""),
  source: z.enum(["contact", "hero-consultation"]).default("contact"),
  projectType: z.string().trim().max(80).optional().default(""),
  goal: z.string().trim().max(80).optional().default(""),
  city: z.string().trim().max(80).optional().default(""),
  timeline: z.string().trim().max(80).optional().default(""),
});

export type ContactEnquiryInput = z.infer<typeof contactEnquirySchema>;

export const heroConsultationSchema = z.object({
  projectType: z.string().trim().min(1, "Select a project type"),
  goal: z.string().trim().min(1, "Select a marketing goal"),
  city: z.string().trim().min(1, "Select a city"),
  timeline: z.string().trim().min(1, "Select a timeline"),
});

export type HeroConsultationInput = z.infer<typeof heroConsultationSchema>;

export function formatConsultationMessage(
  data: Partial<HeroConsultationInput> & { extras?: string },
): string {
  const lines = [
    "Marketing consultation request from the homepage hero:",
    data.projectType ? `• Project type: ${data.projectType}` : null,
    data.goal ? `• Marketing goal: ${data.goal}` : null,
    data.city ? `• City: ${data.city}` : null,
    data.timeline ? `• Timeline: ${data.timeline}` : null,
    data.extras ? `\n${data.extras}` : null,
  ].filter(Boolean);

  return lines.join("\n");
}

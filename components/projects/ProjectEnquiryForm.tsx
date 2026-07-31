"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { buildWhatsAppUrl } from "@/lib/constants";
import { contactEnquirySchema } from "@/lib/validations";

type FormState = {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
  website: string;
};

const empty: FormState = {
  name: "",
  email: "",
  phone: "",
  company: "",
  message: "",
  website: "",
};

export function ProjectEnquiryForm({
  projectName,
}: {
  projectName: string;
}) {
  const [form, setForm] = useState<FormState>({
    ...empty,
    message: `I am interested in ${projectName}. Please share availability, pricing, and site visit options.`,
  });
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const parsed = contactEnquirySchema.safeParse({
      ...form,
      source: "contact",
    });

    if (!parsed.success) {
      setStatus("error");
      setError(
        parsed.error.issues[0]?.message || "Please complete all required fields.",
      );
      return;
    }

    const data = parsed.data;
    const message = [
      "Hello Done & Delivered,",
      "",
      `New Project Enquiry — ${projectName}`,
      "",
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      `Phone: ${data.phone}`,
      `Company: ${data.company || "—"}`,
      "",
      "Project Details:",
      data.message,
      "",
      "Please contact me.",
    ].join("\n");

    window.open(buildWhatsAppUrl(message), "_blank", "noopener,noreferrer");
    setForm({
      ...empty,
      message: `I am interested in ${projectName}. Please share availability, pricing, and site visit options.`,
    });
    setStatus("success");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="relative rounded-[1.5rem] border border-primary/8 bg-white p-6 shadow-[0_16px_48px_rgba(11,46,131,0.08)] md:p-8"
      noValidate
      aria-label={`${projectName} enquiry form`}
    >
      <h3 className="font-display text-2xl text-primary">Project enquiry</h3>
      <p className="mt-2 text-sm font-medium text-muted">
        Enquire about {projectName}. We will respond with next steps and site
        visit options.
      </p>
      <div className="gold-line mt-4" aria-hidden />

      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden>
        <label htmlFor="project-website">Website</label>
        <input
          id="project-website"
          tabIndex={-1}
          autoComplete="off"
          value={form.website}
          onChange={(e) => setForm((f) => ({ ...f, website: e.target.value }))}
        />
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="form-label">
          Full name
          <input
            required
            name="name"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            className="form-control mt-1.5 h-12 px-4 !text-[#0B2E83]"
            placeholder="Your full name"
          />
        </label>
        <label className="form-label">
          Email
          <input
            required
            type="email"
            name="email"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            className="form-control mt-1.5 h-12 px-4 !text-[#0B2E83]"
            placeholder="you@company.com"
          />
        </label>
        <label className="form-label">
          Phone
          <input
            required
            type="tel"
            name="phone"
            value={form.phone}
            onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
            className="form-control mt-1.5 h-12 px-4 !text-[#0B2E83]"
            placeholder="+91 XXXXX XXXXX"
          />
        </label>
        <label className="form-label">
          Company / Developer
          <input
            name="company"
            value={form.company}
            onChange={(e) =>
              setForm((f) => ({ ...f, company: e.target.value }))
            }
            className="form-control mt-1.5 h-12 px-4 !text-[#0B2E83]"
            placeholder="Optional"
          />
        </label>
      </div>

      <label className="form-label mt-4">
        Project details
        <textarea
          required
          name="message"
          rows={4}
          value={form.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
          className="form-control mt-1.5 min-h-[7rem] resize-y px-4 py-3 !text-[#0B2E83]"
        />
      </label>

      <div className="mt-5" aria-live="polite">
        <Button type="submit" variant="primary" size="lg" fullWidth icon={<Send className="h-4 w-4" />}>
          Submit Enquiry
        </Button>
        {status === "success" ? (
          <p className="mt-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-center text-sm font-medium text-emerald-800">
            Thank you. Your enquiry has been opened in WhatsApp.
          </p>
        ) : null}
        {status === "error" ? (
          <p className="mt-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-center text-sm font-medium text-red-700">
            {error}
          </p>
        ) : null}
      </div>
    </form>
  );
}

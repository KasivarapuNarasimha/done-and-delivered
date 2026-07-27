"use client";

import { useCallback, useEffect, useState } from "react";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/animations/Reveal";
import {
  CONSULTATION_STORAGE_KEY,
  SITE_ADDRESS,
  SITE_EMAIL,
  SITE_MAPS_DIRECTIONS_URL,
  SITE_MAPS_EMBED_URL,
  SITE_PHONE,
  SITE_PHONE_HREF,
  SITE_WHATSAPP,
} from "@/lib/constants";
import {
  contactEnquirySchema,
  formatConsultationMessage,
  type ContactEnquiryInput,
} from "@/lib/validations";

type FormState = {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
  website: string;
  projectType: string;
  goal: string;
  city: string;
  timeline: string;
  source: ContactEnquiryInput["source"];
};

type FieldErrors = Partial<Record<keyof FormState, string>>;

const emptyForm: FormState = {
  name: "",
  email: "",
  phone: "",
  company: "",
  message: "",
  website: "",
  projectType: "",
  goal: "",
  city: "",
  timeline: "",
  source: "contact",
};

function fieldErrorMap(
  errors: Record<string, string[] | undefined> | undefined,
): FieldErrors {
  if (!errors) return {};
  const next: FieldErrors = {};
  for (const [key, value] of Object.entries(errors)) {
    if (value?.[0]) next[key as keyof FormState] = value[0];
  }
  return next;
}

export function Contact() {
  const [form, setForm] = useState<FormState>(emptyForm);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );
  const [statusMessage, setStatusMessage] = useState("");

  const applyConsultation = useCallback(
    (data: {
      projectType?: string;
      goal?: string;
      city?: string;
      timeline?: string;
    }) => {
      setForm((prev) => ({
        ...prev,
        source: "hero-consultation",
        projectType: data.projectType || prev.projectType,
        goal: data.goal || prev.goal,
        city: data.city || prev.city,
        timeline: data.timeline || prev.timeline,
        message:
          prev.message.trim().length > 0 && !prev.message.includes("Marketing consultation")
            ? prev.message
            : formatConsultationMessage({
                projectType: data.projectType,
                goal: data.goal,
                city: data.city,
                timeline: data.timeline,
              }),
      }));
      setStatus("idle");
      setStatusMessage("");
    },
    [],
  );

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(CONSULTATION_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as {
          projectType?: string;
          goal?: string;
          city?: string;
          timeline?: string;
        };
        applyConsultation(parsed);
        sessionStorage.removeItem(CONSULTATION_STORAGE_KEY);
      }
    } catch {
      // ignore storage errors
    }

    const params = new URLSearchParams(window.location.search);
    const fromQuery = {
      projectType: params.get("projectType") || undefined,
      goal: params.get("goal") || undefined,
      city: params.get("city") || undefined,
      timeline: params.get("timeline") || undefined,
    };
    if (
      fromQuery.projectType ||
      fromQuery.goal ||
      fromQuery.city ||
      fromQuery.timeline
    ) {
      applyConsultation(fromQuery);
    }

    const onConsultation = (event: Event) => {
      const detail = (event as CustomEvent).detail as {
        projectType?: string;
        goal?: string;
        city?: string;
        timeline?: string;
      };
      applyConsultation(detail || {});
    };

    window.addEventListener("dd:consultation", onConsultation);
    return () => window.removeEventListener("dd:consultation", onConsultation);
  }, [applyConsultation]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setStatusMessage("");
    setFieldErrors({});

    const payload = {
      name: form.name,
      email: form.email,
      phone: form.phone,
      company: form.company,
      message: form.message,
      website: form.website,
      source: form.source,
      projectType: form.projectType,
      goal: form.goal,
      city: form.city,
      timeline: form.timeline,
    };

    const clientCheck = contactEnquirySchema.safeParse(payload);
    if (!clientCheck.success) {
      setFieldErrors(fieldErrorMap(clientCheck.error.flatten().fieldErrors));
      setStatus("error");
      setStatusMessage("Please fix the highlighted fields.");
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(clientCheck.data),
      });

      const data = (await response.json()) as {
        ok?: boolean;
        error?: string;
        message?: string;
        fieldErrors?: Record<string, string[] | undefined>;
      };

      if (!response.ok || !data.ok) {
        setFieldErrors(fieldErrorMap(data.fieldErrors));
        setStatus("error");
        setStatusMessage(
          data.error ||
            "We could not send your enquiry. Please try again or contact us by phone.",
        );
        return;
      }

      setStatus("success");
      setStatusMessage(
        data.message ||
          "Thank you. Your enquiry has been received — our team will connect shortly.",
      );
      setForm({ ...emptyForm });
    } catch {
      setStatus("error");
      setStatusMessage(
        "Network error. Please check your connection or reach us on WhatsApp.",
      );
    }
  }

  const inputClass = (key: keyof FormState) =>
    `mt-1.5 h-12 w-full rounded-xl border px-4 text-sm outline-none transition focus:border-accent ${
      fieldErrors[key]
        ? "border-red-400 bg-red-50/40"
        : "border-primary/10 bg-white"
    }`;

  return (
    <section
      id="contact"
      className="relative section-pad section-soft overflow-hidden"
      aria-labelledby="contact-heading"
    >
      <Container>
        <div id="contact-heading">
          <SectionHeading
            eyebrow="Contact"
            title="Let’s launch your next premium project"
            description="Speak with Done & Delivered for branding, performance marketing, lead generation, and full-funnel sales enablement."
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:gap-8">
          <div className="space-y-4">
            <Reveal>
              <div className="rounded-[1.45rem] border border-primary/8 bg-white p-6 shadow-[0_16px_48px_rgba(11,46,131,0.07)]">
                <h3 className="font-display text-xl text-primary">
                  Direct channels
                </h3>
                <div className="gold-line mt-3" aria-hidden />
                <ul className="mt-5 space-y-4 text-sm">
                  <li>
                    <a
                      href={SITE_PHONE_HREF}
                      className="inline-flex items-center gap-3 font-semibold text-primary transition-colors hover:text-accent-dark"
                    >
                      <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/8 text-primary">
                        <Phone className="h-4 w-4" aria-hidden />
                      </span>
                      {SITE_PHONE}
                    </a>
                  </li>
                  <li>
                    <a
                      href={`mailto:${SITE_EMAIL}`}
                      className="inline-flex items-center gap-3 font-semibold text-primary transition-colors hover:text-accent-dark"
                    >
                      <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/8 text-primary">
                        <Mail className="h-4 w-4" aria-hidden />
                      </span>
                      {SITE_EMAIL}
                    </a>
                  </li>
                  <li className="flex items-start gap-3 text-muted">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/8 text-primary">
                      <MapPin className="h-4 w-4" aria-hidden />
                    </span>
                    <span>
                      <a
                        href={SITE_MAPS_DIRECTIONS_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-colors hover:text-accent-dark"
                      >
                        {SITE_ADDRESS}
                      </a>
                    </span>
                  </li>
                </ul>

                <div className="mt-6 grid gap-2.5 sm:grid-cols-2">
                  <Button
                    href={SITE_WHATSAPP}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="gold"
                    fullWidth
                    icon={<FaWhatsapp className="h-4 w-4" />}
                  >
                    WhatsApp
                  </Button>
                  <Button
                    href={SITE_PHONE_HREF}
                    variant="primary"
                    fullWidth
                    icon={<Phone className="h-4 w-4" />}
                  >
                    Call Now
                  </Button>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="overflow-hidden rounded-[1.45rem] border border-primary/8 bg-primary/5 shadow-[0_16px_48px_rgba(11,46,131,0.06)]">
                <iframe
                  title={`Google Map — Done & Delivered office at ${SITE_ADDRESS}`}
                  src={SITE_MAPS_EMBED_URL}
                  className="h-[240px] w-full border-0 md:h-[260px]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.06}>
            <form
              className="relative rounded-[1.5rem] border border-primary/8 bg-white p-6 shadow-[0_16px_48px_rgba(11,46,131,0.08)] md:p-8"
              onSubmit={handleSubmit}
              aria-label="Business enquiry form"
              noValidate
            >
              <h3 className="font-display text-2xl text-primary">
                Business enquiry
              </h3>
              <p className="mt-2 text-sm text-muted">
                Tell us about your project. Our team will respond with next
                steps.
              </p>
              {form.source === "hero-consultation" ? (
                <p className="mt-2 rounded-lg border border-accent/30 bg-accent/10 px-3 py-2 text-xs font-medium text-primary">
                  Prefill from homepage consultation — complete your contact
                  details to submit.
                </p>
              ) : null}
              <div className="gold-line mt-4" aria-hidden />

              {/* Honeypot */}
              <div className="absolute -left-[9999px] top-auto h-0 w-0 overflow-hidden" aria-hidden>
                <label htmlFor="contact-website">Website</label>
                <input
                  id="contact-website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={form.website}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, website: e.target.value }))
                  }
                />
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <label className="block text-sm font-medium text-primary">
                  Full name
                  <input
                    required
                    name="name"
                    autoComplete="name"
                    value={form.name}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, name: e.target.value }))
                    }
                    className={inputClass("name")}
                    aria-invalid={Boolean(fieldErrors.name)}
                    aria-describedby={fieldErrors.name ? "err-name" : undefined}
                  />
                  {fieldErrors.name ? (
                    <span id="err-name" className="mt-1 block text-xs text-red-600">
                      {fieldErrors.name}
                    </span>
                  ) : null}
                </label>
                <label className="block text-sm font-medium text-primary">
                  Email
                  <input
                    required
                    type="email"
                    name="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, email: e.target.value }))
                    }
                    className={inputClass("email")}
                    aria-invalid={Boolean(fieldErrors.email)}
                    aria-describedby={fieldErrors.email ? "err-email" : undefined}
                  />
                  {fieldErrors.email ? (
                    <span id="err-email" className="mt-1 block text-xs text-red-600">
                      {fieldErrors.email}
                    </span>
                  ) : null}
                </label>
                <label className="block text-sm font-medium text-primary">
                  Phone
                  <input
                    required
                    type="tel"
                    name="phone"
                    autoComplete="tel"
                    value={form.phone}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, phone: e.target.value }))
                    }
                    className={inputClass("phone")}
                    aria-invalid={Boolean(fieldErrors.phone)}
                    aria-describedby={fieldErrors.phone ? "err-phone" : undefined}
                  />
                  {fieldErrors.phone ? (
                    <span id="err-phone" className="mt-1 block text-xs text-red-600">
                      {fieldErrors.phone}
                    </span>
                  ) : null}
                </label>
                <label className="block text-sm font-medium text-primary">
                  Company / Developer
                  <input
                    name="company"
                    autoComplete="organization"
                    value={form.company}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, company: e.target.value }))
                    }
                    className={inputClass("company")}
                  />
                </label>
              </div>

              <label className="mt-4 block text-sm font-medium text-primary">
                Project details
                <textarea
                  required
                  name="message"
                  rows={4}
                  value={form.message}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, message: e.target.value }))
                  }
                  className={`mt-1.5 w-full resize-y rounded-xl border px-4 py-3 text-sm outline-none transition focus:border-accent ${
                    fieldErrors.message
                      ? "border-red-400 bg-red-50/40"
                      : "border-primary/10"
                  }`}
                  placeholder="Project type, city, timeline, and goals"
                  aria-invalid={Boolean(fieldErrors.message)}
                  aria-describedby={
                    fieldErrors.message ? "err-message" : undefined
                  }
                />
                {fieldErrors.message ? (
                  <span id="err-message" className="mt-1 block text-xs text-red-600">
                    {fieldErrors.message}
                  </span>
                ) : null}
              </label>

              <div className="mt-5" aria-live="polite">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth
                  disabled={status === "submitting"}
                  icon={<Send className="h-4 w-4" />}
                >
                  {status === "submitting"
                    ? "Sending…"
                    : status === "success"
                      ? "Enquiry Sent"
                      : "Submit Enquiry"}
                </Button>
                {status === "success" ? (
                  <p
                    role="status"
                    className="mt-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-center text-sm font-medium text-emerald-800"
                  >
                    {statusMessage}
                  </p>
                ) : null}
                {status === "error" ? (
                  <p
                    role="alert"
                    className="mt-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-center text-sm font-medium text-red-700"
                  >
                    {statusMessage}
                  </p>
                ) : null}
              </div>
            </form>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/animations/Reveal";
import { contactFaqs } from "@/lib/data/contact-page";
import { cn } from "@/lib/utils";

export function ContactFAQ() {
  const [openId, setOpenId] = useState<string | null>(contactFaqs[0]?.id ?? null);

  return (
    <section
      id="faq"
      className="relative section-pad overflow-hidden bg-white"
      aria-labelledby="faq-heading"
    >
      <Container>
        <div id="faq-heading">
          <SectionHeading
            eyebrow="FAQ"
            title="Answers before we start the conversation"
            description="Common questions from builders and developers exploring a Done & Delivered partnership."
          />
        </div>

        <div className="mx-auto max-w-3xl space-y-3">
          {contactFaqs.map((item, index) => {
            const isOpen = openId === item.id;
            return (
              <Reveal key={item.id} delay={index * 0.03}>
                <div className="overflow-hidden rounded-[1.25rem] border border-primary/10 bg-[linear-gradient(180deg,#FFFFFF_0%,#F7FAFF_100%)] shadow-[0_10px_32px_rgba(11,46,131,0.06)]">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left md:px-6 md:py-5"
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${item.id}`}
                    id={`faq-trigger-${item.id}`}
                    onClick={() => setOpenId(isOpen ? null : item.id)}
                  >
                    <span className="font-display text-lg text-primary md:text-xl">
                      {item.question}
                    </span>
                    <ChevronDown
                      className={cn(
                        "h-5 w-5 shrink-0 text-accent transition-transform duration-300",
                        isOpen && "rotate-180",
                      )}
                      aria-hidden
                    />
                  </button>
                  <div
                    id={`faq-panel-${item.id}`}
                    role="region"
                    aria-labelledby={`faq-trigger-${item.id}`}
                    hidden={!isOpen}
                    className="border-t border-primary/8 px-5 pb-5 pt-0 md:px-6 md:pb-6"
                  >
                    <p className="pt-4 text-sm leading-relaxed text-muted md:text-[0.95rem]">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

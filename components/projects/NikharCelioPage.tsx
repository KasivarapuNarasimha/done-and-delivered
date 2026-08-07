"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  Building2,
  Compass,
  Download,
  MapPin,
  Phone,
  Ruler,
  Sparkles,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { Reveal } from "@/components/animations/Reveal";
import { FloatingShapes } from "@/components/animations/FloatingShapes";
import { ImageLightbox } from "@/components/projects/ImageLightbox";
import {
  AmenitiesGallery,
  AmenitiesTextGrid,
} from "@/components/projects/AmenitiesGallery";
import { ProjectEnquiryForm } from "@/components/projects/ProjectEnquiryForm";
import {
  getSimilarProjects,
  nikharCelioProject as project,
} from "@/lib/data/projects/nikhar-celio";
import {
  SITE_PHONE,
  SITE_PHONE_HREF,
  buildWhatsAppUrl,
} from "@/lib/constants";

export function NikharCelioPage() {
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(
    null,
  );
  const similar = useMemo(() => getSimilarProjects(), []);

  const siteVisitMessage = [
    "Hello Done & Delivered,",
    "",
    "Site Visit Request — Nikhar Celio",
    "",
    "I would like to book a site visit for Nikhar Celio.",
    "Please share available slots.",
  ].join("\n");

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary pt-[4.75rem] md:pt-[5.25rem]">
        <div className="absolute inset-0">
          <Image
            src={project.heroImage}
            alt="Nikhar Celio project banner"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
            quality={75}
          />
          <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(8,31,92,0.94)_0%,rgba(11,46,131,0.88)_45%,rgba(11,46,131,0.72)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(8,31,92,0.55),transparent_50%)]" />
        </div>
        <FloatingShapes variant="dark" />

        <Container className="relative z-10 py-14 sm:py-16 md:py-20">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-2 text-xs font-semibold text-white sm:text-sm">
              <li>
                <Link href="/" className="hover:text-accent">
                  Home
                </Link>
              </li>
              <li className="text-white/70" aria-hidden>
                /
              </li>
              <li>
                <Link href="/#ongoing-projects" className="hover:text-accent">
                  Projects
                </Link>
              </li>
              <li className="text-white/70" aria-hidden>
                /
              </li>
              <li className="text-accent" aria-current="page">
                Nikhar Celio
              </li>
            </ol>
          </nav>

          <div className="grid items-end gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <div className="mb-5 inline-flex">
                <Badge tone="glass">
                  <Building2 className="h-3.5 w-3.5 text-accent" aria-hidden />
                  {project.status} · {project.type}
                </Badge>
              </div>

              <div className="mb-5 inline-flex rounded-2xl border border-white/25 bg-white/95 p-3 shadow-[0_12px_40px_rgba(0,0,0,0.2)]">
                <Image
                  src={project.logo}
                  alt="Nikhar Celio logo"
                  width={160}
                  height={48}
                  className="h-10 w-auto object-contain sm:h-12"
                />
              </div>

              <h1 className="heading-on-dark font-display text-[2.4rem] leading-[1.08] tracking-tight sm:text-5xl md:text-6xl">
                {project.name}
              </h1>
              <p className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-white sm:text-base">
                <MapPin className="h-4 w-4 text-accent" aria-hidden />
                {project.location}
              </p>
              <div className="gold-line mt-5" aria-hidden />
              <p className="text-on-dark-strong mt-5 max-w-2xl text-sm leading-relaxed sm:text-base md:text-lg">
                {project.shortDescription}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Button
                  href={buildWhatsAppUrl(siteVisitMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="gold"
                  size="lg"
                  className="w-full sm:w-auto"
                  icon={<Sparkles className="h-4 w-4" />}
                >
                  Book Site Visit
                </Button>
                <Button
                  href={buildWhatsAppUrl(
                    `Hello Done & Delivered,\n\nI would like more details on Nikhar Celio.`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="ghost"
                  size="lg"
                  className="w-full sm:w-auto"
                  icon={<FaWhatsapp className="h-4 w-4" />}
                >
                  WhatsApp
                </Button>
                <Button
                  href={SITE_PHONE_HREF}
                  variant="outline"
                  size="lg"
                  className="w-full border-white/45 bg-transparent font-bold text-white hover:border-accent hover:bg-accent hover:text-primary sm:w-auto"
                  icon={<Phone className="h-4 w-4" />}
                  aria-label={`Call ${SITE_PHONE}`}
                >
                  Call Now
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {[
                { label: "Homes", value: "333" },
                { label: "Open Space", value: "82%+" },
                { label: "Towers", value: "A & B" },
                { label: "RERA", value: "Approved" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-white/30 bg-white/12 px-4 py-5 text-center backdrop-blur-md"
                >
                  <p className="font-display text-2xl text-white sm:text-3xl">
                    {item.value}
                  </p>
                  <p className="mt-1 text-[0.68rem] font-bold uppercase tracking-[0.12em] text-white">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Overview */}
      <section className="relative section-pad overflow-hidden bg-white">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
            <div>
              <SectionHeading
                align="left"
                className="mb-8"
                eyebrow="Project Overview"
                title="Exclusive high-rise living at Gunjur"
                description={project.overview[0]}
              />
              <p className="mt-4 text-sm leading-relaxed text-muted md:text-base">
                {project.overview[1]}
              </p>
              <ul className="mt-6 space-y-3">
                {project.highlights.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-sm font-medium text-primary md:text-[0.95rem]"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.14em] text-accent-dark">
                RERA · {project.rera}
              </p>
            </div>
            <Reveal>
              <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] border border-primary/8 shadow-[0_16px_48px_rgba(11,46,131,0.1)]">
                <Image
                  src={project.bannerImage}
                  alt="Nikhar Celio elevation"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  quality={75}
                />
              </div>
            </Reveal>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {project.features.map((feature, i) => (
              <Reveal key={feature} delay={i * 0.04}>
                <article className="h-full rounded-[1.35rem] border border-primary/8 bg-[linear-gradient(180deg,#FFFFFF_0%,#F7FAFF_100%)] p-5 shadow-[0_12px_36px_rgba(11,46,131,0.06)]">
                  <Sparkles className="h-5 w-5 text-accent" aria-hidden />
                  <p className="mt-3 text-sm font-medium leading-relaxed text-primary">
                    {feature}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Master Plan */}
      <section className="relative section-pad section-soft overflow-hidden">
        <Container>
          <SectionHeading
            eyebrow="Master Plan"
            title="Thoughtfully planned community layout"
            description="Every detail—from spacious lobbies to landscaped courtyards—is designed to enrich everyday living at Nikhar Celio."
          />
          <Reveal>
            <button
              type="button"
              className="group relative mx-auto block w-full max-w-4xl overflow-hidden rounded-[1.5rem] border border-primary/10 bg-white p-3 shadow-[0_16px_48px_rgba(11,46,131,0.1)]"
              onClick={() =>
                setLightbox({
                  src: project.masterPlan,
                  alt: "Nikhar Celio master plan",
                })
              }
            >
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={project.masterPlan}
                  alt="Nikhar Celio master plan"
                  fill
                  className="object-contain"
                  sizes="(max-width: 900px) 100vw, 900px"
                  quality={80}
                />
              </div>
              <span className="mt-3 block text-center text-sm font-semibold text-primary group-hover:text-accent-dark">
                Click to enlarge master plan
              </span>
            </button>
          </Reveal>
        </Container>
      </section>

      {/* Amenities */}
      <section className="relative section-pad overflow-hidden bg-white">
        <Container>
          <SectionHeading
            eyebrow="Amenities"
            title="Lifestyle crafted for modern living"
            description="Experience life in perfect harmony at Nikhar Celio, where every amenity is carefully curated to elevate everyday living."
          />
          {project.amenityGallery && project.amenityGallery.length > 0 ? (
            <Reveal>
              <AmenitiesGallery items={project.amenityGallery} />
            </Reveal>
          ) : (
            <AmenitiesTextGrid amenities={project.amenities} />
          )}
        </Container>
      </section>

      {/* Floor Plans */}
      <section className="relative section-pad section-soft overflow-hidden">
        <Container>
          <SectionHeading
            eyebrow="Floor Plans"
            title="Tower-wise unit layouts"
            description="Explore every available floor plan from the Nikhar Celio brochure. Click any plan for a larger preview."
          />

          <div className="space-y-12">
            {(
              [
                ["Tower A", project.floorPlans.towerA],
                ["Tower B", project.floorPlans.towerB],
              ] as const
            ).map(([tower, plans]) => (
              <div key={tower}>
                <h3 className="mb-5 font-display text-2xl text-primary md:text-3xl">
                  {tower}
                </h3>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {plans.map((plan, index) => (
                    <Reveal key={plan.id} delay={index * 0.04}>
                      <button
                        type="button"
                        onClick={() =>
                          setLightbox({
                            src: plan.image,
                            alt: `${tower} unit ${plan.label} floor plan`,
                          })
                        }
                        className="card-lift group w-full overflow-hidden rounded-[1.4rem] border border-primary/8 bg-white text-left shadow-[0_14px_40px_rgba(11,46,131,0.07)]"
                      >
                        <div className="relative aspect-[4/3] bg-[#F7FAFF]">
                          <Image
                            src={plan.image}
                            alt={`${plan.label} floor plan`}
                            fill
                            className="object-contain p-3 transition duration-500 group-hover:scale-[1.03]"
                            sizes="(max-width: 768px) 100vw, 33vw"
                            quality={75}
                          />
                        </div>
                        <div className="border-t border-primary/8 px-5 py-4">
                          <p className="font-display text-xl text-primary">
                            {plan.label}
                          </p>
                          <p className="mt-1 text-sm font-medium text-muted">
                            {plan.config}
                            {plan.size !== "—" ? ` · ${plan.size}` : ""}
                          </p>
                          <p className="mt-2 text-xs font-bold uppercase tracking-[0.12em] text-accent-dark">
                            Tap to enlarge
                          </p>
                        </div>
                      </button>
                    </Reveal>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Unit configurations */}
      <section className="relative section-pad overflow-hidden bg-white">
        <Container>
          <SectionHeading
            eyebrow="Unit Configurations"
            title="Sizes and facing options"
            description="Choose from spacious configurations designed for light, ventilation, and premium everyday living."
          />
          <div className="grid gap-6 lg:grid-cols-2">
            <Reveal>
              <div className="rounded-[1.5rem] border border-primary/8 bg-[linear-gradient(180deg,#FFFFFF_0%,#F7FAFF_100%)] p-6 shadow-[0_14px_40px_rgba(11,46,131,0.07)] md:p-8">
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-white">
                  <Ruler className="h-5 w-5 text-accent" aria-hidden />
                </div>
                <h3 className="font-display text-2xl text-primary">Unit sizes</h3>
                <div className="gold-line mt-3" aria-hidden />
                <div className="mt-5 flex flex-wrap gap-2.5">
                  {project.unitSizes.map((size) => (
                    <span
                      key={size}
                      className="rounded-full border border-primary/12 bg-white px-4 py-2 text-sm font-semibold text-primary shadow-sm"
                    >
                      {size}
                    </span>
                  ))}
                </div>
                <p className="mt-5 text-sm text-muted">
                  Configurations include {project.configurations.join(", ")}.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.06}>
              <div className="rounded-[1.5rem] border border-primary/8 bg-[linear-gradient(180deg,#FFFFFF_0%,#F7FAFF_100%)] p-6 shadow-[0_14px_40px_rgba(11,46,131,0.07)] md:p-8">
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-white">
                  <Compass className="h-5 w-5 text-accent" aria-hidden />
                </div>
                <h3 className="font-display text-2xl text-primary">Facing</h3>
                <div className="gold-line mt-3" aria-hidden />
                <div className="mt-5 flex flex-wrap gap-2.5">
                  {project.facings.map((facing) => (
                    <span
                      key={facing}
                      className="rounded-full border border-accent/30 bg-accent/10 px-4 py-2 text-sm font-bold text-primary"
                    >
                      {facing}
                    </span>
                  ))}
                </div>
                <p className="mt-5 text-sm text-muted">
                  Facing options as published for Nikhar Celio inventory.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Gallery */}
      <section className="relative section-pad section-soft overflow-hidden">
        <Container>
          <SectionHeading
            eyebrow="Project Gallery"
            title="A glimpse of modern living"
            description="High-quality visuals from the Nikhar Celio project brochure and marketing gallery."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {project.gallery.map((item, index) => (
              <Reveal key={item.src} delay={(index % 6) * 0.04}>
                <button
                  type="button"
                  onClick={() =>
                    setLightbox({ src: item.src, alt: item.alt })
                  }
                  className="group relative aspect-[4/3] w-full overflow-hidden rounded-[1.35rem] border border-primary/8 bg-white shadow-[0_12px_36px_rgba(11,46,131,0.08)]"
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    quality={70}
                  />
                </button>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Brochure + Enquiry */}
      <section
        id="project-enquiry"
        className="relative section-pad overflow-hidden bg-white"
      >
        <Container>
          <div className="mb-10 grid gap-6 rounded-[1.5rem] border border-primary/8 bg-primary p-6 text-white shadow-[0_20px_60px_rgba(11,46,131,0.2)] md:grid-cols-[1.3fr_auto] md:items-center md:p-8">
            <div>
              <p className="text-[0.7rem] font-bold uppercase tracking-[0.16em] text-accent">
                Brochure
              </p>
              <h2 className="mt-2 font-display text-2xl md:text-3xl">
                Download the Nikhar Celio brochure
              </h2>
              <p className="mt-2 max-w-xl text-sm text-white/90">
                Get complete project details, floor plans, and amenities in one
                PDF.
              </p>
            </div>
            <Button
              href={project.brochure}
              variant="gold"
              size="lg"
              icon={<Download className="h-4 w-4" />}
            >
              Download Brochure
            </Button>
          </div>

          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <SectionHeading
                align="left"
                className="mb-0"
                eyebrow="Enquiry"
                title="Interested in Nikhar Celio?"
                description="Share your details and our team will connect with inventory options, pricing guidance, and site visit scheduling."
              />
              <div className="mt-6 space-y-3 text-sm font-medium text-primary">
                <p className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-accent" aria-hidden />
                  {project.address}
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-accent" aria-hidden />
                  {SITE_PHONE}
                </p>
              </div>
            </div>
            <ProjectEnquiryForm projectName={project.name} />
          </div>
        </Container>
      </section>

      {/* Similar projects */}
      <section className="relative section-pad section-soft overflow-hidden">
        <Container>
          <SectionHeading
            eyebrow="Similar Projects"
            title="More active mandates"
            description="Explore other ongoing projects marketed by Done & Delivered."
          />
          <div className="grid gap-5 md:grid-cols-2">
            {similar.map((p, index) => (
              <ProjectCard
                key={p.id}
                project={p}
                delay={index * 0.05}
                animate={false}
              />
            ))}
          </div>
        </Container>
      </section>

      {lightbox ? (
        <ImageLightbox
          src={lightbox.src}
          alt={lightbox.alt}
          onClose={() => setLightbox(null)}
        />
      ) : null}
    </>
  );
}

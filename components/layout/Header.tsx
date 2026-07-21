"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  Briefcase,
  Building2,
  ChevronDown,
  Home,
  Map,
  Menu,
  Phone,
  Search,
  Sparkles,
  X,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { useEffect, useId, useState } from "react";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import {
  NAV_LINKS,
  SITE_PHONE,
  SITE_PHONE_HREF,
  SITE_WHATSAPP,
} from "@/lib/constants";
import { megaMenuFeaturedLinks, propertyMegaMenu } from "@/lib/data/homepage";
import { cn } from "@/lib/utils";

const megaIcons = {
  building: Building2,
  home: Home,
  map: Map,
  briefcase: Briefcase,
};

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobilePropsOpen, setMobilePropsOpen] = useState(false);
  const megaId = useId();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const solid = scrolled || mobileOpen || megaOpen;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        solid
          ? "border-b border-white/10 bg-primary/95 shadow-[0_12px_40px_rgba(8,31,92,0.28)] backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="container-pad">
        <div className="flex h-[4.75rem] items-center justify-between gap-3 md:h-[5.25rem]">
          <Logo variant="light" className="min-w-0 shrink" />

          <nav
            className="hidden items-center gap-0.5 xl:flex"
            aria-label="Primary"
          >
            {NAV_LINKS.map((link) => {
              if ("mega" in link && link.mega) {
                return (
                  <div
                    key={link.label}
                    className="relative"
                    onMouseEnter={() => setMegaOpen(true)}
                    onMouseLeave={() => setMegaOpen(false)}
                    onFocus={() => setMegaOpen(true)}
                  >
                    <button
                      type="button"
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-medium transition-all duration-300",
                        "text-white/90 hover:bg-white/10 hover:text-white",
                        megaOpen && "bg-white/10 text-white",
                      )}
                      aria-expanded={megaOpen}
                      aria-controls={megaId}
                      aria-haspopup="true"
                    >
                      {link.label}
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 transition-transform duration-300",
                          megaOpen && "rotate-180",
                        )}
                        aria-hidden
                      />
                    </button>

                    <AnimatePresence>
                      {megaOpen ? (
                        <motion.div
                          id={megaId}
                          role="region"
                          aria-label="Properties menu"
                          initial={{ opacity: 0, y: 14, scale: 0.985 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.985 }}
                          transition={{
                            duration: 0.28,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="mega-panel absolute left-1/2 top-full z-50 w-[min(920px,calc(100vw-2rem))] -translate-x-1/2 pt-4"
                        >
                          <div className="overflow-hidden rounded-[1.6rem] border border-white/70 bg-white shadow-[0_30px_90px_rgba(11,46,131,0.2)]">
                            <div className="grid lg:grid-cols-[1.35fr_0.9fr]">
                              <div className="p-5 md:p-6">
                                <div className="mb-4 flex items-end justify-between gap-3">
                                  <div>
                                    <p className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-accent-dark">
                                      Browse by category
                                    </p>
                                    <p className="mt-1 font-display text-2xl text-primary">
                                      Explore Properties
                                    </p>
                                  </div>
                                  <Link
                                    href="/properties"
                                    className="inline-flex items-center gap-1 text-sm font-semibold text-primary transition-colors hover:text-accent-dark"
                                  >
                                    View all
                                    <ArrowUpRight className="h-4 w-4" />
                                  </Link>
                                </div>

                                <div className="grid gap-3 sm:grid-cols-2">
                                  {propertyMegaMenu.map((item) => {
                                    const Icon = megaIcons[item.icon];
                                    return (
                                      <Link
                                        key={item.title}
                                        href={item.href}
                                        className="group relative overflow-hidden rounded-2xl border border-primary/8 bg-[#F7FAFF] transition-all duration-300 hover:border-accent/35 hover:shadow-[0_14px_36px_rgba(11,46,131,0.12)]"
                                      >
                                        <div className="relative h-[7.25rem]">
                                          <Image
                                            src={item.image}
                                            alt=""
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                            sizes="280px"
                                          />
                                          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/45 to-transparent" />
                                          <div className="absolute left-3 top-3 grid h-9 w-9 place-items-center rounded-xl border border-white/20 bg-white/15 text-white backdrop-blur-md">
                                            <Icon className="h-4 w-4" aria-hidden />
                                          </div>
                                          <div className="absolute inset-x-0 bottom-0 p-3.5">
                                            <p className="font-display text-lg leading-none text-white">
                                              {item.title}
                                            </p>
                                            <p className="mt-1 text-[0.72rem] text-white/75">
                                              {item.count} · {item.description}
                                            </p>
                                          </div>
                                        </div>
                                      </Link>
                                    );
                                  })}
                                </div>
                              </div>

                              <div className="border-t border-primary/6 bg-[linear-gradient(180deg,#F7FAFF_0%,#FFFFFF_100%)] p-5 md:border-l md:border-t-0 md:p-6">
                                <p className="inline-flex items-center gap-2 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-accent-dark">
                                  <Sparkles className="h-3.5 w-3.5" aria-hidden />
                                  Featured
                                </p>
                                <ul className="mt-4 space-y-2">
                                  {megaMenuFeaturedLinks.map((item) => (
                                    <li key={item.title}>
                                      <Link
                                        href={item.href}
                                        className="group flex items-start justify-between gap-3 rounded-2xl border border-transparent px-3 py-3 transition-all duration-300 hover:border-primary/8 hover:bg-white hover:shadow-sm"
                                      >
                                        <span>
                                          <span className="block text-sm font-semibold text-primary group-hover:text-primary-light">
                                            {item.title}
                                          </span>
                                          <span className="mt-0.5 block text-xs text-muted">
                                            {item.description}
                                          </span>
                                        </span>
                                        <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-accent opacity-70 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                                      </Link>
                                    </li>
                                  ))}
                                </ul>

                                <div className="mt-5 rounded-2xl border border-primary/10 bg-primary p-4 text-white">
                                  <p className="text-sm font-semibold">
                                    Need curated shortlists?
                                  </p>
                                  <p className="mt-1 text-xs text-white/70">
                                    Speak with a verified property advisor today.
                                  </p>
                                  <Link
                                    href="/contact?intent=consultation"
                                    className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-accent transition-colors hover:text-accent-soft"
                                  >
                                    Book free consultation
                                    <ArrowUpRight className="h-4 w-4" />
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className="rounded-full px-3.5 py-2 text-sm font-medium text-white/90 transition-all duration-300 hover:bg-white/10 hover:text-white"
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 sm:gap-2.5">
            <button
              type="button"
              aria-label="Search properties"
              className="grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-all duration-300 hover:border-accent hover:bg-white hover:text-primary sm:h-11 sm:w-11"
            >
              <Search className="h-4 w-4" />
            </button>

            <a
              href={SITE_PHONE_HREF}
              className="hidden items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-2.5 text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 hover:border-accent hover:bg-white hover:text-primary lg:inline-flex"
            >
              <Phone className="h-4 w-4" aria-hidden />
              <span className="hidden xl:inline">{SITE_PHONE}</span>
              <span className="xl:hidden">Call</span>
            </a>

            <a
              href={SITE_WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden h-11 w-11 place-items-center rounded-full border border-accent/50 bg-accent text-primary transition-all duration-300 hover:scale-[1.04] hover:bg-accent-dark hover:text-white md:grid"
              aria-label="Chat on WhatsApp"
            >
              <FaWhatsapp className="h-4 w-4" />
            </a>

            <button
              type="button"
              className="grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-white/10 text-white transition-all xl:hidden sm:h-11 sm:w-11"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="max-h-[calc(100svh-5rem)] overflow-y-auto border-t border-white/10 bg-primary xl:hidden"
          >
            <div className="container-pad space-y-1 py-5">
              {NAV_LINKS.map((link) => {
                if ("mega" in link && link.mega) {
                  return (
                    <div key={link.label} className="rounded-2xl bg-white/5">
                      <button
                        type="button"
                        className="flex w-full items-center justify-between px-4 py-3.5 text-left font-medium text-white"
                        onClick={() => setMobilePropsOpen((v) => !v)}
                        aria-expanded={mobilePropsOpen}
                      >
                        {link.label}
                        <ChevronDown
                          className={cn(
                            "h-4 w-4 transition-transform",
                            mobilePropsOpen && "rotate-180",
                          )}
                        />
                      </button>
                      {mobilePropsOpen ? (
                        <div className="space-y-1 px-2 pb-3">
                          {propertyMegaMenu.map((item) => {
                            const Icon = megaIcons[item.icon];
                            return (
                              <Link
                                key={item.title}
                                href={item.href}
                                onClick={() => setMobileOpen(false)}
                                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-white/85 hover:bg-white/10 hover:text-white"
                              >
                                <span className="grid h-8 w-8 place-items-center rounded-lg bg-white/10 text-accent">
                                  <Icon className="h-4 w-4" />
                                </span>
                                <span>
                                  <span className="block font-medium">
                                    {item.title}
                                  </span>
                                  <span className="block text-xs text-white/55">
                                    {item.count}
                                  </span>
                                </span>
                              </Link>
                            );
                          })}
                        </div>
                      ) : null}
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-2xl px-4 py-3.5 font-medium text-white/90 hover:bg-white/10"
                  >
                    {link.label}
                  </Link>
                );
              })}

              <div className="grid gap-3 pt-4 sm:grid-cols-2">
                <Button
                  href={SITE_PHONE_HREF}
                  variant="gold"
                  fullWidth
                  icon={<Phone className="h-4 w-4" />}
                >
                  Call Now
                </Button>
                <Button
                  href={SITE_WHATSAPP}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="ghost"
                  fullWidth
                  icon={<FaWhatsapp className="h-4 w-4" />}
                >
                  WhatsApp
                </Button>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

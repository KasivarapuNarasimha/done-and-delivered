"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/animations/Reveal";
import { propertyCategories } from "@/lib/data/homepage";

export function PropertyCategories() {
  return (
    <section
      className="relative section-pad bg-white"
      aria-labelledby="categories-heading"
    >
      <Container>
        <div id="categories-heading">
          <SectionHeading
            eyebrow="Property Categories"
            title="Explore by lifestyle & ambition"
            description="From skyline residences to private estates and high-yield commercial assets—each category is curated for distinction."
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-4">
          {propertyCategories.map((category, index) => (
            <Reveal key={category.id} delay={index * 0.07}>
              <Link
                href={category.href}
                className="group relative block h-[340px] overflow-hidden rounded-[1.5rem] shadow-[0_18px_50px_rgba(11,46,131,0.12)] sm:h-[380px] md:h-[400px] xl:h-[430px]"
              >
                <div className="img-reveal absolute inset-0">
                  <Image
                    src={category.image}
                    alt={`${category.title} properties`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                    quality={75}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-primary/10 transition-opacity duration-500" />
                <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_85%,rgba(212,175,55,0.3),transparent_55%)]" />
                </div>

                <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                  <p className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-accent">
                    {category.count}
                  </p>
                  <div className="mt-2 flex items-end justify-between gap-3">
                    <div>
                      <h3 className="font-display text-2xl text-white md:text-[1.85rem]">
                        {category.title}
                      </h3>
                      <p className="mt-2 max-w-[15rem] text-sm leading-relaxed text-white/75">
                        {category.description}
                      </p>
                    </div>
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-md transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-primary">
                      <ArrowUpRight className="h-5 w-5" aria-hidden />
                    </span>
                  </div>
                  <span className="mt-5 inline-flex text-sm font-semibold text-white transition-colors group-hover:text-accent">
                    Explore collection
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

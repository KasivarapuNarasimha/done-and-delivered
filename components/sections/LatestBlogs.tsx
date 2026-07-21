"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock3 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/animations/Reveal";
import { Button } from "@/components/ui/Button";
import { latestBlogs } from "@/lib/data/homepage";

export function LatestBlogs() {
  return (
    <section
      className="relative section-pad section-soft overflow-hidden"
      aria-labelledby="blogs-heading"
    >
      <Container>
        <div className="mb-2 flex flex-col gap-6 md:mb-4 md:flex-row md:items-end md:justify-between">
          <div id="blogs-heading" className="min-w-0 flex-1">
            <SectionHeading
              align="left"
              className="mb-0"
              eyebrow="Insights"
              title="Latest from the advisory desk"
              description="Market intelligence, buyer frameworks, and investment perspectives crafted for informed decision-making."
            />
          </div>
          <Button
            href="/blogs"
            variant="outline"
            className="self-start md:self-auto md:mb-1"
          >
            View All Articles
          </Button>
        </div>

        <div className="grid gap-5 md:gap-6 lg:grid-cols-3">
          {latestBlogs.map((post, index) => (
            <Reveal key={post.id} delay={index * 0.07}>
              <article className="card-lift group flex h-full flex-col overflow-hidden rounded-[1.45rem] border border-primary/8 bg-white shadow-[0_16px_48px_rgba(11,46,131,0.08)]">
                <Link
                  href={post.href}
                  className="img-reveal relative block aspect-[16/10] overflow-hidden"
                >
                  <Image
                    src={post.image}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/55 to-transparent opacity-75" />
                  <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-primary shadow-sm">
                    {post.category}
                  </span>
                </Link>

                <div className="flex flex-1 flex-col p-5 md:p-6">
                  <div className="mb-3 flex items-center gap-3 text-xs text-muted">
                    <time dateTime={post.date}>{post.date}</time>
                    <span className="h-1 w-1 rounded-full bg-accent" aria-hidden />
                    <span className="inline-flex items-center gap-1">
                      <Clock3 className="h-3.5 w-3.5" aria-hidden />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="font-display text-xl leading-snug text-primary transition-colors duration-300 group-hover:text-primary-light md:text-[1.35rem]">
                    <Link href={post.href}>{post.title}</Link>
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                    {post.excerpt}
                  </p>

                  <Link
                    href={post.href}
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-accent-dark"
                  >
                    Read article
                    <ArrowUpRight
                      className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden
                    />
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

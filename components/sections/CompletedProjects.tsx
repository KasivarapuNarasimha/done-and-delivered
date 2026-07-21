"use client";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { completedProjects } from "@/lib/data/homepage";

export function CompletedProjects() {
  return (
    <section
      id="completed-projects"
      className="relative section-pad overflow-hidden bg-white"
      aria-labelledby="completed-heading"
    >
      <Container>
        <div id="completed-heading">
          <SectionHeading
            eyebrow="Completed Projects"
            title="Delivered campaigns. Proven delivery."
            description="Official completed projects from our brand portfolio—where marketing systems, creative excellence, and sales support were fully executed."
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {completedProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              delay={index * 0.06}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

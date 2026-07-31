import type { Metadata } from "next";
import { ProjectDetailsPage } from "@/components/projects/ProjectDetailsPage";
import {
  astroBoulevardsProject,
  getSimilarProjects,
} from "@/lib/data/projects/astro-boulevards";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import {
  getProjectBanner,
  getProjectBasePath,
} from "@/lib/utils/project-assets";

const SLUG = "astro-boulevards";
const basePath = getProjectBasePath(SLUG);
const banner = getProjectBanner(SLUG);

export const metadata: Metadata = {
  title: "Astro Boulevards | Premium Plots off Sarjapura Road, Bengaluru",
  description:
    "Explore Astro Boulevards—premium residential plots off Sarjapura Road, Bengaluru. Plot sizes, amenities, master plan, gallery, and brochure. Marketed by Done & Delivered.",
  alternates: {
    canonical: basePath,
  },
  openGraph: {
    title: `Astro Boulevards | ${SITE_NAME}`,
    description:
      "Gated villa plots off Sarjapura Road. View plot options, amenities, and book a site visit with Done & Delivered.",
    url: `${SITE_URL}${basePath}`,
    type: "website",
    images: [
      {
        url: banner,
        width: 1200,
        height: 800,
        alt: "Astro Boulevards",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Astro Boulevards | ${SITE_NAME}`,
    description:
      "Premium residential plots off Sarjapura Road, Bengaluru. Plot options, amenities, and site visits.",
    images: [banner],
  },
};

export default function AstroBoulevardsProjectRoute() {
  const similar = getSimilarProjects();
  return (
    <ProjectDetailsPage project={astroBoulevardsProject} similar={similar} />
  );
}

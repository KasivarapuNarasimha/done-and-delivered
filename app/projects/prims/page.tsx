import type { Metadata } from "next";
import { ProjectDetailsPage } from "@/components/projects/ProjectDetailsPage";
import { getSimilarProjects, primsProject } from "@/lib/data/projects/prims";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import {
  getProjectBanner,
  getProjectBasePath,
} from "@/lib/utils/project-assets";

const SLUG = "prims";
const basePath = getProjectBasePath(SLUG);
const banner = getProjectBanner(SLUG);

export const metadata: Metadata = {
  title: "Prims | Premium Residential Project in Bengaluru",
  description:
    "Explore Prims—premium residential living in Bengaluru. Floor plans, amenities, master plan, gallery, and dual brochure downloads. Marketed by Done & Delivered.",
  alternates: {
    canonical: basePath,
  },
  openGraph: {
    title: `Prims | ${SITE_NAME}`,
    description:
      "Premium residential project in Bengaluru. View layouts, amenities, and book a site visit with Done & Delivered.",
    url: `${SITE_URL}${basePath}`,
    type: "website",
    images: [
      {
        url: banner,
        width: 1200,
        height: 800,
        alt: "Prims",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Prims | ${SITE_NAME}`,
    description:
      "Premium residential project in Bengaluru. Layouts, amenities, and site visits.",
    images: [banner],
  },
};

export default function PrimsProjectRoute() {
  const similar = getSimilarProjects();
  return <ProjectDetailsPage project={primsProject} similar={similar} />;
}

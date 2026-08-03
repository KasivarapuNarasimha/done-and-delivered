import type { Metadata } from "next";
import { ProjectDetailsPage } from "@/components/projects/ProjectDetailsPage";
import { getSimilarProjects, primusProject } from "@/lib/data/projects/primus";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import {
  getProjectBanner,
  getProjectBasePath,
} from "@/lib/utils/project-assets";

const SLUG = "primus";
const basePath = getProjectBasePath(SLUG);
const banner = getProjectBanner(SLUG);

export const metadata: Metadata = {
  title: "Primus | Premium Residential Project in Bengaluru",
  description:
    "Explore Primus—premium residential living in Bengaluru. Floor plans, amenities, master plan, gallery, and dual brochure downloads. Marketed by Done & Delivered.",
  alternates: {
    canonical: basePath,
  },
  openGraph: {
    title: `Primus | ${SITE_NAME}`,
    description:
      "Premium residential project in Bengaluru. View layouts, amenities, and book a site visit with Done & Delivered.",
    url: `${SITE_URL}${basePath}`,
    type: "website",
    images: [
      {
        url: banner,
        width: 1200,
        height: 800,
        alt: "Primus",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Primus | ${SITE_NAME}`,
    description:
      "Premium residential project in Bengaluru. Layouts, amenities, and site visits.",
    images: [banner],
  },
};

export default function PrimusProjectRoute() {
  const similar = getSimilarProjects();
  return <ProjectDetailsPage project={primusProject} similar={similar} />;
}

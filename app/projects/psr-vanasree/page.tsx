import type { Metadata } from "next";
import { ProjectDetailsPage } from "@/components/projects/ProjectDetailsPage";
import {
  getSimilarProjects,
  psrVanasreeProject,
} from "@/lib/data/projects/psr-vanasree";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import {
  getProjectBanner,
  getProjectBasePath,
} from "@/lib/utils/project-assets";

const SLUG = "psr-vanasree";
const basePath = getProjectBasePath(SLUG);
const banner = getProjectBanner(SLUG);

export const metadata: Metadata = {
  title: "PSR Vanasree | 2 & 3 BHK Flats off Sarjapur Road, Bengaluru",
  description:
    "Explore PSR Vanasree—premium 2 & 3 BHK residences at Kodathi off Sarjapur Road. Floor plans, amenities, master plan, gallery, and brochure. Marketed by Done & Delivered.",
  alternates: {
    canonical: basePath,
  },
  openGraph: {
    title: `PSR Vanasree | ${SITE_NAME}`,
    description:
      "560 homes across 6.29 acres near Wipro SEZ. View floor plans, amenities, and book a site visit with Done & Delivered.",
    url: `${SITE_URL}${basePath}`,
    type: "website",
    images: [
      {
        url: banner,
        width: 1200,
        height: 800,
        alt: "PSR Vanasree",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `PSR Vanasree | ${SITE_NAME}`,
    description:
      "Premium 2 & 3 BHK apartments at Kodathi, off Sarjapur Road. Floor plans, amenities, and site visits.",
    images: [banner],
  },
};

export default function PsrVanasreeProjectRoute() {
  const similar = getSimilarProjects();
  return (
    <ProjectDetailsPage project={psrVanasreeProject} similar={similar} />
  );
}

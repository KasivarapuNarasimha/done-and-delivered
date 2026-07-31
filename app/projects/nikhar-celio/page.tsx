import type { Metadata } from "next";
import { NikharCelioPage } from "@/components/projects/NikharCelioPage";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import {
  getProjectBanner,
  getProjectBasePath,
} from "@/lib/utils/project-assets";

const SLUG = "nikhar-celio";
const basePath = getProjectBasePath(SLUG);
const banner = getProjectBanner(SLUG);

export const metadata: Metadata = {
  title: "Nikhar Celio | Premium Residences at Gunjur, Bengaluru",
  description:
    "Explore Nikhar Celio—premium high-rise residences in Gunjur, Bengaluru. Floor plans, amenities, master plan, gallery, and brochure. Marketed by Done & Delivered.",
  alternates: {
    canonical: basePath,
  },
  openGraph: {
    title: `Nikhar Celio | ${SITE_NAME}`,
    description:
      "333 exclusive homes across two towers at Gunjur. View floor plans, amenities, and book a site visit with Done & Delivered.",
    url: `${SITE_URL}${basePath}`,
    type: "website",
    images: [
      {
        url: banner,
        width: 1200,
        height: 800,
        alt: "Nikhar Celio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Nikhar Celio | ${SITE_NAME}`,
    description:
      "Premium residential project at Gunjur, Bengaluru. Floor plans, amenities, and site visits.",
    images: [banner],
  },
};

export default function NikharCelioProjectRoute() {
  return <NikharCelioPage />;
}

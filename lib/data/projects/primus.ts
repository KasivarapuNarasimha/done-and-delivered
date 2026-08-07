import type { Project } from "@/lib/data/homepage";
import { ongoingProjects } from "@/lib/data/homepage";
import { buildAmenityGallery } from "@/lib/data/amenity-images";
import {
  getProjectBanner,
  getProjectBasePath,
  getProjectBrochureFile,
  getProjectFloorPlan,
  getProjectGalleryImage,
  getProjectHero,
  getProjectLogo,
  getProjectMasterPlan,
} from "@/lib/utils/project-assets";

const SLUG = "primus";

export const primusProject = {
  slug: SLUG,
  basePath: getProjectBasePath(SLUG),
  name: "Primus",
  developer: "Primus",
  type: "Premium Residential Project",
  location: "Bengaluru",
  address: "Bengaluru, Karnataka",
  rera: "RERA Registered",
  status: "Ongoing",
  shortDescription:
    "A premium residential mandate marketed by Done & Delivered—designed for discerning homebuyers seeking quality living, strong connectivity, and thoughtfully planned amenities in Bengaluru.",
  heroImage: getProjectHero(SLUG),
  bannerImage: getProjectBanner(SLUG),
  logo: getProjectLogo(SLUG, "jpg"),
  masterPlan: getProjectMasterPlan(SLUG),
  brochure: getProjectBrochureFile(SLUG, "brochure-1.pdf"),
  brochures: [
    {
      label: "Download Brochure 1",
      href: getProjectBrochureFile(SLUG, "brochure-1.pdf"),
    },
    {
      label: "Download Brochure 2",
      href: getProjectBrochureFile(SLUG, "brochure-2.pdf"),
    },
  ],
  stats: [
    { label: "Status", value: "Ongoing" },
    { label: "Type", value: "Residential" },
    { label: "City", value: "BLR" },
    { label: "RERA", value: "Approved" },
  ],
  highlights: [
    "Premium residential living positioned for high-intent buyers",
    "Thoughtfully planned layouts with lifestyle amenities",
    "Strong connectivity to key Bengaluru corridors",
    "Full-funnel marketing and sales enablement by Done & Delivered",
    "Dual brochure packs for complete project information",
    "Site visit scheduling and inventory guidance available",
  ],
  overview: [
    "Primus is an ongoing residential project marketed by Done & Delivered. Built for families and investors seeking a refined address in Bengaluru, the development combines contemporary design, practical layouts, and community amenities that support everyday living.",
    "Our team supports buyers with brochure downloads, inventory options, pricing guidance, and coordinated site visits—so decisions are clear, fast, and confidence-led from first enquiry to booking.",
  ],
  overviewTitle: "Premium residential living in Bengaluru",
  masterPlanDescription:
    "A carefully planned community layout balancing residences, open spaces, and amenity zones for comfortable everyday living.",
  amenitiesTitle: "Lifestyle amenities for modern living",
  amenitiesDescription:
    "Enjoy curated amenities designed for recreation, wellness, and secure community living.",
  layoutsEyebrow: "Floor Plans",
  layoutsTitle: "Available unit layouts",
  layoutsDescription:
    "Explore representative layout options for Primus. Click any plan for a larger preview. Confirm final inventory with our team.",
  unitConfigDescription:
    "Choose from spacious configurations designed for light, ventilation, and premium everyday living.",
  facingDescription:
    "Facing options vary by inventory block—our team will match units to your preference.",
  galleryDescription:
    "Project and lifestyle visuals from the Primus marketing gallery.",
  brochureTitle: "Download the Primus brochures",
  brochureDescription:
    "Get complete project details across two brochure PDFs—layouts, amenities, and key highlights.",
  enquiryTitle: "Interested in Primus?",
  enquiryDescription:
    "Share your details and our team will connect with inventory options, pricing guidance, and site visit scheduling.",
  configurations: ["2 BHK", "3 BHK"],
  features: [
    "Contemporary residences with premium finishes",
    "Community amenities for recreation and wellness",
    "Secure gated living with visitor management",
    "Sales support and site visits via Done & Delivered",
  ],
  unitSizes: ["1200 Sq.ft", "1450 Sq.ft", "1650 Sq.ft", "1850 Sq.ft"],
  facings: ["East Facing", "West Facing", "North Facing", "South Facing"],
  amenities: [
    "Clubhouse",
    "Swimming Pool",
    "Gymnasium",
    "Jogging Track",
    "Children's Play Area",
    "Landscaped Gardens",
    "Indoor Games",
    "Multipurpose Hall",
    "Yoga Deck",
    "Senior Citizen Sit-out",
    "Visitor Parking",
    "24×7 Security",
    "CCTV Surveillance",
    "Power Backup",
    "Rain Water Harvesting",
  ],
  amenityGallery: buildAmenityGallery([
    "Clubhouse",
    "Swimming Pool",
    "Gymnasium",
    "Jogging Track",
    "Children's Play Area",
    "Landscaped Gardens",
    "Indoor Games",
    "Multipurpose Hall",
    "Yoga Deck",
    "Senior Citizen Sit-out",
    "Visitor Parking",
    "24×7 Security",
    "CCTV Surveillance",
    "Power Backup",
    "Rain Water Harvesting",
  ]),
  layoutGroups: [
    {
      title: "Unit Types",
      plans: [
        {
          id: "type-a",
          label: "Type A",
          image: getProjectFloorPlan(SLUG, "type-a"),
          size: "2 BHK",
          config: "Representative layout",
        },
        {
          id: "type-b",
          label: "Type B",
          image: getProjectFloorPlan(SLUG, "type-b"),
          size: "3 BHK",
          config: "Representative layout",
        },
      ],
    },
  ],
  gallery: [
    {
      src: getProjectGalleryImage(SLUG, "gallery-1"),
      alt: "Primus residential exterior",
    },
    {
      src: getProjectGalleryImage(SLUG, "gallery-2"),
      alt: "Primus living spaces",
    },
    {
      src: getProjectGalleryImage(SLUG, "gallery-3"),
      alt: "Primus interiors",
    },
    {
      src: getProjectGalleryImage(SLUG, "gallery-4"),
      alt: "Primus lifestyle view",
    },
    {
      src: getProjectGalleryImage(SLUG, "gallery-5"),
      alt: "Primus community spaces",
    },
    {
      src: getProjectGalleryImage(SLUG, "gallery-6"),
      alt: "Primus project photography",
    },
  ],
} as const;

/** Similar projects from homepage (exclude self). */
export function getSimilarProjects(limit = 2): Project[] {
  return ongoingProjects
    .filter((p) => p.id !== SLUG && p.href !== getProjectBasePath(SLUG))
    .slice(0, limit);
}

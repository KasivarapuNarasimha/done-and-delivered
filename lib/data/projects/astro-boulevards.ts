import type { Project } from "@/lib/data/homepage";
import { ongoingProjects } from "@/lib/data/homepage";
import { buildAmenityGallery } from "@/lib/data/amenity-images";
import {
  getProjectBanner,
  getProjectBasePath,
  getProjectBrochure,
  getProjectFloorPlan,
  getProjectGalleryImage,
  getProjectHero,
  getProjectLogo,
  getProjectMasterPlan,
} from "@/lib/utils/project-assets";

const SLUG = "astro-boulevards";

export const astroBoulevardsProject = {
  slug: SLUG,
  basePath: getProjectBasePath(SLUG),
  name: "Astro Boulevards",
  developer: "Astro Builders & Developers",
  type: "Premium Residential Plots",
  location: "Off Sarjapura Road · Bengaluru",
  address:
    "Astro City Boulevards, Doddamara Road, Gattahalli / Chikkanayakanahalli, Bengaluru 560099",
  rera: "PRM/KA/RERA/1251/310/PR/181226/002242",
  status: "Ongoing",
  shortDescription:
    "A gated plotted community off Sarjapura Road—BDA-approved villa plots with clubhouse amenities, wide internal roads, and strong connectivity to key IT corridors.",
  heroImage: getProjectHero(SLUG),
  bannerImage: getProjectBanner(SLUG),
  logo: getProjectLogo(SLUG, "jpg"),
  masterPlan: getProjectMasterPlan(SLUG),
  brochure: getProjectBrochure(SLUG),
  stats: [
    { label: "Acres", value: "15" },
    { label: "Plot Sizes", value: "600–2400" },
    { label: "Approval", value: "BDA" },
    { label: "RERA", value: "Approved" },
  ],
  highlights: [
    "Gated residential plot community off Sarjapura Road",
    "BDA approved with A Khata inventory options",
    "Plot dimensions from 20×30 to 50×100 (≈600–5000 Sq.ft)",
    "Clubhouse lifestyle with pool, gym, and kids’ play",
    "Wide internal roads and landscaped open spaces",
    "Strong connectivity toward Electronic City, ORR & tech hubs",
  ],
  overview: [
    "Astro Boulevards (Astro City Boulevards) is a premium residential plot development by Astro Builders & Developers, positioned in the high-growth corridor off Sarjapura Road. Designed for families and investors seeking freehold plot ownership, the community combines plotted living with gated-community infrastructure and everyday amenities.",
    "Spread across approximately 15 acres near Gattahalli / Chikkanayakanahalli, the project offers multiple plot dimensions with clear road access, underground utilities planning, and lifestyle facilities including clubhouse, swimming pool, and open recreational zones—ideal for building a custom villa in East Bengaluru’s expanding corridor.",
  ],
  overviewTitle: "Gated villa plots off Sarjapura Road",
  masterPlanDescription:
    "A thoughtfully planned plotted layout with entry avenues, open spaces, and amenity zoning designed for comfortable everyday living.",
  amenitiesTitle: "Lifestyle amenities for plotted living",
  amenitiesDescription:
    "Enjoy clubhouse convenience and outdoor recreation within a secure gated community—built for families who want plot ownership with resort-style facilities.",
  layoutsEyebrow: "Plot Options",
  layoutsTitle: "Available plot dimensions",
  layoutsDescription:
    "Explore popular plot sizes from the Astro Boulevards inventory. Tap any card for a larger preview. Confirm final dimensions and availability with our team.",
  unitConfigDescription:
    "Choose from a wide range of plot sizes suitable for compact homes to spacious villa builds.",
  facingDescription:
    "Facing and road width vary by inventory block—our team will match options to your preference.",
  galleryDescription:
    "Site and approach visuals from Astro Boulevards marketing and project photography.",
  brochureTitle: "Download the Astro Boulevards brochure",
  enquiryTitle: "Interested in Astro Boulevards?",
  enquiryDescription:
    "Share your details and our team will connect with plot options, pricing guidance, and site visit scheduling.",
  configurations: [
    "20×30 plots",
    "30×50 plots",
    "30×55 plots",
    "30×60 plots",
    "40×60 plots",
    "50×100 plots",
  ],
  features: [
    "BDA-approved gated plotted development",
    "Underground cabling & drainage planning",
    "Rainwater harvesting and STP infrastructure",
    "24×7 security with grand entrance access",
  ],
  unitSizes: [
    "600 Sq.ft",
    "1500 Sq.ft",
    "1650 Sq.ft",
    "1800 Sq.ft",
    "2500 Sq.ft",
    "5000 Sq.ft",
  ],
  facings: ["East Facing", "West Facing", "North Facing", "South Facing"],
  amenities: [
    "Grand Entrance",
    "Clubhouse",
    "Swimming Pool",
    "Gymnasium",
    "Jogging Track",
    "Children's Play Area",
    "Multi-purpose Hall",
    "Lawn & Walkway",
    "Indoor Games",
    "Outdoor Games",
    "Table Tennis",
    "Landscaped Gardens",
    "Rain Water Harvesting",
    "Sewage Treatment Plant",
    "Underground Drainage",
    "Underground Cabling",
    "24×7 Security",
    "Visitor Parking",
  ],
  amenityGallery: buildAmenityGallery(
    [
      "Grand Entrance",
      "Clubhouse",
      "Swimming Pool",
      "Gymnasium",
      "Jogging Track",
      "Children's Play Area",
      "Multi-purpose Hall",
      "Lawn & Walkway",
      "Indoor Games",
      "Outdoor Games",
      "Table Tennis",
      "Landscaped Gardens",
      "Rain Water Harvesting",
      "Sewage Treatment Plant",
      "Underground Drainage",
      "Underground Cabling",
      "24×7 Security",
      "Visitor Parking",
    ],
    {
      // Project site photography when it matches an amenity
      "Grand Entrance": getProjectGalleryImage(SLUG, "gate"),
    },
  ),
  layoutGroups: [
    {
      title: "Standard Plots",
      plans: [
        {
          id: "20x30",
          label: "20 × 30",
          image: getProjectFloorPlan(SLUG, "20x30"),
          size: "600 Sq.ft",
          config: "Compact plot",
        },
        {
          id: "30x50",
          label: "30 × 50",
          image: getProjectFloorPlan(SLUG, "30x50"),
          size: "1500 Sq.ft",
          config: "Family villa plot",
        },
        {
          id: "30x55",
          label: "30 × 55",
          image: getProjectFloorPlan(SLUG, "30x55"),
          size: "1650 Sq.ft",
          config: "Family villa plot",
        },
      ],
    },
    {
      title: "Premium Plots",
      plans: [
        {
          id: "30x60",
          label: "30 × 60",
          image: getProjectFloorPlan(SLUG, "30x60"),
          size: "1800 Sq.ft",
          config: "Spacious villa plot",
        },
        {
          id: "40x60",
          label: "40 × 60",
          image: getProjectFloorPlan(SLUG, "40x60"),
          size: "2400–2500 Sq.ft",
          config: "Premium villa plot",
        },
        {
          id: "50x100",
          label: "50 × 100",
          image: getProjectFloorPlan(SLUG, "50x100"),
          size: "5000 Sq.ft",
          config: "Corner / estate plot",
        },
      ],
    },
  ],
  gallery: [
    {
      src: getProjectGalleryImage(SLUG, "road-1"),
      alt: "Internal road view at Astro Boulevards",
    },
    {
      src: getProjectBanner(SLUG),
      alt: "Astro Boulevards project view",
    },
    {
      src: getProjectGalleryImage(SLUG, "gate"),
      alt: "View from gate at Astro Boulevards",
    },
    {
      src: getProjectGalleryImage(SLUG, "road-2"),
      alt: "Approach road at Astro Boulevards",
    },
    {
      src: getProjectGalleryImage(SLUG, "entry"),
      alt: "Entry avenue at Astro Boulevards",
    },
    {
      src: getProjectGalleryImage(SLUG, "project-1"),
      alt: "Astro Boulevards community view",
    },
    {
      src: getProjectGalleryImage(SLUG, "project-2"),
      alt: "Plotted layout surroundings",
    },
    {
      src: getProjectGalleryImage(SLUG, "project-3"),
      alt: "Project photography Astro Boulevards",
    },
    {
      src: getProjectHero(SLUG),
      alt: "Astro Boulevards hero elevation",
    },
  ],
} as const;

/** Similar projects from homepage (exclude self). */
export function getSimilarProjects(limit = 2): Project[] {
  return ongoingProjects
    .filter((p) => p.id !== SLUG && p.href !== getProjectBasePath(SLUG))
    .slice(0, limit);
}

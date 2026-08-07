import type { Project } from "@/lib/data/homepage";
import { ongoingProjects } from "@/lib/data/homepage";
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

const SLUG = "psr-vanasree";

export const psrVanasreeProject = {
  slug: SLUG,
  basePath: getProjectBasePath(SLUG),
  name: "PSR Vanasree",
  developer: "PSR Builders & Developers",
  type: "Premium High-Rise Residences",
  location: "Kodathi, Off Sarjapur Road · Bengaluru",
  address: "Kodathi, Off Sarjapur Road, Bengaluru (near Wipro SEZ)",
  rera: "RERA Registered",
  status: "Ongoing",
  shortDescription:
    "2 & 3 BHK homes across 6.29 acres with 80% open space, Bengaluru’s largest open frontage, and a 22,000 sq.ft. clubhouse—just minutes from Wipro SEZ off Sarjapur Road.",
  heroImage: getProjectHero(SLUG),
  bannerImage: getProjectBanner(SLUG),
  logo: getProjectLogo(SLUG, "jpg"),
  masterPlan: getProjectMasterPlan(SLUG),
  brochure: getProjectBrochure(SLUG),
  stats: [
    { label: "Acres", value: "6.29" },
    { label: "Homes", value: "560" },
    { label: "Open Space", value: "80%" },
    { label: "Towers", value: "4" },
  ],
  highlights: [
    "560 units across four high-rise towers on 6.29 acres",
    "2 & 3 BHK homes from 1165 to 1570 Sq.ft with no common walls",
    "80% open space and 3.5-acre open frontage",
    "Over 1 acre dedicated to a picturesque water feature",
    "22,000 sq.ft. G+2 clubhouse with 30+ lifestyle amenities",
    "1 min from Wipro SEZ · 2 mins to upcoming Kodathi Metro",
  ],
  overview: [
    "PSR Vanasree is a thoughtfully designed residential community where space, privacy, and nature come together. Spread across 6.29 acres off Sarjapur Road, the project offers 560 BDA-approved 2 & 3 BHK apartments designed with no common walls—delivering maximum privacy and generous living areas ranging from 1165 to 1570 Sq.ft.",
    "Nature takes center stage with over an acre dedicated to a serene water feature, 80% open space, and Bengaluru’s largest open frontage. A grand green driveway leads to a 22,000 sq.ft. clubhouse packed with premium amenities. Strategically located just 1 minute from Wipro SEZ and minutes from the upcoming Kodathi Metro, PSR Vanasree blends modern convenience with tranquil living.",
  ],
  overviewTitle: "A home that opens to more space and more life",
  masterPlanDescription:
    "A carefully planned high-rise layout balancing towers, landscaped open spaces, water features, and amenity zones for everyday living.",
  amenitiesTitle: "30+ lifestyle amenities",
  amenitiesDescription:
    "From a grand clubhouse and pool to yoga lawns, sports courts, and secure living—every amenity is curated for modern families.",
  layoutsEyebrow: "Floor Plans",
  layoutsTitle: "Tower-wise unit layouts",
  layoutsDescription:
    "Explore typical floor plans across towers at PSR Vanasree. Click any plan for a larger preview. Confirm final unit inventory with our team.",
  unitConfigDescription:
    "Spacious 2 & 3 BHK configurations designed for light, ventilation, and no common walls.",
  facingDescription:
    "Vastu-compliant homes with facing options varying by tower and inventory—our team will match units to your preference.",
  galleryDescription:
    "High-quality visuals from the PSR Vanasree project brochure and marketing gallery.",
  brochureTitle: "Download the PSR Vanasree brochure",
  enquiryTitle: "Interested in PSR Vanasree?",
  enquiryDescription:
    "Share your details and our team will connect with inventory options, pricing guidance, and site visit scheduling.",
  configurations: ["2 BHK", "3 BHK"],
  features: [
    "No common walls for maximum privacy",
    "BDA-approved homes with Vastu-compliant layouts",
    "RCC framework with premium fittings & UPVC windows",
    "100% power backup for common areas & lifts",
  ],
  unitSizes: ["1165 Sq.ft", "1280 Sq.ft", "1450 Sq.ft", "1570 Sq.ft"],
  facings: ["East Facing", "West Facing", "North Facing", "South Facing"],
  amenities: [
    "22,000 sq.ft. Clubhouse",
    "Swimming Pool",
    "Fitness Center / Gym",
    "Garden Gym",
    "Yoga Centre",
    "Yoga & Meditation Lawn",
    "Multipurpose Hall",
    "Indoor Games",
    "Jogging Track",
    "Cycling Track",
    "Children's Play Area",
    "Sand Pit",
    "Half Basketball Court",
    "Cricket Net",
    "Theme Garden",
    "Multi Purpose Lawn",
    "Elder's Park",
    "Landscaped Gardens",
    "Water Feature",
    "Visitors Parking",
    "Rain Water Harvesting",
    "Power Backup",
    "Round the Clock Security",
    "CCTV Surveillance",
  ],
  amenityGallery: [
    {
      name: "Clubhouse Lifestyle",
      image: getProjectGalleryImage(SLUG, "gallery-5"),
    },
    {
      name: "Garden Gym",
      image: getProjectGalleryImage(SLUG, "gallery-10"),
    },
    {
      name: "Yoga & Meditation Lawn",
      image: getProjectGalleryImage(SLUG, "gallery-12"),
    },
    {
      name: "Half Basketball Court",
      image: getProjectGalleryImage(SLUG, "gallery-16"),
    },
    {
      name: "Elder's Park",
      image: getProjectGalleryImage(SLUG, "gallery-13"),
    },
    {
      name: "Multi Purpose Lawn",
      image: getProjectGalleryImage(SLUG, "gallery-6"),
    },
    {
      name: "Open Spaces",
      image: getProjectGalleryImage(SLUG, "gallery-3"),
    },
    {
      name: "Community Living",
      image: getProjectGalleryImage(SLUG, "gallery-1"),
    },
  ],
  layoutGroups: [
    {
      title: "Tower 1",
      plans: [
        {
          id: "tower-1",
          label: "Tower 1",
          image: getProjectFloorPlan(SLUG, "tower-1"),
          size: "2 & 3 BHK",
          config: "Typical floor plan",
        },
      ],
    },
    {
      title: "Tower 2",
      plans: [
        {
          id: "tower-2",
          label: "Tower 2",
          image: getProjectFloorPlan(SLUG, "tower-2"),
          size: "2 & 3 BHK",
          config: "Typical floor plan",
        },
      ],
    },
    {
      title: "Tower 3",
      plans: [
        {
          id: "tower-3",
          label: "Tower 3",
          image: getProjectFloorPlan(SLUG, "tower-3"),
          size: "2 & 3 BHK",
          config: "Typical floor plan",
        },
      ],
    },
  ],
  gallery: [
    {
      src: getProjectGalleryImage(SLUG, "gallery-1"),
      alt: "PSR Vanasree community view",
    },
    {
      src: getProjectGalleryImage(SLUG, "gallery-2"),
      alt: "Spacious apartment interiors concept",
    },
    {
      src: getProjectGalleryImage(SLUG, "gallery-3"),
      alt: "Open spaces at PSR Vanasree",
    },
    {
      src: getProjectGalleryImage(SLUG, "gallery-5"),
      alt: "Clubhouse and lifestyle amenities",
    },
    {
      src: getProjectGalleryImage(SLUG, "gallery-7"),
      alt: "Project elevation and landscaping",
    },
    {
      src: getProjectGalleryImage(SLUG, "gallery-11"),
      alt: "Amenity zone at PSR Vanasree",
    },
    {
      src: getProjectGalleryImage(SLUG, "gallery-6"),
      alt: "Multi-purpose lawn",
    },
    {
      src: getProjectGalleryImage(SLUG, "gallery-10"),
      alt: "Garden gym area",
    },
    {
      src: getProjectGalleryImage(SLUG, "location-map"),
      alt: "PSR Vanasree location map",
    },
  ],
} as const;

/** Similar projects from homepage (exclude self). */
export function getSimilarProjects(limit = 2): Project[] {
  return ongoingProjects
    .filter((p) => p.id !== SLUG && p.href !== getProjectBasePath(SLUG))
    .slice(0, limit);
}

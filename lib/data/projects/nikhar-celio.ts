import type { Project } from "@/lib/data/homepage";
import { ongoingProjects } from "@/lib/data/homepage";
import { buildAmenityGallery } from "@/lib/data/amenity-images";
import {
  getProjectAmenityImage,
  getProjectAsset,
  getProjectBanner,
  getProjectBasePath,
  getProjectBrochure,
  getProjectFloorPlan,
  getProjectGalleryImage,
  getProjectHero,
  getProjectLogo,
  getProjectMasterPlan,
} from "@/lib/utils/project-assets";

const SLUG = "nikhar-celio";

export const nikharCelioProject = {
  slug: SLUG,
  basePath: getProjectBasePath(SLUG),
  name: "Nikhar Celio",
  developer: "Nikhar Estates LLP",
  type: "Premium High-Rise Residences",
  location: "Gunjur, Near Varthur · Bengaluru",
  address:
    "Sy. No 67, Gunjur–Doddakannelli Road, Kachamaranahalli, Bengaluru 560087",
  rera: "PRM/KA/RERA/1251/446/PR/280426/008605",
  status: "Ongoing",
  shortDescription:
    "A premier high-rise residential community with 333 exclusive homes across two elegant towers—crafted for privacy, space, and elevated living in Gunjur’s high-growth corridor.",
  heroImage: getProjectHero(SLUG),
  bannerImage: getProjectBanner(SLUG),
  logo: getProjectLogo(SLUG),
  masterPlan: getProjectMasterPlan(SLUG),
  brochure: getProjectBrochure(SLUG),
  towerA: getProjectAsset(SLUG, "tower-a.jpg"),
  towerB: getProjectAsset(SLUG, "tower-b.jpg"),
  highlights: [
    "333 exclusive residences across Tower A & Tower B",
    "Tower A: 2 Basements + Ground + 27 floors",
    "Tower B: 2 Basements + Ground + 22 floors",
    "Over 82% open space with landscaped living",
    "Mivan construction technology",
    "Vastu-aligned layouts for harmonious living",
  ],
  overview: [
    "Nikhar Celio is a premier high-rise residential community meticulously crafted for the discerning homeowner. Designed for exclusivity, the development features just 333 residences across two elegant towers, engineered with precision Mivan construction technology and finished with high-end specifications.",
    "Boasting over 82% open space, Nikhar Celio cultivates an unparalleled environment of peace and convenience. Strategically situated in the high-growth corridor of Gunjur–Varthur, the property offers seamless connectivity to major tech hubs—including Sarjapur, Marathahalli, and Whitefield—alongside effortless access to top-tier educational institutions, premium retail destinations, and world-class healthcare facilities.",
  ],
  configurations: ["2 BHK + Study", "3 BHK (2T)", "3 BHK (3T)"],
  features: [
    "Privacy-first design for maximum privacy & superior cross-ventilation",
    "Impressive 8-foot main door with digital lock",
    "World-class specifications with Mivan construction",
    "Spacious double-height lobbies and landscaped courtyards",
  ],
  unitSizes: [
    "1235 Sq.ft",
    "1430 Sq.ft",
    "1440 Sq.ft",
    "1770 Sq.ft",
    "1780 Sq.ft",
    "1785 Sq.ft",
    "1790 Sq.ft",
  ],
  facings: ["North Facing", "East Facing", "West Facing"],
  amenities: [
    "Swimming Pool",
    "Kids Pool",
    "Clubhouse",
    "Tennis Court",
    "Jogging Track",
    "Outdoor Gym",
    "Temple",
    "Children's Play Area",
    "Pet Park",
    "Business Lounge",
    "Meditation Area",
    "Yoga Area",
    "Flower Garden",
    "Visitors Parking",
    "Water Body",
    "Landscaped Gardens",
    "Senior Citizen Park",
    "Volleyball Court",
    "Skating Rink",
    "Seating Area",
    "Net Cricket Pitch",
    "Basketball Court",
    "Water Body Waiting Lounge",
  ],
  amenityGallery: buildAmenityGallery(
    [
      "Swimming Pool",
      "Kids Pool",
      "Clubhouse",
      "Tennis Court",
      "Jogging Track",
      "Outdoor Gym",
      "Temple",
      "Children's Play Area",
      "Pet Park",
      "Business Lounge",
      "Meditation Area",
      "Yoga Area",
      "Flower Garden",
      "Visitors Parking",
      "Water Body",
      "Landscaped Gardens",
      "Senior Citizen Park",
      "Volleyball Court",
      "Skating Rink",
      "Seating Area",
      "Net Cricket Pitch",
      "Basketball Court",
      "Water Body Waiting Lounge",
    ],
    {
      // Official project amenity assets (override catalog placeholders)
      "Swimming Pool": getProjectAmenityImage(SLUG, "swimming-pool"),
      Clubhouse: getProjectAmenityImage(SLUG, "club-house"),
      "Outdoor Gym": getProjectAmenityImage(SLUG, "outdoor-gym"),
      "Tennis Court": getProjectAmenityImage(SLUG, "tennis"),
      "Children's Play Area": getProjectGalleryImage(SLUG, "children-play"),
      "Kids Pool": getProjectGalleryImage(SLUG, "pool"),
    },
  ),
  floorPlans: {
    towerA: [
      {
        id: "A301",
        label: "A301",
        image: getProjectFloorPlan(SLUG, "A301"),
        size: "1440 Sq.ft",
        config: "3 BHK",
      },
      {
        id: "A305",
        label: "A305",
        image: getProjectFloorPlan(SLUG, "A305"),
        size: "—",
        config: "3 BHK",
      },
      {
        id: "A306",
        label: "A306",
        image: getProjectFloorPlan(SLUG, "A306"),
        size: "—",
        config: "3 BHK",
      },
      {
        id: "A307",
        label: "A307",
        image: getProjectFloorPlan(SLUG, "A307"),
        size: "—",
        config: "3 BHK",
      },
      {
        id: "A308",
        label: "A308",
        image: getProjectFloorPlan(SLUG, "A308"),
        size: "1440 Sq.ft",
        config: "3 BHK",
      },
    ],
    towerB: [
      {
        id: "B301",
        label: "B301",
        image: getProjectFloorPlan(SLUG, "B301"),
        size: "—",
        config: "3 BHK",
      },
      {
        id: "B302",
        label: "B302",
        image: getProjectFloorPlan(SLUG, "B302"),
        size: "1790 Sq.ft",
        config: "3 BHK",
      },
      {
        id: "B303",
        label: "B303",
        image: getProjectFloorPlan(SLUG, "B303"),
        size: "1770 Sq.ft",
        config: "3 BHK",
      },
      {
        id: "B304",
        label: "B304",
        image: getProjectFloorPlan(SLUG, "B304"),
        size: "1770 Sq.ft",
        config: "3 BHK",
      },
      {
        id: "B305",
        label: "B305",
        image: getProjectFloorPlan(SLUG, "B305"),
        size: "—",
        config: "3 BHK",
      },
    ],
  },
  gallery: [
    {
      src: getProjectGalleryImage(SLUG, "pool"),
      alt: "Swimming pool at Nikhar Celio",
    },
    {
      src: getProjectBanner(SLUG),
      alt: "Nikhar Celio front elevation",
    },
    {
      src: getProjectGalleryImage(SLUG, "children-play"),
      alt: "Children's play area",
    },
    {
      src: getProjectGalleryImage(SLUG, "lobby"),
      alt: "Entrance lobby",
    },
    {
      src: getProjectGalleryImage(SLUG, "clubhouse"),
      alt: "Clubhouse",
    },
    {
      src: getProjectGalleryImage(SLUG, "pool-view"),
      alt: "Pool deck view",
    },
    {
      src: getProjectGalleryImage(SLUG, "status-1"),
      alt: "Project progress view",
    },
    {
      src: getProjectGalleryImage(SLUG, "status-2"),
      alt: "Construction progress",
    },
    {
      src: getProjectGalleryImage(SLUG, "status-3"),
      alt: "Site development",
    },
  ],
} as const;

/** Similar projects from homepage (exclude self). */
export function getSimilarProjects(limit = 2): Project[] {
  return ongoingProjects
    .filter((p) => p.href !== `/projects/${SLUG}` && p.id !== "nikhar-celio")
    .slice(0, limit);
}

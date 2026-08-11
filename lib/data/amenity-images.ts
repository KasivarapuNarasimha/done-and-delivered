/**
 * Shared amenity image catalog for project amenities galleries.
 *
 * Resolution order for each amenity name:
 * 1. Project-specific override (official asset path/URL)
 * 2. Catalog match by normalized amenity name
 * 3. Generic lifestyle fallback
 *
 * Official assets live under public/projects/{slug}/amenities/ and can
 * override catalog placeholders at any time via `buildAmenityGallery`.
 */

export type AmenityGalleryItem = {
  name: string;
  image: string;
};

/** High-quality royalty-free placeholders (Unsplash). */
const U = (id: string, w = 1400) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=75`;

/**
 * Canonical amenity keys → representative images.
 * Keys are lowercase, punctuation-stripped for fuzzy matching.
 */
export const AMENITY_IMAGE_CATALOG: Record<string, string> = {
  // Entrances & access
  "grand entrance": U("photo-1560518883-ce09059eeffa"),
  entrance: U("photo-1560518883-ce09059eeffa"),
  lobby: U("photo-1600607687939-ce8a6c25118c"),

  // Clubhouse / halls
  clubhouse: U("photo-1600585154340-be6161a56a0c"),
  "club house": U("photo-1600585154340-be6161a56a0c"),
  "multipurpose hall": U("photo-1519167758481-83f29da8c4b0"),
  "multi purpose hall": U("photo-1519167758481-83f29da8c4b0"),
  "multi-purpose hall": U("photo-1519167758481-83f29da8c4b0"),
  hall: U("photo-1519167758481-83f29da8c4b0"),
  "business lounge": U("photo-1497366216548-37526070297c"),

  // Pools & water
  "swimming pool": U("photo-1576013551627-0cc20b96c2a7"),
  pool: U("photo-1576013551627-0cc20b96c2a7"),
  "kids pool": U("photo-1571902943202-507ec2618e8f"),
  "water body": U("photo-1439066615861-d1af74d74000"),
  "water feature": U("photo-1439066615861-d1af74d74000"),
  "water body waiting lounge": U("photo-1507652313519-d4e9174996dd"),

  // Fitness
  gymnasium: U("photo-1534438327276-14e5300c3a48"),
  gym: U("photo-1534438327276-14e5300c3a48"),
  "fitness center": U("photo-1534438327276-14e5300c3a48"),
  "fitness centre": U("photo-1534438327276-14e5300c3a48"),
  "outdoor gym": U("photo-1517836357463-d25dfeac3438"),
  "garden gym": U("photo-1571902943202-507ec2618e8f"),

  // Tracks & outdoor movement
  "jogging track": U("photo-1476480862126-209bfaa8edc8"),
  jogging: U("photo-1476480862126-209bfaa8edc8"),
  "cycling track": U("photo-1541625602330-2277a4c46182"),
  cycling: U("photo-1541625602330-2277a4c46182"),

  // Sports courts
  "tennis court": U("photo-1554068865-24cecd4e34b8"),
  tennis: U("photo-1554068865-24cecd4e34b8"),
  "basketball court": U("photo-1546519638-68e109498ffc"),
  basketball: U("photo-1546519638-68e109498ffc"),
  "half basketball court": U("photo-1546519638-68e109498ffc"),
  "volleyball court": U("photo-1612872087720-bb876e2e67d1"),
  volleyball: U("photo-1612872087720-bb876e2e67d1"),
  "skating rink": U("photo-1551698618-1dfe5d97d256"),
  skating: U("photo-1551698618-1dfe5d97d256"),
  "net cricket pitch": U("photo-1531415074968-036ba1b575da"),
  "cricket net": U("photo-1531415074968-036ba1b575da"),
  cricket: U("photo-1531415074968-036ba1b575da"),
  "table tennis": U("photo-1609710228159-0fa9bd7c0827"),
  "indoor games": U("photo-1511512578047-dfb367046420"),
  "outdoor games": U("photo-1461896836934-ffe607ba6851"),

  // Kids & family
  "children s play area": U("photo-1503454537195-1dcabb73ffb9"),
  "childrens play area": U("photo-1503454537195-1dcabb73ffb9"),
  "kids play area": U("photo-1503454537195-1dcabb73ffb9"),
  "play area": U("photo-1503454537195-1dcabb73ffb9"),
  "sand pit": U("photo-1566454419290-57a0589c9c51"),
  "pet park": U("photo-1548199973-03cce0bbc87b"),

  // Wellness & gardens
  "yoga centre": U("photo-1544367567-0f2fcb009e0b"),
  "yoga center": U("photo-1544367567-0f2fcb009e0b"),
  "yoga area": U("photo-1544367567-0f2fcb009e0b"),
  "yoga deck": U("photo-1506126613408-eca07ce68773"),
  "yoga meditation lawn": U("photo-1506126613408-eca07ce68773"),
  "meditation area": U("photo-1506126613408-eca07ce68773"),
  "landscaped gardens": U("photo-1585320806297-9794b3e4eeae"),
  garden: U("photo-1585320806297-9794b3e4eeae"),
  "theme garden": U("photo-1416879595882-3373a0480b5b"),
  "flower garden": U("photo-1490750967868-88aa4486c946"),
  "lawn walkway": U("photo-1558904541-efa843a96f01"),
  lawn: U("photo-1558904541-efa843a96f01"),
  "multi purpose lawn": U("photo-1558904541-efa843a96f01"),
  "senior citizen park": U("photo-1441974231531-c6227db76b6e"),
  "senior citizen sit out": U("photo-1441974231531-c6227db76b6e"),
  "elder s park": U("photo-1441974231531-c6227db76b6e"),
  "elders park": U("photo-1441974231531-c6227db76b6e"),
  "seating area": U("photo-1505843513577-22bb37d4d88a"),
  // Community feature label "Temple" — use a secular landscaped courtyard
  // (never religious architecture / temple buildings in amenity galleries)
  temple: U("photo-1600566753190-17f0baa2a6c3"),

  // Parking & security
  "visitor parking": U("photo-1506521781263-d8422e82f27a"),
  "visitors parking": U("photo-1506521781263-d8422e82f27a"),
  parking: U("photo-1506521781263-d8422e82f27a"),
  "24x7 security": U("photo-1557597774-9d273605dfa9"),
  "24 7 security": U("photo-1557597774-9d273605dfa9"),
  security: U("photo-1557597774-9d273605dfa9"),
  "round the clock security": U("photo-1557597774-9d273605dfa9"),
  "cctv surveillance": U("photo-1557597774-9d273605dfa9"),
  cctv: U("photo-1557597774-9d273605dfa9"),

  // Infrastructure
  "rain water harvesting": U("photo-1426604966848-d7adac402bff"),
  "rainwater harvesting": U("photo-1426604966848-d7adac402bff"),
  "sewage treatment plant": U("photo-1581092160562-40aa08e78837"),
  stp: U("photo-1581092160562-40aa08e78837"),
  "underground drainage": U("photo-1504328345606-18bbc8c9d7d1"),
  drainage: U("photo-1504328345606-18bbc8c9d7d1"),
  "underground cabling": U("photo-1473341304170-971dccb5ac1e"),
  cabling: U("photo-1473341304170-971dccb5ac1e"),
  "power backup": U("photo-1473341304170-971dccb5ac1e"),
};

const GENERIC_FALLBACK = U("photo-1600596542815-ffad4c1539a9");

/** Normalize amenity labels for catalog lookup. */
export function normalizeAmenityKey(name: string): string {
  return name
    .toLowerCase()
    .replace(/22,?000\s*sq\.?\s*ft\.?/gi, "")
    .replace(/[×x]/g, "x")
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9\s&/]/g, " ")
    .replace(/&/g, " ")
    .replace(/\//g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Unsplash photo IDs that must never appear in amenity galleries. */
const BLOCKED_IMAGE_IDS = new Set([
  // Religious buildings / temple exteriors (legacy catalog entry)
  "photo-1582510003544-4d00b7f74220",
]);

function isBlockedImage(url: string): boolean {
  return [...BLOCKED_IMAGE_IDS].some((id) => url.includes(id));
}

/**
 * Resolve image for an amenity name.
 * @param overrides map of exact amenity display name → image URL/path
 */
export function resolveAmenityImage(
  name: string,
  overrides?: Record<string, string>,
): string {
  if (overrides?.[name] && !isBlockedImage(overrides[name])) {
    return overrides[name];
  }

  const key = normalizeAmenityKey(name);
  if (AMENITY_IMAGE_CATALOG[key] && !isBlockedImage(AMENITY_IMAGE_CATALOG[key])) {
    return AMENITY_IMAGE_CATALOG[key];
  }

  // Partial / includes match (longest key first for specificity)
  const keys = Object.keys(AMENITY_IMAGE_CATALOG).sort(
    (a, b) => b.length - a.length,
  );
  for (const catalogKey of keys) {
    if (key.includes(catalogKey) || catalogKey.includes(key)) {
      const url = AMENITY_IMAGE_CATALOG[catalogKey];
      if (!isBlockedImage(url)) return url;
    }
  }

  // Token overlap (e.g. "Fitness Center / Gym" → gym)
  // Skip ultra-short / generic tokens that cause false matches.
  const tokens = key
    .split(" ")
    .filter((t) => t.length > 3 && !["area", "park", "open", "body"].includes(t));
  for (const catalogKey of keys) {
    if (tokens.some((t) => catalogKey.includes(t) || t.includes(catalogKey))) {
      const url = AMENITY_IMAGE_CATALOG[catalogKey];
      if (!isBlockedImage(url)) return url;
    }
  }

  return GENERIC_FALLBACK;
}

/**
 * Build a full amenity gallery from the project amenities list.
 * Every amenity gets its own representative image.
 *
 * @example
 * buildAmenityGallery(amenities, {
 *   "Swimming Pool": getProjectAmenityImage(slug, "swimming-pool"),
 * })
 */
export function buildAmenityGallery(
  amenities: readonly string[],
  overrides?: Record<string, string>,
): AmenityGalleryItem[] {
  return amenities.map((name) => ({
    name,
    image: resolveAmenityImage(name, overrides),
  }));
}

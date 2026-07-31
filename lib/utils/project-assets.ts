/**
 * Scalable project asset loader.
 *
 * Convention (public URL paths served from public/projects/{slug}/):
 *   /projects/{slug}/brochure.pdf
 *   /projects/{slug}/hero.jpg
 *   /projects/{slug}/banner.jpg
 *   /projects/{slug}/logo.png
 *   /projects/{slug}/master-plan.jpg
 *   /projects/{slug}/tower-a.jpg
 *   /projects/{slug}/floor-plans/{unitId}.jpg
 *   /projects/{slug}/gallery/{name}.jpg
 *   /projects/{slug}/amenities/{name}.png
 *
 * Future projects: drop assets under public/projects/{slug}/ and resolve via slug.
 */

export function getProjectBasePath(slug: string): string {
  return `/projects/${slug}`;
}

/** Join slug with path segments: getProjectAsset('nikhar-celio', 'brochure.pdf') */
export function getProjectAsset(slug: string, ...segments: string[]): string {
  const cleaned = segments
    .filter(Boolean)
    .map((s) => s.replace(/^\/+|\/+$/g, ""))
    .join("/");
  return `${getProjectBasePath(slug)}/${cleaned}`;
}

export function getProjectBrochure(slug: string): string {
  return getProjectAsset(slug, "brochure.pdf");
}

export function getProjectHero(
  slug: string,
  ext: "jpg" | "webp" | "png" = "jpg",
): string {
  return getProjectAsset(slug, `hero.${ext}`);
}

export function getProjectBanner(
  slug: string,
  ext: "jpg" | "webp" | "png" = "jpg",
): string {
  return getProjectAsset(slug, `banner.${ext}`);
}

export function getProjectLogo(
  slug: string,
  ext: "png" | "webp" | "jpg" = "png",
): string {
  return getProjectAsset(slug, `logo.${ext}`);
}

export function getProjectMasterPlan(
  slug: string,
  ext: "jpg" | "webp" | "png" = "jpg",
): string {
  return getProjectAsset(slug, `master-plan.${ext}`);
}

export function getProjectFloorPlan(
  slug: string,
  unitId: string,
  ext: "jpg" | "webp" | "png" = "jpg",
): string {
  return getProjectAsset(slug, "floor-plans", `${unitId}.${ext}`);
}

export function getProjectGalleryImage(
  slug: string,
  name: string,
  ext: "jpg" | "webp" | "png" = "jpg",
): string {
  return getProjectAsset(slug, "gallery", `${name}.${ext}`);
}

export function getProjectAmenityImage(
  slug: string,
  name: string,
  ext: "png" | "jpg" | "webp" = "png",
): string {
  return getProjectAsset(slug, "amenities", `${name}.${ext}`);
}

/** Flat gallery convention: gallery-1.webp, gallery-2.webp, ... */
export function getProjectGalleryItem(
  slug: string,
  index: number,
  ext: "webp" | "jpg" | "png" = "webp",
): string {
  return getProjectAsset(slug, `gallery-${index}.${ext}`);
}

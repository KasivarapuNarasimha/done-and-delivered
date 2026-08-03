import { NAV_LINKS } from "@/lib/constants";
import {
  completedProjects,
  ongoingProjects,
  type Project,
} from "@/lib/data/homepage";

export type SearchCategory = "Projects" | "Pages";

export type SearchResult = {
  id: string;
  title: string;
  description: string;
  href: string;
  category: SearchCategory;
  /** Extra terms used for matching (not shown in UI). */
  keywords: string[];
};

function projectToResult(project: Project): SearchResult {
  return {
    id: `project-${project.id}`,
    title: project.name,
    description: [project.type, project.location, project.status]
      .filter(Boolean)
      .join(" · "),
    href: project.href ?? `/#${project.id}`,
    category: "Projects",
    keywords: [
      project.name,
      project.id,
      project.type,
      project.developer,
      project.location,
      project.status,
      project.description,
      "project",
      "projects",
    ],
  };
}

/**
 * Site pages derived from primary navigation so future NAV_LINKS
 * entries become searchable automatically.
 */
function pagesFromNav(): SearchResult[] {
  return NAV_LINKS.map((link) => ({
    id: `page-${link.label.toLowerCase().replace(/\s+/g, "-")}`,
    title: link.label,
    description:
      link.label === "Home"
        ? "Done & Delivered homepage"
        : link.label === "Projects"
          ? "Browse ongoing and completed projects"
          : link.label === "Services"
            ? "Branding, media, leads & sales systems"
            : link.label === "About"
              ? "About Done & Delivered"
              : link.label === "Contact"
                ? "Contact and consultation"
                : `${link.label} section`,
    href: link.href,
    category: "Pages" as const,
    keywords: [link.label, link.href, "page", "pages"],
  }));
}

/**
 * Reusable search index built from live project + navigation data.
 * Adding a project to `ongoingProjects` / `completedProjects` or a link
 * to `NAV_LINKS` automatically includes it in search.
 */
export function getSearchIndex(): SearchResult[] {
  const projects = [...ongoingProjects, ...completedProjects].map(
    projectToResult,
  );
  const pages = pagesFromNav();

  // Pages first for stable grouping, then projects (dedupe by href+title).
  const seen = new Set<string>();
  const index: SearchResult[] = [];

  for (const item of [...pages, ...projects]) {
    const key = `${item.category}:${item.href}:${item.title.toLowerCase()}`;
    if (seen.has(key)) continue;
    seen.add(key);
    index.push(item);
  }

  return index;
}

export function searchSite(query: string, index = getSearchIndex()): SearchResult[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const tokens = q.split(/\s+/).filter(Boolean);

  return index
    .map((item) => {
      const haystack = [
        item.title,
        item.description,
        item.href,
        item.category,
        ...item.keywords,
      ]
        .join(" ")
        .toLowerCase();

      const allMatch = tokens.every((t) => haystack.includes(t));
      if (!allMatch) return null;

      // Rank: title starts with query > title includes > description/keywords
      const title = item.title.toLowerCase();
      let score = 0;
      if (title === q) score += 100;
      else if (title.startsWith(q)) score += 80;
      else if (title.includes(q)) score += 60;
      else if (item.description.toLowerCase().includes(q)) score += 30;
      else score += 10;

      if (item.category === "Projects") score += 2;

      return { item, score };
    })
    .filter((x): x is { item: SearchResult; score: number } => x !== null)
    .sort((a, b) => b.score - a.score || a.item.title.localeCompare(b.item.title))
    .map(({ item }) => item);
}

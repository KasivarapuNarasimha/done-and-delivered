export type CoreValue = {
  id: string;
  title: string;
  description: string;
};

export type PhilosophyPoint = {
  id: string;
  title: string;
  description: string;
};

/** Brand-aligned core values for the standalone About page */
export const coreValues: CoreValue[] = [
  {
    id: "v1",
    title: "Exclusive real-estate focus",
    description:
      "We market premium projects only—strategies shaped for builders, developers, and high-intent homebuyers.",
  },
  {
    id: "v2",
    title: "Premium positioning",
    description:
      "Every message, creative system, and media plan elevates inventory to match the quality of the project.",
  },
  {
    id: "v3",
    title: "Data-driven discipline",
    description:
      "Campaigns are optimized continuously so spend converts into visits, pipeline, and closers—not vanity metrics.",
  },
  {
    id: "v4",
    title: "End-to-end ownership",
    description:
      "From strategy and creative to nurture and sales enablement, we stay accountable through the full launch cycle.",
  },
  {
    id: "v5",
    title: "Builder partnership trust",
    description:
      "Transparent reporting, compliance-aware messaging, and execution that protects brand reputation in market.",
  },
  {
    id: "v6",
    title: "Excellence in delivery",
    description:
      "From the first idea to the final lead, every engagement is designed to be Done & Delivered with excellence.",
  },
];

export const marketingPhilosophy: PhilosophyPoint[] = [
  {
    id: "p1",
    title: "Reach the right buyers",
    description:
      "Premium projects deserve premium audiences. We prioritize intent, corridor fit, and buyer quality over raw volume.",
  },
  {
    id: "p2",
    title: "Story before scale",
    description:
      "Positioning and creative identity come first—so performance media amplifies a brand that already stands out.",
  },
  {
    id: "p3",
    title: "Full-funnel accountability",
    description:
      "Awareness, acquisition, nurture, and sales enablement operate as one system aligned to booking outcomes.",
  },
  {
    id: "p4",
    title: "Measured launch systems",
    description:
      "Pre-launch through sustenance roadmaps keep spend disciplined, creative fresh, and residual inventory moving.",
  },
];

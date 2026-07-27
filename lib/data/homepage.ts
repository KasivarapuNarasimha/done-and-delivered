export type Project = {
  id: string;
  name: string;
  type: string;
  status: "Ongoing" | "Completed";
  developer: string;
  location: string;
  description: string;
  image: string;
  initials: string;
};

export type Developer = {
  id: string;
  name: string;
  focus: string;
  initials: string;
  projectCount: string;
};

export type ServiceItem = {
  id: string;
  title: string;
  description: string;
  icon:
    | "branding"
    | "digital"
    | "leads"
    | "social"
    | "performance"
    | "creative"
    | "sales"
    | "funnel";
};

export type StatItem = {
  id: string;
  value: number;
  suffix: string;
  label: string;
};

export type TestimonialItem = {
  id: string;
  quote: string;
  role: string;
  context: string;
};

export type AboutContent = {
  story: string;
  mission: string;
  vision: string;
  whoWeAre: string;
};

export type WhyChooseItem = {
  id: string;
  title: string;
  description: string;
  icon:
    | "shield"
    | "badge"
    | "handshake"
    | "chart"
    | "users"
    | "sparkles"
    | "megaphone"
    | "target";
};

export type ProcessStep = {
  id: string;
  title: string;
  summary: string;
  items: string[];
};

export type FunnelStep = {
  id: string;
  value: string;
  label: string;
};

export type TimelinePhase = {
  id: string;
  title: string;
  weeks: string;
  points: string[];
};

/**
 * Official project portfolio from the Done & Delivered Brand Deck.
 *
 * TODO(assets): No official project photography exists under /public yet
 * (only hero-bg.jpg + logo). Replace each `image` URL with local assets such as
 * `/images/projects/nikhar-celio.jpg` when marketing delivers final files.
 * Keep layout/card components unchanged when swapping paths.
 */
export const ongoingProjects: Project[] = [
  {
    id: "nikhar-celio",
    name: "Nikhar Celio",
    type: "Residential Apartment",
    status: "Ongoing",
    developer: "Nikhar",
    location: "Bengaluru",
    description:
      "Premium residential apartments positioned with luxury storytelling and high-intent buyer acquisition.",
    // TODO: replace Unsplash placeholder with official Nikhar Celio asset
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=900&q=70",
    initials: "NC",
  },
  {
    id: "astro-boulevards",
    name: "Astro Boulevards",
    type: "Plots",
    status: "Ongoing",
    developer: "Astro City",
    location: "Off Sarjapura Road, Bengaluru",
    description:
      "Plot inventory marketed with corridor-focused demand generation and conversion-led campaign systems.",
    // TODO: replace Unsplash placeholder with official Astro Boulevards asset
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=900&q=70",
    initials: "AB",
  },
  {
    id: "psr-vanasree",
    name: "PSR Vanasree",
    type: "Residential Apartment",
    status: "Ongoing",
    developer: "PSR",
    location: "Bengaluru",
    description:
      "Residential launch supported through premium branding, performance media, and sales-enablement workflows.",
    // TODO: replace Unsplash placeholder with official PSR Vanasree asset
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=900&q=70",
    initials: "PV",
  },
];

/** Official completed projects from Done & Delivered Brand Deck */
export const completedProjects: Project[] = [
  {
    id: "sunshine-signature",
    name: "Sunshine Signature",
    type: "Residential",
    status: "Completed",
    developer: "Sunshine Signature",
    location: "Bengaluru",
    description:
      "Completed residential mandate delivered with full-funnel marketing and sales support.",
    // TODO: replace Unsplash placeholder with official Sunshine Signature asset
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=900&q=70",
    initials: "SS",
  },
  {
    id: "bhavishya-homes",
    name: "Bhavishya Homes",
    type: "Residential",
    status: "Completed",
    developer: "Bhavishya Homes Pvt. Ltd.",
    location: "Bengaluru",
    description:
      "ISO-certified developer partnership with premium positioning and measurable lead outcomes.",
    // TODO: replace Unsplash placeholder with official Bhavishya Homes asset
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=70",
    initials: "BH",
  },
  {
    id: "msr-dew-drops",
    name: "MSR Dew Drops",
    type: "Residential",
    status: "Completed",
    developer: "MSR Group",
    location: "Bengaluru",
    description:
      "Completed residential campaign with performance marketing and conversion optimization.",
    // TODO: replace Unsplash placeholder with official MSR Dew Drops asset
    image:
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=900&q=70",
    initials: "MD",
  },
  {
    id: "skanda-avani-c99",
    name: "Skanda Avani C99",
    type: "Lifestyle Villas",
    status: "Completed",
    developer: "Skanda Avani",
    location: "Bengaluru",
    description:
      "Lifestyle villa project supported with creative branding and high-intent buyer outreach.",
    // TODO: replace Unsplash placeholder with official Skanda Avani C99 asset
    image:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=900&q=70",
    initials: "SA",
  },
];

/** Verified developers / builder brands from official project portfolio */
export const featuredDevelopers: Developer[] = [
  {
    id: "nikhar",
    name: "Nikhar",
    focus: "Residential Apartments",
    initials: "NK",
    projectCount: "Nikhar Celio",
  },
  {
    id: "astro-city",
    name: "Astro City",
    focus: "Plotted Developments",
    initials: "AC",
    projectCount: "Astro Boulevards",
  },
  {
    id: "psr",
    name: "PSR",
    focus: "Residential Apartments",
    initials: "PS",
    projectCount: "PSR Vanasree",
  },
  {
    id: "sunshine",
    name: "Sunshine Signature",
    focus: "Completed Residential",
    initials: "SS",
    projectCount: "1 Completed",
  },
  {
    id: "bhavishya",
    name: "Bhavishya Homes",
    focus: "ISO 9001:2015 Certified",
    initials: "BH",
    projectCount: "1 Completed",
  },
  {
    id: "msr",
    name: "MSR Group",
    focus: "Construction & Delivery",
    initials: "MS",
    projectCount: "MSR Dew Drops",
  },
  {
    id: "skanda",
    name: "Skanda Avani",
    focus: "Lifestyle Villas",
    initials: "SA",
    projectCount: "Avani C99",
  },
];

/** Brand Deck — About / Who We Are */
export const aboutContent: AboutContent = {
  story:
    "Done & Delivered is a specialized real-estate marketing agency dedicated to helping builders, developers, and premium property brands reach the right audience with precision and impact. Built on the belief that great projects deserve great visibility, we combine strategic thinking, high-end creative execution, and data-driven marketing to position properties exactly where they belong—in front of serious, high-intent buyers.",
  mission:
    "To deliver premium reach for premium properties through exclusive marketing systems that turn visibility into qualified demand and measurable sales outcomes.",
  vision:
    "To be the most trusted marketing and sales enablement partner for builders and developers who refuse average campaigns for exceptional projects.",
  whoWeAre:
    "We are a team of real-estate marketing experts, storytellers, strategists, and digital specialists who understand evolving buyer behaviour and modern marketing channels—creating campaigns that elevate project presence and drive real results.",
};

/** Brand Deck — services portfolio */
export const services: ServiceItem[] = [
  {
    id: "s1",
    title: "Project Branding",
    description:
      "Premium project branding and positioning frameworks that establish luxury identity before launch.",
    icon: "branding",
  },
  {
    id: "s2",
    title: "Digital Marketing",
    description:
      "High-impact digital campaigns across search, portals, and content systems built for buyer intent.",
    icon: "digital",
  },
  {
    id: "s3",
    title: "Lead Generation",
    description:
      "Conversion-focused lead systems that fill developer pipelines with genuine homebuyer enquiries.",
    icon: "leads",
  },
  {
    id: "s4",
    title: "Social Media Marketing",
    description:
      "Social activation and community storytelling that builds awareness and sustained project demand.",
    icon: "social",
  },
  {
    id: "s5",
    title: "Performance Marketing",
    description:
      "Data-led media buying, optimization, and reporting that turns spend into measurable outcomes.",
    icon: "performance",
  },
  {
    id: "s6",
    title: "Creative Services",
    description:
      "High-end creative assets and storytelling crafted to elevate premium real-estate launches.",
    icon: "creative",
  },
  {
    id: "s7",
    title: "Sales Enablement",
    description:
      "Sales team tools, CRM-ready follow-ups, and conversion workflows from visit to booking.",
    icon: "sales",
  },
  {
    id: "s8",
    title: "Sales Funnel Optimization",
    description:
      "End-to-end funnel design for real-estate launches—from first impression to closers.",
    icon: "funnel",
  },
];

export const siteStats: StatItem[] = [
  { id: "st1", value: 1450, suffix: "+", label: "Lead Capacity" },
  { id: "st2", value: 7, suffix: "+", label: "Official Projects" },
  { id: "st3", value: 16, suffix: " Wk", label: "Launch Roadmap" },
  { id: "st4", value: 25, suffix: "+", label: "Target Closers" },
];

/**
 * Partnership statements derived from Brand Deck promise language.
 * No invented personal client identities.
 */
export const partnershipTestimonials: TestimonialItem[] = [
  {
    id: "t1",
    quote:
      "With Done & Delivered, the project doesn’t just reach people—it reaches the right people through premium positioning and disciplined targeting.",
    role: "Builder Partnership Standard",
    context: "Brand Deck · Why Builders Choose Us",
  },
  {
    id: "t2",
    quote:
      "From the first idea to the final lead, every campaign is designed to be Done & Delivered with excellence, efficiency, and competitive standout.",
    role: "Our Promise",
    context: "Brand Deck · Partnership Commitment",
  },
  {
    id: "t3",
    quote:
      "Strategic thinking, high-end creative execution, and data-driven marketing position premium inventory exactly where high-intent buyers are.",
    role: "Agency Positioning",
    context: "Brand Deck · About Done & Delivered",
  },
  {
    id: "t4",
    quote:
      "Exclusive real-estate focus with end-to-end delivery—from strategy and media to nurture and sales enablement—keeps launches conversion-led.",
    role: "Full-Funnel Delivery",
    context: "Brand Deck · Offerings & Process",
  },
];

export const whyChooseItems: WhyChooseItem[] = [
  {
    id: "w1",
    title: "Premium Real Estate Marketing",
    description:
      "Exclusive real-estate focus with strategies built only for builders, developers, and premium property brands.",
    icon: "megaphone",
  },
  {
    id: "w2",
    title: "Verified Property Promotions",
    description:
      "Campaigns structured around authentic inventory storytelling, compliance-aware messaging, and buyer trust.",
    icon: "badge",
  },
  {
    id: "w3",
    title: "Performance Marketing",
    description:
      "Advanced targeting and continuous optimization to reach genuine homebuyers—not vanity traffic.",
    icon: "chart",
  },
  {
    id: "w4",
    title: "Lead Generation",
    description:
      "High-intent enquiry systems designed to improve visit rates, pipeline quality, and booking probability.",
    icon: "target",
  },
  {
    id: "w5",
    title: "Sales Enablement",
    description:
      "From creative assets to CRM-ready follow-ups, we equip sales teams to convert faster and closer stronger.",
    icon: "users",
  },
  {
    id: "w6",
    title: "Creative Branding",
    description:
      "High-end creative execution and storytelling that elevates project presence in competitive markets.",
    icon: "sparkles",
  },
  {
    id: "w7",
    title: "End-to-End Project Launch Support",
    description:
      "Strategy to execution—positioning, media, nurture, and sales support delivered as one integrated partner.",
    icon: "handshake",
  },
];

export const marketingProcess: ProcessStep[] = [
  {
    id: "reach",
    title: "Reach",
    summary: "Build awareness among the right premium audience.",
    items: [
      "Market research & consumer journey mapping",
      "Target audience & SWOT analysis",
      "Content strategy & media planning",
      "PPC reach, social activation & influencer marketing",
    ],
  },
  {
    id: "acquisition",
    title: "Acquisition",
    summary: "Convert attention into qualified project enquiries.",
    items: [
      "Paid media & property portals",
      "Website, content strategy & SEO",
      "Remarketing & tech integration",
      "Analytics, visualization & reporting",
    ],
  },
  {
    id: "nurture",
    title: "Nurture",
    summary: "Stay present until high-intent buyers are ready.",
    items: [
      "SMS & email marketing sequences",
      "WhatsApp nurturing workflows",
      "Online site visits",
      "Digital asset enablement",
    ],
  },
  {
    id: "sales",
    title: "Sales",
    summary: "Drive pipeline velocity and booking outcomes.",
    items: [
      "Referral programs",
      "Loyalty programs",
      "Sales team enablement",
      "Conversion-focused follow-through",
    ],
  },
];

/** Homepage sales funnel highlight (brand sales funnel system) */
export const salesFunnel: FunnelStep[] = [
  { id: "f1", value: "1450", label: "Leads" },
  { id: "f2", value: "150", label: "Site Visits" },
  { id: "f3", value: "60", label: "Re-visits" },
  { id: "f4", value: "45", label: "Qualified Pipeline" },
  { id: "f5", value: "35", label: "Price Discussion" },
  { id: "f6", value: "25", label: "Closers" },
];

export const marketingTimeline: TimelinePhase[] = [
  {
    id: "pre-launch",
    title: "Pre Launch",
    weeks: "Week 1–2",
    points: [
      "CP activations and exclusive tech solutions",
      "Awareness building among primary audiences",
      "Vicinity pindrop targeting on Google & Meta",
      "Performance campaigns for early lead generation",
    ],
  },
  {
    id: "performance",
    title: "Performance",
    weeks: "Week 3–10",
    points: [
      "Weekly optimization of performance campaigns",
      "Remarketing for website and awareness traffic",
      "Product & brand validation creative systems",
      "Lead-service oriented budget allocation",
    ],
  },
  {
    id: "mop-up",
    title: "Mop-up",
    weeks: "Week 11–13",
    points: [
      "Refreshed communication and creatives",
      "Remarketing and performance intensification",
      "Inventory load-out with benefit-led offers",
      "Focus on remaining unit conversion",
    ],
  },
  {
    id: "sustenance",
    title: "Sustenance",
    weeks: "Week 14–16",
    points: [
      "Controlled campaign pacing after stable lead volume",
      "Remarketing for retained high-intent audiences",
      "Ongoing support for residual inventory demand",
      "Long-term brand presence maintenance",
    ],
  },
];

export const projectMegaMenu = ongoingProjects.map((project) => ({
  title: project.name,
  description: project.type,
  href: `/#${project.id}`,
  count: project.status,
  icon:
    project.type.toLowerCase().includes("plot")
      ? ("map" as const)
      : ("building" as const),
  // Smaller assets for mega-menu thumbnails
  image: project.image.replace("w=900", "w=480"),
}));

export const megaMenuFeaturedLinks = [
  {
    title: "Ongoing Projects",
    description: "Active launch mandates we are marketing",
    href: "/#ongoing-projects",
  },
  {
    title: "Completed Projects",
    description: "Delivered campaigns and sales outcomes",
    href: "/#completed-projects",
  },
  {
    title: "Our Services",
    description: "Branding, media, leads & sales funnels",
    href: "/#services",
  },
  {
    title: "Book Consultation",
    description: "Partner with Done & Delivered",
    href: "/contact",
  },
];

export const heroConsultationOptions = {
  projectTypes: [
    "Residential Apartment",
    "Villas",
    "Plots",
    "Commercial",
    "Mixed Use",
  ],
  goals: [
    "Project Launch",
    "Lead Generation",
    "Brand Positioning",
    "Sales Acceleration",
    "Full-Funnel Marketing",
  ],
  cities: ["Bengaluru", "Hyderabad", "Chennai", "Mumbai", "Pune", "Other"],
  timelines: ["Immediate", "1–3 Months", "3–6 Months", "Planning Stage"],
};

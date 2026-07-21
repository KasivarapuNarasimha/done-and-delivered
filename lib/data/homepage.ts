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
    | "performance"
    | "influencer"
    | "funnel";
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

/** Official ongoing projects from Done & Delivered Brand Deck */
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

export const services: ServiceItem[] = [
  {
    id: "s1",
    title: "Premium Project Branding",
    description:
      "Luxury brand systems, positioning frameworks, and creative identity crafted for premium real-estate launches.",
    icon: "branding",
  },
  {
    id: "s2",
    title: "Digital Marketing",
    description:
      "High-impact digital campaigns across search, social, and content channels built for serious buyer intent.",
    icon: "digital",
  },
  {
    id: "s3",
    title: "Lead Generation",
    description:
      "Conversion-focused strategies that attract genuine homebuyers and fill developer pipelines with quality enquiries.",
    icon: "leads",
  },
  {
    id: "s4",
    title: "Performance Marketing",
    description:
      "Data-led media buying, optimization, and reporting that turns visibility into measurable sales outcomes.",
    icon: "performance",
  },
  {
    id: "s5",
    title: "Influencer Marketing",
    description:
      "Trusted creator partnerships that amplify project narratives to high-intent audiences with premium reach.",
    icon: "influencer",
  },
  {
    id: "s6",
    title: "Sales Funnel Optimization",
    description:
      "End-to-end funnel design for real-estate launches—from first impression to site visit, pipeline, and booking.",
    icon: "funnel",
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
  { id: "f4", value: "45", label: "Pipeline" },
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
    href: "/contact?intent=consultation",
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

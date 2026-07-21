export type PropertyCategory = {
  id: string;
  title: string;
  description: string;
  count: string;
  image: string;
  href: string;
};

export type Property = {
  id: string;
  title: string;
  location: string;
  city: string;
  price: string;
  status: "Ready to Move" | "Under Construction" | "New Launch";
  type: string;
  beds: string;
  area: string;
  image: string;
  builder: string;
  builderLogo: string;
  verified: boolean;
};

export type Developer = {
  id: string;
  name: string;
  projects: string;
  years: string;
  logoInitials: string;
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
    | "sparkles";
};

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  location: string;
  quote: string;
  rating: number;
  image: string;
};

export type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  href: string;
};

export const propertyMegaMenu = [
  {
    title: "Apartments",
    description: "Curated premium residences",
    href: "/properties?type=apartment",
    count: "860+ homes",
    icon: "building" as const,
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Villas",
    description: "Private luxury estates",
    href: "/properties?type=villa",
    count: "210+ estates",
    icon: "home" as const,
    image:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Plots",
    description: "Verified land investments",
    href: "/properties?type=plot",
    count: "340+ parcels",
    icon: "map" as const,
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Commercial",
    description: "High-yield office & retail",
    href: "/properties?type=commercial",
    count: "120+ assets",
    icon: "briefcase" as const,
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
  },
];

export const megaMenuFeaturedLinks = [
  {
    title: "New Launches",
    description: "Just released verified projects",
    href: "/properties?status=new-launch",
  },
  {
    title: "Ready to Move",
    description: "Move-in ready luxury homes",
    href: "/properties?status=ready",
  },
  {
    title: "Investment Picks",
    description: "High-confidence yield opportunities",
    href: "/investments",
  },
  {
    title: "Book a Site Visit",
    description: "Curated visits with advisors",
    href: "/contact?intent=site-visit",
  },
];

export const verifiedServices = [
  {
    id: "properties",
    title: "Verified Properties",
    description:
      "Every listing is legally vetted, documented, and physically validated by our specialist team before it reaches you.",
    metric: "2,400+",
    metricLabel: "Verified Listings",
    icon: "building" as const,
  },
  {
    id: "developers",
    title: "Verified Developers",
    description:
      "We partner only with RERA-compliant, delivery-proven developers with transparent track records and strong governance.",
    metric: "180+",
    metricLabel: "Trusted Partners",
    icon: "badge" as const,
  },
  {
    id: "investments",
    title: "Verified Investments",
    description:
      "Data-backed opportunity scoring, ROI modelling, and risk screening for confident capital allocation decisions.",
    metric: "₹4,800 Cr+",
    metricLabel: "Guided Capital",
    icon: "chart" as const,
  },
];

export const propertyCategories: PropertyCategory[] = [
  {
    id: "apartment",
    title: "Apartment",
    description: "Skyline residences with refined amenities",
    count: "860+ Homes",
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1400&q=80",
    href: "/properties?type=apartment",
  },
  {
    id: "villa",
    title: "Villa",
    description: "Private estates crafted for elevated living",
    count: "210+ Estates",
    image:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1400&q=80",
    href: "/properties?type=villa",
  },
  {
    id: "plots",
    title: "Plots",
    description: "Clear-title land in growth corridors",
    count: "340+ Parcels",
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1400&q=80",
    href: "/properties?type=plot",
  },
  {
    id: "commercial",
    title: "Commercial",
    description: "Prime offices and retail destinations",
    count: "120+ Assets",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=80",
    href: "/properties?type=commercial",
  },
];

export const featuredProperties: Property[] = [
  {
    id: "p1",
    title: "The Aurelia Residences",
    location: "Whitefield",
    city: "Bengaluru",
    price: "₹1.85 Cr*",
    status: "New Launch",
    type: "3 & 4 BHK Apartment",
    beds: "3–4 BHK",
    area: "1,680–2,450 sq.ft",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1400&q=80",
    builder: "Aether Homes",
    builderLogo: "AH",
    verified: true,
  },
  {
    id: "p2",
    title: "Lakeview Imperial Villas",
    location: "Sarjapur Road",
    city: "Bengaluru",
    price: "₹4.20 Cr*",
    status: "Ready to Move",
    type: "4 BHK Villa",
    beds: "4 BHK",
    area: "3,200–4,100 sq.ft",
    image:
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1400&q=80",
    builder: "Crestline Estates",
    builderLogo: "CE",
    verified: true,
  },
  {
    id: "p3",
    title: "Meridian Business Park",
    location: "ORR",
    city: "Bengaluru",
    price: "₹1.12 Cr*",
    status: "Under Construction",
    type: "Commercial Office",
    beds: "Grade A",
    area: "850–5,000 sq.ft",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1400&q=80",
    builder: "Vertex Realty",
    builderLogo: "VR",
    verified: true,
  },
  {
    id: "p4",
    title: "Serenity Greens Plots",
    location: "Devanahalli",
    city: "Bengaluru",
    price: "₹78 Lakh*",
    status: "New Launch",
    type: "Premium Plot",
    beds: "Plot",
    area: "1,200–2,400 sq.ft",
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1400&q=80",
    builder: "Horizon Lands",
    builderLogo: "HL",
    verified: true,
  },
  {
    id: "p5",
    title: "Obsidian Sky Towers",
    location: "Gachibowli",
    city: "Hyderabad",
    price: "₹2.45 Cr*",
    status: "Under Construction",
    type: "3 BHK Apartment",
    beds: "3 BHK",
    area: "1,920–2,180 sq.ft",
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1400&q=80",
    builder: "NorthPeak Group",
    builderLogo: "NG",
    verified: true,
  },
  {
    id: "p6",
    title: "Casa Marina Estate",
    location: "ECR",
    city: "Chennai",
    price: "₹5.90 Cr*",
    status: "Ready to Move",
    type: "5 BHK Villa",
    beds: "5 BHK",
    area: "4,800 sq.ft",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80",
    builder: "Lumina Developers",
    builderLogo: "LD",
    verified: true,
  },
];

export const featuredDevelopers: Developer[] = [
  { id: "d1", name: "Aether Homes", projects: "42 Projects", years: "28 yrs", logoInitials: "AH" },
  { id: "d2", name: "Crestline Estates", projects: "31 Projects", years: "22 yrs", logoInitials: "CE" },
  { id: "d3", name: "Vertex Realty", projects: "56 Projects", years: "35 yrs", logoInitials: "VR" },
  { id: "d4", name: "Horizon Lands", projects: "19 Projects", years: "16 yrs", logoInitials: "HL" },
  { id: "d5", name: "NorthPeak Group", projects: "48 Projects", years: "30 yrs", logoInitials: "NG" },
  { id: "d6", name: "Lumina Developers", projects: "27 Projects", years: "20 yrs", logoInitials: "LD" },
  { id: "d7", name: "Sovereign Build", projects: "38 Projects", years: "25 yrs", logoInitials: "SB" },
  { id: "d8", name: "Paragon Infra", projects: "33 Projects", years: "18 yrs", logoInitials: "PI" },
];

export const whyChooseItems: WhyChooseItem[] = [
  {
    id: "w1",
    title: "End-to-End Verification",
    description:
      "Title diligence, RERA checks, site audits, and developer scoring—before any recommendation is made.",
    icon: "shield",
  },
  {
    id: "w2",
    title: "Luxury Portfolio Access",
    description:
      "Exclusive inventory across apartments, villas, plots, and commercial assets in India’s growth cities.",
    icon: "sparkles",
  },
  {
    id: "w3",
    title: "Investment Intelligence",
    description:
      "Transparent pricing insights, yield projections, and corridor-level demand analytics for smarter decisions.",
    icon: "chart",
  },
  {
    id: "w4",
    title: "Dedicated Advisors",
    description:
      "Relationship-led guidance from specialists who understand both lifestyle living and capital growth.",
    icon: "users",
  },
  {
    id: "w5",
    title: "Trusted Partnerships",
    description:
      "Handpicked alliances with verified developers known for quality, compliance, and on-time delivery.",
    icon: "handshake",
  },
  {
    id: "w6",
    title: "Seamless Transaction Care",
    description:
      "From shortlisting and site visits to documentation support—crafted for a calm, premium experience.",
    icon: "badge",
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Ananya Mehta",
    role: "Founder, Studio Atelier",
    location: "Bengaluru",
    quote:
      "Done & Delivered transformed a complex investment decision into a clear, confident process. The verification depth and presentation quality were unmatched.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "t2",
    name: "Rahul Khanna",
    role: "Managing Director",
    location: "Mumbai",
    quote:
      "Their advisory felt institutional yet personal. Every developer claim was validated, and the site visits were meticulously planned.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "t3",
    name: "Sneha & Arjun Iyer",
    role: "Homebuyers",
    location: "Hyderabad",
    quote:
      "We found our villa without the usual noise of the market. Premium service, transparent pricing, and genuine care at every step.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "t4",
    name: "Vikram Shah",
    role: "Portfolio Investor",
    location: "Ahmedabad",
    quote:
      "The investment scoring framework alone justified working with them. Clean data, elegant communication, outstanding follow-through.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80",
  },
];

export const latestBlogs: BlogPost[] = [
  {
    id: "b1",
    title: "How Verified Investments Reduce Risk in Luxury Real Estate",
    excerpt:
      "A practical framework for evaluating developer credibility, title integrity, and corridor fundamentals before you commit capital.",
    category: "Investments",
    date: "12 Mar 2026",
    readTime: "6 min read",
    image:
      "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?auto=format&fit=crop&w=1200&q=80",
    href: "/blogs/verified-investments-reduce-risk",
  },
  {
    id: "b2",
    title: "Whitefield vs Sarjapur: Where Premium Buyers Are Moving Next",
    excerpt:
      "A side-by-side look at lifestyle amenities, rental demand, and long-term appreciation for discerning Bengaluru buyers.",
    category: "Market Insights",
    date: "04 Mar 2026",
    readTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    href: "/blogs/whitefield-vs-sarjapur",
  },
  {
    id: "b3",
    title: "The Complete Checklist Before Booking a Site Visit",
    excerpt:
      "From documentation requests to on-ground observations—prepare like a professional investor and buy with clarity.",
    category: "Buyer Guide",
    date: "21 Feb 2026",
    readTime: "4 min read",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    href: "/blogs/site-visit-checklist",
  },
];

export const heroSearchOptions = {
  propertyTypes: ["Apartment", "Villa", "Plot", "Commercial"],
  categories: ["Residential", "Investment", "Ready to Move", "New Launch"],
  cities: ["Bengaluru", "Hyderabad", "Chennai", "Mumbai", "Pune", "Delhi NCR"],
  budgets: [
    "Under ₹50 Lakh",
    "₹50L – ₹1 Cr",
    "₹1 Cr – ₹2 Cr",
    "₹2 Cr – ₹5 Cr",
    "₹5 Cr+",
  ],
};

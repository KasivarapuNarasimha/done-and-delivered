export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export const contactFaqs: FaqItem[] = [
  {
    id: "faq1",
    question: "Who does Done & Delivered work with?",
    answer:
      "We partner exclusively with builders, developers, and premium property brands that need project branding, performance marketing, lead generation, and sales enablement.",
  },
  {
    id: "faq2",
    question: "How quickly can you start a project launch?",
    answer:
      "Most engagements begin with a consultation to map goals, inventory, and timeline. Pre-launch activation can typically start within the first two weeks of the agreed roadmap.",
  },
  {
    id: "faq3",
    question: "Do you only run digital ads?",
    answer:
      "No. We deliver integrated marketing—brand positioning, creative, performance media, social, nurture workflows, and sales-team enablement as one conversion system.",
  },
  {
    id: "faq4",
    question: "Which cities do you support?",
    answer:
      "We primarily support premium launches across major Indian markets including Bengaluru, Hyderabad, Chennai, Mumbai, and Pune, with corridor-specific campaign design.",
  },
  {
    id: "faq5",
    question: "How should I share project details?",
    answer:
      "Use the enquiry form on this page, WhatsApp, or call us. Include project type, city, timeline, and goals so we can prepare a relevant consultation.",
  },
  {
    id: "faq6",
    question: "Is the consultation form connected to your team?",
    answer:
      "Yes. Submissions are validated and delivered through our secure contact API to the Done & Delivered enquiry inbox for follow-up.",
  },
];

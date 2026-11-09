export interface StoreProduct {
  id: string;
  title: string;
  category: 'ebook' | 'template' | 'ui';
  categoryLabel: string;
  badge?: string;
  coverImage: string;
  priceLKR: number;
  priceUSD: number;
  originalPriceLKR?: number;
  shortDescription: string;
  fullDescription: string;
  format: string; // e.g., "PDF E-Book (Instant WhatsApp Delivery)"
  pages?: number;
  fileSize?: string;
  language?: string;
  author: string;
  highlights: string[];
  deliveryMethod: string;
  inStock: boolean;
}

export type DigitalProduct = StoreProduct;

// Only genuine E-Books (PDF) as currently available by Kaveen
export const storeProducts: StoreProduct[] = [
  {
    id: "modern-web-dev-handbook",
    title: "Modern Web Development Practical Handbook",
    category: "ebook",
    categoryLabel: "E-Book (PDF)",
    badge: "Best Seller",
    coverImage: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=800&h=800",
    priceLKR: 1500,
    originalPriceLKR: 2500,
    priceUSD: 5,
    shortDescription: "Complete roadmap and practical PDF guide covering modern HTML, CSS, React, responsive design, and production frontend architecture.",
    fullDescription: "A comprehensive, practical guide written for developers, students, and freelancers who want to build production-grade web applications. From understanding component lifecycles, state management, and modern Tailwind CSS to deploying responsive web projects with clean code.",
    format: "PDF Document (E-Book)",
    pages: 128,
    fileSize: "14 MB",
    language: "English with Sinhala Explanations",
    author: "Kaveen Sandeepa",
    highlights: [
      "Step-by-step modern frontend development roadmap",
      "Tailwind CSS & Responsive Layout cheat sheets with real examples",
      "Core JavaScript & React concepts simplified with code snippets",
      "Clean code, folder architecture & production deployment checklist",
      "High-resolution diagrams & printable reference sheets"
    ],
    deliveryMethod: "Instant PDF sent directly to your WhatsApp after payment",
    inStock: true
  },
  {
    id: "ui-ux-design-playbook",
    title: "UI/UX Design Systems & Layout Playbook",
    category: "ebook",
    categoryLabel: "E-Book (PDF)",
    badge: "Popular",
    coverImage: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800&h=800",
    priceLKR: 1200,
    originalPriceLKR: 2000,
    priceUSD: 4,
    shortDescription: "Master typography, color harmony, 8pt spacing grid, tactile Neumorphism, and modern UI design principles.",
    fullDescription: "Design websites and applications that feel tactile, premium, and trustworthy. This PDF playbook breaks down visual hierarchy, contrast rules, micro-interactions, responsive mobile design, and modern UI trends into simple, actionable rules you can apply immediately to your projects.",
    format: "PDF Document (E-Book)",
    pages: 96,
    fileSize: "18 MB",
    language: "English / Visual Illustrations",
    author: "Kaveen Sandeepa",
    highlights: [
      "Visual hierarchy and eye-tracking principles for web design",
      "Mastering Neumorphic & Soft-UI shadows and light sources",
      "Modern typography pairings and font scaling formulas",
      "Color theory and high-converting CTA placement",
      "Checklist for designing client-ready Figma layouts"
    ],
    deliveryMethod: "Instant PDF sent directly to your WhatsApp after payment",
    inStock: true
  },
  {
    id: "freelance-developer-blueprint",
    title: "Freelance Web Developer Client Blueprint",
    category: "ebook",
    categoryLabel: "E-Book (PDF)",
    badge: "High Value",
    coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800&h=800",
    priceLKR: 1800,
    originalPriceLKR: 3000,
    priceUSD: 6,
    shortDescription: "Actionable roadmap to land web development clients on Fiverr, Upwork, and direct outreach with winning proposal templates.",
    fullDescription: "Stop guessing how to land international web design and development clients. This guide provides exact scripts, gig optimization tactics, client communication workflows, and milestone pricing strategies proven to win freelance projects.",
    format: "PDF Document (E-Book)",
    pages: 110,
    fileSize: "12 MB",
    language: "English & Sinhala Guide",
    author: "Kaveen Sandeepa",
    highlights: [
      "Fiverr gig title, tag, and description optimization secrets",
      "Pre-written client proposal templates & outreach scripts",
      "How to quote projects, calculate hourly vs fixed rates",
      "Client revision handling & maintaining 5-star ratings",
      "Step-by-step guidance on setting up local bank withdrawals"
    ],
    deliveryMethod: "Instant PDF sent directly to your WhatsApp after payment",
    inStock: true
  },
  {
    id: "react-tailwind-cheatsheet",
    title: "React & Tailwind CSS Ultimate Reference Sheet",
    category: "ebook",
    categoryLabel: "E-Book (PDF)",
    badge: "Quick Read",
    coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800&h=800",
    priceLKR: 850,
    originalPriceLKR: 1500,
    priceUSD: 3,
    shortDescription: "Concise desk-reference loaded with production React hooks, Tailwind utility shortcuts, and responsive grid layouts.",
    fullDescription: "The ultimate quick-reference PDF to keep on your secondary monitor. Never forget flex alignment classes, hook dependency rules, custom Tailwind configs, or common CSS layout tricks again.",
    format: "PDF Document (Quick Reference)",
    pages: 64,
    fileSize: "8 MB",
    language: "English",
    author: "Kaveen Sandeepa",
    highlights: [
      "40+ Must-know custom React hooks and lifecycle explanations",
      "Tailwind flexbox, grid, and responsive modifier lookup table",
      "Performance optimization & re-render debugging tricks",
      "Print-friendly high-contrast dark & light reference cards"
    ],
    deliveryMethod: "Instant PDF sent directly to your WhatsApp after payment",
    inStock: true
  }
];

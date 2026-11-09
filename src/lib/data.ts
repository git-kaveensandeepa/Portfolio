export interface Project {
  id: string;
  title: string;
  description: string;
  fullDescription?: string;
  features?: string[];
  image: string;
  tech: string[];
  url: string;
}

export const projects: Project[] = [
  {
    id: "myfeed-lk",
    title: "MyFeed.lk",
    description: "An AI-powered tech news and digital education platform designed for Sri Lankans, delivering automated Sinhala tech news.",
    fullDescription: "MyFeed.lk operates as an automated 'Auto-Pilot' digital tech journal. It utilizes a custom backend engine that fetches RSS feeds from top global tech publications, processes the content through Google Gemini AI to summarize and translate it into Sinhala, and automatically publishes the articles. The platform offers a rich multimedia experience, including Interactive Quizzes, and structured Tech Courses.",
    features: [
      "AI Auto-Pilot News Engine (Gemini AI translation & summarization)",
      "Academy & Gamified Interactive Quizzes",
      "Advanced Ad Management System with dynamic ad serving",
      "User Profiles, Bookmarks & Gamification",
      "Progressive Web App (PWA) for native app-like experience",
      "Comprehensive Admin Dashboard for complete control"
    ],
    image: "https://i.ibb.co/SD8mjBNj/http-My-Feed-LK-web-app.png",
    tech: ["Angular", "Tailwind CSS", "Firebase", "Node.js", "Gemini AI API", "SSR"],
    url: "https://myfeedlk.com"
  }
];

export const skills = {
  frontend: [
    { name: "React & Next.js", level: 90 },
    { name: "Angular", level: 85 },
    { name: "JavaScript / TypeScript", level: 90 },
    { name: "Tailwind CSS", level: 95 },
    { name: "HTML & CSS", level: 95 }
  ],
  backend: [
    { name: "Node.js", level: 90 },
    { name: "Express.js", level: 85 },
    { name: "REST APIs & JSON", level: 90 },
    { name: "Firebase & Firestore", level: 85 }
  ],
  design: [
    { name: "UI Design & Systems", level: 85 },
    { name: "Responsive Mobile-First", level: 95 },
    { name: "Glassmorphism & Neumorphism", level: 90 },
    { name: "UX Wireframing", level: 85 }
  ],
  tools: [
    { name: "Vite & Webpack", level: 85 },
    { name: "Git & GitHub", level: 85 },
    { name: "Google AI Studio", level: 85 }
  ]
};

export const websitePackage = {
  title: "Complete Website Development Package",
  description: "A complete, high-performance website package tailored for Sri Lankan and global businesses with premium UI/UX, animations, and dedicated support.",
  sampleFirstMonthTotal: "රු. 68,400",
  sampleFirstMonthUsd: "approx. $225",
  inclusions: [
    "Up to 8 Pages (Pages 8ක් දක්වා)",
    "Custom branded UI/UX Design",
    "Advanced animations & visual sections",
    "Portfolio, Services & Photo Gallery",
    "Contact form & Lead-capture setup",
    "Basic SEO & Analytics setup",
    "Performance & Speed Optimization",
    "45 Days Bug-Fix Support (දින 45ක bug-fix support)"
  ],
  separateServices: [
    { name: "Hosting", cost: "රු. 3,500 / මාසය" },
    { name: "Domain (.lk example)", cost: "රු. 5,000 / වසර" }
  ]
};

export const services = [
  {
    title: "Website Development",
    description: "Up to 8 custom pages, branded UI/UX, animations, portfolio, contact forms, basic SEO, and 45 days support.",
    popular: true,
    price: "රු. 68,400 (First Month Total)"
  },
  {
    title: "Android App Development",
    description: "Native Kotlin & Jetpack Compose mobile applications built with modern architecture and offline storage.",
    popular: false,
    price: "Custom Quote"
  },
  {
    title: "Landing Pages & Stores",
    description: "High-converting single-page landing pages and digital e-book / product store platforms.",
    popular: false,
    price: "From රු. 30,000"
  },
  {
    title: "Custom Web Applications",
    description: "Tailored SaaS platforms, admin dashboards, AI integration engines, and complex client portals.",
    popular: false,
    price: "Custom Scope"
  }
];

export const process = [
  {
    num: "01",
    title: "Discover",
    description: "Understand the business goals, target audience, and project requirements."
  },
  {
    num: "02",
    title: "Design",
    description: "Create the visual direction, wireframes, and user experience flow."
  },
  {
    num: "03",
    title: "Build",
    description: "Develop the responsive website using modern frontend technologies."
  },
  {
    num: "04",
    title: "Launch",
    description: "Deploy, optimize, and deliver the finished product to the world."
  }
];

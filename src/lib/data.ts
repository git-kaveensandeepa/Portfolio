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
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=1200",
    tech: ["Angular", "Tailwind CSS", "Firebase", "Node.js", "Gemini AI API", "SSR"],
    url: "https://myfeedlk.com"
  }
];

export const skills = {
  frontend: [
    { name: "HTML", level: 90 },
    { name: "CSS", level: 90 },
    { name: "JavaScript", level: 85 },
    { name: "React", level: 85 },
    { name: "Tailwind CSS", level: 95 }
  ],
  design: [
    { name: "UI Design", level: 80 },
    { name: "Responsive Design", level: 95 },
    { name: "Glassmorphism", level: 90 },
    { name: "UX Thinking", level: 85 }
  ],
  tools: [
    { name: "Vite", level: 85 },
    { name: "Git", level: 80 },
    { name: "Canva", level: 75 },
    { name: "Google AI Studio", level: 80 }
  ]
};

export const services = [
  {
    title: "Business Websites",
    description: "Modern responsive websites tailored for small and medium businesses to establish a strong online presence."
  },
  {
    title: "Landing Pages",
    description: "High-converting, performance-optimized landing pages designed for products, services, and marketing campaigns."
  },
  {
    title: "SaaS Interfaces",
    description: "Clean, intuitive, and modern dashboard designs and web application interfaces for software products."
  },
  {
    title: "UI Development",
    description: "Pixel-perfect, clean, and responsive frontend implementation bringing designs to life with smooth interactions."
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

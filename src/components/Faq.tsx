import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Search, HelpCircle, MessageSquare, ArrowRight, ShieldCheck, Zap, Code2, DollarSign, Smartphone } from 'lucide-react';

interface FaqItem {
  id: string;
  category: 'web' | 'mobile' | 'pricing' | 'security';
  question: string;
  answer: string;
  icon: React.ReactNode;
}

const faqCategories = [
  { id: 'all', label: 'All Questions' },
  { id: 'web', label: 'Web Development', icon: <Code2 className="w-3.5 h-3.5" /> },
  { id: 'mobile', label: 'Mobile Apps', icon: <Smartphone className="w-3.5 h-3.5" /> },
  { id: 'pricing', label: 'Pricing & Timelines', icon: <DollarSign className="w-3.5 h-3.5" /> },
  { id: 'security', label: 'Security & Support', icon: <ShieldCheck className="w-3.5 h-3.5" /> },
];

const faqs: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'web',
    question: 'What web frameworks and technologies do you specialize in?',
    answer: 'I build modern, responsive web applications using React, Next.js, Vite, TypeScript, and Tailwind CSS on the frontend. On the backend, I leverage Node.js (Express/Fastify), Python, and serverless Cloud APIs. For databases, I work with PostgreSQL (Drizzle/Prisma) and Firebase Firestore.',
    icon: <Code2 className="w-4 h-4 text-blue-500" />
  },
  {
    id: 'faq-2',
    category: 'mobile',
    question: 'Do you develop native Android mobile applications?',
    answer: 'Yes! I specialize in modern native Android development using Kotlin and Jetpack Compose. I build secure, high-performance Android applications following Google’s material design guidelines, clean architecture (MVVM), and offline-first storage.',
    icon: <Smartphone className="w-4 h-4 text-emerald-500" />
  },
  {
    id: 'faq-3',
    category: 'pricing',
    question: 'What is included in the Website Development Package and what is the cost?',
    answer: 'The complete Website Development Package includes up to 8 pages, custom branded UI/UX, advanced animations & visual sections, portfolio/services/gallery, contact form & lead capture, basic SEO & analytics, performance optimization, and 45 days of bug-fix support. Hosting (රු. 3,500/mo) and .lk Domain (රු. 5,000/yr) are billed separately. The sample total payment for the first month is රු. 68,400.',
    icon: <DollarSign className="w-4 h-4 text-amber-500" />
  },
  {
    id: 'faq-4',
    category: 'pricing',
    question: 'What is the typical turnaround time for a project?',
    answer: 'Standard landing pages and starter websites take 3 to 7 business days. Business web apps and full Android applications typically take 2 to 4 weeks depending on backend complexity, API integrations, and client feedback cycles.',
    icon: <Zap className="w-4 h-4 text-purple-500" />
  },
  {
    id: 'faq-5',
    category: 'security',
    question: 'How do you ensure application security and client data protection?',
    answer: 'Security is at the core of my development process. I implement OWASP security standards: server-side role authorization, parameterized queries, rate limiting, secure HTTPS/TLS, environment token encryption, and dependency vulnerability scans before release.',
    icon: <ShieldCheck className="w-4 h-4 text-indigo-500" />
  },
  {
    id: 'faq-6',
    category: 'web',
    question: 'Will my website be mobile-friendly and optimized for Google Search (SEO)?',
    answer: 'Absolutely. Every single website or web app I build is 100% mobile-responsive and optimized with high Google PageSpeed performance, Meta OpenGraph tags, JSON-LD Schema structured data, and semantic HTML for high search ranking.',
    icon: <Code2 className="w-4 h-4 text-blue-500" />
  },
  {
    id: 'faq-7',
    category: 'security',
    question: 'Do you offer post-launch maintenance, bug fixes, and revisions?',
    answer: 'Yes! All projects include 30 days of free post-launch bug fixing, minor content updates, and deployment support. Dedicated monthly maintenance plans are also available for server monitoring, backups, and feature upgrades.',
    icon: <HelpCircle className="w-4 h-4 text-teal-500" />
  },
  {
    id: 'faq-8',
    category: 'pricing',
    question: 'How do we get started and what is the payment structure?',
    answer: 'Getting started is simple! Send an inquiry via the contact form or WhatsApp. Once we confirm project scope and requirements, a 50% initial deposit kicks off development, with the remaining 50% payable upon final demo approval prior to live launch.',
    icon: <DollarSign className="w-4 h-4 text-amber-500" />
  }
];

export function Faq() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-1');

  const toggleAccordion = (id: string) => {
    setOpenFaqId((prev) => (prev === id ? null : id));
  };

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Prepare JSON-LD Schema.org structured data for SEO
  const jsonLdFaqData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  };

  return (
    <section id="faq" className="py-24 relative overflow-hidden">
      {/* JSON-LD FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaqData) }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full neu-badge mb-4 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions?</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 dark:text-white"
          >
            Frequently Asked <span className="text-gradient">Questions</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400 font-light leading-relaxed"
          >
            Everything you need to know about custom web & mobile app development, pricing, project timelines, and post-launch support.
          </motion.p>
        </div>

        {/* Search & Filter Bar */}
        <div className="space-y-6 mb-12">
          {/* Search Box */}
          <div className="relative max-w-xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions or keywords (e.g., pricing, React, Kotlin, security)..."
              className="w-full pl-11 pr-10 py-3.5 text-sm rounded-2xl neu-inset bg-transparent text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-xs font-semibold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Filtering Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            {faqCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-full transition-all duration-200 inline-flex items-center gap-1.5 cursor-pointer ${
                  activeCategory === cat.id
                    ? 'neu-btn-primary text-white scale-105'
                    : 'neu-btn text-slate-600 dark:text-slate-300 hover:text-blue-500'
                }`}
              >
                {cat.icon}
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => {
              const isOpen = openFaqId === faq.id;
              return (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="rounded-2xl neu-card overflow-hidden transition-all border border-slate-200/50 dark:border-white/5"
                >
                  <button
                    onClick={() => toggleAccordion(faq.id)}
                    className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none group"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="p-2.5 rounded-xl neu-circle-btn shrink-0">
                        {faq.icon}
                      </div>
                      <span className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {faq.question}
                      </span>
                    </div>
                    <div
                      className={`p-2 rounded-full neu-circle-btn shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-blue-500' : 'text-slate-400'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                      >
                        <div className="px-6 pb-6 pt-1 border-t border-slate-200/40 dark:border-white/5">
                          <p className="text-sm text-slate-600 dark:text-slate-300 font-normal leading-relaxed pl-12">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })
          ) : (
            <div className="text-center py-12 rounded-2xl neu-card p-8">
              <HelpCircle className="w-10 h-10 text-slate-400 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
                No matching questions found
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Try searching for different keywords or view all categories.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                }}
                className="mt-4 px-4 py-2 text-xs font-semibold rounded-full neu-btn text-blue-600 dark:text-blue-400"
              >
                Reset Search Filters
              </button>
            </div>
          )}
        </div>

        {/* Direct Contact CTA Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 rounded-3xl neu-card p-8 sm:p-10 text-center relative overflow-hidden border border-blue-500/20"
        >
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="inline-flex p-3 rounded-full neu-circle-btn text-blue-500 mb-4">
            <MessageSquare className="w-6 h-6" />
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            Have a custom question not answered here?
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto mt-2 font-light">
            I'm here to help! Feel free to drop a direct message on WhatsApp or send an inquiry with your project requirements.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://wa.me/94710947871"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full neu-btn text-emerald-600 dark:text-emerald-400 font-semibold text-sm hover:scale-105 transition-transform"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>Chat on WhatsApp</span>
            </a>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full neu-btn-primary text-sm font-semibold hover:scale-105 transition-transform"
            >
              <span>Send Project Inquiry</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

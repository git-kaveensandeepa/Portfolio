import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { 
  ArrowLeft, 
  Search, 
  Copy, 
  Check, 
  BookOpen, 
  Terminal, 
  Rocket, 
  Palette, 
  Layers, 
  ShieldCheck, 
  ExternalLink,
  MessageSquare,
  FileCode,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import { Footer } from '../components/Footer';

interface DocsSection {
  id: string;
  title: string;
  category: string;
  badge?: string;
  description: string;
  content: React.ReactNode;
}

export function DocsPage({ onBackToHome }: { onBackToHome?: () => void }) {
  const [activeSectionId, setActiveSectionId] = useState('getting-started');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const sections: DocsSection[] = [
    {
      id: 'getting-started',
      category: 'Overview',
      title: 'Getting Started',
      badge: 'Quickstart',
      description: 'System requirements, installation steps, and running your project locally.',
      content: (
        <div className="space-y-6">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-light">
            Welcome to the official developer documentation for Kaveen Sandeepa's digital website templates and UI kits. All templates are designed with clean, modular TypeScript, Tailwind CSS, and optimized for speed.
          </p>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
            System Prerequisites
          </h3>
          <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400 font-light">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span><strong>Node.js:</strong> v18.17.0 or higher (v20+ recommended)</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span><strong>Package Manager:</strong> npm (v9+), pnpm (v8+), or yarn</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span><strong>Code Editor:</strong> VS Code with Tailwind CSS IntelliSense extension</span>
            </li>
          </ul>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
            Quick Installation Commands
          </h3>
          <div className="rounded-2xl neu-inset p-4 relative group">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-mono text-slate-400 uppercase">Bash / Terminal</span>
              <button
                onClick={() => copyToClipboard(`git clone https://github.com/your-repo/template.git\ncd template\nnpm install\nnpm run dev`, 'install-cmd')}
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg neu-btn text-xs font-semibold cursor-pointer"
              >
                {copiedCode === 'install-cmd' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedCode === 'install-cmd' ? 'Copied' : 'Copy'}
              </button>
            </div>
            <pre className="text-xs sm:text-sm font-mono text-slate-800 dark:text-slate-200 overflow-x-auto p-1 leading-loose">
              <code>{`# 1. Clone repository
git clone https://github.com/your-username/template-name.git

# 2. Enter directory
cd template-name

# 3. Install dependencies
npm install

# 4. Start local development server
npm run dev`}</code>
            </pre>
          </div>

          <div className="p-4 rounded-2xl neu-card border-l-4 border-blue-500 text-sm">
            <strong className="block text-slate-900 dark:text-white font-semibold mb-1">
              🚀 Local Development Port
            </strong>
            <p className="text-slate-600 dark:text-slate-400 font-light">
              By default, Vite runs on <code className="px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-mono text-xs">http://localhost:3000</code> or <code className="px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-mono text-xs">:5173</code>. Open your browser to view your live app.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'folder-structure',
      category: 'Architecture',
      title: 'Project Structure',
      description: 'Understanding the directory tree, component organization, and configuration files.',
      content: (
        <div className="space-y-6">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-light">
            The project follows an organized, component-driven modular structure designed for scale and maintainability:
          </p>

          <div className="rounded-2xl neu-inset p-5 font-mono text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed overflow-x-auto">
            <pre>{`├── public/                 # Static assets (images, icons, favicons)
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── Navbar.tsx      # Floating Neumorphic navigation bar
│   │   ├── Hero.tsx        # Hero banner with call-to-actions
│   │   ├── Projects.tsx    # Portfolio showcase with modals
│   │   ├── Contact.tsx     # Direct WhatsApp & Email booking form
│   │   └── Footer.tsx      # Social channels & legal links
│   ├── pages/              # Route views (Store, Docs, Tools)
│   ├── lib/                # Static data & schema definitions
│   │   ├── data.ts         # Portfolio projects & skills data
│   │   └── storeData.ts    # Digital templates catalog
│   ├── hooks/              # Custom React utility hooks
│   ├── index.css           # Neumorphism design tokens & styles
│   ├── App.tsx             # Main client router & global providers
│   └── main.tsx            # Application entry point
├── package.json            # Project dependencies & npm scripts
└── vite.config.ts          # Vite build & plugin settings`}</pre>
          </div>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-3">
            Key Architectural Conventions
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="neu-card p-5 rounded-2xl">
              <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1.5 flex items-center gap-2">
                <FileCode className="w-4 h-4 text-blue-500" />
                Pure Functional Components
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-light">
                All views use React 19 functional components with typed interfaces and zero bloated class components.
              </p>
            </div>
            <div className="neu-card p-5 rounded-2xl">
              <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1.5 flex items-center gap-2">
                <Layers className="w-4 h-4 text-purple-500" />
                Isolated State & Hooks
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-light">
                Modals, dropdowns, and form states are isolated so parent components re-render only when necessary.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'styling-neumorphism',
      category: 'Design System',
      title: 'Neumorphism & Styling',
      badge: 'Design System',
      description: 'Using tactile Neumorphic tokens, dual-shadow utilities, and dark mode.',
      content: (
        <div className="space-y-6">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-light">
            Our design system combines authentic soft Neumorphism (embossed surfaces, dual complementary shadows, and sunken wells) with crisp modern accessibility standards.
          </p>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-6 mb-3">
            Available Utility Classes
          </h3>

          <div className="space-y-4">
            <div className="neu-card p-5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <code className="text-xs font-bold font-mono px-2.5 py-1 rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400">
                  .neu-card
                </code>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 font-light">
                  Standard raised/extruded surface with smooth dual shadows. Ideal for cards, containers, and dialog panels.
                </p>
              </div>
              <div className="w-24 h-14 neu-card rounded-xl shrink-0 flex items-center justify-center text-[10px] font-bold text-slate-500">
                Card
              </div>
            </div>

            <div className="neu-card p-5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <code className="text-xs font-bold font-mono px-2.5 py-1 rounded-md bg-purple-500/10 text-purple-600 dark:text-purple-400">
                  .neu-inset
                </code>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 font-light">
                  Recessed / sunken well with inward shadow topology. Perfect for inputs, textareas, search bars, and progress tracks.
                </p>
              </div>
              <div className="w-24 h-14 neu-inset rounded-xl shrink-0 flex items-center justify-center text-[10px] font-bold text-slate-500">
                Inset
              </div>
            </div>

            <div className="neu-card p-5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <code className="text-xs font-bold font-mono px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  .neu-btn & .neu-btn-primary
                </code>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 font-light">
                  Interactive tactile buttons that elevate on hover and physically press down (<code className="font-mono text-[11px]">:active</code>) into an inset state.
                </p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button className="px-3 py-2 rounded-xl neu-btn text-xs font-bold">Button</button>
                <button className="px-3 py-2 rounded-xl neu-btn-primary text-xs font-bold">Primary</button>
              </div>
            </div>
          </div>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-3">
            CSS Custom Properties
          </h3>
          <div className="rounded-2xl neu-inset p-4 relative">
            <button
              onClick={() => copyToClipboard(`:root {\n  --neu-bg: #e9eef6;\n  --neu-light: #ffffff;\n  --neu-dark: #c2cfdf;\n  --neu-dark-deep: #a8b8cc;\n  --neu-text: #1e293b;\n}`, 'css-vars')}
              className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1 rounded-lg neu-btn text-xs font-semibold cursor-pointer"
            >
              {copiedCode === 'css-vars' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedCode === 'css-vars' ? 'Copied' : 'Copy'}
            </button>
            <pre className="text-xs font-mono text-slate-800 dark:text-slate-200 overflow-x-auto">
              <code>{`:root {
  --neu-bg: #e9eef6;
  --neu-light: #ffffff;
  --neu-dark: #c2cfdf;
  --neu-dark-deep: #a8b8cc;
  --neu-text: #1e293b;
  --neu-text-muted: #64748b;
}`}</code>
            </pre>
          </div>
        </div>
      )
    },
    {
      id: 'deploy-guide',
      category: 'Deployment',
      title: 'Production Deployment',
      badge: 'DevOps',
      description: 'Step-by-step instructions for deploying to Vercel, Netlify, and Cloudflare Pages.',
      content: (
        <div className="space-y-6">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-light">
            Deploying your website is fast and straightforward. All templates come with pre-configured build scripts ready for modern edge and static hosting platforms.
          </p>

          <div className="space-y-4">
            <div className="neu-card p-6 rounded-3xl">
              <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                <Rocket className="w-5 h-5 text-blue-500" />
                Option A: Deploy with Vercel (Recommended)
              </h4>
              <ol className="list-decimal list-inside space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-light leading-relaxed">
                <li>Push your codebase to a GitHub, GitLab, or Bitbucket repository.</li>
                <li>Go to <a href="https://vercel.com" target="_blank" rel="noreferrer" className="text-blue-500 font-semibold underline">vercel.com</a> and click <strong>Add New Project</strong>.</li>
                <li>Select your repository and choose <strong>Vite</strong> as Framework Preset.</li>
                <li>Build Command: <code className="px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-mono text-xs">npm run build</code></li>
                <li>Output Directory: <code className="px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-mono text-xs">dist</code></li>
                <li>Click <strong>Deploy</strong>. Your site will be live on an SSL-secured URL in under 60 seconds!</li>
              </ol>
            </div>

            <div className="neu-card p-6 rounded-3xl">
              <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                <Layers className="w-5 h-5 text-emerald-500" />
                Option B: Deploy with Netlify
              </h4>
              <ol className="list-decimal list-inside space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-light leading-relaxed">
                <li>Link your Git provider to Netlify.</li>
                <li>Set Build command to <code className="font-mono text-xs">npm run build</code>.</li>
                <li>Set Publish directory to <code className="font-mono text-xs">dist</code>.</li>
                <li>Add a <code className="font-mono text-xs">_redirects</code> file with <code className="font-mono text-xs">/* /index.html 200</code> for client-side routing.</li>
              </ol>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'whatsapp-integration',
      category: 'Integrations',
      title: 'WhatsApp Ordering Setup',
      description: 'Customizing your WhatsApp phone number and order confirmation templates.',
      content: (
        <div className="space-y-6">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-light">
            Templates include direct-to-WhatsApp booking and purchasing workflows. To route orders directly to your personal or business WhatsApp number:
          </p>

          <ol className="list-decimal list-inside space-y-3 text-sm text-slate-700 dark:text-slate-300 font-light">
            <li>
              Open <code className="px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-mono text-xs">src/components/Contact.tsx</code> and <code className="px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-mono text-xs">src/components/StoreModal.tsx</code>.
            </li>
            <li>
              Locate the <code className="font-mono text-xs text-blue-600">phoneNumber</code> variable:
              <div className="mt-2 rounded-xl neu-inset p-3 font-mono text-xs text-slate-800 dark:text-slate-200">
                <code>const phoneNumber = "94710947871"; // Replace with your country code + number</code>
              </div>
            </li>
            <li>
              Replace with your international phone number format without any <code className="font-mono text-xs">+</code> or dashes (e.g. <code className="font-mono text-xs">14155552671</code> for US or <code className="font-mono text-xs">947XXXXXXXX</code> for LK).
            </li>
          </ol>
        </div>
      )
    },
    {
      id: 'licensing',
      category: 'Legal & Support',
      title: 'Commercial License & Support',
      description: 'Permissions, client projects usage, redistribution rules, and developer support.',
      content: (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl neu-card flex items-start gap-4">
            <ShieldCheck className="w-8 h-8 text-emerald-500 shrink-0 mt-1" />
            <div className="text-sm space-y-3">
              <h4 className="text-base font-bold text-slate-900 dark:text-white">Commercial License Terms</h4>
              <p className="text-slate-600 dark:text-slate-400 font-light leading-relaxed">
                When you buy any template or UI kit from Kaveen Sandeepa's store, you receive a lifetime, non-exclusive commercial license.
              </p>
              <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Unlimited personal websites & commercial client projects</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Use in commercial SaaS products with paying subscribers</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Modify, rebrand, or extend the source code as needed</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="p-6 rounded-3xl neu-card text-sm">
            <h4 className="font-bold text-slate-900 dark:text-white mb-2">Need Custom Assistance?</h4>
            <p className="text-slate-600 dark:text-slate-400 font-light mb-4">
              If you have questions about setup, custom features, or need help with code integration, Kaveen provides direct support.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://wa.me/94710947871"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-full neu-btn-primary text-xs font-bold inline-flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                Contact on WhatsApp
              </a>
              <a
                href="mailto:mail.kaveensandeepa@gmail.com"
                className="px-5 py-2.5 rounded-full neu-btn text-xs font-bold inline-flex items-center gap-2"
              >
                Email Developer
              </a>
            </div>
          </div>
        </div>
      )
    }
  ];

  const filteredSections = useMemo(() => {
    if (!searchQuery) return sections;
    return sections.filter(s => 
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, sections]);

  const activeSection = sections.find(s => s.id === activeSectionId) || sections[0];

  return (
    <div className="min-h-screen bg-mesh relative">
      <Helmet>
        <title>Developer Docs & Setup Guides | Kaveen Sandeepa</title>
        <meta name="description" content="Official documentation, setup guides, component references, and deployment tutorials for Kaveen Sandeepa's templates." />
      </Helmet>

      {/* Floating Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 py-3">
        <div className="max-w-6xl mx-auto rounded-2xl md:rounded-full px-6 py-3.5 neu-nav-bar flex items-center justify-between">
          <a
            href="/"
            onClick={(e) => {
              if (onBackToHome) {
                e.preventDefault();
                onBackToHome();
              }
            }}
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-800 dark:text-white hover:text-blue-600 transition-colors group cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Portfolio</span>
          </a>

          <div className="flex items-center gap-3">
            <a
              href="/store"
              className="px-4 py-2 text-xs font-bold rounded-full neu-btn text-blue-600 dark:text-blue-400"
            >
              Browse Templates
            </a>
            <a
              href="/tools"
              className="px-4 py-2 text-xs font-bold rounded-full neu-btn"
            >
              Dev Tools
            </a>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        {/* Page Title & Search Header */}
        <div className="mb-10 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6 border-b border-slate-300/40 dark:border-white/10 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full neu-badge text-xs font-bold text-blue-600 dark:text-blue-400 mb-3">
              <BookOpen className="w-3.5 h-3.5" />
              Developer Documentation
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              Documentation & Guides
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 font-light mt-1 max-w-xl">
              Everything you need to customize, deploy, and scale with Kaveen Sandeepa's codebases.
            </p>
          </div>

          <div className="w-full sm:w-80 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search documentation..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 text-xs sm:text-sm rounded-full neu-inset outline-none text-slate-800 dark:text-white placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Sidebar Navigation */}
          <aside className="lg:col-span-4 xl:col-span-3 space-y-2">
            <div className="neu-card p-4 rounded-3xl">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block px-3 py-2">
                Navigation
              </span>
              <div className="space-y-1 mt-1">
                {filteredSections.map((sec) => {
                  const isActive = sec.id === activeSectionId;
                  return (
                    <button
                      key={sec.id}
                      onClick={() => setActiveSectionId(sec.id)}
                      className={`w-full text-left px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-between cursor-pointer ${
                        isActive
                          ? 'neu-btn-primary'
                          : 'neu-btn hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      <span className="truncate">{sec.title}</span>
                      <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isActive ? 'translate-x-0.5' : 'text-slate-400'}`} />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Support Widget */}
            <div className="neu-card p-5 rounded-3xl">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Need Direct Help?</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-light mb-3">
                Have questions or need assistance with your code?
              </p>
              <a
                href="https://wa.me/94710947871"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl neu-btn-fiverr text-xs font-bold flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                Ask on WhatsApp
              </a>
            </div>
          </aside>

          {/* Main Article Content */}
          <main className="lg:col-span-8 xl:col-span-9">
            <motion.article 
              key={activeSection.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="neu-card p-6 sm:p-10 rounded-3xl"
            >
              <div className="border-b border-slate-300/40 dark:border-white/10 pb-6 mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                    {activeSection.category}
                  </span>
                  {activeSection.badge && (
                    <span className="px-2.5 py-0.5 text-[11px] font-bold rounded-full neu-badge text-emerald-600 dark:text-emerald-400">
                      {activeSection.badge}
                    </span>
                  )}
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-2">
                  {activeSection.title}
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-400 font-light">
                  {activeSection.description}
                </p>
              </div>

              <div>
                {activeSection.content}
              </div>
            </motion.article>
          </main>

        </div>
      </div>

      <Footer />
    </div>
  );
}

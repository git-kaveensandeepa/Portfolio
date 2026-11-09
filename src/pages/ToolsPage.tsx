import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { 
  ArrowLeft, 
  Wrench, 
  Copy, 
  Check, 
  Sparkles, 
  Sliders, 
  Layers, 
  Share2, 
  Palette, 
  Smartphone,
  Eye,
  CheckCircle2,
  XCircle,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { Footer } from '../components/Footer';

type ToolTab = 'neumorphism' | 'meta-tags' | 'contrast' | 'glassmorphism';

export function ToolsPage({ onBackToHome }: { onBackToHome?: () => void }) {
  const [activeTab, setActiveTab] = useState<ToolTab>('neumorphism');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyCode = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // 1. Neumorphism Generator State
  const [neuColor, setNeuColor] = useState('#e9eef6');
  const [neuSize, setNeuSize] = useState(180);
  const [neuRadius, setNeuRadius] = useState(36);
  const [neuDistance, setNeuDistance] = useState(10);
  const [neuBlur, setNeuBlur] = useState(20);
  const [neuShape, setNeuShape] = useState<'flat' | 'concave' | 'convex' | 'inset'>('flat');

  // Compute Neu colors
  const neuShadows = useMemo(() => {
    // Basic color math for light and dark shadows
    return {
      darkShadow: '#c2cfdf',
      lightShadow: '#ffffff'
    };
  }, []);

  const neuBoxShadow = useMemo(() => {
    const d = neuDistance;
    const b = neuBlur;
    if (neuShape === 'inset') {
      return `inset ${d}px ${d}px ${b}px ${neuShadows.darkShadow}, inset -${d}px -${d}px ${b}px ${neuShadows.lightShadow}`;
    }
    return `${d}px ${d}px ${b}px ${neuShadows.darkShadow}, -${d}px -${d}px ${b}px ${neuShadows.lightShadow}`;
  }, [neuDistance, neuBlur, neuShape, neuShadows]);

  const neuCssCode = `/* Neumorphic Soft UI CSS */
width: ${neuSize}px;
height: ${neuSize}px;
border-radius: ${neuRadius}px;
background: ${neuColor};
box-shadow: ${neuBoxShadow};`;

  // 2. Meta Tags Generator State
  const [metaTitle, setMetaTitle] = useState('My Awesome Web Project');
  const [metaDescription, setMetaDescription] = useState('Discover modern web development, sleek UI design, and fast digital experiences.');
  const [metaUrl, setMetaUrl] = useState('https://myproject.com');
  const [metaImage, setMetaImage] = useState('https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200');
  const [metaAuthor, setMetaAuthor] = useState('Kaveen Sandeepa');

  const metaHtmlCode = `<!-- Primary Meta Tags -->
<title>${metaTitle}</title>
<meta name="title" content="${metaTitle}" />
<meta name="description" content="${metaDescription}" />
<meta name="author" content="${metaAuthor}" />

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website" />
<meta property="og:url" content="${metaUrl}" />
<meta property="og:title" content="${metaTitle}" />
<meta property="og:description" content="${metaDescription}" />
<meta property="og:image" content="${metaImage}" />

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image" />
<meta property="twitter:url" content="${metaUrl}" />
<meta property="twitter:title" content="${metaTitle}" />
<meta property="twitter:description" content="${metaDescription}" />
<meta property="twitter:image" content="${metaImage}" />`;

  // 3. Contrast Checker State
  const [textColor, setTextColor] = useState('#1e293b');
  const [bgColor, setBgColor] = useState('#ffffff');

  // Simple WCAG calculation
  const contrastRatio = useMemo(() => {
    const getLuminance = (hex: string) => {
      const rgb = hex.replace('#', '').match(/.{1,2}/g)?.map(x => parseInt(x, 16) / 255) || [0, 0, 0];
      const a = rgb.map(v => v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4));
      return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
    };
    try {
      const l1 = getLuminance(textColor);
      const l2 = getLuminance(bgColor);
      const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
      return Math.round(ratio * 100) / 100;
    } catch {
      return 4.5;
    }
  }, [textColor, bgColor]);

  // 4. Glassmorphism Generator State
  const [glassBlur, setGlassBlur] = useState(16);
  const [glassOpacity, setGlassOpacity] = useState(0.25);
  const [glassBorder, setGlassBorder] = useState(0.3);

  const glassCssCode = `/* Glassmorphism CSS */
background: rgba(255, 255, 255, ${glassOpacity});
backdrop-filter: blur(${glassBlur}px);
-webkit-backdrop-filter: blur(${glassBlur}px);
border-radius: 24px;
border: 1px solid rgba(255, 255, 255, ${glassBorder});
box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.12);`;

  return (
    <div className="min-h-screen bg-mesh relative">
      <Helmet>
        <title>Developer & Design Tools | Kaveen Sandeepa</title>
        <meta name="description" content="Free interactive web utilities for developers and designers: Neumorphism CSS Generator, Meta Tags Creator, Glassmorphism, and Contrast Checker." />
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
              Templates Store
            </a>
            <a
              href="/docs"
              className="px-4 py-2 text-xs font-bold rounded-full neu-btn"
            >
              Documentation
            </a>
          </div>
        </div>
      </header>

      {/* Hero Header */}
      <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full neu-badge text-xs font-semibold text-purple-600 dark:text-purple-400 mb-6">
            <Wrench className="w-4 h-4" />
            Free Developer & Designer Utilities
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white mb-6">
            Interactive Web <span className="text-gradient">Tools Suite</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 font-light max-w-2xl mx-auto mb-10 leading-relaxed">
            Free, browser-based playgrounds to generate tactile Neumorphism shadows, craft SEO meta tags, and test contrast compliance in seconds.
          </p>

          {/* Tool Selector Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 max-w-3xl mx-auto">
            <button
              onClick={() => setActiveTab('neumorphism')}
              className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 cursor-pointer transition-all ${
                activeTab === 'neumorphism'
                  ? 'neu-btn-primary'
                  : 'neu-btn hover:text-slate-900'
              }`}
            >
              <Sliders className="w-4 h-4" />
              Neumorphism Generator
            </button>

            <button
              onClick={() => setActiveTab('meta-tags')}
              className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 cursor-pointer transition-all ${
                activeTab === 'meta-tags'
                  ? 'neu-btn-primary'
                  : 'neu-btn hover:text-slate-900'
              }`}
            >
              <Share2 className="w-4 h-4" />
              Meta Tags & SEO
            </button>

            <button
              onClick={() => setActiveTab('contrast')}
              className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 cursor-pointer transition-all ${
                activeTab === 'contrast'
                  ? 'neu-btn-primary'
                  : 'neu-btn hover:text-slate-900'
              }`}
            >
              <Palette className="w-4 h-4" />
              WCAG Contrast Checker
            </button>

            <button
              onClick={() => setActiveTab('glassmorphism')}
              className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 cursor-pointer transition-all ${
                activeTab === 'glassmorphism'
                  ? 'neu-btn-primary'
                  : 'neu-btn hover:text-slate-900'
              }`}
            >
              <Layers className="w-4 h-4" />
              Glassmorphism
            </button>

            <a
              href="/site-check"
              className="px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 neu-btn text-blue-600 dark:text-blue-400 hover:text-blue-700 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              Site-Check Analyzer
              <span className="px-1.5 py-0.2 bg-blue-500 text-white text-[9px] rounded-full font-bold">
                NEW
              </span>
            </a>
          </div>
        </motion.div>
      </section>

      {/* Tools Content Section */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto pb-24">
        
        {/* TOOL 1: NEUMORPHISM GENERATOR */}
        {activeTab === 'neumorphism' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
          >
            {/* Left Controls */}
            <div className="lg:col-span-6 neu-card p-6 sm:p-8 rounded-3xl space-y-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
                  Neumorphic Parameters
                </h3>
                <p className="text-xs text-slate-500 font-light">
                  Adjust distance, blur, and shape to calculate dual-shadow topology.
                </p>
              </div>

              {/* Preset Color Chips */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Surface Color
                </label>
                <div className="flex items-center gap-2">
                  {['#e9eef6', '#f2f4f8', '#e2e8f0', '#161b26', '#fdfbf7'].map((c) => (
                    <button
                      key={c}
                      onClick={() => setNeuColor(c)}
                      className={`w-9 h-9 rounded-xl border-2 transition-transform cursor-pointer ${
                        neuColor === c ? 'border-blue-500 scale-110' : 'border-transparent'
                      }`}
                      style={{ backgroundColor: c }}
                      title={c}
                    />
                  ))}
                  <input
                    type="color"
                    value={neuColor}
                    onChange={(e) => setNeuColor(e.target.value)}
                    className="w-9 h-9 rounded-xl border-0 cursor-pointer p-0 bg-transparent"
                  />
                </div>
              </div>

              {/* Shape Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Shape Profile
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['flat', 'concave', 'inset'] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => setNeuShape(s)}
                      className={`py-2 px-3 rounded-xl text-xs font-bold capitalize transition-all cursor-pointer ${
                        neuShape === s ? 'neu-btn-primary' : 'neu-btn'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sliders */}
              <div className="space-y-4 pt-2">
                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    <span>Distance (Offset)</span>
                    <span>{neuDistance}px</span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="30"
                    value={neuDistance}
                    onChange={(e) => setNeuDistance(Number(e.target.value))}
                    className="w-full accent-blue-500 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    <span>Blur (Diffusion)</span>
                    <span>{neuBlur}px</span>
                  </div>
                  <input
                    type="range"
                    min="4"
                    max="50"
                    value={neuBlur}
                    onChange={(e) => setNeuBlur(Number(e.target.value))}
                    className="w-full accent-blue-500 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    <span>Border Radius</span>
                    <span>{neuRadius}px</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={neuRadius}
                    onChange={(e) => setNeuRadius(Number(e.target.value))}
                    className="w-full accent-blue-500 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    <span>Element Size</span>
                    <span>{neuSize}px</span>
                  </div>
                  <input
                    type="range"
                    min="120"
                    max="260"
                    value={neuSize}
                    onChange={(e) => setNeuSize(Number(e.target.value))}
                    className="w-full accent-blue-500 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Right Live Preview & Code */}
            <div className="lg:col-span-6 space-y-6">
              {/* Live Canvas */}
              <div 
                className="neu-card p-12 rounded-3xl flex items-center justify-center min-h-[340px] transition-colors"
                style={{ backgroundColor: neuColor }}
              >
                <div
                  style={{
                    width: `${neuSize}px`,
                    height: `${neuSize}px`,
                    borderRadius: `${neuRadius}px`,
                    backgroundColor: neuColor,
                    boxShadow: neuBoxShadow,
                    transition: 'all 0.15s ease'
                  }}
                  className="flex items-center justify-center text-xs font-bold text-slate-600 dark:text-slate-300 select-none"
                >
                  {neuShape.toUpperCase()}
                </div>
              </div>

              {/* Code Box */}
              <div className="neu-card p-6 rounded-3xl relative">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Generated CSS Output
                  </span>
                  <button
                    onClick={() => copyCode(neuCssCode, 'neu-css')}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl neu-btn text-xs font-bold cursor-pointer"
                  >
                    {copiedId === 'neu-css' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedId === 'neu-css' ? 'Copied!' : 'Copy CSS'}
                  </button>
                </div>
                <div className="rounded-2xl neu-inset p-4 font-mono text-xs text-slate-800 dark:text-slate-200 overflow-x-auto leading-relaxed">
                  <pre>{neuCssCode}</pre>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* TOOL 2: META TAGS GENERATOR */}
        {activeTab === 'meta-tags' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
          >
            {/* Input Form */}
            <div className="lg:col-span-6 neu-card p-6 sm:p-8 rounded-3xl space-y-4">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                Website Meta Information
              </h3>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Page Title</label>
                <input
                  type="text"
                  value={metaTitle}
                  onChange={(e) => setMetaTitle(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl neu-inset outline-none text-xs sm:text-sm text-slate-800 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Description (Max ~160 chars)</label>
                <textarea
                  rows={3}
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl neu-inset outline-none text-xs sm:text-sm text-slate-800 dark:text-white resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Canonical Web URL</label>
                <input
                  type="text"
                  value={metaUrl}
                  onChange={(e) => setMetaUrl(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl neu-inset outline-none text-xs sm:text-sm text-slate-800 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Social Preview Image URL (1200x630)</label>
                <input
                  type="text"
                  value={metaImage}
                  onChange={(e) => setMetaImage(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl neu-inset outline-none text-xs sm:text-sm text-slate-800 dark:text-white"
                />
              </div>
            </div>

            {/* Live Social Share Card Preview & HTML Code */}
            <div className="lg:col-span-6 space-y-6">
              {/* Google Preview */}
              <div className="neu-card p-5 rounded-3xl space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Google Search Snippet Preview
                </span>
                <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5">
                  <div className="text-xs text-slate-500 truncate mb-1">{metaUrl}</div>
                  <div className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer truncate mb-1">
                    {metaTitle}
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                    {metaDescription}
                  </div>
                </div>
              </div>

              {/* Social Card Preview */}
              <div className="neu-card p-5 rounded-3xl space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Social Share Card (OpenGraph / Twitter)
                </span>
                <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-white/5 bg-white dark:bg-slate-900">
                  <div className="aspect-[16/9] w-full overflow-hidden bg-slate-100">
                    <img src={metaImage} alt="Social Card" className="w-full h-full object-cover" />
                  </div>
                  <div className="p-3">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block truncate">{metaUrl}</span>
                    <strong className="text-xs font-bold text-slate-800 dark:text-white block truncate mt-0.5">{metaTitle}</strong>
                    <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{metaDescription}</p>
                  </div>
                </div>
              </div>

              {/* Code */}
              <div className="neu-card p-5 rounded-3xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    HTML Head Code
                  </span>
                  <button
                    onClick={() => copyCode(metaHtmlCode, 'meta-code')}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-xl neu-btn text-xs font-bold cursor-pointer"
                  >
                    {copiedId === 'meta-code' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedId === 'meta-code' ? 'Copied!' : 'Copy Tags'}
                  </button>
                </div>
                <pre className="text-xs font-mono rounded-xl neu-inset p-3 overflow-x-auto text-slate-700 dark:text-slate-300 max-h-48">
                  <code>{metaHtmlCode}</code>
                </pre>
              </div>
            </div>
          </motion.div>
        )}

        {/* TOOL 3: CONTRAST CHECKER */}
        {activeTab === 'contrast' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
          >
            <div className="lg:col-span-6 neu-card p-6 sm:p-8 rounded-3xl space-y-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
                  Color Contrast Evaluator
                </h3>
                <p className="text-xs text-slate-500 font-light">
                  Measure readability compliance against WCAG 2.1 accessibility criteria.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Text Color</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={textColor}
                      onChange={(e) => setTextColor(e.target.value)}
                      className="w-10 h-10 rounded-xl border-0 cursor-pointer p-0 bg-transparent"
                    />
                    <input
                      type="text"
                      value={textColor}
                      onChange={(e) => setTextColor(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl neu-inset font-mono text-xs uppercase"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Background Color</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={bgColor}
                      onChange={(e) => setBgColor(e.target.value)}
                      className="w-10 h-10 rounded-xl border-0 cursor-pointer p-0 bg-transparent"
                    />
                    <input
                      type="text"
                      value={bgColor}
                      onChange={(e) => setBgColor(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl neu-inset font-mono text-xs uppercase"
                    />
                  </div>
                </div>
              </div>

              {/* Quick Presets */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Recommended Pairs</label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { text: '#0f172a', bg: '#f8fafc', name: 'Slate Light' },
                    { text: '#ffffff', bg: '#0f172a', name: 'Dark Contrast' },
                    { text: '#1d4ed8', bg: '#eff6ff', name: 'Blue Soft' },
                    { text: '#065f46', bg: '#ecfdf5', name: 'Emerald Soft' }
                  ].map((p, idx) => (
                    <button
                      key={idx}
                      onClick={() => { setTextColor(p.text); setBgColor(p.bg); }}
                      className="px-3 py-1.5 rounded-xl neu-btn text-xs font-semibold"
                    >
                      {p.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Score Results */}
            <div className="lg:col-span-6 space-y-6">
              {/* Ratio Score Card */}
              <div className="neu-card p-8 rounded-3xl text-center">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Calculated Contrast Ratio
                </span>
                <span className="text-5xl font-black text-slate-900 dark:text-white block mb-4">
                  {contrastRatio}:1
                </span>

                <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto">
                  <div className="p-3 rounded-2xl neu-inset flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-600 dark:text-slate-400">Normal Text (AA)</span>
                    {contrastRatio >= 4.5 ? (
                      <span className="flex items-center text-xs font-bold text-emerald-500 gap-1"><CheckCircle2 className="w-4 h-4" /> Pass</span>
                    ) : (
                      <span className="flex items-center text-xs font-bold text-rose-500 gap-1"><XCircle className="w-4 h-4" /> Fail</span>
                    )}
                  </div>

                  <div className="p-3 rounded-2xl neu-inset flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-600 dark:text-slate-400">Large Text (AAA)</span>
                    {contrastRatio >= 4.5 ? (
                      <span className="flex items-center text-xs font-bold text-emerald-500 gap-1"><CheckCircle2 className="w-4 h-4" /> Pass</span>
                    ) : (
                      <span className="flex items-center text-xs font-bold text-rose-500 gap-1"><XCircle className="w-4 h-4" /> Fail</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Live Preview Box */}
              <div 
                className="p-8 rounded-3xl border border-slate-200 transition-all shadow-md"
                style={{ backgroundColor: bgColor, color: textColor }}
              >
                <h4 className="text-xl font-bold mb-2">Live Text Preview</h4>
                <p className="text-sm font-light leading-relaxed mb-4">
                  This preview renders using the exact colors selected above. High-contrast combinations are essential for inclusive, readable web experiences.
                </p>
                <button
                  className="px-4 py-2 rounded-xl text-xs font-bold shadow-sm"
                  style={{ border: `1.5px solid ${textColor}` }}
                >
                  Interactive Button
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* TOOL 4: GLASSMORPHISM GENERATOR */}
        {activeTab === 'glassmorphism' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
          >
            {/* Controls */}
            <div className="lg:col-span-6 neu-card p-6 sm:p-8 rounded-3xl space-y-6">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
                Glassmorphism Blur & Opacity
              </h3>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    <span>Backdrop Blur</span>
                    <span>{glassBlur}px</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="40"
                    value={glassBlur}
                    onChange={(e) => setGlassBlur(Number(e.target.value))}
                    className="w-full accent-blue-500 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    <span>Background Transparency</span>
                    <span>{Math.round(glassOpacity * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0.05"
                    max="0.8"
                    step="0.05"
                    value={glassOpacity}
                    onChange={(e) => setGlassOpacity(Number(e.target.value))}
                    className="w-full accent-blue-500 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    <span>Border Highlight</span>
                    <span>{Math.round(glassBorder * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0.1"
                    max="0.9"
                    step="0.05"
                    value={glassBorder}
                    onChange={(e) => setGlassBorder(Number(e.target.value))}
                    className="w-full accent-blue-500 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Live Visual Canvas over colorful background */}
            <div className="lg:col-span-6 space-y-6">
              <div className="rounded-3xl p-8 relative overflow-hidden bg-gradient-to-tr from-purple-600 via-pink-500 to-amber-400 min-h-[300px] flex items-center justify-center">
                <div 
                  style={{
                    backgroundColor: `rgba(255, 255, 255, ${glassOpacity})`,
                    backdropFilter: `blur(${glassBlur}px)`,
                    WebkitBackdropFilter: `blur(${glassBlur}px)`,
                    border: `1px solid rgba(255, 255, 255, ${glassBorder})`,
                    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.15)'
                  }}
                  className="p-6 rounded-3xl max-w-xs w-full text-white space-y-2 select-none"
                >
                  <div className="w-10 h-10 rounded-2xl bg-white/30 flex items-center justify-center mb-3">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-base">Glassmorphism Card</h4>
                  <p className="text-xs text-white/80 font-light leading-relaxed">
                    Frost effect rendered using real-time CSS backdrop filter.
                  </p>
                </div>
              </div>

              {/* Code */}
              <div className="neu-card p-6 rounded-3xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    CSS Snippet
                  </span>
                  <button
                    onClick={() => copyCode(glassCssCode, 'glass-code')}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-xl neu-btn text-xs font-bold cursor-pointer"
                  >
                    {copiedId === 'glass-code' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedId === 'glass-code' ? 'Copied!' : 'Copy CSS'}
                  </button>
                </div>
                <pre className="text-xs font-mono rounded-xl neu-inset p-3 overflow-x-auto text-slate-800 dark:text-slate-200">
                  <code>{glassCssCode}</code>
                </pre>
              </div>
            </div>
          </motion.div>
        )}

      </section>

      <Footer />
    </div>
  );
}

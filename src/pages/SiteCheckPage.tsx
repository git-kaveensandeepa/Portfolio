import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { 
  ArrowLeft, 
  Search, 
  ShieldCheck, 
  ShieldAlert, 
  Zap, 
  Globe, 
  Smartphone, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Copy, 
  Check, 
  ExternalLink,
  MessageSquare,
  Clock,
  Lock,
  Layers,
  Sparkles,
  Info
} from 'lucide-react';
import { Footer } from '../components/Footer';

interface AuditItem {
  id: string;
  name: string;
  category: 'Security' | 'Performance' | 'SEO' | 'Configuration';
  status: 'passed' | 'warning' | 'failed';
  impact: 'High' | 'Medium' | 'Low';
  details: string;
  remediationSnippet?: string;
  snippetLang?: string;
}

interface AnalysisResult {
  url: string;
  finalUrl: string;
  statusCode: number;
  isHttps: boolean;
  responseTime: number;
  pageSizeBytes: number;
  overallScore: number;
  grade: 'A+' | 'A' | 'B' | 'C' | 'D' | 'F';
  scores: {
    security: number;
    performance: number;
    seo: number;
    configuration: number;
  };
  headers: Record<string, string | null>;
  meta: {
    title: string | null;
    description: string | null;
    hasViewport: boolean;
    canonicalUrl: string | null;
    hasOgTitle: boolean;
    hasOgDesc: boolean;
    hasOgImage: boolean;
    ogImage: string | null;
  };
  items: AuditItem[];
}

export function SiteCheckPage({ onBackToHome }: { onBackToHome?: () => void }) {
  const [urlInput, setUrlInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [filterStatus, setFilterStatus] = useState<'all' | 'failed' | 'warning' | 'passed'>('all');
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);

  const copyCode = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSnippet(id);
    setTimeout(() => setCopiedSnippet(null), 2000);
  };

  const runAnalysis = async (targetUrlToTest?: string) => {
    const raw = (targetUrlToTest || urlInput).trim();
    if (!raw) {
      setError('Please enter a website URL');
      return;
    }

    setLoading(true);
    setError(null);

    let formatted = raw;
    if (!formatted.startsWith('http://') && !formatted.startsWith('https://')) {
      formatted = 'https://' + formatted;
    }

    try {
      const res = await fetch(`/api/site-check?url=${encodeURIComponent(formatted)}`);
      const data = await res.json();

      if (!res.ok || !data.success || data.error) {
        setError(data.error || 'Failed to inspect website. Target server is unreachable or DNS lookup failed.');
        setResult(null);
        setLoading(false);
        return;
      }

      // Calculate score and build audit items
      const items: AuditItem[] = [];
      let secScore = 0;
      let perfScore = 0;
      let seoScore = 0;
      let configScore = 0;

      // Check 1: HTTPS Transport
      if (data.isHttps) {
        secScore += 25;
        items.push({
          id: 'https',
          name: 'HTTPS Transport Security',
          category: 'Security',
          status: 'passed',
          impact: 'High',
          details: 'Valid TLS/HTTPS encryption active. Traffic is encrypted against network eavesdropping.'
        });
      } else {
        items.push({
          id: 'https',
          name: 'HTTPS Transport Security',
          category: 'Security',
          status: 'failed',
          impact: 'High',
          details: 'Connection is unencrypted HTTP. Data and credentials can be intercepted in transit.',
          remediationSnippet: `# Nginx: Force HTTPS Redirect\nserver {\n  listen 80;\n  server_name example.com;\n  return 301 https://$host$request_uri;\n}`
        });
      }

      // Check 2: HSTS
      if (data.headers.hsts) {
        secScore += 20;
        items.push({
          id: 'hsts',
          name: 'Strict-Transport-Security (HSTS)',
          category: 'Security',
          status: 'passed',
          impact: 'High',
          details: `HSTS is active (${data.headers.hsts}). Browsers are forced to use HTTPS exclusively.`
        });
      } else {
        items.push({
          id: 'hsts',
          name: 'Strict-Transport-Security (HSTS)',
          category: 'Security',
          status: 'failed',
          impact: 'High',
          details: 'HSTS header is missing. Users can still be downgraded to HTTP via SSL-stripping attacks.',
          remediationSnippet: `# Add HSTS Header (Nginx)\nadd_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;`
        });
      }

      // Check 3: Clickjacking X-Frame-Options / frame-ancestors
      if (data.headers.xfo || (data.headers.csp && data.headers.csp.includes('frame-ancestors'))) {
        secScore += 20;
        items.push({
          id: 'xfo',
          name: 'Clickjacking Protection (X-Frame-Options)',
          category: 'Security',
          status: 'passed',
          impact: 'High',
          details: `X-Frame-Options is set to "${data.headers.xfo || 'frame-ancestors'}". UI redress attacks are blocked.`
        });
      } else {
        items.push({
          id: 'xfo',
          name: 'Clickjacking Protection (X-Frame-Options)',
          category: 'Security',
          status: 'warning',
          impact: 'High',
          details: 'Site can potentially be embedded in unauthorized iframes, enabling clickjacking.',
          remediationSnippet: `# Prevent iframing (Nginx)\nadd_header X-Frame-Options "SAMEORIGIN" always;`
        });
      }

      // Check 4: MIME Sniffing Protection
      if (data.headers.xcto && data.headers.xcto.toLowerCase().includes('nosniff')) {
        secScore += 15;
        items.push({
          id: 'xcto',
          name: 'MIME-Type Sniffing Protection',
          category: 'Security',
          status: 'passed',
          impact: 'Medium',
          details: 'X-Content-Type-Options: nosniff is configured correctly.'
        });
      } else {
        items.push({
          id: 'xcto',
          name: 'MIME-Type Sniffing Protection',
          category: 'Security',
          status: 'warning',
          impact: 'Medium',
          details: 'X-Content-Type-Options: nosniff is missing. Browsers may interpret non-executable files as scripts.',
          remediationSnippet: `add_header X-Content-Type-Options "nosniff" always;`
        });
      }

      // Check 5: Content Security Policy
      if (data.headers.csp) {
        secScore += 20;
        items.push({
          id: 'csp',
          name: 'Content Security Policy (CSP)',
          category: 'Security',
          status: 'passed',
          impact: 'High',
          details: 'Content-Security-Policy is active, mitigating cross-site scripting (XSS) and data injection.'
        });
      } else {
        items.push({
          id: 'csp',
          name: 'Content Security Policy (CSP)',
          category: 'Security',
          status: 'warning',
          impact: 'High',
          details: 'No Content Security Policy detected. High-severity XSS vectors remain unmitigated.',
          remediationSnippet: `# Basic CSP Header\nadd_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:;" always;`
        });
      }

      // Check 6: Server & Technology Disclosure
      if (data.headers.xPoweredBy || (data.headers.server && data.headers.server.length > 15)) {
        configScore += 10;
        items.push({
          id: 'disclosure',
          name: 'Server Fingerprint Disclosure',
          category: 'Configuration',
          status: 'warning',
          impact: 'Low',
          details: `Server headers reveal infrastructure details: ${[data.headers.server, data.headers.xPoweredBy].filter(Boolean).join(' | ')}. This assists attackers in fingerprinting known CVEs.`,
          remediationSnippet: `# Hide Server Tokens (Nginx)\nserver_tokens off;\n\n# Express.js (Node.js)\napp.disable('x-powered-by');`
        });
      } else {
        configScore += 25;
        items.push({
          id: 'disclosure',
          name: 'Server Fingerprint Cleanliness',
          category: 'Configuration',
          status: 'passed',
          impact: 'Low',
          details: 'No sensitive backend software versions or X-Powered-By tokens exposed.'
        });
      }

      // Check 7: Latency & Response Time
      if (data.responseTime < 300) {
        perfScore += 35;
        items.push({
          id: 'ttfb',
          name: 'Server Response Time (TTFB)',
          category: 'Performance',
          status: 'passed',
          impact: 'High',
          details: `Fast response time: ${data.responseTime}ms. Excellent server responsiveness.`
        });
      } else if (data.responseTime < 800) {
        perfScore += 25;
        items.push({
          id: 'ttfb',
          name: 'Server Response Time (TTFB)',
          category: 'Performance',
          status: 'warning',
          impact: 'Medium',
          details: `Moderate response time: ${data.responseTime}ms. Consider caching or edge CDN.`
        });
      } else {
        perfScore += 10;
        items.push({
          id: 'ttfb',
          name: 'Server Response Time (TTFB)',
          category: 'Performance',
          status: 'failed',
          impact: 'High',
          details: `Slow response: ${data.responseTime}ms. High latency degrades user retention.`
        });
      }

      // Check 8: Caching
      if (data.headers.cacheControl) {
        perfScore += 35;
        items.push({
          id: 'cache',
          name: 'Browser Caching Headers',
          category: 'Performance',
          status: 'passed',
          impact: 'Medium',
          details: `Cache-Control header configured: ${data.headers.cacheControl}`
        });
      } else {
        items.push({
          id: 'cache',
          name: 'Browser Caching Headers',
          category: 'Performance',
          status: 'warning',
          impact: 'Medium',
          details: 'No Cache-Control header found. Assets are re-downloaded on every page load.',
          remediationSnippet: `location ~* \\.(js|css|png|jpg|jpeg|gif|svg|ico)$ {\n  expires 1y;\n  add_header Cache-Control "public, no-transform";\n}`
        });
      }

      // Check 9: Compression
      if (data.headers.contentEncoding) {
        perfScore += 30;
        items.push({
          id: 'compression',
          name: 'Text Compression (Gzip / Brotli)',
          category: 'Performance',
          status: 'passed',
          impact: 'High',
          details: `Active compression algorithm: ${data.headers.contentEncoding}`
        });
      } else {
        perfScore += 15;
        items.push({
          id: 'compression',
          name: 'Text Compression',
          category: 'Performance',
          status: 'warning',
          impact: 'High',
          details: 'Response does not indicate gzip/brotli compression.',
          remediationSnippet: `gzip on;\ngzip_types text/plain text/css application/json application/javascript text/xml;`
        });
      }

      // Check 10: Title Tag
      if (data.meta.title) {
        seoScore += 30;
        const len = data.meta.title.length;
        items.push({
          id: 'title',
          name: 'HTML Document Title',
          category: 'SEO',
          status: len >= 20 && len <= 70 ? 'passed' : 'warning',
          impact: 'High',
          details: `Title is present (${len} chars): "${data.meta.title}". ${len < 20 ? 'Consider making it more descriptive.' : ''}`
        });
      } else {
        items.push({
          id: 'title',
          name: 'HTML Document Title',
          category: 'SEO',
          status: 'failed',
          impact: 'High',
          details: 'Missing <title> tag. Search engines cannot index this page effectively.'
        });
      }

      // Check 11: Meta Description
      if (data.meta.description) {
        seoScore += 35;
        items.push({
          id: 'desc',
          name: 'Meta Description Tag',
          category: 'SEO',
          status: 'passed',
          impact: 'High',
          details: `Meta description is present (${data.meta.description.length} chars): "${data.meta.description.slice(0, 90)}..."`
        });
      } else {
        items.push({
          id: 'desc',
          name: 'Meta Description Tag',
          category: 'SEO',
          status: 'warning',
          impact: 'Medium',
          details: 'Missing <meta name="description">. Google will fabricate a snippet from page text.',
          remediationSnippet: `<meta name="description" content="A concise summary of your website..." />`
        });
      }

      // Check 12: Mobile Viewport
      if (data.meta.hasViewport) {
        configScore += 35;
        seoScore += 15;
        items.push({
          id: 'viewport',
          name: 'Mobile Responsive Viewport',
          category: 'Configuration',
          status: 'passed',
          impact: 'High',
          details: '<meta name="viewport"> tag detected. Scales accurately on mobile phones and tablets.'
        });
      } else {
        items.push({
          id: 'viewport',
          name: 'Mobile Responsive Viewport',
          category: 'Configuration',
          status: 'failed',
          impact: 'High',
          details: 'Missing viewport tag. Mobile browsers will render the desktop version at 980px width.',
          remediationSnippet: `<meta name="viewport" content="width=device-width, initial-scale=1.0" />`
        });
      }

      // Check 13: OpenGraph Social Preview
      if (data.meta.hasOgTitle && data.meta.hasOgImage) {
        seoScore += 20;
        configScore += 40;
        items.push({
          id: 'og',
          name: 'OpenGraph Social Share Card Tags',
          category: 'SEO',
          status: 'passed',
          impact: 'Medium',
          details: 'Complete OpenGraph metadata found. Link previews will render richly on WhatsApp, Facebook, and Twitter.'
        });
      } else {
        configScore += 15;
        items.push({
          id: 'og',
          name: 'OpenGraph Social Share Card Tags',
          category: 'SEO',
          status: 'warning',
          impact: 'Medium',
          details: 'Missing og:title or og:image tags. Links shared on social media will appear blank or incomplete.',
          remediationSnippet: `<meta property="og:title" content="Page Title" />\n<meta property="og:image" content="https://example.com/banner.jpg" />`
        });
      }

      // Compute total normalized score
      const totalScore = Math.min(100, Math.round((secScore * 0.35) + (perfScore * 0.25) + (seoScore * 0.25) + (configScore * 0.15)));
      
      let grade: 'A+' | 'A' | 'B' | 'C' | 'D' | 'F' = 'B';
      if (totalScore >= 92) grade = 'A+';
      else if (totalScore >= 82) grade = 'A';
      else if (totalScore >= 70) grade = 'B';
      else if (totalScore >= 55) grade = 'C';
      else if (totalScore >= 40) grade = 'D';
      else grade = 'F';

      setResult({
        url: data.url,
        finalUrl: data.finalUrl || data.url,
        statusCode: data.statusCode || 200,
        isHttps: data.isHttps,
        responseTime: data.responseTime,
        pageSizeBytes: data.pageSizeBytes || 0,
        overallScore: totalScore,
        grade,
        scores: {
          security: Math.min(100, secScore),
          performance: Math.min(100, perfScore),
          seo: Math.min(100, seoScore),
          configuration: Math.min(100, configScore)
        },
        headers: data.headers,
        meta: data.meta,
        items
      });
    } catch (err: any) {
      setError(err.message || 'Failed to inspect website');
    } finally {
      setLoading(false);
    }
  };

  const filteredItems = useMemo(() => {
    if (!result) return [];
    if (filterStatus === 'all') return result.items;
    return result.items.filter(i => i.status === filterStatus);
  }, [result, filterStatus]);

  return (
    <div className="min-h-screen bg-mesh relative">
      <Helmet>
        <title>Site-Check | Website Performance & Public Configuration Analyzer</title>
        <meta name="description" content="Free website health inspector: audit HTTP security headers (HSTS, CSP), response latency, SSL integrity, SEO metadata, and server disclosure." />
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
            <a href="/tools" className="px-4 py-2 text-xs font-bold rounded-full neu-btn">
              All Tools
            </a>
            <a href="/store" className="px-4 py-2 text-xs font-bold rounded-full neu-btn text-blue-600 dark:text-blue-400">
              Templates Store
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full neu-badge text-xs font-semibold text-blue-600 dark:text-blue-400 mb-6">
            <ShieldCheck className="w-4 h-4" />
            Website Health & Configuration Inspector
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white mb-6">
            Site-Check <span className="text-gradient">Website Analyzer</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 font-light max-w-2xl mx-auto mb-10 leading-relaxed">
            Instant audit of any public website: Inspect SSL transport, OWASP security headers, TTFB response latency, OpenGraph tags, and server disclosures.
          </p>

          {/* URL Input Form */}
          <form 
            onSubmit={(e) => { e.preventDefault(); runAnalysis(); }}
            className="neu-card p-3 sm:p-4 rounded-3xl max-w-2xl mx-auto flex flex-col sm:flex-row items-center gap-3"
          >
            <div className="relative flex-1 w-full">
              <Globe className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Enter domain or URL (e.g. example.com)"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 text-sm sm:text-base rounded-2xl neu-inset outline-none text-slate-900 dark:text-white placeholder:text-slate-400 font-medium"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl neu-btn-primary font-bold text-sm flex items-center justify-center gap-2 shrink-0 cursor-pointer disabled:opacity-60"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  Audit Site
                </>
              )}
            </button>
          </form>

          {/* Quick Preset Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs text-slate-500">
            <span className="font-semibold">Try sample sites:</span>
            {['myfeedlk.com', 'github.com', 'cloudflare.com', 'google.com'].map((domain) => (
              <button
                key={domain}
                type="button"
                onClick={() => { setUrlInput(domain); runAnalysis(domain); }}
                className="px-3 py-1 rounded-full neu-btn text-[11px] font-bold text-blue-600 dark:text-blue-400 cursor-pointer"
              >
                {domain}
              </button>
            ))}
          </div>

          {error && (
            <div className="mt-6 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-sm font-semibold max-w-md mx-auto flex items-center justify-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              {error}
            </div>
          )}
        </motion.div>
      </section>

      {/* Analysis Results View */}
      {result && (
        <section className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto pb-24">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* 1. Score Summary Banner */}
            <div className="neu-card p-6 sm:p-10 rounded-3xl grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              
              {/* Big Grade Circle */}
              <div className="md:col-span-4 flex flex-col items-center justify-center text-center p-4">
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full neu-card flex flex-col items-center justify-center relative mb-3">
                  <span className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white">
                    {result.grade}
                  </span>
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    {result.overallScore} / 100
                  </span>
                </div>
                <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
                  Overall Health Rating
                </span>
                <span className="text-xs text-slate-500 font-light mt-0.5">
                  {result.overallScore >= 80 ? 'Well Configured & Optimized' : 'Security / Config Work Recommended'}
                </span>
              </div>

              {/* URL & Meta Overview */}
              <div className="md:col-span-8 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-300/40 dark:border-white/10 pb-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">Inspected URL</span>
                    <a 
                      href={result.finalUrl} 
                      target="_blank" 
                      rel="noreferrer"
                      className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1.5"
                    >
                      {result.url}
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full neu-badge text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5" />
                      {result.isHttps ? 'HTTPS / SSL Active' : 'HTTP Insecure'}
                    </span>
                    <span className="px-3 py-1 rounded-full neu-badge text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {result.responseTime}ms
                    </span>
                  </div>
                </div>

                {/* 4 Category Score Gauges */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                  <div className="neu-card p-3.5 rounded-2xl text-center">
                    <span className="text-[11px] font-bold text-slate-500 uppercase block mb-1">Security</span>
                    <span className="text-xl font-black text-slate-900 dark:text-white">{result.scores.security}%</span>
                  </div>
                  <div className="neu-card p-3.5 rounded-2xl text-center">
                    <span className="text-[11px] font-bold text-slate-500 uppercase block mb-1">Performance</span>
                    <span className="text-xl font-black text-slate-900 dark:text-white">{result.scores.performance}%</span>
                  </div>
                  <div className="neu-card p-3.5 rounded-2xl text-center">
                    <span className="text-[11px] font-bold text-slate-500 uppercase block mb-1">SEO & Social</span>
                    <span className="text-xl font-black text-slate-900 dark:text-white">{result.scores.seo}%</span>
                  </div>
                  <div className="neu-card p-3.5 rounded-2xl text-center">
                    <span className="text-[11px] font-bold text-slate-500 uppercase block mb-1">Configuration</span>
                    <span className="text-xl font-black text-slate-900 dark:text-white">{result.scores.configuration}%</span>
                  </div>
                </div>
              </div>

            </div>

            {/* 2. Audit Filter Tabs */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setFilterStatus('all')}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    filterStatus === 'all' ? 'neu-btn-primary' : 'neu-btn'
                  }`}
                >
                  All Findings ({result.items.length})
                </button>
                <button
                  onClick={() => setFilterStatus('failed')}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    filterStatus === 'failed' ? 'neu-btn-primary' : 'neu-btn text-rose-500'
                  }`}
                >
                  Failed ({result.items.filter(i => i.status === 'failed').length})
                </button>
                <button
                  onClick={() => setFilterStatus('warning')}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    filterStatus === 'warning' ? 'neu-btn-primary' : 'neu-btn text-amber-500'
                  }`}
                >
                  Warnings ({result.items.filter(i => i.status === 'warning').length})
                </button>
                <button
                  onClick={() => setFilterStatus('passed')}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    filterStatus === 'passed' ? 'neu-btn-primary' : 'neu-btn text-emerald-500'
                  }`}
                >
                  Passed ({result.items.filter(i => i.status === 'passed').length})
                </button>
              </div>

              <span className="text-xs font-light text-slate-500">
                Showing {filteredItems.length} audited checkpoints
              </span>
            </div>

            {/* 3. Detailed Findings List */}
            <div className="space-y-4">
              {filteredItems.map((item) => (
                <div key={item.id} className="neu-card p-6 rounded-3xl space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      {item.status === 'passed' && <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />}
                      {item.status === 'warning' && <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />}
                      {item.status === 'failed' && <XCircle className="w-5 h-5 text-rose-500 shrink-0" />}
                      <h4 className="text-base font-bold text-slate-900 dark:text-white">
                        {item.name}
                      </h4>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold neu-badge text-slate-600 dark:text-slate-400">
                        {item.category}
                      </span>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        item.impact === 'High' ? 'bg-rose-500/10 text-rose-600' :
                        item.impact === 'Medium' ? 'bg-amber-500/10 text-amber-600' :
                        'bg-slate-500/10 text-slate-600'
                      }`}>
                        {item.impact} Impact
                      </span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-light leading-relaxed pl-8">
                    {item.details}
                  </p>

                  {/* Remediation Snippet */}
                  {item.remediationSnippet && (
                    <div className="ml-8 mt-2 rounded-2xl neu-inset p-4 relative group">
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-[11px] font-mono text-slate-400 uppercase font-bold">
                          Recommended Configuration Fix
                        </span>
                        <button
                          onClick={() => copyCode(item.remediationSnippet!, item.id)}
                          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg neu-btn text-xs font-semibold cursor-pointer"
                        >
                          {copiedSnippet === item.id ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                          {copiedSnippet === item.id ? 'Copied' : 'Copy'}
                        </button>
                      </div>
                      <pre className="text-xs font-mono text-slate-800 dark:text-slate-200 overflow-x-auto leading-relaxed">
                        <code>{item.remediationSnippet}</code>
                      </pre>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* 4. Live Extracted Metadata & Raw Server Headers */}
            <div className="neu-card p-6 sm:p-8 rounded-3xl space-y-6">
              <div className="flex items-center justify-between border-b border-slate-300/40 dark:border-white/10 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Info className="w-5 h-5 text-blue-500" />
                    Live Extracted Metadata & Server Headers
                  </h3>
                  <p className="text-xs text-slate-500 font-light mt-0.5">
                    100% genuine data retrieved directly from the target server during the live HTTP handshake.
                  </p>
                </div>
                <span className="text-xs font-mono font-bold px-3 py-1 rounded-full neu-badge text-slate-600 dark:text-slate-300">
                  HTTP {result.statusCode}
                </span>
              </div>

              {/* Real Extracted Metadata Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-2xl neu-inset space-y-1">
                  <span className="text-slate-400 font-bold uppercase tracking-wider block text-[10px]">HTML Page Title</span>
                  <span className="text-slate-800 dark:text-slate-200 font-medium block">
                    {result.meta.title || <span className="text-rose-500 italic">No &lt;title&gt; found</span>}
                  </span>
                </div>

                <div className="p-4 rounded-2xl neu-inset space-y-1">
                  <span className="text-slate-400 font-bold uppercase tracking-wider block text-[10px]">Meta Description</span>
                  <span className="text-slate-800 dark:text-slate-200 font-medium block line-clamp-2">
                    {result.meta.description || <span className="text-rose-500 italic">No description meta tag found</span>}
                  </span>
                </div>

                <div className="p-4 rounded-2xl neu-inset space-y-1">
                  <span className="text-slate-400 font-bold uppercase tracking-wider block text-[10px]">Server Software Banner</span>
                  <span className="text-slate-800 dark:text-slate-200 font-mono font-medium block">
                    {result.headers.serverBanner || <span className="text-slate-500">None exposed (Good for security)</span>}
                  </span>
                </div>

                <div className="p-4 rounded-2xl neu-inset space-y-1">
                  <span className="text-slate-400 font-bold uppercase tracking-wider block text-[10px]">Content Encoding / Compression</span>
                  <span className="text-slate-800 dark:text-slate-200 font-mono font-medium block">
                    {result.headers.contentEncoding || <span className="text-slate-500">Uncompressed / standard</span>}
                  </span>
                </div>
              </div>

              {/* Raw Headers Key-Value Table */}
              <div className="space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                  All Raw Response Headers ({Object.keys(result.headers.all || {}).length})
                </span>
                <div className="rounded-2xl neu-inset p-4 font-mono text-xs overflow-x-auto max-h-60 leading-relaxed text-slate-700 dark:text-slate-300">
                  {result.headers.all && Object.keys(result.headers.all).length > 0 ? (
                    Object.entries(result.headers.all).map(([key, val]) => (
                      <div key={key} className="py-0.5 flex gap-2">
                        <span className="text-blue-600 dark:text-blue-400 font-bold shrink-0">{key}:</span>
                        <span className="text-slate-800 dark:text-slate-200 break-all">{val}</span>
                      </div>
                    ))
                  ) : (
                    <span className="text-slate-400 italic">No custom headers parsed</span>
                  )}
                </div>
              </div>
            </div>

            {/* 4. Need Professional Remediation Banner */}
            <div className="neu-card p-8 sm:p-10 rounded-3xl text-center space-y-4 border-2 border-blue-500/20">
              <Sparkles className="w-8 h-8 text-blue-500 mx-auto" />
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                Need Help Hardening & Optimizing Your Website?
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 font-light max-w-xl mx-auto leading-relaxed">
                Kaveen Sandeepa specializes in resolving security vulnerabilities, configuring OWASP headers, boosting Google PageSpeed scores, and hardening production web servers.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                <a
                  href={`https://wa.me/94710947871?text=${encodeURIComponent(`Hello Kaveen! I ran a Site-Check audit on ${result.url} and got a grade of ${result.grade}. I need help optimizing and hardening my website.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-full neu-btn-primary text-xs font-bold flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  Discuss Fixes via WhatsApp
                </a>
                <a
                  href="https://www.fiverr.com/fr_kaveen"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-full neu-btn-fiverr text-xs font-bold"
                >
                  Hire on Fiverr
                </a>
              </div>
            </div>

          </motion.div>
        </section>
      )}

      <Footer />
    </div>
  );
}

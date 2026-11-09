import React, { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import { Search, ShoppingBag, ArrowLeft, ShieldCheck, Zap, MessageCircle, HelpCircle, CheckCircle, FileText, Layout, Palette } from 'lucide-react';
import { storeProducts, StoreProduct } from '../lib/storeData';
import { subscribeToProducts } from '../lib/productsService';
import { StoreCard } from '../components/StoreCard';
import { StoreProductModal } from '../components/StoreProductModal';
import { Footer } from '../components/Footer';

export function StorePage() {
  const [products, setProducts] = useState<StoreProduct[]>(storeProducts);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'ebook' | 'template' | 'ui'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeProduct, setActiveProduct] = useState<StoreProduct | null>(null);

  useEffect(() => {
    const unsubscribe = subscribeToProducts((liveList) => {
      setProducts(liveList);
    });
    return () => unsubscribe();
  }, []);

  const categories = [
    { id: 'all', label: 'All Items', icon: <ShoppingBag className="w-4 h-4" /> },
    { id: 'ebook', label: 'E-Books (PDF)', icon: <FileText className="w-4 h-4" /> },
    { id: 'template', label: 'Website Templates', icon: <Layout className="w-4 h-4" /> },
    { id: 'ui', label: 'UI Kits', icon: <Palette className="w-4 h-4" /> },
  ];

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesSearch =
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  const faqs = [
    {
      q: "E-Book එක මට ලැබෙන්නේ කොහොමද? (How do I receive the PDF?)",
      a: "ඔබ WhatsApp හරහා ඇණවුම තහවුරු කර Payment Slip එක එවූ පසු, මිනිත්තු කිහිපයක් ඇතුළත සම්පූර්ණ PDF Document එක ඔබගේ WhatsApp Chat එකටම කෙලින්ම එවනු ලැබේ."
    },
    {
      q: "ගෙවීම් සිදු කරන්නේ කෙසේද? (Accepted Payment Methods)",
      a: "ඕනෑම දේශීය බැංකු ගිණුමකට (Commercial Bank, Sampath, BOC, HNB ආදී) Online Banking Transfer හෝ CDM / Bank deposit මගින් හෝ eZ Cash මගින් ගෙවීම් පහසුවෙන් සිදු කළ හැක."
    },
    {
      q: "මට මේ PDF එක Phone එකෙන් සහ Computer එකෙන් කියවන්න පුළුවන්ද?",
      a: "ඔව්! මෙය සම්මත High-Quality PDF ගොනුවක් බැවින් ඕනෑම Smartphone (Android / iOS), Tablet, Laptop හෝ PC එකකින් කිසිදු අපහසුවකින් තොරව කියවීමට හෝ Print කර ගැනීමට හැකිය."
    },
    {
      q: "Website Templates සහ UI Kits ලබා ගන්නේ කෙසේද?",
      a: "ඒවායේ සම්පූර්ණ Source Code ZIP ගොනුව, Setup Guide PDF එක සහ Figma Access Link එක ඔබගේ WhatsApp අංකයට සෘජුවම ලබා දෙනු ලැබේ."
    }
  ];

  return (
    <div className="min-h-screen bg-mesh text-slate-900 dark:text-white flex flex-col">
      <Helmet>
        <title>Digital Store | E-Books, Templates & UI Kits - Kaveen Sandeepa</title>
        <meta
          name="description"
          content="Digital Store by Kaveen Sandeepa. Buy curated web development E-books (PDF), UI kits, and website templates with instant WhatsApp delivery."
        />
      </Helmet>

      {/* Top Floating Navigation */}
      <header className="sticky top-0 z-40 px-4 sm:px-6 lg:px-8 py-3">
        <div className="max-w-6xl mx-auto neu-nav-bar rounded-2xl md:rounded-full px-6 py-3.5 flex items-center justify-between">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors group"
          >
            <div className="w-8 h-8 rounded-full neu-circle-btn flex items-center justify-center group-hover:-translate-x-0.5 transition-transform">
              <ArrowLeft className="w-4 h-4" />
            </div>
            <span>Back to Portfolio</span>
          </a>

          <div className="flex items-center gap-3">
            <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white hidden sm:inline">
              Kaveen Store.
            </span>
            <a
              href="https://wa.me/94710947871?text=Hello%20Kaveen!%20I%20have%20a%20question%20about%20your%20digital%20store."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full neu-btn text-xs font-bold text-emerald-600 dark:text-emerald-400"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp Help</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full neu-badge text-xs font-bold text-blue-600 dark:text-blue-400 mb-5">
            <ShoppingBag className="w-3.5 h-3.5" />
            Digital Store & Resources
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4 leading-tight">
            Premium E-Books, Templates & UI Designs
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 font-light leading-relaxed">
            Handcrafted practical PDF roadmaps, design playbooks, and templates. Order in seconds and receive your files directly on WhatsApp.
          </p>
        </div>

        {/* 4-Step Process Banner */}
        <div className="neu-card p-6 sm:p-8 rounded-3xl mb-12">
          <div className="flex items-center justify-between border-b border-slate-300/40 dark:border-white/10 pb-4 mb-6">
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-emerald-500" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 dark:text-white">
                WhatsApp Delivery Guarantee (ඇණවුම් කිරීමේ පියවර)
              </h3>
            </div>
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full">
              Instant PDF
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl neu-inset">
              <span className="w-7 h-7 rounded-full neu-circle-btn flex items-center justify-center text-xs font-black text-blue-600 mb-2">1</span>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">Pick Product</h4>
              <p className="text-xs text-slate-500 font-light">Select any E-Book or template you wish to purchase.</p>
            </div>

            <div className="p-4 rounded-2xl neu-inset">
              <span className="w-7 h-7 rounded-full neu-circle-btn flex items-center justify-center text-xs font-black text-blue-600 mb-2">2</span>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">Order on WhatsApp</h4>
              <p className="text-xs text-slate-500 font-light">Click the order button to start the order on WhatsApp.</p>
            </div>

            <div className="p-4 rounded-2xl neu-inset">
              <span className="w-7 h-7 rounded-full neu-circle-btn flex items-center justify-center text-xs font-black text-blue-600 mb-2">3</span>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">Send Payment Slip</h4>
              <p className="text-xs text-slate-500 font-light">Pay via Bank Transfer or eZ Cash and send the receipt.</p>
            </div>

            <div className="p-4 rounded-2xl neu-inset">
              <span className="w-7 h-7 rounded-full neu-circle-btn flex items-center justify-center text-xs font-black text-emerald-600 mb-2">4</span>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">Instant PDF File</h4>
              <p className="text-xs text-slate-500 font-light">Receive the high-quality PDF directly to your chat!</p>
            </div>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as any)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'neu-btn-primary'
                    : 'neu-btn text-slate-600 dark:text-slate-300'
                }`}
              >
                {cat.icon}
                <span>{cat.label}</span>
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search books & templates..."
              className="w-full pl-11 pr-4 py-2.5 rounded-2xl neu-inset outline-none text-sm text-slate-800 dark:text-white placeholder:text-slate-400 transition-all focus:ring-2 focus:ring-blue-500/30"
            />
          </div>

        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16">
            {filteredProducts.map((product, index) => (
              <StoreCard
                key={product.id}
                product={product}
                index={index}
                onSelect={(prod) => setActiveProduct(prod)}
              />
            ))}
          </div>
        ) : (
          <div className="neu-card p-10 sm:p-14 rounded-3xl text-center max-w-lg mx-auto my-12">
            <div className="w-16 h-16 rounded-2xl neu-inset flex items-center justify-center mx-auto mb-5 text-blue-500">
              <ShoppingBag className="w-8 h-8" />
            </div>

            {selectedCategory === 'template' || selectedCategory === 'ui' ? (
              <>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold mb-3">
                  Coming Soon (ළඟදීම)
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  {selectedCategory === 'template' ? 'Website Templates Coming Soon' : 'UI Design Kits Coming Soon'}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 font-light mb-6 leading-relaxed">
                  දැනට Store එකෙහි ඇත්තේ E-Books (PDF) පමණි. Templates සහ UI Kits ළඟදීම එකතු කෙරේ. ඔබට Custom Website එකක් හෝ UI Design එකක් අවශ්‍ය නම් දැන්ම WhatsApp හරහා සම්බන්ධ විය හැක.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href="https://wa.me/94710947871?text=Hello%20Kaveen!%20I'm%20interested%20in%20a%20custom%20Website%20Template%20or%20UI%20design."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-6 py-3 rounded-full neu-btn-primary text-xs font-bold inline-flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-400" />
                    <span>Inquire via WhatsApp</span>
                  </a>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                    }}
                    className="w-full sm:w-auto px-5 py-3 rounded-full neu-btn text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer"
                  >
                    View Available E-Books
                  </button>
                </div>
              </>
            ) : (
              <>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">No products found</h3>
                <p className="text-sm text-slate-500 font-light mb-6">
                  {searchQuery ? `We couldn't find anything matching "${searchQuery}".` : 'No products available under this filter.'}
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                  }}
                  className="px-6 py-2.5 rounded-full neu-btn text-xs font-bold text-blue-600 cursor-pointer"
                >
                  Reset Filters
                </button>
              </>
            )}
          </div>
        )}

        {/* FAQ Section */}
        <section className="neu-card p-8 sm:p-12 rounded-3xl mt-12 mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-2xl neu-inset flex items-center justify-center text-blue-500">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                Frequently Asked Questions
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-light">
                Common questions regarding ordering, payment, and WhatsApp PDF delivery.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqs.map((faq, idx) => (
              <div key={idx} className="p-5 rounded-2xl neu-inset flex flex-col justify-between">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2 flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{faq.q}</span>
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-light leading-relaxed pl-6">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* Selected Product Popup Modal */}
      <StoreProductModal
        product={activeProduct}
        isOpen={Boolean(activeProduct)}
        onClose={() => setActiveProduct(null)}
      />

      <Footer />
    </div>
  );
}

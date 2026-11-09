import React from 'react';
import { motion } from 'motion/react';
import { ShoppingBag, ArrowRight, FileText, CheckCircle2 } from 'lucide-react';
import { storeProducts } from '../lib/storeData';

export function StoreBanner() {
  // Take top 3 products for preview pills
  const featured = storeProducts.slice(0, 3);

  return (
    <section className="py-16 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="neu-card p-8 sm:p-12 rounded-3xl relative overflow-hidden"
        >
          {/* Background Ambient Glow */}
          <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
            
            {/* Left Info */}
            <div className="max-w-xl text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full neu-badge text-xs font-bold text-blue-600 dark:text-blue-400 mb-4">
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Digital Products & E-Books</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3">
                Curated Roadmaps, E-Books & Web Kits
              </h2>

              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 font-light leading-relaxed mb-6">
                Learn modern web development, UI design principles, and freelancing secrets. Order via WhatsApp and receive your PDF eBook instantly after payment.
              </p>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
                <a
                  href="/store"
                  className="inline-flex items-center justify-center px-6 py-3.5 rounded-full neu-btn-primary text-sm font-bold gap-2 group"
                >
                  <span>Browse Digital Store</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <span className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  Instant WhatsApp PDF Delivery
                </span>
              </div>
            </div>

            {/* Right Mini Product Badges / Thumbnails */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full lg:w-auto">
              {featured.map((item) => (
                <a
                  key={item.id}
                  href="/store"
                  className="p-3 rounded-2xl neu-inset hover:neu-card transition-all flex flex-col items-center text-center group"
                >
                  <div className="w-16 h-16 rounded-xl neu-card overflow-hidden mb-2 relative">
                    <img
                      src={item.coverImage}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <span className="text-xs font-bold text-slate-800 dark:text-white line-clamp-1">
                    {item.title}
                  </span>
                  <span className="text-[11px] font-extrabold text-blue-600 dark:text-blue-400 mt-1">
                    Rs. {item.priceLKR.toLocaleString()}
                  </span>
                </a>
              ))}
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}

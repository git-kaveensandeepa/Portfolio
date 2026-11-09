import React from 'react';
import { motion } from 'motion/react';
import { FileText, ArrowUpRight, BookOpen, Layers } from 'lucide-react';
import { StoreProduct } from '../lib/storeData';
import { TiltCard } from './TiltCard';

interface StoreCardProps {
  key?: string;
  product: StoreProduct;
  index: number;
  onSelect: (product: StoreProduct) => void;
}

export function StoreCard({ product, index, onSelect }: StoreCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="h-full"
    >
      <TiltCard className="group relative flex flex-col h-full rounded-3xl neu-card neu-card-hover p-5 cursor-pointer">
        <div onClick={() => onSelect(product)} className="flex flex-col flex-grow">
          
          {/* 1:1 Aspect Ratio Cover Thumbnail */}
          <div className="relative w-full aspect-square rounded-2xl neu-inset p-2 mb-5 overflow-hidden">
            <div className="w-full h-full rounded-xl overflow-hidden relative">
              <img
                src={product.coverImage}
                alt={product.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

              {/* Floating badges on cover */}
              <div className="absolute top-2.5 left-2.5">
                <span className="px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-semibold flex items-center gap-1 shadow-sm">
                  {product.category === 'ebook' ? (
                    <FileText className="w-3 h-3 text-blue-400" />
                  ) : (
                    <Layers className="w-3 h-3 text-purple-400" />
                  )}
                  {product.categoryLabel}
                </span>
              </div>

              {product.badge && (
                <div className="absolute top-2.5 right-2.5">
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500 text-white text-[11px] font-bold shadow-sm">
                    {product.badge}
                  </span>
                </div>
              )}

              {/* Bottom spec pill on cover */}
              {product.pages && (
                <div className="absolute bottom-2.5 left-2.5">
                  <span className="px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-white/90 text-[11px] font-medium flex items-center gap-1">
                    <BookOpen className="w-3 h-3" />
                    {product.pages} pgs
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col flex-grow">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-2 line-clamp-1">
              {product.title}
            </h3>

            <p className="text-sm text-slate-600 dark:text-slate-400 font-light leading-relaxed mb-4 line-clamp-2">
              {product.shortDescription}
            </p>

            {/* Price & Action Row */}
            <div className="mt-auto pt-4 border-t border-slate-300/40 dark:border-white/10 flex items-center justify-between gap-2">
              <div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-xl font-extrabold text-slate-900 dark:text-white">
                    Rs. {product.priceLKR.toLocaleString()}
                  </span>
                  {product.originalPriceLKR && (
                    <span className="text-xs text-slate-400 line-through">
                      Rs. {product.originalPriceLKR.toLocaleString()}
                    </span>
                  )}
                </div>
                <span className="text-[11px] font-medium text-slate-400">
                  ${product.priceUSD} USD
                </span>
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelect(product);
                }}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl neu-btn text-xs font-bold text-blue-600 dark:text-blue-400 group/btn"
              >
                <span>View Details</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
              </button>
            </div>

          </div>

        </div>
      </TiltCard>
    </motion.div>
  );
}

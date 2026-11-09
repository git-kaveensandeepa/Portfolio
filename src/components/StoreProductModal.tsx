import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, FileText, Download, ShieldCheck, ArrowRight, BookOpen, Layers } from 'lucide-react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { StoreProduct } from '../lib/storeData';

interface StoreProductModalProps {
  product: StoreProduct | null;
  isOpen: boolean;
  onClose: () => void;
}

export function StoreProductModal({ product, isOpen, onClose }: StoreProductModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!product) return null;

  const handleOrderInitiation = () => {
    try {
      addDoc(collection(db, 'orders'), {
        productId: product.id,
        productTitle: product.title,
        productPrice: product.priceLKR,
        createdAt: new Date().toISOString(),
        status: 'pending'
      }).catch((err) => console.warn("Firestore order log note:", err));
    } catch (err) {
      console.warn("Firestore error:", err);
    }
  };

  // WhatsApp order message
  const whatsappNumber = "94710947871";
  const whatsappMessage = `Hello Kaveen! 👋 I want to order this digital product from your store:

📖 Product: ${product.title}
🏷️ Format: ${product.format}
💰 Price: Rs. ${product.priceLKR.toLocaleString()} ($${product.priceUSD} USD)
🆔 Product ID: ${product.id}

Please share the payment details (Bank Transfer / eZ Cash) so I can make the payment and receive the PDF directly on WhatsApp. Thank you!`;

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-md overflow-y-auto"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl max-h-[92vh] flex flex-col lg:flex-row rounded-3xl neu-card my-auto overflow-y-auto lg:overflow-hidden shadow-2xl"
          >
            {/* Floating Close Button */}
            <button
              onClick={onClose}
              className="sticky lg:absolute top-3 right-3 lg:top-4 lg:right-4 z-30 self-end w-10 h-10 rounded-full neu-circle-btn flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-slate-950 cursor-pointer shadow-md bg-white/80 dark:bg-slate-800/80 backdrop-blur-md"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left Column: 1:1 Aspect Ratio Cover & Badges (Scrollable on mobile) */}
            <div className="w-full lg:w-5/12 p-5 sm:p-8 flex flex-col items-center justify-start lg:justify-center bg-slate-200/40 dark:bg-black/20 border-b lg:border-b-0 lg:border-r border-slate-300/40 dark:border-white/10 shrink-0">
              
              {/* 1:1 Aspect Ratio Cover Container with Neumorphic Bezel */}
              <div className="relative w-full max-w-[220px] sm:max-w-[280px] lg:max-w-[320px] aspect-square rounded-3xl neu-card p-3 group mx-auto">
                <div className="relative w-full h-full rounded-2xl overflow-hidden neu-inset">
                  <img
                    src={product.coverImage}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

                  {/* Format pill inside cover */}
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-full bg-slate-900/85 backdrop-blur-md text-white text-[11px] font-semibold flex items-center gap-1.5 shadow-sm">
                      <FileText className="w-3.5 h-3.5 text-blue-400" />
                      {product.category === 'ebook' ? 'PDF E-Book' : product.categoryLabel}
                    </span>
                    {product.badge && (
                      <span className="px-2.5 py-1 rounded-full bg-emerald-500 text-white text-[11px] font-bold shadow-sm">
                        {product.badge}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Quick Specs Under Cover */}
              <div className="w-full max-w-[320px] mt-4 sm:mt-6 grid grid-cols-2 gap-2.5 text-center">
                {product.pages && (
                  <div className="p-2.5 sm:p-3 rounded-2xl neu-inset">
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Pages</span>
                    <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-white flex items-center justify-center gap-1 mt-0.5">
                      <BookOpen className="w-3.5 h-3.5 text-blue-500" />
                      {product.pages} Pages
                    </span>
                  </div>
                )}
                {product.fileSize && (
                  <div className="p-2.5 sm:p-3 rounded-2xl neu-inset">
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">File Size</span>
                    <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-white flex items-center justify-center gap-1 mt-0.5">
                      <Download className="w-3.5 h-3.5 text-purple-500" />
                      {product.fileSize}
                    </span>
                  </div>
                )}
              </div>

              {/* Delivery Guarantee Pill */}
              <div className="w-full max-w-[320px] mt-3 sm:mt-4 p-3 rounded-2xl neu-card flex items-center gap-3 text-xs text-slate-700 dark:text-slate-300">
                <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0" />
                <span className="leading-snug text-[11px] sm:text-xs">
                  <strong>WhatsApp Delivery:</strong> Receive the PDF directly on your WhatsApp immediately after payment.
                </span>
              </div>
            </div>

            {/* Right Column: Details, Highlights & WhatsApp Order CTA */}
            <div className="w-full lg:w-7/12 p-5 sm:p-8 flex flex-col lg:overflow-y-auto">
              
              {/* Category & Title */}
              <div className="mb-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full neu-badge text-xs font-bold text-blue-600 dark:text-blue-400 mb-2">
                  <Layers className="w-3.5 h-3.5" />
                  {product.categoryLabel}
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white leading-tight">
                  {product.title}
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Author & Creator: <strong className="text-slate-800 dark:text-slate-200 font-semibold">{product.author}</strong>
                </p>
              </div>

              {/* Price Banner */}
              <div className="p-4 sm:p-5 rounded-2xl neu-card mb-5 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                      Rs. {product.priceLKR.toLocaleString()}
                    </span>
                    {product.originalPriceLKR && (
                      <span className="text-sm sm:text-base text-slate-400 line-through">
                        Rs. {product.originalPriceLKR.toLocaleString()}
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                    ≈ ${product.priceUSD} USD • One-time purchase
                  </span>
                </div>

                <div className="px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
                  {product.originalPriceLKR ? `Save Rs. ${(product.originalPriceLKR - product.priceLKR).toLocaleString()}` : 'Instant Delivery'}
                </div>
              </div>

              {/* Book Description */}
              <div className="mb-5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                  Description
                </h3>
                <p className="text-sm sm:text-base text-slate-700 dark:text-slate-200 font-normal leading-relaxed">
                  {product.fullDescription}
                </p>
              </div>

              {/* What's Inside / Key Highlights */}
              <div className="mb-5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2.5">
                  What's Included & Highlights
                </h3>
                <ul className="space-y-2">
                  {product.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start text-xs sm:text-sm text-slate-800 dark:text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5 mr-2" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* How it works (WhatsApp Order Steps) */}
              <div className="p-4 rounded-2xl neu-inset mb-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 mb-2 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  Order & Delivery Steps (ක්‍රියාවලිය):
                </h4>
                <ol className="text-xs text-slate-600 dark:text-slate-400 space-y-1.5 list-decimal list-inside font-normal">
                  <li>පහත <strong>"Order via WhatsApp"</strong> බොත්තම ක්ලික් කරන්න.</li>
                  <li>WhatsApp වෙතින් Bank Transfer හෝ eZ Cash විස්තර ලබාගෙන ගෙවීම සිදු කරන්න.</li>
                  <li>Payment Slip එකේ Screenshot එක එවන්න.</li>
                  <li>මිනිත්තු කිහිපයක් තුළ සම්පූර්ණ <strong>PDF E-Book එක ඔබගේ WhatsApp එකටම</strong> එවනු ලැබේ!</li>
                </ol>
              </div>

              {/* Action Buttons */}
              <div className="mt-auto pt-2 flex flex-col sm:flex-row gap-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleOrderInitiation}
                  className="flex-1 inline-flex items-center justify-center px-6 py-4 rounded-2xl neu-btn-primary font-bold text-base gap-3 cursor-pointer group shadow-lg"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-emerald-400 shrink-0">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                  </svg>
                  <span>Order via WhatsApp</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>

                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-4 rounded-2xl neu-btn font-semibold text-sm cursor-pointer"
                >
                  Close
                </button>
              </div>

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

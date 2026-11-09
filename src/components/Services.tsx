import React from 'react';
import { motion } from 'motion/react';
import { SectionHeading } from './SectionHeading';
import { services, websitePackage } from '../lib/data';
import { TiltCard } from './TiltCard';
import { Globe, Smartphone, Store, Code, CheckCircle2, Server, Globe2, ArrowRight, MessageSquare, Sparkles } from 'lucide-react';

const serviceIcons = [
  <Globe className="w-6 h-6 text-blue-500" key="0" />,
  <Smartphone className="w-6 h-6 text-emerald-500" key="1" />,
  <Store className="w-6 h-6 text-purple-500" key="2" />,
  <Code className="w-6 h-6 text-amber-500" key="3" />,
];

export function Services() {
  return (
    <section id="services" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <SectionHeading 
          title="Services & Pricing Packages" 
          subtitle="Transparent, high-value web and mobile app development packages tailored for growth." 
        />
        
        {/* Featured Website Development Package Card */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16 rounded-3xl neu-card p-8 sm:p-12 relative overflow-hidden border border-blue-500/30"
        >
          {/* Subtle Glow backdrop */}
          <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 pb-8 border-b border-slate-200/50 dark:border-white/10">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full neu-badge text-xs font-bold text-blue-600 dark:text-blue-400 mb-3 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Featured Package</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                {websitePackage.title}
              </h3>
              <p className="mt-2 text-slate-600 dark:text-slate-400 text-sm sm:text-base font-light max-w-2xl leading-relaxed">
                {websitePackage.description}
              </p>
            </div>

            {/* Price Badge */}
            <div className="p-6 rounded-2xl neu-inset bg-transparent shrink-0 text-left lg:text-right border border-blue-500/20 w-full sm:w-auto">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1">
                පළමු මාසයේ උදාහරණ ගෙවීම
              </span>
              <div className="text-3xl sm:text-4xl font-black text-gradient">
                {websitePackage.sampleFirstMonthTotal}
              </div>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium block mt-1">
                Sample First Month Total ({websitePackage.sampleFirstMonthUsd})
              </span>
            </div>
          </div>

          {/* Inclusions & Separate Services Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-8">
            
            {/* Inclusions (2 columns on lg) */}
            <div className="lg:col-span-2">
              <h4 className="text-base font-bold text-slate-900 dark:text-white mb-4 uppercase tracking-wider flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                <span>Website Development එකට ඇතුළත් (Package Inclusions)</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {websitePackage.inclusions.map((item, i) => (
                  <div 
                    key={i} 
                    className="flex items-center gap-3 p-3.5 rounded-xl neu-btn bg-transparent text-slate-800 dark:text-slate-200 text-sm font-medium"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Separate Paid Services & Order Action */}
            <div className="flex flex-col justify-between p-6 rounded-2xl neu-inset border border-slate-200/40 dark:border-white/5">
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-3 uppercase tracking-wider flex items-center gap-2">
                  <Server className="w-4 h-4 text-purple-500" />
                  <span>වෙනම ගෙවිය යුතු සේවා (Optional Extras)</span>
                </h4>

                <ul className="space-y-3 mb-6">
                  {websitePackage.separateServices.map((service, idx) => (
                    <li key={idx} className="flex items-center justify-between text-xs sm:text-sm font-medium border-b border-slate-200/30 dark:border-white/5 pb-2">
                      <span className="text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                        <Globe2 className="w-3.5 h-3.5 text-blue-500" />
                        {service.name}
                      </span>
                      <span className="font-bold text-slate-900 dark:text-white">{service.cost}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Order / Inquiry Buttons */}
              <div className="space-y-2.5 pt-2">
                <a
                  href="https://wa.me/94710947871?text=Hello%20Kaveen,%20I'm%20interested%20in%20the%20Website%20Development%20Package%20(රු.68,400)."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl neu-btn text-emerald-600 dark:text-emerald-400 font-bold text-xs sm:text-sm hover:scale-102 transition-transform cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 fill-current" />
                  <span>Inquire via WhatsApp</span>
                </a>

                <a
                  href="#contact"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl neu-btn-primary font-bold text-xs sm:text-sm hover:scale-102 transition-transform cursor-pointer"
                >
                  <span>Book This Package</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

          </div>
        </motion.div>

        {/* All Other Service Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <TiltCard className="neu-card neu-card-hover p-6 rounded-3xl h-full flex flex-col justify-between group relative overflow-hidden">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl neu-inset flex items-center justify-center text-slate-700 dark:text-slate-300 group-hover:scale-105 transition-transform">
                      {serviceIcons[index % serviceIcons.length]}
                    </div>
                    {service.popular && (
                      <span className="px-2.5 py-0.5 rounded-full bg-blue-500 text-white text-[10px] font-bold uppercase tracking-wider">
                        Most Popular
                      </span>
                    )}
                  </div>
                  
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                    {service.title}
                  </h3>
                  
                  <p className="text-slate-600 dark:text-slate-400 font-light text-xs sm:text-sm leading-relaxed mb-4">
                    {service.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200/40 dark:border-white/5 flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
                    {service.price}
                  </span>
                  <a 
                    href="#contact"
                    className="p-1.5 rounded-full neu-circle-btn text-slate-600 hover:text-blue-500 dark:text-slate-300 transition-colors"
                    aria-label="Inquire service"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

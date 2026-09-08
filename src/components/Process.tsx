import { motion } from 'motion/react';
import { process } from '../lib/data';

export function Process() {
  return (
    <section className="py-24 relative border-t border-slate-200/50 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4 lg:gap-8">
          {process.map((step, index) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex flex-col md:items-start"
            >
              {/* Desktop connector line */}
              {index !== process.length - 1 && (
                <div className="hidden md:block absolute top-6 left-12 right-0 h-[2px] bg-white/40 backdrop-blur-sm -z-10 w-full" />
              )}
              
              <div className="flex flex-row md:flex-col items-center md:items-start gap-4 md:gap-0">
                <div className="w-12 h-12 rounded-full glass flex items-center justify-center text-sm font-bold text-slate-900 md:mb-6 shrink-0 z-10">
                  {step.num}
                </div>
                
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 font-light">
                    {step.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

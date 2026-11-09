import { motion } from 'motion/react';
import { process } from '../lib/data';
import { SectionHeading } from './SectionHeading';

export function Process() {
  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeading 
          title="How We Work" 
          subtitle="A smooth, transparent four-step process from concept to deployment."
        />
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6 lg:gap-8">
          {process.map((step, index) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex flex-col md:items-start neu-card p-6 sm:p-7 rounded-3xl"
            >
              <div className="flex flex-row md:flex-col items-center md:items-start gap-4 md:gap-0 w-full">
                <div className="w-13 h-13 rounded-2xl neu-inset flex items-center justify-center text-base font-extrabold text-blue-600 dark:text-blue-400 md:mb-6 shrink-0 z-10">
                  {step.num}
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 font-light leading-relaxed">
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

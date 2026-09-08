import { motion } from 'motion/react';
import { SectionHeading } from './SectionHeading';

const stats = [
  { label: 'Projects', value: '10+' },
  { label: 'Focus', value: 'Web Development' },
  { label: 'Experience', value: 'Growing Every Day' },
];

export function About() {
  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <SectionHeading title="A little about me" />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
            <div className="prose prose-lg dark:prose-invert prose-slate max-w-none text-slate-600 dark:text-slate-300 font-light leading-relaxed">
              <p>
                I am a passionate web developer who enjoys building modern websites, business dashboards, and sleek SaaS interfaces. My focus is always on creating clean, intuitive user experiences backed by solid, maintainable code.
              </p>
              <p className="mt-4">
                I believe that a great website should feel effortless to use while looking premium and trustworthy. I strive to combine the latest frontend technologies with minimal, modern design principles to deliver digital products that stand out.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                  className="glass-card p-6 rounded-2xl flex flex-col justify-center"
                >
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                    {stat.label}
                  </span>
                  <span className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
                    {stat.value}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

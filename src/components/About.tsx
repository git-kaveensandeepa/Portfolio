import { motion } from 'motion/react';
import { SectionHeading } from './SectionHeading';

const stats = [
  { label: 'Projects Completed', value: '10+' },
  { label: 'Core Expertise', value: 'Web Apps & UI' },
  { label: 'Client Focus', value: '100% Dedicated' },
];

export function About() {
  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <SectionHeading 
            title="A little about me" 
            subtitle="Driven by crafting digital experiences that feel smooth, intentional, and effortless."
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="neu-card p-8 sm:p-10 rounded-3xl text-slate-600 dark:text-slate-300 font-light leading-relaxed space-y-4">
              <p className="text-base sm:text-lg">
                I am a passionate web developer who specializes in building modern websites, business web applications, and intuitive interfaces. My obsession is combining tactile aesthetic precision with smooth, reliable functionality.
              </p>
              <p className="text-base sm:text-lg">
                I believe that every digital touchpoint should feel seamless and tactile. By pairing modern frontend engineering with thoughtful design principles, I deliver digital products that stand out from the crowd and convert visitors into clients.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                  className="neu-card neu-card-hover p-6 rounded-3xl flex flex-col justify-center text-center sm:text-left"
                >
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
                    {stat.label}
                  </span>
                  <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
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

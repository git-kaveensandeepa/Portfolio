import { motion } from 'motion/react';
import { SectionHeading } from './SectionHeading';
import { skills } from '../lib/data';

export function Skills() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <SectionHeading title="Technical Arsenal" subtitle="The tools and technologies I use to bring ideas to life." />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Frontend */}
            <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }} className="glass-card rounded-3xl p-8">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-6 flex items-center">
                Frontend
              </h3>
              <ul className="space-y-4">
                {skills.frontend.map((skill) => (
                  <motion.li key={skill.name} variants={item} className="flex items-center justify-between group">
                    <span className="text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">{skill.name}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Design */}
            <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }} className="glass-card rounded-3xl p-8">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-6 flex items-center">
                Design
              </h3>
              <ul className="space-y-4">
                {skills.design.map((skill) => (
                  <motion.li key={skill.name} variants={item} className="flex items-center justify-between group">
                    <span className="text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">{skill.name}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Tools */}
            <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }} className="glass-card rounded-3xl p-8">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-6 flex items-center">
                Tools
              </h3>
              <ul className="space-y-4">
                {skills.tools.map((skill) => (
                  <motion.li key={skill.name} variants={item} className="flex items-center justify-between group">
                    <span className="text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">{skill.name}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

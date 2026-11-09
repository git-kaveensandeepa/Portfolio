import { motion } from 'motion/react';
import { SectionHeading } from './SectionHeading';
import { skills } from '../lib/data';
import { Layers, Palette, Terminal, Server } from 'lucide-react';

export function Skills() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  };

  const skillCategories = [
    {
      title: 'Frontend Development',
      icon: <Layers className="w-5 h-5 text-blue-500" />,
      list: skills.frontend
    },
    {
      title: 'Backend & Node.js',
      icon: <Server className="w-5 h-5 text-emerald-500" />,
      list: skills.backend
    },
    {
      title: 'UI & UX Design',
      icon: <Palette className="w-5 h-5 text-purple-500" />,
      list: skills.design
    },
    {
      title: 'Tools & Ecosystem',
      icon: <Terminal className="w-5 h-5 text-amber-500" />,
      list: skills.tools
    }
  ];

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <SectionHeading 
            title="Technical Arsenal" 
            subtitle="The frameworks, Node.js backend tools, Angular, React, and libraries I leverage to engineer polished products." 
          />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {skillCategories.map((cat) => (
              <motion.div 
                key={cat.title}
                variants={container} 
                initial="hidden" 
                whileInView="show" 
                viewport={{ once: true }} 
                className="neu-card neu-card-hover rounded-3xl p-8 flex flex-col"
              >
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-300/40 dark:border-white/10">
                  <div className="p-2.5 rounded-2xl neu-inset">
                    {cat.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    {cat.title}
                  </h3>
                </div>
                
                <ul className="space-y-4">
                  {cat.list.map((skill) => (
                    <motion.li 
                      key={skill.name} 
                      variants={item} 
                      className="flex flex-col gap-1.5"
                    >
                      <div className="flex justify-between items-center text-sm">
                        <span className="font-medium text-slate-700 dark:text-slate-300">
                          {skill.name}
                        </span>
                        <span className="text-xs font-semibold text-slate-400">
                          {skill.level}%
                        </span>
                      </div>
                      {/* Neumorphic recessed progress bar */}
                      <div className="w-full h-2.5 rounded-full neu-inset p-0.5 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                          className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 shadow-sm"
                        />
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

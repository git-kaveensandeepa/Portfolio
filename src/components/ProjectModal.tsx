import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, X, CheckCircle2 } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  fullDescription?: string;
  features?: string[];
  image: string;
  tech: string[];
  url: string;
}

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
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

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-6xl h-full max-h-[90vh] flex flex-col lg:flex-row overflow-hidden rounded-3xl neu-card"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-[110] w-10 h-10 rounded-full neu-circle-btn flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-slate-900 cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Live Preview / Screenshot (Left/Top) */}
            <div className="w-full lg:w-2/3 h-1/2 lg:h-full relative bg-slate-100 dark:bg-slate-950 flex flex-col border-b lg:border-b-0 lg:border-r border-slate-300/40 dark:border-white/10 shrink-0">
               {/* Browser bar mockup */}
               <div className="w-full h-12 bg-white/70 dark:bg-slate-900/70 flex items-center px-4 border-b border-slate-300/40 dark:border-white/10 shrink-0">
                 <div className="flex gap-1.5 mr-4 hidden sm:flex">
                   <div className="w-3 h-3 rounded-full bg-red-400"></div>
                   <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                   <div className="w-3 h-3 rounded-full bg-green-400"></div>
                 </div>
                 <div className="flex-1 rounded-lg neu-inset h-8 flex items-center px-3 text-xs text-slate-500 font-mono overflow-hidden whitespace-nowrap">
                   {project.url}
                 </div>
               </div>
               
               {/* Project Image */}
               <div className="flex-1 w-full bg-slate-100 dark:bg-slate-950 relative overflow-hidden">
                 <img 
                   src={project.image} 
                   alt={`${project.title} preview`}
                   className="absolute inset-0 w-full h-full object-cover object-top"
                 />
               </div>
            </div>

            {/* Content Details (Right/Bottom) */}
            <div className="w-full lg:w-1/3 h-1/2 lg:h-full overflow-y-auto p-6 md:p-8 flex flex-col">
                <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white mb-4 pr-8">
                  {project.title}
                </h3>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs font-semibold rounded-full neu-badge text-slate-700 dark:text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
                  Overview
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-300 font-light leading-relaxed mb-6">
                  {project.fullDescription || project.description}
                </p>

                {project.features && (
                  <>
                    <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">
                      Key Features
                    </h4>
                    <ul className="space-y-2.5 mb-8 flex-1">
                      {project.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start text-sm text-slate-600 dark:text-slate-300">
                          <CheckCircle2 className="w-4 h-4 mr-2.5 text-emerald-500 shrink-0 mt-0.5" />
                          <span className="font-light">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
                
                <div className="mt-auto pt-6">
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-full px-5 py-3.5 text-sm font-semibold rounded-2xl neu-btn-primary gap-2"
                    >
                      Open Live Site
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

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
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-6xl h-full max-h-[90vh] flex flex-col lg:flex-row overflow-hidden rounded-3xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-white/50 dark:border-white/10 shadow-2xl"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-[110] p-2 rounded-full bg-slate-900/10 text-slate-900 dark:bg-white/10 dark:text-white hover:bg-slate-900/20 dark:hover:bg-white/20 backdrop-blur-md transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Live Preview iFrame (Left/Top) */}
            <div className="w-full lg:w-2/3 h-1/2 lg:h-full relative bg-slate-100 dark:bg-slate-950 flex flex-col border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-white/10 shrink-0">
               {/* Browser bar mockup */}
               <div className="w-full h-12 bg-white dark:bg-slate-900 flex items-center px-4 border-b border-slate-200 dark:border-white/10 shrink-0">
                 <div className="flex gap-1.5 mr-4 hidden sm:flex">
                   <div className="w-3 h-3 rounded-full bg-red-400"></div>
                   <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                   <div className="w-3 h-3 rounded-full bg-green-400"></div>
                 </div>
                 <div className="flex-1 bg-slate-100 dark:bg-slate-800 rounded-md h-8 flex items-center px-3 text-xs text-slate-500 font-mono overflow-hidden whitespace-nowrap">
                   {project.url}
                 </div>
               </div>
               
               {/* Iframe */}
               <div className="flex-1 w-full bg-white dark:bg-slate-950 relative">
                 <iframe 
                   src={project.url} 
                   className="absolute inset-0 w-full h-full border-0" 
                   sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                   title={`Live preview of ${project.title}`}
                 />
               </div>
            </div>

            {/* Content Details (Right/Bottom) */}
            <div className="w-full lg:w-1/3 h-1/2 lg:h-full overflow-y-auto custom-scrollbar p-6 md:p-8 flex flex-col">
                <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-4 pr-8">
                  {project.title}
                </h3>
                
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs font-medium rounded-full bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/5"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">
                  Overview
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-300 font-light leading-relaxed mb-6">
                  {project.fullDescription || project.description}
                </p>

                {project.features && (
                  <>
                    <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">
                      Key Features
                    </h4>
                    <ul className="space-y-3 mb-8 flex-1">
                      {project.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start text-sm text-slate-600 dark:text-slate-300">
                          <CheckCircle2 className="w-4 h-4 mr-3 text-green-500 shrink-0 mt-0.5" />
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
                      className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium rounded-xl text-white bg-slate-900 hover:bg-slate-800 transition-colors"
                    >
                      Open in New Tab
                      <ArrowUpRight className="w-4 h-4 ml-2" />
                    </a>
                </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
